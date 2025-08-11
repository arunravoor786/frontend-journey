// Advanced Web Storage Management

class StorageManager {
    constructor() {
        this.prefix = 'portfolio_'; // Namespace for your app
        this.version = '1.0'; // For data migration
        this.init();
    }
    
    init() {
        // Check storage availability
        this.isLocalStorageAvailable = this.checkStorageSupport('localStorage');
        this.isSessionStorageAvailable = this.checkStorageSupport('sessionStorage');
        
        // Initialize app data structure
        this.initializeAppData();
    }
    
    // Check if storage is available
    checkStorageSupport(type) {
        try {
            const storage = window[type];
            const test = '__storage_test__';
            storage.setItem(test, test);
            storage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }
    
    // Initialize default app data
    initializeAppData() {
        const defaultData = {
            user: {
                name: '',
                email: '',
                preferences: {
                    theme: 'light',
                    language: 'en',
                    notifications: true
                }
            },
            portfolio: {
                projects: [],
                skills: [],
                visitCount: 0,
                lastVisit: null
            },
            settings: {
                version: this.version,
                firstVisit: new Date().toISOString()
            }
        };
        
        // Initialize if doesn't exist
        if (!this.get('appData', 'local')) {
            this.set('appData', defaultData, 'local');
        }
        
        // Update visit count
        this.updateVisitStats();
    }
    
    // Generic set method
    set(key, value, type = 'local') {
        try {
            const storage = type === 'session' ? sessionStorage : localStorage;
            const storageKey = this.prefix + key;
            const serializedValue = JSON.stringify({
                data: value,
                timestamp: Date.now(),
                version: this.version
            });
            storage.setItem(storageKey, serializedValue);
            return true;
        } catch (error) {
            console.error('Storage set failed:', error);
            return false;
        }
    }
    
    // Generic get method
    get(key, type = 'local') {
        try {
            const storage = type === 'session' ? sessionStorage : localStorage;
            const storageKey = this.prefix + key;
            const item = storage.getItem(storageKey);
            
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            
            // Check version compatibility
            if (parsed.version !== this.version) {
                console.warn('Data version mismatch, might need migration');
            }
            
            return parsed.data;
        } catch (error) {
            console.error('Storage get failed:', error);
            return null;
        }
    }
    
    // Remove item
    remove(key, type = 'local') {
        try {
            const storage = type === 'session' ? sessionStorage : localStorage;
            const storageKey = this.prefix + key;
            storage.removeItem(storageKey);
            return true;
        } catch (error) {
            console.error('Storage remove failed:', error);
            return false;
        }
    }
    
    // Clear all app data
    clear(type = 'local') {
        try {
            const storage = type === 'session' ? sessionStorage : localStorage;
            const keysToRemove = [];
            
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    keysToRemove.push(key);
                }
            }
            
            keysToRemove.forEach(key => storage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Storage clear failed:', error);
            return false;
        }
    }
    
    // Update nested object properties
    updateNested(key, path, value, type = 'local') {
        const data = this.get(key, type) || {};
        const pathArray = path.split('.');
        let current = data;
        
        // Navigate to the nested property
        for (let i = 0; i < pathArray.length - 1; i++) {
            if (!(pathArray[i] in current)) {
                current[pathArray[i]] = {};
            }
            current = current[pathArray[i]];
        }
        
        // Set the value
        current[pathArray[pathArray.length - 1]] = value;
        
        return this.set(key, data, type);
    }
    
    // User preferences management
    getTheme() {
        return this.get('appData')?.user?.preferences?.theme || 'light';
    }
    
    setTheme(theme) {
        return this.updateNested('appData', 'user.preferences.theme', theme);
    }
    
    // Visit tracking
    updateVisitStats() {
        const appData = this.get('appData') || {};
        appData.portfolio = appData.portfolio || {};
        appData.portfolio.visitCount = (appData.portfolio.visitCount || 0) + 1;
        appData.portfolio.lastVisit = new Date().toISOString();
        
        this.set('appData', appData);
    }
    
    // Project management
    addProject(project) {
        const appData = this.get('appData') || {};
        appData.portfolio = appData.portfolio || {};
        appData.portfolio.projects = appData.portfolio.projects || [];
        
        const projectWithId = {
            ...project,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };
        
        appData.portfolio.projects.push(projectWithId);
        return this.set('appData', appData);
    }
    
    // Skill management
    addSkill(skill, level) {
        const appData = this.get('appData') || {};
        appData.portfolio = appData.portfolio || {};
        appData.portfolio.skills = appData.portfolio.skills || [];
        
        const skillExists = appData.portfolio.skills.find(s => s.name === skill);
        
        if (skillExists) {
            skillExists.level = level;
            skillExists.updatedAt = new Date().toISOString();
        } else {
            appData.portfolio.skills.push({
                name: skill,
                level: level,
                id: Date.now(),
                createdAt: new Date().toISOString()
            });
        }
        
        return this.set('appData', appData);
    }
    
    // Export data for backup
    exportData() {
        const allData = {};
        const storage = localStorage;
        
        for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            if (key && key.startsWith(this.prefix)) {
                allData[key] = storage.getItem(key);
            }
        }
        
        return JSON.stringify(allData, null, 2);
    }
    
    // Import data from backup
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            Object.entries(data).forEach(([key, value]) => {
                if (key.startsWith(this.prefix)) {
                    localStorage.setItem(key, value);
                }
            });
            
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    }
    
    // Get storage usage info
    getStorageInfo() {
        let localUsed = 0;
        let sessionUsed = 0;
        
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key.startsWith(this.prefix)) {
                localUsed += localStorage[key].length;
            }
        }
        
        for (let key in sessionStorage) {
            if (sessionStorage.hasOwnProperty(key) && key.startsWith(this.prefix)) {
                sessionUsed += sessionStorage[key].length;
            }
        }
        
        return {
            localStorage: {
                used: localUsed,
                available: this.isLocalStorageAvailable,
                usedFormatted: this.formatBytes(localUsed)
            },
            sessionStorage: {
                used: sessionUsed,
                available: this.isSessionStorageAvailable,
                usedFormatted: this.formatBytes(sessionUsed)
            }
        };
    }
    
    // Helper to format bytes
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Initialize global storage manager
const storage = new StorageManager();

// Auto-save form data
class AutoSave {
    constructor(formSelector, storageKey) {
        this.form = document.querySelector(formSelector);
        this.storageKey = storageKey;
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        // Load saved data
        this.loadSavedData();
        
        // Save on input
        this.form.addEventListener('input', this.debounce(this.saveData.bind(this), 500));
    }
    
    saveData() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        storage.set(this.storageKey, data, 'session');
    }
    
    loadSavedData() {
        const savedData = storage.get(this.storageKey, 'session');
        if (!savedData) return;
        
        Object.entries(savedData).forEach(([name, value]) => {
            const input = this.form.querySelector(`[name="${name}"]`);
            if (input) input.value = value;
        });
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Export for global use
window.StorageManager = StorageManager;
window.storage = storage;
window.AutoSave = AutoSave;
