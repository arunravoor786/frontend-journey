// src/App.jsx - Your first React component
import { useState, useEffect } from 'react';
import './App.css';

/*
🎯 PURPOSE: Main application component
⚡ EXECUTION: React renders this component when app loads
*/

function App() {
    // 🎭 STATE MANAGEMENT
    // Concept: Store component data that can change
    // Execution: useState hook creates reactive state
    const [theme, setTheme] = useState('light');
     
    const [activeSection, setActiveSection] = useState('about');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    // 👤 USER DATA
    // Concept: Static data that describes the user
    // Execution: JavaScript object available to component
    const userData = {
        name: 'Arunkumar R.M',
        title: 'Frontend Developer in Training',
        age: 32,
        location: 'India',
        email: 'arunkumar@gmail.com.',
        currentStage: 'Day 3 - React Fundamentals'
    };

    // 🕐 TIME UPDATES
    // Concept: Update current time every second
    // Execution: useEffect runs after component mounts
    useEffect(() => {
        console.log('⚡ useEffect: Setting up time interval');
        
        const timeInterval = setInterval(() => {
            const newTime = new Date().toLocaleTimeString();
            console.log('🕐 Updating time to:', newTime);
            setCurrentTime(newTime);
        }, 1000);

        // 🧹 CLEANUP FUNCTION
        // Concept: Clean up resources when component unmounts
        // Execution: React calls this when component is removed
        return () => {
            console.log('🧹 useEffect cleanup: Clearing time interval');
            clearInterval(timeInterval);
        };
    }, []); // Empty dependency array = run once on mount

    // 🌙 THEME TOGGLE HANDLER
    // Concept: Handle user interaction
    // Execution: Function called when button clicked
    const handleThemeToggle = () => {
        console.log('🎨 Theme toggle clicked, current theme:', theme);
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        //[{row1}, {row2}]'

        setRow((row)=>{
            return !row;
        })
        setRow((row)=>{
            return [{row2}, ...row]

        })
        setRow([{row2}, ...row])
        console.log('🎨 Theme changed to:', newTheme);
    };

    // 🧭 NAVIGATION HANDLER  
    // Concept: Handle section navigation
    // Execution: Function called when nav item clicked
    const handleSectionChange = (sectionName) => {
        console.log('🧭 Navigation to section:', sectionName);
        setActiveSection(sectionName);
    };

    // 📊 RENDER COMPONENT
    // Concept: Return JSX that describes UI
    // Execution: React calls this function to get component output
    return (
        <div className={`app ${theme}`} data-theme={theme}>
            {/* 🏠 HEADER SECTION */}
            <Header 
                userData={userData}
                theme={theme}
                currentTime={currentTime}
                onThemeToggle={handleThemeToggle}
            />

            {/* 🧭 NAVIGATION SECTION */}
            <Navigation 
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
            />

            {/* 📄 MAIN CONTENT */}
            <main>
                <AboutSection userData={userData} />
                <TimelineSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
            </main>

            {/* 🦶 FOOTER SECTION */}
            <Footer userData={userData} currentTime={currentTime} />
        </div>
    );
}

// 🏠 HEADER COMPONENT
// Concept: Reusable header with props
// Execution: Receives data via props, renders JSX
function Header({ userData, theme, currentTime, onThemeToggle }) {
    console.log('🏠 Header rendering with props:', { userData, theme, currentTime });

    return (
        <header role="banner" className="header">
            <div className="header-content">
                <h1>{userData.name}</h1>
                <p className="tagline">
                    <strong>{userData.title}</strong>
                </p>
                <address className="contact-info">
                    📍 {userData.location} | 🎂 {userData.age} years | 
                    📧 <a href={`mailto:${userData.email}`}>{userData.email}</a>
                </address>
                <p className="current-status">
                    Current Stage: <mark>{userData.currentStage}</mark> | 
                    Last updated: <time>{currentTime}</time>
                </p>
                <button 
                    className="theme-toggle"
                    onClick={onThemeToggle}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    );
}

