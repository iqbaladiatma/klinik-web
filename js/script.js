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

// Fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
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

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Buat Janji Temu function
function buatJanji() {
    const phoneNumber = '6296123456789'; // Format internasional tanpa +
    const message = encodeURIComponent('Halo, saya ingin membuat janji temu di Klinik MMC Blora. Mohon informasi jadwal yang tersedia.');
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupLazyLoading();
    
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