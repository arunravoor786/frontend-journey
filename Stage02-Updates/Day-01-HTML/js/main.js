// Modern Variable Declarations (ES6+)
'use strict'; // Enable strict mode for better error handling

// const - cannot be reassigned (use by default)
const siteName = 'My Portfolio';
const currentYear = new Date().getFullYear();

// let - can be reassigned (use when needed)
let userName = 'Frontend Developer in Training';
let visitCount = 0;

// Template Literals (ES6) - much better than string concatenation
const welcomeMessage = `Welcome to ${siteName}! 
Built in ${currentYear} by ${userName}`;

console.log(welcomeMessage);

// Data Types in JavaScript
const userInfo = {
    name: 'Arunkumar R.M',
    age: 32,
    skills: ['HTML5', 'CSS3', 'JavaScript'],
    isLearning: true,
    currentStage: 'Day 3 - JavaScript Fundamentals'
};

console.log('User Info:', userInfo);

// Function Declaration (hoisted - can be called before definition)
function greetUser(name) {
    return `Hello, ${name}! Welcome to Day 3 of your learning journey! 🚀`;
}

// Function Expression (not hoisted)
const calculateLearningProgress = function(daysCompleted, totalDays) {
    const percentage = (daysCompleted / totalDays) * 100;
    return Math.round(percentage);
};

// Arrow Functions (ES6+) - concise syntax
const isSkillLearned = skill => userInfo.skills.includes(skill);
const addSkill = (skill) => {
    if (!isSkillLearned(skill)) {
        userInfo.skills.push(skill);
        return `✅ ${skill} added to your skills!`;
    }
    return `⚡ You already know ${skill}!`;
};

// Multi-line arrow function
const updateProgress = (day) => {
    visitCount++;
    const progress = calculateLearningProgress(day, 30); // 30-day journey
    
    console.log(`Day ${day} completed! Overall progress: ${progress}%`);
    return progress;
};

// Test your functions
console.log(greetUser(userInfo.name));
console.log(addSkill('DOM Manipulation'));
console.log(updateProgress(3));
