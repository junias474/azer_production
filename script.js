// Loading animation
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.add('hidden');
            }, 1000);
        });

        // Scroll reveal animation
        function revealOnScroll() {
            const reveals = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('revealed');
                }
            });
        }

        // Counter animation for stats
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }

        // Progress bar animation
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        }

        // Intersection Observer for stats and progress bars
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate counters
                    if (entry.target.classList.contains('stats-section')) {
                        const counters = entry.target.querySelectorAll('.stat-number');
                        counters.forEach(counter => {
                            animateCounter(counter);
                        });
                    }
                    
                    // Animate progress bars
                    if (entry.target.classList.contains('accomplishments-section')) {
                        setTimeout(() => {
                            animateProgressBars();
                        }, 500);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observe sections
        const statsSection = document.querySelector('.stats-section');
        const accomplishmentsSection = document.querySelector('.accomplishments-section');
        
        if (statsSection) observer.observe(statsSection);
        if (accomplishmentsSection) observer.observe(accomplishmentsSection);

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Enhanced navbar scroll effect
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            
            // Reveal animations
            revealOnScroll();
        });

        // Active navigation link highlighting
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add hover effects to cards
        document.querySelectorAll('.card-custom, .team-card, .accomplishment-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Initialize reveal on page load
        revealOnScroll();

        // Add stagger animation to elements
        function staggerAnimation() {
            const elements = document.querySelectorAll('.scroll-reveal');
            elements.forEach((element, index) => {
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        }

        // Call stagger animation on load
        document.addEventListener('DOMContentLoaded', staggerAnimation);

        // Add floating animation to hero icon
        const heroIcon = document.querySelector('.hero .bi-tree');
        if (heroIcon) {
            let floatDirection = 1;
            setInterval(() => {
                heroIcon.style.transform = `translateY(${floatDirection * 10}px)`;
                floatDirection *= -1;
            }, 2000);
        }

        // Performance optimization: throttle scroll events
        function throttle(func, delay) {
            let timeoutId;
            let lastExecTime = 0;
            return function (...args) {
                const currentTime = Date.now();
                
                if (currentTime - lastExecTime > delay) {
                    func.apply(this, args);
                    lastExecTime = currentTime;
                } else {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        func.apply(this, args);
                        lastExecTime = Date.now();
                    }, delay - (currentTime - lastExecTime));
                }
            };
        }

        // Apply throttling to scroll events
        window.addEventListener('scroll', throttle(revealOnScroll, 16));

        // Hero background image slider
        const images = document.querySelectorAll('.hero-bg-slider img');
        let current = 0;
        setInterval(() => {
          images[current].classList.remove('active');
          current = (current + 1) % images.length;
          images[current].classList.add('active');
        }, 4000);
