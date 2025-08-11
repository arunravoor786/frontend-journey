// Advanced Animation and Effects
const Animations = {
    // Typing animation effect
    typeWriter(element, text, speed = 100, callback = null) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                if (callback) callback();
            }
        }, speed);
    },

    // Animate skill bars when they come into view
    animateSkillBars() {
        const skillBars = DOM.querySelectorAll('.skill-progress');
        
        // Use Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetProgress = DOM.getAttribute(progressBar, 'data-progress');
                    
                    // Animate to target percentage
                    setTimeout(() => {
                        progressBar.style.width = targetProgress + '%';
                    }, 200);
                    
                    // Unobserve after animation
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => observer.observe(bar));
    },

    // Counter animation
    animateCounter(element, start, end, duration = 2000) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    // Parallax scrolling effect
    initParallax() {
        const parallaxElements = DOM.querySelectorAll('[data-parallax]');
        
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = DOM.getAttribute(element, 'data-parallax') || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };
        
        window.addEventListener('scroll', handleScroll);
    },

    // Initialize all animations
    init() {
        // Wait for DOM to be fully loaded
        DOM.addEvent(document, 'DOMContentLoaded', () => {
            setTimeout(() => {
                this.animateSkillBars();
                this.addTypingEffect();
                this.initParallax();
            }, 500);
        });
    },

    addTypingEffect() {
        const heroTitle = DOM.querySelector('header h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            this.typeWriter(heroTitle, originalText, 80, () => {
                console.log('✨ Typing animation completed!');
            });
        }
    }
};

// Initialize animations
Animations.init();
