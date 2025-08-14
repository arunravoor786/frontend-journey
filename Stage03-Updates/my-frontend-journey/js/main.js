// js/main.js - Main Application Logic
/*
🎯 PURPOSE: Initialize portfolio interactivity and features
⚡ EXECUTION: Runs when DOM is loaded, sets up all interactions
*/

/**
 * 🚀 APPLICATION INITIALIZATION
 * Concept: "Start the interactive experience"
 * Execution: Waits for DOM, then initializes features
 */

class PortfolioApp {
    constructor() {
        this.isInitialized = false;
        this.activeSection = null;
        this.scrollAnimationElements = [];
        
        // Bind methods to maintain 'this' context
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.init = this.init.bind(this);
    }

    /**
     * 🎬 INITIALIZATION
     * Concept: "Set up all interactive features"
     * Execution: Called when DOM is ready
     */
    async init() {
        try {
            console.log('🚀 Portfolio App initializing...');
            
            // Wait for DOM to be ready
            await this.waitForDOM();
            
            // Initialize core features
            this.setupScrollAnimation();
            this.setupSmoothScrolling();
            this.setupActiveNavigation();
            this.setupThemeToggle();
            this.setupProgressIndicators();
            this.setupLoadingAnimations();
            this.setupAccessibilityEnhancements();
            
            // Mark as initialized
            this.isInitialized = true;
            console.log('✅ Portfolio App initialized successfully!');
            
            // Announce to screen readers
            this.announceToScreenReader('Portfolio application loaded and ready');
            
        } catch (error) {
            console.error('❌ Portfolio App initialization failed:', error);
        }
    }

    /**
     * ⏳ DOM READY UTILITY
     * Concept: "Wait for HTML to be parsed"
     * Execution: Promise resolves when DOM is ready
     */
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    /**
     * 🎭 SCROLL ANIMATION SYSTEM
     * Concept: "Animate elements as they come into view"
     * Execution: Uses Intersection Observer API
     */
    setupScrollAnimation() {
        // Find all elements that should animate on scroll
        this.scrollAnimationElements = DOM.selectAll('.scroll-animate, .timeline-item, .skills-table tr');
        
        if (this.scrollAnimationElements.length === 0) {
            console.log('No scroll animation elements found');
            return;
        }

        // Create Intersection Observer
        const observerOptions = {
            root: null, // Use viewport as root
            rootMargin: '0px 0px -100px 0px', // Trigger before element fully visible
            threshold: 0.1 // Trigger when 10% of element is visible
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animation elements
        this.scrollAnimationElements.forEach(element => {
            // Add initial animation class
            DOM.addClass(element, 'scroll-animate');
            this.scrollObserver.observe(element);
        });

        console.log(`📊 Set up scroll animations for ${this.scrollAnimationElements.length} elements`);
    }

    /**
     * ✨ ELEMENT ANIMATION
     * Concept: "Apply animation to individual element"
     * Execution: Adds CSS classes that trigger animations
     */
    animateElement(element) {
        // Add 'in-view' class to trigger CSS animation
        DOM.addClass(element, 'in-view');
        
        // Add staggered delay for table rows
        if (element.tagName === 'TR') {
            const rows = DOM.selectAll('tr');
            const index = Array.from(rows).indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }

        // Stop observing this element (animate only once)
        if (this.scrollObserver) {
            this.scrollObserver.unobserve(element);
        }
    }

    /**
     * 🧭 SMOOTH SCROLLING
     * Concept: "Navigate smoothly to page sections"
     * Execution: Intercepts navigation clicks and uses smooth scroll
     */
    setupSmoothScrolling() {
        const navLinks = DOM.selectAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            DOM.on(link, 'click', (event) => {
                event.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = DOM.byId(targetId);
                
                if (targetElement) {
                    this.scrollToElement(targetElement);
                    this.updateActiveNavigation(targetId);
                    
                    // Update URL without page jump
                    history.replaceState(null, null, `#${targetId}`);
                    
                    // Announce to screen readers
                    this.announceToScreenReader(`Navigated to ${targetId} section`);
                }
            });
        });

