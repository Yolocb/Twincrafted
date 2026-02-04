// TwinCrafted Homepage JavaScript - Mobile Navigation & Smooth Scrolling

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('TwinCrafted Homepage geladen');
    
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initContactForm();
    initCTAButtons();
    initHeaderScrollEffect();
});

// Mobile Navigation Functionality
function initMobileNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (!mobileMenuToggle || !navMenu) {
        console.warn('Mobile navigation elements not found');
        return;
    }
    
    let isMenuOpen = false;
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMobileMenu();
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767 && isMenuOpen) {
                closeMobileMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize if it gets too wide
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767 && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    function toggleMobileMenu() {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        navMenu.classList.add('mobile-open');
        mobileMenuToggle.classList.add('active');
        body.classList.add('menu-open');
        mobileMenuToggle.setAttribute('aria-label', 'Menü schließen');
        isMenuOpen = true;
        
        // Focus first menu item for accessibility
        const firstNavLink = navMenu.querySelector('.nav-link');
        if (firstNavLink) {
            firstNavLink.focus();
        }
        
        console.log('Mobile menu opened');
    }
    
    function closeMobileMenu() {
        navMenu.classList.remove('mobile-open');
        mobileMenuToggle.classList.remove('active');
        body.classList.remove('menu-open');
        mobileMenuToggle.setAttribute('aria-label', 'Menü öffnen');
        isMenuOpen = false;
        
        console.log('Mobile menu closed');
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                smoothScrollToSection(targetSection);
                console.log(`Scrolling to section: ${targetId}`);
            } else {
                console.warn(`Section with id "${targetId}" not found`);
            }
        });
    });
}

// Smooth scroll function with offset for sticky header
function smoothScrollToSection(targetElement) {
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra padding
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// CTA Button functionality
function initCTAButtons() {
    // Hero CTA Buttons
    const primaryCTA = document.querySelector('.hero-actions .cta-button.primary');
    const secondaryCTA = document.querySelector('.hero-actions .cta-button.secondary');
    
    if (primaryCTA) {
        primaryCTA.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                smoothScrollToSection(contactSection);
                console.log('Primary CTA clicked - scrolling to contact');
            }
        });
    }
    
    if (secondaryCTA) {
        secondaryCTA.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                smoothScrollToSection(aboutSection);
                console.log('Secondary CTA clicked - scrolling to about');
            }
        });
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const subject = formData.get('subject');
        const message = formData.get('message');
        const privacy = formData.get('privacy');
        
        // Basic validation
        if (!name || !email || !message) {
            showFormMessage('Bitte füllen Sie alle Pflichtfelder (*) aus.', 'error');
            return;
        }
        
        if (!privacy) {
            showFormMessage('Bitte stimmen Sie der Datenschutzerklärung zu.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Nachricht wird gesendet...', 'info');
        
        // Simulate API call delay
        setTimeout(() => {
            showFormMessage('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.', 'success');
            contactForm.reset();
            console.log('Contact form submitted:', { name, email, company, subject, message });
        }, 1500);
    });
}

// Form validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form messages
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        font-weight: 600;
        text-align: center;
        ${getMessageStyles(type)}
    `;
    
    // Insert message at the top of the form
    const contactForm = document.querySelector('.contact-form');
    contactForm.insertBefore(messageElement, contactForm.firstChild);
    
    // Auto-remove success/error messages after 5 seconds
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Get message styles based on type
function getMessageStyles(type) {
    const styles = {
        success: 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;',
        error: 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;',
        info: 'background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;'
    };
    return styles[type] || styles.info;
}

// Header scroll effect (optional enhancement)
function initHeaderScrollEffect() {
    const header = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add shadow effect when scrolling
        if (currentScrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Utility Functions for Future Extensions
const TwinCrafted = {
    // Animation utilities
    animateElement: function(element, animation) {
        if (!element) return;
        
        element.style.animation = animation;
        console.log('Animation applied:', animation, 'to element:', element);
    },
    
    // Scroll to any section by ID
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            smoothScrollToSection(section);
        } else {
            console.warn(`Section with id "${sectionId}" not found`);
        }
    },
    
    // Get current active section
    getCurrentSection: function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Account for header
        
        for (let section of sections) {
            if (scrollPosition >= section.offsetTop && 
                scrollPosition < section.offsetTop + section.offsetHeight) {
                return section.id;
            }
        }
        return null;
    },
    
    // Mobile detection
    isMobile: function() {
        return window.innerWidth <= 767;
    },
    
    // Debug info
    getDebugInfo: function() {
        return {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            scrollY: window.scrollY,
            currentSection: this.getCurrentSection(),
            isMobile: this.isMobile()
        };
    }
};

// Make TwinCrafted utilities globally available
window.TwinCrafted = TwinCrafted;

// Log initialization complete
console.log('TwinCrafted JavaScript initialized successfully');
console.log('Available utilities:', Object.keys(TwinCrafted));