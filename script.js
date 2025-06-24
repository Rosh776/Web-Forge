document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Cursor Effects
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .feature-card, .template-preview, .pricing-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(255, 107, 53, 0.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--primary)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Typewriter effect
    const typewriter = document.querySelector('.typewriter');
    const texts = typewriter.getAttribute('data-text').split('|');
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    
    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        typewriter.textContent = letter;
        
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    })();

    // Initialize Parallax
    const parallaxSections = document.querySelectorAll('.parallax-section');
    parallaxSections.forEach(section => {
        const bg = section.querySelector('.parallax-bg');
        new Parallax(bg, {
            speed: 0.2
        });
    });

    // Scroll reveal animations with GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate features on scroll
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1
        });
    });

    // Pricing toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.price .amount');
    const yearlyPrices = ['7', '15', '39']; // Discounted prices
    
    pricingToggle.addEventListener('change', function() {
        if (this.checked) {
            monthlyPrices.forEach((price, index) => {
                price.textContent = yearlyPrices[index];
            });
        } else {
            monthlyPrices.forEach((price, index) => {
                const originalPrices = ['9', '19', '49'];
                price.textContent = originalPrices[index];
            });
        }
    });

    // Mobile menu toggle (would need additional HTML/CSS)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Template carousel (simplified version)
    const templateCarousel = document.querySelector('.template-carousel');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    templateCarousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - templateCarousel.offsetLeft;
        scrollLeft = templateCarousel.scrollLeft;
    });
    
    templateCarousel.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    templateCarousel.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    templateCarousel.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - templateCarousel.offsetLeft;
        const walk = (x - startX) * 2;
        templateCarousel.scrollLeft = scrollLeft - walk;
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});