        console.log(`🧭 Set up smooth scrolling for ${navLinks.length} navigation links`);
    }

    /**
     * 📍 SCROLL TO ELEMENT
     * Concept: "Smooth scroll to specific element"
     * Execution: Uses modern scroll API with fallback
     */
    scrollToElement(element) {
        const headerHeight = 80; // Account for fixed header
        const elementTop = element.offsetTop - headerHeight;

        // Use modern scroll API if available
        if ('scrollTo' in window) {
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            window.scrollTo(0, elementTop);
        }
    }

    /**
     * 🎯 ACTIVE NAVIGATION
     * Concept: "Highlight current section in navigation"
     * Execution: Updates nav styles based on scroll position
     */
    setupActiveNavigation() {
        // Get all sections and nav links
        const sections = DOM.selectAll('section[id]');
        const navLinks = DOM.selectAll('nav a[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) {
            console.log('No sections or nav links found for active navigation');
            return;
        }

        // Set up scroll listener with throttling
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateActiveNavigation();
                    ticking = false;
                });
                ticking = true;
            }
        };

        DOM.on(window, 'scroll', scrollHandler);
        
        // Initial check
        this.updateActiveNavigation();

        console.log('🎯 Set up active navigation highlighting');
    }

    /**
     * 🔄 UPDATE ACTIVE NAVIGATION
     * Concept: "Find current section and highlight nav item"
     * Execution: Calculates which section is currently in view
     */
    updateActiveNavigation(forceSection = null) {
        if (forceSection) {
            this.setActiveNavItem(forceSection);
            return;
        }

        const sections = DOM.selectAll('section[id]');
        const scrollPosition = window.pageYOffset + 100; // Offset for header
        
        let currentSection = null;

        // Find which section we're currently in
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.id;
                break;
            }
        }

        if (currentSection && currentSection !== this.activeSection) {
            this.setActiveNavItem(currentSection);
            this.activeSection = currentSection;
        }
    }

    /**
     * 🎨 SET ACTIVE NAV ITEM
     * Concept: "Style the currently active navigation item"
     * Execution: Adds/removes CSS classes on nav links
     */
    setActiveNavItem(sectionId) {
        const navLinks = DOM.selectAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            DOM.removeClass(link, 'active');
            
            if (link.getAttribute('href') === `#${sectionId}`) {
                DOM.addClass(link, 'active');
            }
        });
    }

    /**
     * 🌙 THEME TOGGLE
     * Concept: "Allow users to switch between light/dark mode"
     * Execution: Toggle CSS classes and save preference
     */
    setupThemeToggle() {
        // Create theme toggle button
        const header = DOM.select('header');
        if (!header) return;

        const themeButton = document.createElement('button');
        themeButton.className = 'theme-toggle focus-ring';
        themeButton.innerHTML = '🌙';
        themeButton.setAttribute('aria-label', 'Toggle dark mode');
        themeButton.setAttribute('type', 'button');
        
        const headerContent = DOM.select('.header-content');
        if (headerContent) {
            headerContent.appendChild(themeButton);
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.setTheme(savedTheme);

        // Handle theme toggle
        DOM.on(themeButton, 'click', () => {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
            
            // Announce theme change
            this.announceToScreenReader(`Switched to ${newTheme} mode`);
        });

        console.log('🌙 Set up theme toggle functionality');
    }

    /**
     * 🎨 SET THEME
     * Concept: "Apply light or dark theme"
     * Execution: Updates CSS custom properties and saves preference
     */
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        const themeButton = DOM.select('.theme-toggle');
        if (themeButton) {
            themeButton.innerHTML = theme === 'light' ? '🌙' : '☀️';
            themeButton.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
        }

        // Update CSS custom properties if needed
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--bg-primary', '#111827');
            document.documentElement.style.setProperty('--bg-secondary', '#1f2937');
            document.documentElement.style.setProperty('--text-primary', '#f9fafb');
            document.documentElement.style.setProperty('--text-secondary', '#d1d5db');
        } else {
            document.documentElement.style.setProperty('--bg-primary', '#ffffff');
            document.documentElement.style.setProperty('--bg-secondary', '#f9fafb');
            document.documentElement.style.setProperty('--text-primary', '#111827');
            document.documentElement.style.setProperty('--text-secondary', '#6b7280');
        }
    }

    /**
     * 📊 PROGRESS INDICATORS
     * Concept: "Show learning progress visually"
     * Execution: Animate progress bars and counters
     */
    setupProgressIndicators() {
        const progressElements = DOM.selectAll('[data-progress]');
        
        progressElements.forEach(element => {
            const targetProgress = parseInt(DOM.getAttr(element, 'data-progress'), 10);
            if (!isNaN(targetProgress)) {
                this.animateProgress(element, targetProgress);
            }
        });

        console.log(`📊 Set up ${progressElements.length} progress indicators`);
    }

    /**
     * 📈 ANIMATE PROGRESS
     * Concept: "Smoothly fill progress bar"
     * Execution: Gradually increases width from 0 to target
     */
    animateProgress(element, targetProgress) {
        let currentProgress = 0;
        const increment = targetProgress / 50; // 50 steps for smooth animation
        const duration = 20; // 20ms between steps = 1 second total

        const progressInterval = setInterval(() => {
            currentProgress += increment;
            
            if (currentProgress >= targetProgress) {
                currentProgress = targetProgress;
                clearInterval(progressInterval);
            }

            element.style.width = `${currentProgress}%`;
            
            // Update text if element has text content
            const textElement = element.querySelector('.progress-text');
            if (textElement) {
                textElement.textContent = `${Math.round(currentProgress)}%`;
            }
        }, duration);
    }

    /**
     * ⚡ LOADING ANIMATIONS
     * Concept: "Show loading states for async operations"
     * Execution: Add loading classes and remove after delay
     */
    setupLoadingAnimations() {
        const loadingElements = DOM.selectAll('.loading');
        
        loadingElements.forEach((element, index) => {
            // Stagger loading animations
            setTimeout(() => {
                DOM.removeClass(element, 'loading');
                DOM.addClass(element, 'loaded');
            }, index * 200);
        });

        console.log(`⚡ Set up loading animations for ${loadingElements.length} elements`);
    }

    /**
     * ♿ ACCESSIBILITY ENHANCEMENTS
     * Concept: "Improve experience for assistive technology users"
     * Execution: Add ARIA live regions and keyboard navigation
     */
    setupAccessibilityEnhancements() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'visually-hidden';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        // Enhanced keyboard navigation
        DOM.on(document, 'keydown', (event) => {
            // Skip links with 'S' key
            if (event.key === 's' || event.key === 'S') {
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    const skipLink = DOM.select('.skip-link');
                    if (skipLink) {
                        skipLink.focus();
                    }
                }
            }
        });

        console.log('♿ Set up accessibility enhancements');
    }

    /**
     * 📢 SCREEN READER ANNOUNCEMENTS
     * Concept: "Announce changes to screen reader users"
     * Execution: Updates live region with announcement text
     */
    announceToScreenReader(message) {
        const liveRegion = DOM.byId('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    /**
     * 🔄 RESIZE HANDLING
     * Concept: "Respond to window size changes"
     * Execution: Recalculates layouts and positions
     */
    handleResize() {
        // Recalculate active navigation
        this.updateActiveNavigation();
        
        // Update any size-dependent calculations
        if (DOM.isMobile()) {
            document.body.classList.add('is-mobile');
        } else {
            document.body.classList.remove('is-mobile');
        }
    }

    /**
     * 🧹 CLEANUP
     * Concept: "Clean up event listeners and observers"
     * Execution: Removes all listeners to prevent memory leaks
     */
    destroy() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
        
        DOM.off(window, 'scroll', this.handleScroll);
        DOM.off(window, 'resize', this.handleResize);
        
        console.log('🧹 Portfolio App cleaned up');
    }
}

/**
 * 🚀 APPLICATION STARTUP
 * Concept: "Start the application when DOM is ready"
 * Execution: Creates app instance and initializes
 */

// Global app instance
let portfolioApp;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}

function startApp() {
    portfolioApp = new PortfolioApp();
    portfolioApp.init();
}

// Make app globally available for debugging
window.portfolioApp = portfolioApp;

/**
 * 🎯 PERFORMANCE MONITORING
 * Concept: "Track application performance"
 * Execution: Uses Performance API to measure load times
 */
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`⚡ Portfolio loaded in ${loadTime.toFixed(2)}ms`);
        
        // Report to analytics (if implemented)
        if (window.gtag) {
            gtag('event', 'page_load_time', {
                value: Math.round(loadTime)
            });
        }
    }
});