// 🧭 NAVIGATION COMPONENT
// Concept: Navigation with active state
// Execution: Maps over nav items, conditionally applies active class
function Navigation({ activeSection, onSectionChange }) {
    const navItems = [
        { id: 'about', label: 'About My Journey' },
        { id: 'timeline', label: '5-Day Timeline' },
        { id: 'skills', label: 'Learning Progress' },
        { id: 'projects', label: 'Portfolio Projects' },
        { id: 'contact', label: 'Connect With Me' }
    ];

    console.log('🧭 Navigation rendering, active section:', activeSection);

    return (
        <nav role="navigation" aria-label="Main navigation">
            <ul className="nav-list">
                {navItems.map(item => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={activeSection === item.id ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                onSectionChange(item.id);
                            }}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// 👤 ABOUT SECTION COMPONENT
// Concept: Section component with user data
// Execution: Displays user information using props
function AboutSection({ userData }) {
    return (
        <section id="about" aria-labelledby="about-heading">
            <header>
                <h2 id="about-heading">About My Learning Journey</h2>
            </header>
            
            <div className="about-content">
                <figure className="profile-figure">
                    <img 
                        src="/images/profile-photo.jpg"
                        alt={`${userData.name} Ready to learn frontend development`}
                        width="200"
                        height="200"
                        loading="lazy"
                    />
                    <figcaption>{userData.name} - {userData.currentStage}</figcaption>
                </figure>
                
                <div className="about-text">
                    <p>
                        Hello! I'm <strong>{userData.name}</strong>,  
                        aspiring frontend developer from {userData.location}. Today marks an 
                        exciting milestone in my intensive <strong>5-day journey</strong> to 
                        master modern web development.
                    </p>
                    
                    <blockquote>
                        <p>"Every expert was once a beginner. Every pro was once an amateur. Every icon was once an unknown."</p>
                        <footer>— <cite>Robin Sharma</cite></footer>
                    </blockquote>
                    
                    <p>
                        I'm following a structured learning path that will take me from 
                        <abbr title="HyperText Markup Language version 5">HTML5</abbr> fundamentals 
                        to production-ready <abbr title="React JavaScript Library">React</abbr> applications.
                    </p>
                </div>
            </div>
        </section>
    );
}

// 📅 TIMELINE SECTION COMPONENT
// Concept: Learning timeline display
// Execution: Maps over timeline data to create list
function TimelineSection() {
    const timelineData = [
        {
            day: 1,
            date: '2025-08-16',
            title: 'HTML5 Foundations',
            status: 'completed',
            topics: [
                'Semantic HTML structure and accessibility',
                'Forms, tables, and interactive elements', 
                'SEO optimization and meta tags',
                'Portfolio foundation'
            ]
        },
        {
            day: 2,
            date: '2025-08-17', 
            title: 'CSS3 + JavaScript Foundations',
            status: 'completed',
            topics: [
                'Responsive design with Flexbox and Grid',
                'CSS animations and modern features',
                'JavaScript ES6+ fundamentals',
                'DOM manipulation and event handling'
            ]
        },
        {
            day: 3,
            date: '2025-08-18',
            title: 'React Fundamentals',
            status: 'current',
            topics: [
                'Component-based architecture',
                'JSX, Props, and State management',
                'Hooks (useState, useEffect, useContext)',
                'Convert HTML to React components'
            ]
        },
        {
            day: 4,
            date: '2025-08-19',
            title: 'Advanced React + Performance',
            status: 'upcoming',
            topics: [
                'All React hooks (useReducer, useMemo, useCallback)',
                'Custom hooks and reusable logic',
                'Context API and global state',
                'Performance optimization techniques'
            ]
        },
        {
            day: 5,
            date: '2025-08-20',
            title: 'Production Ready Stack',
            status: 'future',
            topics: [
                'Redux Toolkit for enterprise state management',
                'Material UI for professional design',
                'React Router for multi-page navigation',
                'Testing, build optimization, and deployment'
            ]
        }
    ];

    return (
        <section id="timeline" aria-labelledby="timeline-heading">
            <header>
                <h2 id="timeline-heading">5-Day Intensive Learning Timeline</h2>
                <p>My structured path from HTML beginner to React developer</p>
            </header>
            
            <ol className="timeline-list">
                {timelineData.map(item => (
                    <TimelineItem key={item.day} {...item} />
                ))}
            </ol>
        </section>
    );
}

// 📅 TIMELINE ITEM COMPONENT
// Concept: Individual timeline entry
// Execution: Reusable component for each day
function TimelineItem({ day, date, title, status, topics }) {
    const statusLabels = {
        completed: '✅ Completed',
        current: '⚡ In Progress', 
        upcoming: '🎯 Tomorrow',
        future: '🚀 Future'
    };

    const statusEmojis = {
        completed: '✅',
        current: '⚡',
        upcoming: '🎯', 
        future: '🚀'
    };

    return (
        <li className={`timeline-item ${status}`}>
            <time dateTime={date}>Day {day} ({new Date(date).toLocaleDateString()})</time>
            <h3>{title}</h3>
            <p className="status">
                <strong>Status: {statusLabels[status]}</strong>
            </p>
            <ul>
                {topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                ))}
            </ul>
        </li>
    );
}

// 🎯 SKILLS SECTION COMPONENT (Simplified for now)
// Concept: Display learning progress
// Execution: Static component, will add interactivity later
/*function SkillsSection() {
    return (
        <section id="skills" aria-labelledby="skills-heading">
            <header>
                <h2 id="skills-heading">Current Learning Progress</h2>
                <p>Real-time tracking of my skill development</p>
            </header>
            <p>Interactive skills display coming in next session!</p>
        </section>
    );
}*/

// Replace the SkillsSection component with this enhanced version

// 🎯 SKILLS SECTION WITH STATE
// Concept: Interactive component with internal state
// Execution: useState manages skills data and interactions
function SkillsSection() {
    // 📊 SKILLS STATE
    // Concept: Array of skills with progress levels
    // Execution: useState creates reactive skills array
    const [skills, setSkills] = useState([
        { id: 1, name: 'HTML5', level: 90, category: 'frontend', status: 'mastered' },
        { id: 2, name: 'CSS3', level: 85, category: 'frontend', status: 'mastered' },
        { id: 3, name: 'JavaScript', level: 80, category: 'frontend', status: 'mastered' },
        { id: 4, name: 'React', level: 30, category: 'frontend', status: 'learning' },
        { id: 5, name: 'Node.js', level: 10, category: 'backend', status: 'planned' }
    ]);

    // 🔍 FILTER STATE
    // Concept: Track current filter selection
    // Execution: useState manages which filter is active
    const [activeFilter, setActiveFilter] = useState('all');

    // 📈 PROGRESS STATE
    // Concept: Track if progress bars are animated
    // Execution: useState controls animation state
    const [isAnimated, setIsAnimated] = useState(false);

    // ⚡ ANIMATE PROGRESS BARS
    // Concept: Trigger progress bar animations
    // Execution: useEffect runs animation after component mounts
    useEffect(() => {
        console.log('🎭 SkillsSection mounted, starting animations');
        const timer = setTimeout(() => {
            setIsAnimated(true);
            console.log('📊 Progress bars animated');
        }, 500);

        return () => {
            console.log('🧹 SkillsSection cleanup');
            clearTimeout(timer);
        };
    }, []); // Empty dependency array = run once

    // 🔍 FILTER SKILLS
    // Concept: Calculate filtered skills based on active filter
    // Execution: Runs every time skills or activeFilter changes
    const filteredSkills = skills.filter(skill => {
        if (activeFilter === 'all') return true;
        return skill.category === activeFilter;
    });

    console.log('🔍 Filtered skills:', filteredSkills, 'Filter:', activeFilter);

    // 📊 HANDLE FILTER CHANGE
    // Concept: Update filter when user clicks filter button
    // Execution: Event handler that updates state
    const handleFilterChange = (filter) => {
        console.log('🔄 Filter changed from', activeFilter, 'to', filter);
        setActiveFilter(filter);
    };

    // 📈 HANDLE SKILL UPDATE
    // Concept: Allow updating skill progress levels
    // Execution: Finds skill by id and updates its level
    const handleSkillUpdate = (skillId, newLevel) => {
        console.log('📈 Updating skill', skillId, 'to level', newLevel);
        
        setSkills(prevSkills => 
            prevSkills.map(skill => 
                skill.id === skillId 
                    ? { ...skill, level: newLevel }
                    : skill
            )
        );
    };

    return (
        <section id="skills" aria-labelledby="skills-heading">
            <header>
                <h2 id="skills-heading">Current Learning Progress</h2>
                <p>Real-time tracking of my skill development</p>
            </header>
            
            {/* 🔍 FILTER BUTTONS */}
            <SkillsFilter 
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
            />
            
            {/* 📊 SKILLS DISPLAY */}
            <SkillsList 
                skills={filteredSkills}
                isAnimated={isAnimated}
                onSkillUpdate={handleSkillUpdate}
            />
            
            {/* 📈 PROGRESS SUMMARY */}
            <SkillsSummary skills={skills} />
        </section>
    );
}

// 🔍 SKILLS FILTER COMPONENT
// Concept: Reusable filter buttons
// Execution: Maps over filter options, handles clicks
function SkillsFilter({ activeFilter, onFilterChange }) {
    const filterOptions = [
        { value: 'all', label: 'All Skills', emoji: '🎯' },
        { value: 'frontend', label: 'Frontend', emoji: '💻' },
        { value: 'backend', label: 'Backend', emoji: '🔧' }
    ];

    console.log('🔍 SkillsFilter rendering, active:', activeFilter);

    return (
        <div className="skills-filter">
            {filterOptions.map(option => (
                <button
                    key={option.value}
                    className={`filter-btn ${activeFilter === option.value ? 'active' : ''}`}
                    onClick={() => onFilterChange(option.value)}
                >
                    <span className="filter-emoji">{option.emoji}</span>
                    {option.label}
                </button>
            ))}
        </div>
    );
}

// 📊 SKILLS LIST COMPONENT
// Concept: Display list of skills with progress bars
// Execution: Maps over skills array, renders SkillItem components
function SkillsList({ skills, isAnimated, onSkillUpdate }) {
    console.log('📊 SkillsList rendering', skills.length, 'skills, animated:', isAnimated);

    if (skills.length === 0) {
        return (
            <div className="skills-empty">
                <p>No skills found for this filter.</p>
            </div>
        );
    }

    return (
        <div className="skills-list">
            {skills.map(skill => (
                <SkillItem
                    key={skill.id}
                    skill={skill}
                    isAnimated={isAnimated}
                    onUpdate={onSkillUpdate}
                />
            ))}
        </div>
    );
}

// 🎯 SKILL ITEM COMPONENT
// Concept: Individual skill display with progress bar
// Execution: Shows skill name, level, and interactive progress bar
function SkillItem({ skill, isAnimated, onUpdate }) {
    // 🎨 STATUS COLORS
    // Concept: Color code skills by status
    // Execution: Object maps status to CSS class
    const statusColors = {
        mastered: 'status-mastered',
        learning: 'status-learning', 
        planned: 'status-planned'
    };

    // 📊 HANDLE LEVEL CHANGE
    // Concept: Allow adjusting skill level
    // Execution: Event handler for range input
    const handleLevelChange = (event) => {
        const newLevel = parseInt(event.target.value, 10);
        onUpdate(skill.id, newLevel);
    };

    console.log('🎯 SkillItem rendering:', skill.name, 'level:', skill.level);

    return (
        <div className={`skill-item ${statusColors[skill.status]}`}>
            <div className="skill-header">
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-level">{skill.level}%</span>
            </div>
            
            <div className="skill-progress-container">
                <div 
                    className={`skill-progress-bar ${isAnimated ? 'animated' : ''}`}
                    style={{
                        width: isAnimated ? `${skill.level}%` : '0%',
                        transitionDelay: `${skill.id * 0.1}s`
                    }}
                />
            </div>
            
            <div className="skill-controls">
                <label htmlFor={`skill-${skill.id}`} className="skill-label">
                    Adjust Progress:
                </label>
                <input
                    id={`skill-${skill.id}`}
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={handleLevelChange}
                    className="skill-range"
                />
            </div>
        </div>
    );
}

// 📈 SKILLS SUMMARY COMPONENT
// Concept: Show overall progress statistics
// Execution: Calculates averages and counts from skills data
function SkillsSummary({ skills }) {
    // 📊 CALCULATE STATS
    // Concept: Derive statistics from skills data
    // Execution: Array methods to calculate aggregates
    const totalSkills = skills.length;
    const averageLevel = totalSkills > 0 
        ? Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills)
        : 0;
    
    const skillsByStatus = skills.reduce((acc, skill) => {
        acc[skill.status] = (acc[skill.status] || 0) + 1;
        return acc;
    }, {});

    console.log('📈 SkillsSummary stats:', { totalSkills, averageLevel, skillsByStatus });

    return (
        <div className="skills-summary">
            <h3>Learning Statistics</h3>
            <div className="summary-stats">
                <div className="stat-item">
                    <span className="stat-value">{totalSkills}</span>
                    <span className="stat-label">Total Skills</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{averageLevel}%</span>
                    <span className="stat-label">Average Progress</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{skillsByStatus.mastered || 0}</span>
                    <span className="stat-label">Mastered</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{skillsByStatus.learning || 0}</span>
                    <span className="stat-label">Learning</span>
                </div>
            </div>
        </div>
    );
}


