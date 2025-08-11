// DOM Selection Methods
const DOMUtils = {
    // Modern selector methods (preferred)
    byId: (id) => document.getElementById(id),
    byClass: (className) => document.getElementsByClassName(className),
    byTag: (tagName) => document.getElementsByTagName(tagName),
    querySelector: (selector) => document.querySelector(selector),
    querySelectorAll: (selector) => document.querySelectorAll(selector),
    
    // Content manipulation
    setContent: (element, content, useHTML = false) => {
        if (useHTML) {
            element.innerHTML = content;
        } else {
            element.textContent = content;
        }
    },
    
    // Style manipulation
    setStyles: (element, styles) => {
        Object.assign(element.style, styles);
    },
    
    // Class manipulation
    addClass: (element, className) => element.classList.add(className),
    removeClass: (element, className) => element.classList.remove(className),
    toggleClass: (element, className) => element.classList.toggle(className),
    hasClass: (element, className) => element.classList.contains(className),
    
    // Element creation
    createElement: (tag, className = '', content = '') => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        return element;
    },
    
    // Event handling
    addEvent: (element, event, handler) => {
        element.addEventListener(event, handler);
    },
    
    // Attribute manipulation
    setAttribute: (element, attr, value) => element.setAttribute(attr, value),
    getAttribute: (element, attr) => element.getAttribute(attr)
};

// Make it globally available
window.DOM = DOMUtils;

// Portfolio Enhancement Functions
const Portfolio = {
    // Initialize all interactive features
    init() {
        console.log('🚀 Initializing Portfolio JavaScript...');
        this.updateHeaderWithCurrentTime();
        this.createSkillBars();
        this.addThemeToggle();
        this.initSmoothScrolling();
        this.addInteractiveElements();
        console.log('✅ Portfolio JavaScript loaded successfully!');
    },

    // Update header with current time
    updateHeaderWithCurrentTime() {
        const header = DOM.querySelector('header h1');
        if (header) {
            const originalText = header.textContent;
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            
            DOM.setContent(header, `${originalText} - Last updated: ${timeString}`);
        }
    },

    // Create animated skill progress bars
    createSkillBars() {
        const skillsSection = DOM.byId('skills');
        if (!skillsSection) return;

        const skills = [
            { name: 'HTML5', level: 90 },
            { name: 'CSS3', level: 85 },
            { name: 'JavaScript', level: 60 }, // Growing!
            { name: 'Responsive Design', level: 80 },
            { name: 'Problem Solving', level: 75 }
        ];

        const skillBarsContainer = DOM.createElement('div', 'skill-bars-container');
        
        skills.forEach(skill => {
            const skillBar = this.createSkillBar(skill.name, skill.level);
            skillBarsContainer.appendChild(skillBar);
        });

        skillsSection.appendChild(skillBarsContainer);
    },

    createSkillBar(skillName, level) {
        const skillBar = DOM.createElement('div', 'skill-bar');
        skillBar.innerHTML = `
            <div class="skill-info">
                <span class="skill-name">${skillName}</span>
                <span class="skill-percentage">${level}%</span>
            </div>
            <div class="skill-progress-bg">
                <div class="skill-progress" data-progress="${level}"></div>
            </div>
        `;
        return skillBar;
    },

    // Add theme toggle functionality
    addThemeToggle() {
        const header = DOM.querySelector('header');
        if (!header) return;

        const themeToggle = DOM.createElement('button', 'theme-toggle', '🌙 Dark Mode');
        DOM.addEvent(themeToggle, 'click', this.toggleTheme);
        
        header.appendChild(themeToggle);
    },

    toggleTheme() {
        const body = document.body;
        const toggleBtn = DOM.querySelector('.theme-toggle');
        
        if (DOM.hasClass(body, 'dark-theme')) {
            DOM.removeClass(body, 'dark-theme');
            DOM.setContent(toggleBtn, '🌙 Dark Mode');
        } else {
            DOM.addClass(body, 'dark-theme');
            DOM.setContent(toggleBtn, '☀️ Light Mode');
        }
        
        // Save preference to localStorage
        localStorage.setItem('theme', body.className);
    },

    // Initialize smooth scrolling for navigation
    initSmoothScrolling() {
        const navLinks = DOM.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            DOM.addEvent(link, 'click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = DOM.byId(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add active class to clicked link
                    navLinks.forEach(l => DOM.removeClass(l, 'active'));
                    DOM.addClass(link, 'active');
                }
            });
        });
    },

    // Add interactive elements to sections
    addInteractiveElements() {
        this.addSectionHoverEffects();
        this.addClickToExpand();
        this.loadThemePreference();
    },

    addSectionHoverEffects() {
        const sections = DOM.querySelectorAll('section');
        
        sections.forEach(section => {
            DOM.addEvent(section, 'mouseenter', () => {
                DOM.addClass(section, 'section-hover');
            });
            
            DOM.addEvent(section, 'mouseleave', () => {
                DOM.removeClass(section, 'section-hover');
            });
        });
    },

    addClickToExpand() {
        const aboutSection = DOM.byId('about');
        if (aboutSection) {
            const expandButton = DOM.createElement('button', 'expand-btn', '📖 Read More');
            DOM.addEvent(expandButton, 'click', () => {
                DOM.toggleClass(aboutSection, 'expanded');
                const isExpanded = DOM.hasClass(aboutSection, 'expanded');
                DOM.setContent(expandButton, isExpanded ? '📕 Read Less' : '📖 Read More');
            });
            
            aboutSection.appendChild(expandButton);
        }
    },

    loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && savedTheme.includes('dark-theme')) {
            DOM.addClass(document.body, 'dark-theme');
            const toggleBtn = DOM.querySelector('.theme-toggle');
            if (toggleBtn) {
                DOM.setContent(toggleBtn, '☀️ Light Mode');
            }
        }
    }
};

// Initialize when DOM is fully loaded
DOM.addEvent(document, 'DOMContentLoaded', () => {
    Portfolio.init();
});
