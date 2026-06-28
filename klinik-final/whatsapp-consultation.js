// WhatsApp Consultation - Specialized for different services
(function() {
    'use strict';

    // WhatsApp Configuration
    const WHATSAPP_CONFIG = {
        phoneNumber: '6281234567890', // Update with actual WhatsApp number
        baseURL: 'https://wa.me/',
        messages: {
            general: 'Halo, saya ingin konsultasi dengan dokter di Klinik MMC Blora. Mohon informasi lebih lanjut tentang layanan yang tersedia.',
            skincare: 'Halo, saya tertarik dengan layanan MMC Skincare. Bisa konsultasi mengenai perawatan kulit yang tersedia?',
            emergency: 'Halo, saya membutuhkan bantuan medis darurat. Mohon segera dihubungi.',
            appointment: 'Halo, saya ingin membuat janji konsultasi dengan dokter spesialis. Kapan jadwal yang tersedia?',
            laboratory: 'Halo, saya ingin konsultasi mengenai pemeriksaan laboratorium yang tersedia di Klinik MMC Blora.',
            specialist: 'Halo, saya ingin konsultasi dengan dokter spesialis. Bisa informasi jadwal praktek yang tersedia?'
        }
    };

    // Main consultation function
    window.konsultasi = function(type = 'general') {
        const message = WHATSAPP_CONFIG.messages[type] || WHATSAPP_CONFIG.messages.general;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `${WHATSAPP_CONFIG.baseURL}${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
        
        try {
            // Check if on mobile device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // On mobile, try to open WhatsApp app directly
                window.location.href = whatsappURL;
            } else {
                // On desktop, open in new tab
                window.open(whatsappURL, '_blank');
            }
            
            // Track consultation attempt (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'consultation_click', {
                    'event_category': 'engagement',
                    'event_label': type
                });
            }
            
        } catch (error) {
            console.error('WhatsApp consultation error:', error);
            showFallbackContact();
        }
    };

    // Specialized consultation functions
    window.konsultasiSkincare = function() {
        konsultasi('skincare');
    };

    window.konsultasiDarurat = function() {
        konsultasi('emergency');
    };

    window.konsultasiSpesialis = function() {
        konsultasi('specialist');
    };

    window.konsultasiLab = function() {
        konsultasi('laboratory');
    };

    // Fallback contact information
    function showFallbackContact() {
        const contactInfo = `
Hubungi kami di:
📞 Telepon: (0296) 123-4567
📱 WhatsApp: 0812-3456-7890
📧 Email: info@mmcblora.com
🏥 Alamat: Jl. Pemuda No. 123, Blora, Jawa Tengah

Jam Operasional:
Senin - Jumat: 08:00 - 21:00
Sabtu: 08:00 - 17:00
Minggu: 09:00 - 15:00
🚨 IGD: 24 Jam
        `;
        
        alert(contactInfo);
    }

    // Enhanced click tracking for consultation buttons
    document.addEventListener('DOMContentLoaded', function() {
        // Add click tracking to all consultation buttons
        const consultationButtons = document.querySelectorAll('[onclick*="konsultasi"]');
        consultationButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Add pulse effect
                this.classList.add('btn-pulse');
                setTimeout(() => {
                    this.classList.remove('btn-pulse');
                }, 1000);
            });
        });

        // Add WhatsApp styling to consultation buttons
        consultationButtons.forEach(button => {
            if (button.textContent.includes('Konsultasi')) {
                button.classList.add('btn-whatsapp');
            }
        });
    });

    // Quick consultation widget
    function createQuickConsultation() {
        const quickWidget = document.createElement('div');
        quickWidget.className = 'quick-consultation-widget';
        quickWidget.innerHTML = `
            <div class="quick-consultation-content">
                <i class="fab fa-whatsapp"></i>
                <span>Konsultasi Cepat</span>
            </div>
        `;
        
        quickWidget.addEventListener('click', () => konsultasi('general'));
        
        // Add to page after 3 seconds
        setTimeout(() => {
            document.body.appendChild(quickWidget);
        }, 3000);
    }

    // Auto-initialize quick consultation widget
    if (window.location.pathname.includes('index') || window.location.pathname === '/') {
        createQuickConsultation();
    }

})();

// CSS for quick consultation widget
const quickConsultationCSS = `
.quick-consultation-widget {
    position: fixed;
    bottom: 100px;
    left: 20px;
    background: #25D366;
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
    z-index: 998;
    transition: all 0.3s ease;
    animation: slideInLeft 0.5s ease;
}

.quick-consultation-widget:hover {
    background: #128C7E;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

.quick-consultation-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 14px;
}

.quick-consultation-content i {
    font-size: 18px;
}

@keyframes slideInLeft {
    from {
        transform: translateX(-100px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .quick-consultation-widget {
        left: 50%;
        transform: translateX(-50%);
        bottom: 80px;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = quickConsultationCSS;
document.head.appendChild(style);