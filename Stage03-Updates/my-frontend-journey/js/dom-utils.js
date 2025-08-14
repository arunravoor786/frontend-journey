// js/dom-utils.js - DOM Utilities and Helpers
/*
🎯 PURPOSE: Simplify DOM operations and provide utilities
⚡ EXECUTION: JavaScript functions that interact with browser DOM API
*/

/**
 * 🔍 ELEMENT SELECTION UTILITIES
 * Concept: "Find elements in the DOM easily"
 * Execution: Uses browser's querySelector API under the hood
 */

const DOM = {
    // Select single element
    select: (selector) => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    },

    // Select multiple elements
    selectAll: (selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.warn(`No elements found: ${selector}`);
        }
        return Array.from(elements); // Convert NodeList to Array
    },

    // Select by ID (optimized)
    byId: (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element not found with ID: ${id}`);
        }
        return element;
    },

    /**
     * 🎭 CONTENT MANIPULATION
     * Concept: "Change what users see"
     * Execution: Modifies DOM element properties
     */

    // Set text content safely
    setText: (element, text) => {
        if (element && typeof text === 'string') {
            element.textContent = text; // Safe from XSS attacks
            return true;
        }
        console.error('Invalid element or text provided');
        return false;
    },

    // Set HTML content (use carefully)
    setHTML: (element, html) => {
        if (element && typeof html === 'string') {
            element.innerHTML = html; // Can be dangerous with user input
            return true;
        }
        console.error('Invalid element or HTML provided');
        return false;
    },

    // Get computed styles
    getStyles: (element) => {
        if (element) {
            return window.getComputedStyle(element);
        }
        return null;
    },

    /**
     * 🎨 CLASS MANIPULATION
     * Concept: "Add/remove CSS classes dynamically"
     * Execution: Uses classList API for efficient class management
     */

    addClass: (element, className) => {
        if (element && className) {
            element.classList.add(className);
            return true;
        }
        return false;
    },

    removeClass: (element, className) => {
        if (element && className) {
            element.classList.remove(className);
            return true;
        }
        return false;
    },

    toggleClass: (element, className) => {
        if (element && className) {
            return element.classList.toggle(className);
        }
        return false;
    },

    hasClass: (element, className) => {
        if (element && className) {
            return element.classList.contains(className);
        }
        return false;
    },

    /**
     * ⚡ EVENT HANDLING
     * Concept: "Respond to user interactions"
     * Execution: Registers event listeners with the browser
     */

    on: (element, event, handler, options = {}) => {
        if (element && event && typeof handler === 'function') {
            element.addEventListener(event, handler, options);
            return true;
        }
        console.error('Invalid parameters for event listener');
        return false;
    },

    off: (element, event, handler, options = {}) => {
        if (element && event && typeof handler === 'function') {
            element.removeEventListener(event, handler, options);
            return true;
        }
        return false;
    },

    // One-time event listener
    once: (element, event, handler) => {
        if (element && event && typeof handler === 'function') {
            element.addEventListener(event, handler, { once: true });
            return true;
        }
        return false;
    },

    /**
     * 🎯 ATTRIBUTE MANAGEMENT
     * Concept: "Modify element attributes dynamically"
     * Execution: Uses browser's attribute API
     */

    setAttr: (element, attr, value) => {
        if (element && attr) {
            element.setAttribute(attr, value);
            return true;
        }
        return false;
    },

    getAttr: (element, attr) => {
        if (element && attr) {
            return element.getAttribute(attr);
        }
        return null;
    },

    removeAttr: (element, attr) => {
        if (element && attr) {
            element.removeAttribute(attr);
            return true;
        }
        return false;
    },

    /**
     * 📏 MEASUREMENT UTILITIES
     * Concept: "Get element dimensions and position"
     * Execution: Uses browser's layout calculation APIs
     */

    getRect: (element) => {
        if (element) {
            return element.getBoundingClientRect();
        }
        return null;
    },

    isInViewport: (element, threshold = 0) => {
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        return (
            rect.top >= -threshold &&
            rect.left >= -threshold &&
            rect.bottom <= windowHeight + threshold &&
            rect.right <= windowWidth + threshold
        );
    },

    /**
     * 🎬 ANIMATION UTILITIES
     * Concept: "Smooth DOM animations"
     * Execution: Uses CSS transitions triggered by JavaScript
     */

    fadeIn: (element, duration = 300) => {
        if (!element) return Promise.reject('No element provided');

        return new Promise((resolve) => {
            element.style.opacity = '0';
            element.style.display = 'block';
            element.style.transition = `opacity ${duration}ms ease-out`;

            // Force browser to calculate styles
            element.offsetHeight;

            element.style.opacity = '1';

            setTimeout(() => {
                element.style.transition = '';
                resolve(element);
            }, duration);
        });
    },

    fadeOut: (element, duration = 300) => {
        if (!element) return Promise.reject('No element provided');

        return new Promise((resolve) => {
            element.style.opacity = '1';
            element.style.transition = `opacity ${duration}ms ease-out`;

            element.offsetHeight; // Force recalculation

            element.style.opacity = '0';

            setTimeout(() => {
                element.style.display = 'none';
                element.style.transition = '';
                resolve(element);
            }, duration);
        });
    },

    /**
     * 📱 RESPONSIVE UTILITIES
     * Concept: "Handle different screen sizes"
     * Execution: Uses matchMedia API to detect screen sizes
     */

    isMobile: () => {
        return window.matchMedia('(max-width: 768px)').matches;
    },

    isTablet: () => {
        return window.matchMedia('(max-width: 1024px) and (min-width: 769px)').matches;
    },

    isDesktop: () => {
        return window.matchMedia('(min-width: 1025px)').matches;
    },

    onResize: (callback, debounceMs = 250) => {
        if (typeof callback !== 'function') return;

        let timeoutId;
        const debouncedCallback = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(callback, debounceMs);
        };

        window.addEventListener('resize', debouncedCallback);
        return () => window.removeEventListener('resize', debouncedCallback);
    }
};

// 🌐 GLOBAL AVAILABILITY
// Make DOM utilities available globally
window.DOM = DOM;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DOM;
}
