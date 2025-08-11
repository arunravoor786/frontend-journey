// Evolution of Asynchronous JavaScript

console.log('=== Day 4: Advanced JavaScript & APIs ===');

// 1. OLD WAY: Callback Hell (avoid this!)
function oldCallbackExample() {
    console.log('--- Callback Hell Example ---');
    
    setTimeout(() => {
        console.log('Step 1 completed');
        setTimeout(() => {
            console.log('Step 2 completed');
            setTimeout(() => {
                console.log('Step 3 completed');
                // This gets messy very quickly!
            }, 1000);
        }, 1000);
    }, 1000);
}

// 2. BETTER WAY: Promises
function promiseExample() {
    console.log('--- Promise Example ---');
    
    const step1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Promise Step 1 completed');
            resolve('Step 1 data');
        }, 1000);
    });
    
    const step2 = (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Promise Step 2 completed with:', data);
                resolve('Step 2 data');
            }, 1000);
        });
    };
    
    const step3 = (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Promise Step 3 completed with:', data);
                resolve('All steps completed!');
            }, 1000);
        });
    };
    
    // Promise chaining
    step1
        .then(step2)
        .then(step3)
        .then(finalResult => {
            console.log('Final result:', finalResult);
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

// 3. MODERN WAY: Async/Await (Best Practice!)
async function asyncAwaitExample() {
    console.log('--- Async/Await Example ---');
    
    try {
        const step1Result = await createDelay('Async Step 1', 1000);
        console.log(step1Result);
        
        const step2Result = await createDelay('Async Step 2', 1000);
        console.log(step2Result);
        
        const step3Result = await createDelay('Async Step 3', 1000);
        console.log(step3Result);
        
        console.log('All async steps completed successfully!');
    } catch (error) {
        console.error('Error in async operation:', error);
    }
}

// Helper function that returns a Promise
function createDelay(message, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${message} completed after ${delay}ms`);
        }, delay);
    });
}

// Promise States and Methods
const PromiseExamples = {
    // Promise.all - wait for all promises to complete
    async demonstratePromiseAll() {
        console.log('--- Promise.all Example ---');
        
        try {
            const promises = [
                createDelay('Task A', 1000),
                createDelay('Task B', 1500),
                createDelay('Task C', 800)
            ];
            
            // Wait for all promises to resolve
            const results = await Promise.all(promises);
            console.log('All tasks completed:', results);
        } catch (error) {
            console.error('One or more tasks failed:', error);
        }
    },
    
    // Promise.race - get result from first resolved promise
    async demonstratePromiseRace() {
        console.log('--- Promise.race Example ---');
        
        try {
            const promises = [
                createDelay('Slow task', 2000),
                createDelay('Fast task', 500),
                createDelay('Medium task', 1000)
            ];
            
            const winner = await Promise.race(promises);
            console.log('First task completed:', winner);
        } catch (error) {
            console.error('First task failed:', error);
        }
    },
    
    // Promise.allSettled - wait for all promises (success or failure)
    async demonstratePromiseAllSettled() {
        console.log('--- Promise.allSettled Example ---');
        
        const promises = [
            createDelay('Success task', 1000),
            Promise.reject(new Error('This task will fail')),
            createDelay('Another success', 800)
        ];
        
        const results = await Promise.allSettled(promises);
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Task ${index + 1} succeeded:`, result.value);
            } else {
                console.log(`Task ${index + 1} failed:`, result.reason.message);
            }
        });
    }
};

// Initialize async examples (uncomment to test)
// promiseExample();
// asyncAwaitExample();
// PromiseExamples.demonstratePromiseAll();

// Practical Async Utilities
const AsyncUtils = {
    // Delay utility
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // Timeout wrapper for promises
    withTimeout: (promise, timeoutMs) => {
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
        );
        return Promise.race([promise, timeout]);
    },
    
    // Retry logic for failed operations
    async retry(operation, maxAttempts = 3, delayMs = 1000) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await operation();
            } catch (error) {
                console.log(`Attempt ${attempt} failed:`, error.message);
                
                if (attempt === maxAttempts) {
                    throw new Error(`Operation failed after ${maxAttempts} attempts`);
                }
                
                await this.delay(delayMs * attempt); // Exponential backoff
            }
        }
    },
    
    // Debounce async operations
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            return new Promise(resolve => {
                timeoutId = setTimeout(async () => {
                    resolve(await func(...args));
                }, delay);
            });
        };
    },
    
    // Throttle async operations
    throttle(func, delay) {
        let lastExecution = 0;
        return async (...args) => {
            const now = Date.now();
            if (now - lastExecution >= delay) {
                lastExecution = now;
                return await func(...args);
            }
        };
    }
};

// Export for use in other files
window.AsyncUtils = AsyncUtils;
