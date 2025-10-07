// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                const category = item.getAttribute('data-category');
                if (category === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('תודה על פנייתך! ניצור איתך קשר בהקדם.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .timeline-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
});

/* Cookie Consent */

// Helper function to check cookie consent
function hasConsentFor(category) {
  if (typeof window.CookieConsent === 'undefined') {
    return false; // Default to no consent if cookie consent not loaded
  }
  
  return window.CookieConsent.validConsent(category);
}

// Helper function to execute code only with consent
function withConsent(category, callback) {
  if (hasConsentFor(category)) {
    callback();
  } else {
    console.log(`⚠️  Skipping ${category} code - no user consent`);
  }
}

// Cookie Consent Initialization
console.log('🍪 Cookie consent script loaded - starting initialization...');

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and vanilla-cookieconsent to be ready
  function initCookieConsent() {
    initAttempts++;
    
    console.log('🍪 Cookie consent init attempt', initAttempts, '- CookieConsent available:', typeof window.CookieConsent !== 'undefined');
    console.log('🍪 Document ready state:', document.readyState);
    console.log('🍪 Window object available:', typeof window !== 'undefined');
    
    if (typeof window.CookieConsent === 'undefined') {
      if (initAttempts < maxAttempts) {
        console.log('🍪 CookieConsent not ready, retrying in 100ms...');
        setTimeout(initCookieConsent, 100);
      } else {
        console.error('🍪 Cookie consent failed to load after', maxAttempts, 'attempts');
        console.error('🍪 Available window properties:', Object.keys(window).filter(k => k.toLowerCase().includes('cookie')));
      }
      return;
    }

    const cc = window.CookieConsent;
    
    console.log('🍪 Initializing cookie consent with config:', typeof cc);
    console.log('🍪 CookieConsent.run available:', typeof cc.run === 'function');
    
    // Initialize cookie consent
    try {
      cc.run({
  "autoShow": true,
  "mode": "opt-in",
  "revision": 0,
  "categories": {
    "necessary": {
      "enabled": true,
      "readOnly": true
    },
    "analytics": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_ga"
          },
          {
            "name": "_ga_*"
          },
          {
            "name": "_gid"
          },
          {
            "name": "_gat"
          }
        ]
      }
    },
    "marketing": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_fbp"
          },
          {
            "name": "_fbc"
          },
          {
            "name": "fr"
          }
        ]
      }
    }
  },
  "language": {
    "default": "he",
    "translations": {
      "he": {
        "consentModal": {
          "title": "אנחנו משתמשים בעוגיות 🍪",
          "description": "עץ במקום משתמש בעוגיות כדי לשפר את החוויה שלך, לנתח שימוש באתר ולסייע במאמצי השיווק שלנו.",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "showPreferencesBtn": "נהל העדפות",
          "footer": "<a href=\"#privacy-policy\">מדיניות פרטיות</a> | <a href=\"#terms-conditions\">תנאי שימוש</a>"
        },
        "preferencesModal": {
          "title": "העדפות עוגיות",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "savePreferencesBtn": "שמור העדפות",
          "closeIconLabel": "סגור",
          "sections": [
            {
              "title": "עוגיות חיוניות",
              "description": "עוגיות אלה הכרחיות לתפקוד האתר ולא ניתן להשבית אותן.",
              "linkedCategory": "necessary"
            },
            {
              "title": "עוגיות ניתוח",
              "description": "עוגיות אלה עוזרות לנו להבין איך המבקרים מתקשרים עם האתר שלנו.",
              "linkedCategory": "analytics"
            },
            {
              "title": "עוגיות שיווקיות",
              "description": "עוגיות אלה משמשות להצגת פרסומות מותאמות אישית.",
              "linkedCategory": "marketing"
            }
          ]
        }
      }
    }
  },
  "guiOptions": {
    "consentModal": {
      "layout": "box",
      "position": "bottom right",
      "equalWeightButtons": true,
      "flipButtons": false
    },
    "preferencesModal": {
      "layout": "box",
      "equalWeightButtons": true,
      "flipButtons": false
    }
  }
});
      console.log('✅ Cookie consent initialized successfully');
      
      // Optional: Handle consent changes (check if onChange is available)
      if (typeof cc.onChange === 'function') {
        cc.onChange(function(cookie, changed_preferences) {
          console.log('🍪 Cookie consent changed:', changed_preferences);
      
      // Enable/disable analytics based on consent
      if (changed_preferences.includes('analytics')) {
        if (cc.validConsent('analytics')) {
          // Enable analytics (e.g., Google Analytics)
          console.log('📊 Analytics enabled');
          // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
        } else {
          console.log('📊 Analytics disabled');
          // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
        }
      }
      
      // Enable/disable marketing based on consent
      if (changed_preferences.includes('marketing')) {
        if (cc.validConsent('marketing')) {
          console.log('📢 Marketing enabled');
          // Example: gtag('consent', 'update', { ad_storage: 'granted' });
        } else {
          console.log('📢 Marketing disabled');
          // Example: gtag('consent', 'update', { ad_storage: 'denied' });
        }
      }
        });
      } else {
        console.log('⚠️ cc.onChange not available in this version');
      }

      // Optional: Add show preferences button to footer
    const footer = document.querySelector('footer');
    if (footer && !footer.querySelector('.cookie-preferences-btn')) {
      const prefsButton = document.createElement('button');
      prefsButton.className = 'cookie-preferences-btn';
      prefsButton.textContent = '🍪 Cookie Preferences';
      prefsButton.style.cssText = `
        background: transparent;
        border: 1px solid rgba(255,255,255,0.3);
        color: inherit;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 16px;
        transition: all 0.3s ease;
      `;
      
      prefsButton.addEventListener('click', function() {
        cc.showPreferences();
      });
      
      prefsButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255,255,255,0.1)';
      });
      
      prefsButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
      });
      
      // Add to footer (try to find a good spot)
      const footerLinks = footer.querySelector('.footer-links, .legal-links, p');
      if (footerLinks) {
        footerLinks.appendChild(prefsButton);
      } else {
        footer.appendChild(prefsButton);
      }
    }
    } catch (error) {
      console.error('❌ Cookie consent initialization failed:', error);
      console.error('❌ Error details:', error.message, error.stack);
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initCookieConsent, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initCookieConsent();
  } else {
    // Fallback - try after a short delay
    setTimeout(initCookieConsent, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initCookieConsent, { once: true });
    }
  }
})();