// 💼 PROJECTS SECTION COMPONENT (Simplified for now)
// Concept: Portfolio projects display
// Execution: Static component for now
function ProjectsSection() {
    return (
        <section id="projects" aria-labelledby="projects-heading">
            <header>
                <h2 id="projects-heading">Portfolio Projects Journey</h2>
                <p>One evolving project that showcases every skill I learn</p>
            </header>
            <p>Project showcase component coming in next session!</p>
        </section>
    );
}

// 📧 CONTACT SECTION COMPONENT (Simplified for now)
// Concept: Contact form and information
// Execution: Static component for now
/*function ContactSection() {
    return (
        <section id="contact" aria-labelledby="contact-heading">
            <header>
                <h2 id="contact-heading">Connect With Me</h2>
                <p>Let's learn together and share our frontend development journey!</p>
            </header>
            <p>Interactive contact form coming in next session!</p>
        </section>
    );
}*/

// Replace ContactSection with this enhanced version

// 📧 CONTACT SECTION WITH STATE
// Concept: Form with validation and submission
// Execution: Manages form state and handles user interactions
function ContactSection() {
    // 📝 FORM STATE
    // Concept: Store all form field values
    // Execution: useState with object to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // ⚠️ VALIDATION ERRORS STATE
    // Concept: Track validation errors for each field
    // Execution: useState with object mapping field to error message
    const [errors, setErrors] = useState({});

    // 📤 SUBMISSION STATE
    // Concept: Track form submission status
    // Execution: useState to show loading/success/error states
    const [submissionState, setSubmissionState] = useState({
        isSubmitting: false,
        isSubmitted: false,
        error: null
    });

    // 📝 HANDLE INPUT CHANGE
    // Concept: Update form data when user types
    // Execution: Generic handler for all form fields
    const handleInputChange = (fieldName, value) => {
        console.log('📝 Input changed:', fieldName, '=', value);
        
        // Update form data
        setFormData(prevData => ({
            ...prevData,
            [fieldName]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[fieldName]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: ''
            }));
        }
    };

    // ✅ VALIDATE FORM
    // Concept: Check if form data is valid
    // Execution: Returns object with validation errors
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email format is invalid';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        return newErrors;
    };

    // 📤 HANDLE FORM SUBMISSION
    // Concept: Process form when user submits
    // Execution: Validates, shows loading, simulates API call
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('📤 Form submission started');

        // Validate form
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            console.log('❌ Validation errors:', formErrors);
            setErrors(formErrors);
            return;
        }

        // Start submission
        setSubmissionState({
            isSubmitting: true,
            isSubmitted: false,
            error: null
        });

        try {
            // Simulate API call
            console.log('🌐 Simulating API call with data:', formData);
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate random success/failure
            if (Math.random() > 0.3) {
                console.log('✅ Form submitted successfully');
                setSubmissionState({
                    isSubmitting: false,
                    isSubmitted: true,
                    error: null
                });
                
                // Clear form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error('Server error occurred');
            }

        } catch (error) {
            console.log('❌ Form submission error:', error.message);
            setSubmissionState({
                isSubmitting: false,
                isSubmitted: false,
                error: error.message
            });
        }
    };

    return (
        <section id="contact" aria-labelledby="contact-heading">
            <header>
                <h2 id="contact-heading">Connect With Me</h2>
                <p>Let's learn together and share our frontend development journey!</p>
            </header>
            
            <div className="contact-content">
                {submissionState.isSubmitted ? (
                    <SuccessMessage onStartOver={() => setSubmissionState({ 
                        isSubmitting: false, 
                        isSubmitted: false, 
                        error: null 
                    })} />
                ) : (
                    <ContactForm
                        formData={formData}
                        errors={errors}
                        submissionState={submissionState}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </section>
    );
}

// 📝 CONTACT FORM COMPONENT
// Concept: Reusable form with validation
// Execution: Receives all state and handlers via props
function ContactForm({ formData, errors, submissionState, onInputChange, onSubmit }) {
    console.log('📝 ContactForm rendering, submission state:', submissionState);

    return (
        <form className="contact-form" onSubmit={onSubmit} noValidate>
            <FormField
                label="Your Name"
                type="text"
                name="name"
                value={formData.name}
                error={errors.name}
                required
                placeholder="Enter your full name"
                onChange={onInputChange}
            />

            <FormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                error={errors.email}
                required
                placeholder="your.email@example.com"
                onChange={onInputChange}
            />

            <FormField
                label="Subject"
                type="select"
                name="subject"
                value={formData.subject}
                error={errors.subject}
                required
                options={[
                    { value: '', label: 'Please select...' },
                    { value: 'collaboration', label: "I'd like to collaborate" },
                    { value: 'learning', label: "Let's learn together" },
                    { value: 'feedback', label: 'Feedback on your work' },
                    { value: 'opportunity', label: 'Job opportunity' },
                    { value: 'general', label: 'General question' }
                ]}
                onChange={onInputChange}
            />

            <FormField
                label="Your Message"
                type="textarea"
                name="message"
                value={formData.message}
                error={errors.message}
                required
                placeholder="Tell me about yourself, your learning journey, or any questions you have..."
                rows={5}
                onChange={onInputChange}
            />

            <div className="form-actions">
                <button 
                    type="submit" 
                    className={`btn-primary ${submissionState.isSubmitting ? 'loading' : ''}`}
                    disabled={submissionState.isSubmitting}
                >
                    {submissionState.isSubmitting ? '📤 Sending...' : '📤 Send Message'}
                </button>
                
                <button 
                    type="reset" 
                    className="btn-secondary"
                    disabled={submissionState.isSubmitting}
                >
                    🔄 Clear Form
                </button>
            </div>

            {submissionState.error && (
                <div className="form-error" role="alert">
                    ❌ {submissionState.error}
                </div>
            )}
        </form>
    );
}

// 📝 FORM FIELD COMPONENT
// Concept: Reusable form field with validation
// Execution: Handles different input types, shows errors
function FormField({ 
    label, 
    type, 
    name, 
    value, 
    error, 
    required, 
    placeholder, 
    options, 
    rows, 
    onChange 
}) {
    // 🔄 HANDLE CHANGE
    // Concept: Notify parent of input changes
    // Execution: Calls parent's onChange with field name and value
    const handleChange = (event) => {
        const newValue = event.target.value;
        console.log('🔄 FormField change:', name, '=', newValue);
        onChange(name, newValue);
    };

    return (
        <div className={`form-field ${error ? 'has-error' : ''}`}>
            <label htmlFor={name} className="field-label">
                {label}
                {required && <span className="required" aria-hidden="true">*</span>}
            </label>

            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    rows={rows}
                    className="field-input"
                    aria-describedby={error ? `${name}-error` : undefined}
                />
            ) : type === 'select' ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="field-input"
                    aria-describedby={error ? `${name}-error` : undefined}
                >
                    {options?.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="field-input"
                    aria-describedby={error ? `${name}-error` : undefined}
                />
            )}

            {error && (
                <div id={`${name}-error`} className="field-error" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
}

// ✅ SUCCESS MESSAGE COMPONENT
// Concept: Show success after form submission
// Execution: Display success message with action to start over
function SuccessMessage({ onStartOver }) {
    return (
        <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Message Sent Successfully!</h3>
            <p>
                Thank you for reaching out.
            </p>
            <p>
                In the meantime, feel free to follow my learning journey and 
                check out the progress I'm making each day!
            </p>
            <button className="btn-primary" onClick={onStartOver}>
                📝 Send Another Message
            </button>
        </div>
    );
}


// 🦶 FOOTER COMPONENT
// Concept: Page footer with current information
// Execution: Displays user data and current time
function Footer({ userData, currentTime }) {
    return (
        <footer role="contentinfo">
            <div className="footer-content">
                <p>&copy; 2025 <strong>{userData.name}</strong> - Frontend Developer Learning Journey</p>
                <p>Built with React during {userData.currentStage}</p>
                <p>Last updated: <time>{currentTime}</time></p>
                
                <div className="learning-stats">
                    <h3>Today's Learning Stats</h3>
                    <dl>
                        <dt>Current Focus</dt>
                        <dd>React Fundamentals & Component Architecture</dd>
                        
                        <dt>Concepts Learned</dt>
                        <dd>JSX, Components, Props, State, useState, useEffect</dd>
                        
                        <dt>Next Session</dt>
                        <dd>Component Communication & Advanced Patterns</dd>
                    </dl>
                </div>
            </div>
        </footer>
    );
}

// 🎯 EXPORT COMPONENT
// Concept: Make component available for import
// Execution: ES6 module export
export default App;
