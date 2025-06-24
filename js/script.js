// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Create and add page loader if not exists
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.page-loader')) {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading MMC Blora...</div>
            </div>
        `;
        document.body.prepend(loader);
    }
});

// Add floating shapes
function createFloatingShapes() {
    if (!document.querySelector('.floating-shapes')) {
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes';
        
        for (let i = 1; i <= 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            shapesContainer.appendChild(shape);
        }
        
        document.body.appendChild(shapesContainer);
    }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
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

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                
                // Counter animation
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
                
                // Progress bar animation
                if (entry.target.classList.contains('progress-fill')) {
                    const targetWidth = entry.target.getAttribute('data-width') || '90';
                    setTimeout(() => {
                        entry.target.style.width = targetWidth + '%';
                    }, 200);
                }
            }, index * 100); // Stagger animation
        }
    });
}, observerOptions);

// Observe different animation types
const animationTypes = ['.fade-in', '.fade-in-left', '.fade-in-right', '.scale-in', '.rotate-in', '.counter', '.progress-fill'];
animationTypes.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
    });
});

// Auto-add fade-in class to certain elements
window.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.service-card',
        '.why-point',
        '.doctor-card',
        '.feature-card'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
});

// Enhanced Header Scroll Effects
let lastScrollTop = 0;
const header = document.querySelector('.header');
const fab = document.querySelector('.fab') || createFAB();

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header background and hide/show
    if (scrollTop > 100) {
        header.classList.add('header-scrolled');
        fab.classList.add('show');
    } else {
        header.classList.remove('header-scrolled');
        fab.classList.remove('show');
    }
    
    // Hide header on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    
    lastScrollTop = scrollTop;
    
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Create Floating Action Button
function createFAB() {
    const fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '<i class="fas fa-arrow-up"></i>';
    fab.addEventListener('click', scrollToTop);
    document.body.appendChild(fab);
    return fab;
}

// Konsultasi WhatsApp function
function konsultasi() {
    const phoneNumber = '6281234567890'; // Format internasional tanpa +
    const message = encodeURIComponent('Halo, saya ingin konsultasi dengan dokter di Klinik MMC Blora. Mohon informasi lebih lanjut tentang layanan yang tersedia.');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Try to open WhatsApp, fallback to showing contact info
    try {
        window.open(whatsappURL, '_blank');
    } catch (error) {
        alert('Hubungi kami di:\nTelepon: (0296) 123-4567\nWhatsApp: 0812-3456-7890\nEmail: info@mmcblora.com');
    }
}

// Contact form submission (if exists)
function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Basic form validation
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    if (!name || !email || !phone || !message) {
        showNotification('Mohon lengkapi semua field yang wajib diisi.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Format email tidak valid.', 'error');
        return;
    }
    
    // Phone validation (basic Indonesian phone number)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-]/g, ''))) {
        showNotification('Format nomor telepon tidak valid.', 'error');
        return;
    }
    
    // Here you would typically send the data to your server
    // For demo purposes, we'll just show a success message
    showNotification('Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.', 'success');
    form.reset();
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        
        .notification-success {
            border-left: 4px solid #28a745;
        }
        
        .notification-error {
            border-left: 4px solid #dc3545;
        }
        
        .notification-info {
            border-left: 4px solid #6A0DAD;
        }
        
        .notification-content {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 0.25rem;
            margin-left: 1rem;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Image lazy loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Counter Animation Function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 100;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Testimonial Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (slides[index] && dots[index]) {
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-play testimonials
    setInterval(nextSlide, 5000);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Initialize first slide
    showSlide(0);
}

// Mouse parallax effect
function initMouseParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const parallaxElements = document.querySelectorAll('.mouse-parallax');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 1;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Card flip effect
function initCardFlips() {
    document.querySelectorAll('.interactive-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
        });
    });
}

// Magnetic buttons effect
function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            this.style.transition = 'none';
        });
        
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) * 0.3;
            const deltaY = (y - centerY) * 0.3;
            
            this.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(0) translateY(0)';
        });
    });
}

// Text typing effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupLazyLoading();
    createFloatingShapes();
    initTestimonialSlider();
    initMouseParallax();
    initCardFlips();
    initMagneticButtons();
    
    // Add pulse effect to CTA buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.classList.add('btn-pulse');
    });
    
    // Add animated class to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('btn-animated');
    });
    
    // Add parallax class to hero images
    document.querySelectorAll('.hero-image img, .feature-card, .service-card').forEach(el => {
        el.classList.add('parallax-element');
        el.setAttribute('data-speed', '0.1');
    });
    
    // Add active class to current page navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.service-card, .feature-card, .doctor-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
    }
}

// Search functionality (if needed)
function searchContent(query) {
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, li');
    const results = [];
    
    searchableElements.forEach(element => {
        if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                element: element,
                text: element.textContent,
                type: element.tagName
            });
        }
    });
    
    return results;
}

// Print page function
function printPage() {
    window.print();
}

// Share page function
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link halaman telah disalin ke clipboard', 'success');
        });
    }
}