/* Accessibility Features */

// Accessibility Toolbar Initialization
console.log('♿ Accessibility toolbar script loaded - starting initialization...');

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and accessibility library to be ready
  function initAccessibility() {
    initAttempts++;
    
    console.log('♿ Accessibility init attempt', initAttempts, '- Accessibility available:', typeof window.Accessibility !== 'undefined');
    console.log('♿ Document ready state:', document.readyState);
    
    if (typeof window.Accessibility === 'undefined') {
      if (initAttempts < maxAttempts) {
        console.log('♿ Accessibility library not ready, retrying in 100ms...');
        setTimeout(initAccessibility, 100);
      } else {
        console.error('♿ Accessibility library failed to load after', maxAttempts, 'attempts');
        console.error('♿ Available window properties:', Object.keys(window).filter(k => k.toLowerCase().includes('access')));
      }
      return;
    }

    console.log('♿ Initializing accessibility toolbar...');
    
    try {
      // Initialize accessibility toolbar with configuration
      new window.Accessibility({
  "icon": {
    "position": {
      "bottom": {
        "size": 50,
        "units": "px"
      },
      "right": {
        "size": 20,
        "units": "px"
      },
      "type": "fixed"
    },
    "backgroundColor": "#146FF8",
    "color": "#fff",
    "img": "accessible",
    "circular": true,
    "fontFaceSrc": [
      "https://fonts.googleapis.com/icon?family=Material+Icons"
    ],
    "fontFamily": "Material Icons"
  },
  "hotkeys": {
    "enabled": true,
    "helpTitles": true,
    "keys": {
      "toggleMenu": [
        "ctrl+alt+a"
      ],
      "invertColors": [
        "ctrl+alt+i"
      ],
      "toggleAnimations": [
        "ctrl+alt+n"
      ],
      "toggleContrast": [
        "ctrl+alt+c"
      ],
      "increaseFontSize": [
        "ctrl+alt+plus"
      ],
      "decreaseFontSize": [
        "ctrl+alt+minus"
      ]
    }
  },
  "menu": {
    "dimensions": {
      "width": {
        "size": 300,
        "units": "px"
      },
      "height": {
        "size": "auto",
        "units": "px"
      }
    },
    "fontFamily": "inherit"
  },
  "labels": {
    "resetTitle": "איפוס הגדרות נגישות",
    "closeTitle": "סגירת תפריט נגישות",
    "menuTitle": "אפשרויות נגישות",
    "increaseText": "הגדלת גודל טקסט",
    "decreaseText": "הקטנת גודל טקסט",
    "increaseTextSpacing": "הגדלת מרווחי טקסט",
    "decreaseTextSpacing": "הקטנת מרווחי טקסט",
    "increaseLineHeight": "הגדלת גובה שורה",
    "decreaseLineHeight": "הקטנת גובה שורה",
    "invertColors": "היפוך צבעים",
    "grayHues": "גוונים אפורים",
    "underlineLinks": "קו תחתי לקישורים",
    "bigCursor": "סמן גדול",
    "readingGuide": "מדריך קריאה",
    "textToSpeech": "טקסט לדיבור",
    "speechToText": "דיבור לטקסט",
    "suppressAnimations": "ביטול אנימציות"
  },
  "textToSpeechLang": "he-IL",
  "speechToTextLang": "he-IL",
  "enabled": true,
  "position": "bottom-right",
  "theme": "default"
});
      console.log('✅ Accessibility toolbar initialized successfully');
      
      // Add ARIA landmark improvements
      enhanceAriaLandmarks();
      
      // Add keyboard navigation improvements
      enhanceKeyboardNavigation();
      
      // Add focus management
      enhanceFocusManagement();
      
    } catch (error) {
      console.error('❌ Accessibility initialization failed:', error);
      console.error('❌ Error details:', error.message, error.stack);
    }
  }

  // Enhance ARIA landmarks for better screen reader support
  function enhanceAriaLandmarks() {
    try {
      // Add main landmark if missing
      const main = document.querySelector('main');
      if (!main) {
        const content = document.querySelector('.main-content, .content, #content');
        if (content && !content.getAttribute('role')) {
          content.setAttribute('role', 'main');
          content.setAttribute('aria-label', 'Main content');
        }
      }

      // Enhance navigation
      const nav = document.querySelector('nav');
      if (nav && !nav.getAttribute('aria-label')) {
        nav.setAttribute('aria-label', 'Main navigation');
      }

      // Enhance footer
      const footer = document.querySelector('footer');
      if (footer && !footer.getAttribute('role')) {
        footer.setAttribute('role', 'contentinfo');
      }

      // Add skip link if missing
      if (!document.querySelector('.skip-link, [href="#main"]')) {
        addSkipLink();
      }

      console.log('✅ ARIA landmarks enhanced');
    } catch (error) {
      console.error('❌ Error enhancing ARIA landmarks:', error);
    }
  }

  // Add skip link for keyboard navigation
  function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 4px;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
      this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector('#main, main, [role="main"]');
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Enhance keyboard navigation
  function enhanceKeyboardNavigation() {
    try {
      // Ensure all interactive elements are keyboard accessible
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
      
      interactiveElements.forEach(element => {
        // Add focus indicators
        if (!element.style.outline) {
          element.addEventListener('focus', function() {
            this.style.outline = '2px solid #146FF8';
            this.style.outlineOffset = '2px';
          });
          
          element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
          });
        }
      });

      // Add keyboard support for custom interactive elements
      const customInteractive = document.querySelectorAll('[onclick]:not(button):not(a):not(input)');
      customInteractive.forEach(element => {
        if (!element.getAttribute('tabindex')) {
          element.setAttribute('tabindex', '0');
        }
        if (!element.getAttribute('role')) {
          element.setAttribute('role', 'button');
        }
        
        element.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
      });

      console.log('✅ Keyboard navigation enhanced');
    } catch (error) {
      console.error('❌ Error enhancing keyboard navigation:', error);
    }
  }

  // Enhance focus management
  function enhanceFocusManagement() {
    try {
      // Ensure main content area can receive focus
      const main = document.querySelector('main, [role="main"], .main-content');
      if (main && !main.getAttribute('tabindex')) {
        main.setAttribute('tabindex', '-1');
      }

      // Improve form accessibility
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          // Associate labels with inputs
          if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
            const label = form.querySelector(`label[for="${input.id}"], label`);
            if (label && !label.getAttribute('for')) {
              const id = input.id || 'input_' + Math.random().toString(36).substr(2, 9);
              input.id = id;
              label.setAttribute('for', id);
            }
          }

          // Add required field indicators
          if (input.required && !input.getAttribute('aria-required')) {
            input.setAttribute('aria-required', 'true');
          }
        });
      });

      console.log('✅ Focus management enhanced');
    } catch (error) {
      console.error('❌ Error enhancing focus management:', error);
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibility);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initAccessibility, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initAccessibility();
  } else {
    // Fallback - try after a short delay
    setTimeout(initAccessibility, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initAccessibility, { once: true });
    }
  }
})();


    // Enhanced contact form handling with Elastic Email integration
    // API URL: https://api.zappy5.com
    (function() {
        // Check if contact form handler is already loaded
        if (window.zappyContactFormLoaded) {
            console.log('📧 Contact form handler already loaded, skipping...');
            return;
        }
        window.zappyContactFormLoaded = true;
        
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('📧 Contact form submitted - sending to Zappy API...');
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Get submit button and show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Add loading animation
            submitBtn.classList.add('loading');
            
            try {
                // Send to Zappy email API (use absolute URL for deployed sites)
                const apiUrl = 'https://api.zappy5.com';
                const endpoint = apiUrl + '/api/email/contact-form';
                
                console.log('📤 Sending contact form to:', endpoint);
                console.log('📋 Form data:', { 
                    websiteId: '93952f8d-f5b7-4944-b7b9-01b15f6bcf86',
                    name: data.name, 
                    email: data.email,
                    subject: data.subject || 'Contact Form Submission'
                });
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        websiteId: '93952f8d-f5b7-4944-b7b9-01b15f6bcf86',
                        name: data.name,
                        email: data.email,
                        subject: data.subject || 'Contact Form Submission',
                        message: data.message,
                        phone: data.phone || null
                    })
                });
                
                console.log('📥 Response status:', response.status, response.statusText);
                const result = await response.json();
                console.log('📨 Response data:', result);
                
                if (result.success) {
                    // Success - show confirmation message
                    console.log('✅ Email sent successfully!');
                    showNotification(result.message || 'Thank you for your message! We\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Optional: Show additional success UI
                    showSuccessModal();
                } else {
                    // Error from server
                    console.error('❌ Server returned error:', result);
                    showNotification(result.error || 'Failed to send message. Please try again.', 'error');
                }
                
            } catch (error) {
                console.error('❌ Network error:', error);
                console.error('Failed to connect to:', 'https://api.zappy5.com/api/email/contact-form');
                
                // Fallback: Show error message and provide alternative contact info
                showNotification(
                    'Unable to send message right now. Please try again later or contact us directly.',
                    'error'
                );
                
                // Show fallback contact info
                showFallbackContact();
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
        }
        
        // Email validation helper
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Notification system
        function showNotification(message, type = 'info') {
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.zappy-notification');
            existingNotifications.forEach(notification => notification.remove());
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `zappy-notification zappy-notification--${type}`;
            notification.innerHTML = `
            <div class="zappy-notification__content">
                <span class="zappy-notification__icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="zappy-notification__message">${message}</span>
                <button class="zappy-notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            `;
            
            // Add styles if not already present
            if (!document.querySelector('#zappy-notification-styles')) {
                const styles = document.createElement('style');
            styles.id = 'zappy-notification-styles';
            styles.textContent = `
                .zappy-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    max-width: 400px;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .zappy-notification--success {
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                }
                
                .zappy-notification--error {
                    background-color: #f8d7da;
                    border: 1px solid #f5c6cb;
                    color: #721c24;
                }
                
                .zappy-notification--info {
                    background-color: #d1ecf1;
                    border: 1px solid #bee5eb;
                    color: #0c5460;
                }
                
                .zappy-notification__content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .zappy-notification__icon {
                    font-size: 18px;
                    flex-shrink: 0;
                }
                
                .zappy-notification__message {
                    flex: 1;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .zappy-notification__close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.7;
                }
                
                .zappy-notification__close:hover {
                    opacity: 1;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .loading {
                    position: relative;
                    pointer-events: none;
                }
                
                .loading::after {
                    content: '';
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    margin: auto;
                    border: 2px solid transparent;
                    border-top-color: currentColor;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds for success, 8 seconds for errors
        const timeout = type === 'error' ? 8000 : 5000;
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, timeout);
    }
    
    // Success modal for enhanced UX
    function showSuccessModal() {
        const modal = document.createElement('div');
        modal.className = 'zappy-success-modal';
        modal.innerHTML = `
            <div class="zappy-success-modal__backdrop" onclick="this.parentElement.remove()">
                <div class="zappy-success-modal__content" onclick="event.stopPropagation()">
                    <div class="zappy-success-modal__icon">🎉</div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. We've received your message and will get back to you as soon as possible.</p>
                    <button onclick="this.closest('.zappy-success-modal').remove()" class="zappy-success-modal__button">
                        Got it!
                    </button>
                </div>
            </div>
        `;
        
        // Add modal styles
        if (!document.querySelector('#zappy-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'zappy-modal-styles';
            styles.textContent = `
                .zappy-success-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10001;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .zappy-success-modal__backdrop {
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                .zappy-success-modal__content {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    animation: slideUp 0.3s ease-out;
                }
                
                .zappy-success-modal__icon {
                    font-size: 48px;
                    margin-bottom: 20px;
                }
                
                .zappy-success-modal__content h3 {
                    margin: 0 0 15px 0;
                    color: #333;
                    font-size: 24px;
                }
                
                .zappy-success-modal__content p {
                    margin: 0 0 25px 0;
                    color: #666;
                    line-height: 1.5;
                }
                
                .zappy-success-modal__button {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .zappy-success-modal__button:hover {
                    background: #0056b3;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(modal);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 5000);
    }
    
    // Fallback contact information
    function showFallbackContact() {
        const fallback = document.createElement('div');
        fallback.className = 'zappy-fallback-contact';
        fallback.innerHTML = `
            <div class="zappy-fallback-contact__content">
                <h4>Alternative Contact Methods</h4>
                <p>If you're having trouble sending your message, you can also reach us at:</p>
                <div class="zappy-fallback-contact__methods">
                    <a href="mailto:support@zappy5.com?subject=Contact Form Issue" class="zappy-fallback-contact__method">
                        📧 support@zappy5.com
                    </a>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="zappy-fallback-contact__close">
                    Close
                </button>
            </div>
        `;
        
        // Add fallback styles
        if (!document.querySelector('#zappy-fallback-styles')) {
            const styles = document.createElement('style');
            styles.id = 'zappy-fallback-styles';
            styles.textContent = `
                .zappy-fallback-contact {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    max-width: 350px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10000;
                    animation: slideInUp 0.3s ease-out;
                }
                
                .zappy-fallback-contact__content {
                    padding: 20px;
                }
                
                .zappy-fallback-contact__content h4 {
                    margin: 0 0 10px 0;
                    color: #333;
                    font-size: 16px;
                }
                
                .zappy-fallback-contact__content p {
                    margin: 0 0 15px 0;
                    color: #666;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .zappy-fallback-contact__methods {
                    margin-bottom: 15px;
                }
                
                .zappy-fallback-contact__method {
                    display: block;
                    padding: 8px 12px;
                    background: #f8f9fa;
                    border: 1px solid #e9ecef;
                    border-radius: 4px;
                    text-decoration: none;
                    color: #495057;
                    font-size: 14px;
                    transition: background-color 0.2s;
                }
                
                .zappy-fallback-contact__method:hover {
                    background: #e9ecef;
                }
                
                .zappy-fallback-contact__close {
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    float: right;
                }
                
                @keyframes slideInUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(fallback);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (fallback.parentElement) {
                fallback.remove();
            }
        }, 10000);
        }
    })(); // End of IIFE
    
