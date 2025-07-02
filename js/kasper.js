document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const toggleMenu = document.querySelector('.toggle-menu');
    const navLinks = document.querySelector('header nav ul');
    
    toggleMenu.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('header nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('header nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                }
            }
        });
    });

    // Portfolio Filtering
    const shuffleItems = document.querySelectorAll('.shuffle li');
    const portfolioItems = document.querySelectorAll('.portfolio .imgs-container .box');
    
    shuffleItems.forEach(item => {
        item.addEventListener('click', function() {
            // Update active filter
            shuffleItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter portfolio items
            portfolioItems.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Landing Slider
    const landingBullets = document.querySelectorAll('.landing .bullets li');
    const landingTexts = [
        {
            title: "Hello World!<br>We Are Kasper - Digital Creators",
            desc: "We transform ideas into stunning digital experiences. Our team of creative professionals delivers innovative solutions that help businesses stand out in the digital landscape. Let us bring your vision to life."
        },
        {
            title: "Innovative Solutions<br>For Your Digital Needs",
            desc: "From web design to mobile applications, we create solutions that drive results. Our approach combines creativity with technical excellence to deliver outstanding digital products."
        },
        {
            title: "Your Vision<br>Our Expertise",
            desc: "Partner with us to turn your ideas into reality. With years of experience and a passion for innovation, we're ready to tackle your most challenging projects."
        }
    ];
    
    landingBullets.forEach((bullet, index) => {
        bullet.addEventListener('click', function() {
            // Update active bullet
            landingBullets.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update landing text
            const content = document.querySelector('.landing .text .content');
            content.querySelector('h2').innerHTML = landingTexts[index].title;
            content.querySelector('p').textContent = landingTexts[index].desc;
        });
    });

    // Auto-rotate landing slider
    let currentSlide = 0;
    function rotateLanding() {
        currentSlide = (currentSlide + 1) % landingBullets.length;
        landingBullets[currentSlide].click();
    }
    let slideInterval = setInterval(rotateLanding, 5000);
    
    // Pause slider on hover
    const landing = document.querySelector('.landing');
    landing.addEventListener('mouseenter', () => clearInterval(slideInterval));
    landing.addEventListener('mouseleave', () => {
        slideInterval = setInterval(rotateLanding, 5000);
    });

    // Testimonials Slider
    const testimonialContents = document.querySelectorAll('.testimonials .content');
    const testimonialBullets = document.querySelectorAll('.testimonials .bullets li');
    
    testimonialBullets.forEach((bullet, index) => {
        bullet.addEventListener('click', function() {
            // Update active bullet
            testimonialBullets.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update testimonial content
            testimonialContents.forEach(content => content.classList.remove('active'));
            testimonialContents[index].classList.add('active');
        });
    });

    // Auto-rotate testimonials
    let currentTestimonial = 0;
    function rotateTestimonials() {
        currentTestimonial = (currentTestimonial + 1) % testimonialBullets.length;
        testimonialBullets[currentTestimonial].click();
    }
    setInterval(rotateTestimonials, 7000);

    // Animated Stats Counter
    const statsSection = document.querySelector('.stats');
    const statsNumbers = document.querySelectorAll('.stats .number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statsOffset = statsSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > statsOffset) {
            statsAnimated = true;
            
            statsNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        clearInterval(counter);
                        number.textContent = target;
                    } else {
                        number.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Run once in case stats are already visible

    // Animate Skills Progress Bars
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.skills .prog span');
    let skillsAnimated = false;
    
    function animateSkills() {
        if (skillsAnimated) return;
        
        const skillsOffset = skillsSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > skillsOffset) {
            skillsAnimated = true;
            
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-progress');
                bar.style.width = width;
            });
        }
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once in case skills are already visible

    // Form Submission Handling
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="mail"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message (in a real app, you'd want to handle errors too)
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Subscribe Form Handling
    const subscribeForm = document.querySelector('.subscribe form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[name="mail"]').value;
            
            // Here you would typically send the email to your mailing list service
            console.log('Subscribed:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Back to Top Button
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Add CSS for back-to-top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--main-color);
            color: white;
            border-radius: 50%;
            display: none;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        
        .back-to-top:hover {
            background-color: #0d9ec4;
            transform: translateY(-3px);
        }
        
        .back-to-top i {
            font-size: 20px;
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your USER_ID
    emailjs.init("YOUR_USER_ID"); // ← Replace with your actual User ID (found in EmailJS Dashboard)

    // ===== Contact Form Submission =====
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = this.querySelector('input[type="submit"]');
            submitBtn.value = "Sending...";
            submitBtn.disabled = true;

            // Send email via EmailJS
            emailjs.sendForm('service_v62n9h8', 'template_dr6vvbn', this)
                .then(() => {
                    alert("Message sent successfully!");
                    contactForm.reset(); // Clear form
                })
                .catch((error) => {
                    alert("Failed to send message. Please try again.");
                    console.error("EmailJS Error:", error);
                })
                .finally(() => {
                    submitBtn.value = "Send Message";
                    submitBtn.disabled = false;
                });
        });
    }

    // Keep all your existing code (sliders, menu toggle, etc.)
    // ...
});