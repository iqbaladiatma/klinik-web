// Optimized JavaScript - Lightweight Version

// Core functionality only - no heavy animations
(function() {
    'use strict';

    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
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

    // Simple scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Counter animation
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in, .counter').forEach(function(el) {
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Counter animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target')) || 100;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        function updateCounter() {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // WhatsApp integration
    window.buatJanji = function() {
        const phoneNumber = '6296123456789';
        const message = encodeURIComponent('Halo, saya ingin membuat janji temu di Klinik MMC Blora. Mohon informasi jadwal yang tersedia.');
        const whatsappURL = 'https://wa.me/' + phoneNumber + '?text=' + message;
        
        try {
            window.open(whatsappURL, '_blank');
        } catch (error) {
            alert('Hubungi kami di:\nTelepon: (0296) 123-4567\nWhatsApp: 0812-3456-7890\nEmail: info@mmcblora.com');
        }
    };

    // Contact form submission
    window.submitContactForm = function(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        // Basic validation
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        if (!name || !email || !phone || !message) {
            alert('Mohon lengkapi semua field yang wajib diisi.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid.');
            return;
        }
        
        // Success message
        alert('Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.');
        form.reset();
    };

    // Set active navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Add fade-in class to service cards
    setTimeout(function() {
        document.querySelectorAll('.service-card, .stat-item, .why-point').forEach(function(card) {
            card.classList.add('fade-in');
            observer.observe(card);
        });
    }, 100);

})();