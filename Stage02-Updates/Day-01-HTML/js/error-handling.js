// Advanced Error Handling in JavaScript

// Custom Error Classes
class APIError extends Error {
    constructor(message, statusCode, endpoint) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
        this.endpoint = endpoint;
        this.timestamp = new Date().toISOString();
    }
}

class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, originalError) {
        super(message);
        this.name = 'NetworkError';
        this.originalError = originalError;
    }
}

// Error Handler Class
class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.setupGlobalErrorHandlers();
    }
    
    // Setup global error handling
    setupGlobalErrorHandlers() {
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.logError(event.reason, 'Unhandled Promise');
            event.preventDefault(); // Prevent browser console error
        });
        
        // Handle general JavaScript errors
        window.addEventListener('error', (event) => {
            console.error('JavaScript error:', event.error);
            this.logError(event.error, 'JavaScript Error');
        });
    }
    
    // Log errors for debugging
    logError(error, context = 'Unknown') {
        const errorInfo = {
            message: error.message || error,
            name: error.name || 'Error',
            stack: error.stack,
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.errorLog.push(errorInfo);
        
        // In production, you would send this to a logging service
        console.log('Error logged:', errorInfo);
        
        // Show user-friendly error message
        this.showUserError(error);
    }
    
    // Display user-friendly error messages
    showUserError(error) {
        let userMessage = 'An unexpected error occurred. Please try again.';
        
        if (error instanceof APIError) {
            userMessage = `Server error: ${error.message}`;
        } else if (error instanceof ValidationError) {
            userMessage = `Validation error: ${error.message}`;
        } else if (error instanceof NetworkError) {
            userMessage = 'Network connection problem. Please check your internet connection.';
        }
        
        this.displayNotification(userMessage, 'error');
    }
    
    // Display notification to user
    displayNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.error-notification');
        if (existing) existing.remove();
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `error-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').onclick = () => {
            notification.remove();
        };
    }
    
    // Wrapped async function with error handling
    async safeAsync(asyncFunction, fallbackValue = null) {
        try {
            return await asyncFunction();
        } catch (error) {
            this.logError(error, 'SafeAsync');
            return fallbackValue;
        }
    }
    
    // Validation helpers
    validateRequired(value, fieldName) {
        if (!value || value.toString().trim() === '') {
            throw new ValidationError(`${fieldName} is required`, fieldName);
        }
        return true;
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError('Please enter a valid email address', 'email');
        }
        return true;
    }
    
    validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            throw new ValidationError('Please enter a valid URL', 'url');
        }
    }
    
    // Get error summary for debugging
    getErrorSummary() {
        return {
            totalErrors: this.errorLog.length,
            recentErrors: this.errorLog.slice(-5),
            errorTypes: this.errorLog.reduce((acc, error) => {
                acc[error.name] = (acc[error.name] || 0) + 1;
                return acc;
            }, {})
        };
    }
}

// Safe execution wrapper
async function safeExecute(operation, fallback = null) {
    try {
        return await operation();
    } catch (error) {
        console.error('Operation failed safely:', error);
        return fallback;
    }
}

// Initialize global error handler
const globalErrorHandler = new ErrorHandler();

// Export for global use
window.ErrorHandler = ErrorHandler;
window.APIError = APIError;
window.ValidationError = ValidationError;
window.NetworkError = NetworkError;
window.safeExecute = safeExecute;
window.errorHandler = globalErrorHandler;
