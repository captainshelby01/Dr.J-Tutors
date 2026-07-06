/**
 * Dr. J Tutors - Main JavaScript File
 * Handles responsive menu, filter gallery, accordions, and WhatsApp form integrations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Menu Interactivity
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            
            navMenu.classList.toggle('open');
            hamburgerBtn.classList.toggle('open');
            
            // Accessibility state updates
            hamburgerBtn.setAttribute('aria-expanded', !isOpen);
        });

        // Close menu when navigation links are clicked (for mobile users)
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburgerBtn.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================
    // 2. Sticky Header Scroll Indicator
    // ==========================================
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // 3. Navigation Highlight on Scroll (Intersection Observer)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // ==========================================
    // 4. FAQ Accordion Functionality
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const headerBtn = item.querySelector('.faq-header');
        const bodyContent = item.querySelector('.faq-body');
        
        if (headerBtn && bodyContent) {
            headerBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close other open FAQ items first (accordion mode)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-body').style.maxHeight = null;
                        otherItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current FAQ item
                item.classList.toggle('active');
                
                if (!isOpen) {
                    bodyContent.style.maxHeight = bodyContent.scrollHeight + 'px';
                    headerBtn.setAttribute('aria-expanded', 'true');
                } else {
                    bodyContent.style.maxHeight = null;
                    headerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // ==========================================
    // 5. Offers Gallery Filtering
    // ==========================================
    const filterContainer = document.getElementById('galleryFilters');
    const flyerCards = document.querySelectorAll('.flyer-card');
    
    if (filterContainer && flyerCards.length > 0) {
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from other buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to current button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                flyerCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Add fade-in micro-animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transition = 'opacity 0.4s ease';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // 6. WhatsApp Inquiry Form Handler
    // ==========================================
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const parentName = document.getElementById('parentName').value.trim();
            const studentInfo = document.getElementById('studentInfo').value.trim();
            const tutoringMode = document.getElementById('tutoringMode').value;
            const messageText = document.getElementById('messageText').value.trim();
            
            // Create WhatsApp formatted message
            let whatsappMessage = `Hi Dr. J Tutors, I would like to book a tutoring consultation.\n\n` +
                                  `• *Parent Name:* ${parentName}\n` +
                                  `• *Student Details:* ${studentInfo}\n` +
                                  `• *Tutoring Mode:* ${tutoringMode}`;
            
            if (messageText) {
                whatsappMessage += `\n• *Additional Details:* ${messageText}`;
            }
            
            // Format WhatsApp URL link
            const whatsappNumber = '2349074818280'; // Client business WhatsApp number
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Redirect visitor to WhatsApp chat in a new tab
            window.open(waUrl, '_blank');
        });
    }

    // ==========================================
    // 7. Video Preview Playholder Clicking Functionality
    // ==========================================
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            alert('🎥 The client is preparing to embed their introduction and sample lessons here. These spaces will play standard YouTube video embeds once the video URLs are connected.');
        });
    });
});
