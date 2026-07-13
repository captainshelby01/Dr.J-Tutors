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
    // ==========================================
    // 8. Flyer Pop-up Modal Functionality
    // ==========================================
    const flyerModal = document.getElementById('flyerModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
    const openModalBtns = document.querySelectorAll('.open-flyer-modal');

    // Flyer detailed data dictionary
    const flyerData = {
        general: {
            title: "Home & Online Tutoring",
            image: "./flyer-general.png",
            description: `
                <p class="modal-intro">📚✨ <strong>Welcome to Dr. J Tutors – Where Learning Meets Excellence!</strong></p>
                <p>We offer home and online tutoring for students across 🇬🇧 UK | 🇺🇸 USA | 🇨🇦 Canada | 🇳🇬 Nigeria | 🌍 International.</p>
                <ul class="modal-bullets">
                    <li><strong>Subjects:</strong> Mathematics, English, Physics, Chemistry, Biology (Art, Science & Commercial courses also available).</li>
                    <li><strong>Levels:</strong> Primary, Secondary, Year 7–13.</li>
                    <li><strong>Exam Prep:</strong> WAEC, NECO, JAMB, GCSE, IGCSE, A-Levels, Common Entrance.</li>
                </ul>
                <p class="modal-summary">We help students understand better, build confidence, and achieve excellent results.</p>
                <p class="modal-footnote">🚀 Let’s help your child Learn. Pass. Excel.</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20booking%20a%20session%20for%20the%20Home%20%26%20Online%20Tutoring%20Package."
        },
        gcse: {
            title: "IGCSE & GCSE Exam Prep",
            image: "./flyer-gcse.png",
            description: `
                <p class="modal-intro"><strong>IGCSE & GCSE doesn’t have to be difficult.</strong></p>
                <p>At Dr. J Tutors, we offer expert support in:</p>
                <h4 class="modal-subheading">Maths • Physics • Chemistry • Biology • English</h4>
                <p>We help students understand concepts clearly, build confidence, and achieve better exam results.</p>
                <p class="modal-footnote">🇬🇧 UK Students (also available for 🇨🇦 🇺🇸 🌍)</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20enrolling%20my%20child%20in%20the%20IGCSE%20%26%20GCSE%20Preparation%20Package."
        },
        maths: {
            title: "Dr. J Kiddies Maths Tutorials",
            image: "./flyer-maths.jpg",
            description: `
                <p class="modal-intro"><strong>Is your child struggling with Maths?</strong></p>
                <p>Worry no more! Because with Dr. J Tutors, your child can become a Maths genius!</p>
                <ul class="modal-bullets">
                    <li>🇬🇧 <strong>UK:</strong> Grade 1–6</li>
                    <li>🇳🇬 <strong>Nigeria:</strong> Primary 1–6</li>
                    <li>🇺🇸 <strong>USA:</strong> Year 1–6</li>
                </ul>
                <p><strong>Open for Virtual and Physical Classes</strong></p>
                <p class="modal-summary">A 30-day trial will convince you!</p>
                <p class="modal-footnote">✨ Dr. J Kiddies Tutorials!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20enrolling%20my%20child%20in%20the%20Kiddies%20Maths%20Tutorials%20Package."
        },
        learn: {
            title: "Learn",
            image: "./mission-learn.png",
            description: `
                <p class="modal-intro" style="font-size: 1.2rem; font-weight: 700; color: var(--secondary); margin-bottom: 1rem;">This can be you!</p>
                <p style="margin-bottom: 1.5rem; font-size: 1.05rem; line-height: 1.6;">Get personalized, structured learning plans with experienced tutors. We help you master your subjects, clear up difficult topics, and build confidence from day one.</p>
                <p style="font-weight: 600; color: var(--neutral-dark);">Send Dr. J a message now to get started!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20tutoring%20services.%20Please%20help%20me%20get%20started."
        },
        pass: {
            title: "Pass",
            image: "./mission-pass.png",
            description: `
                <p class="modal-intro" style="font-size: 1.2rem; font-weight: 700; color: var(--secondary); margin-bottom: 1rem;">This can be you!</p>
                <p style="margin-bottom: 1.5rem; font-size: 1.05rem; line-height: 1.6;">Prepare thoroughly for your exams (WAEC, NECO, JAMB, GCSE, IGCSE, SAT, A-Levels, 11+ Prep). Acquire the techniques and confidence needed to ace your tests and earn top grades.</p>
                <p style="font-weight: 600; color: var(--neutral-dark);">Send Dr. J a message now to pass with flying colors!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27d%20like%20to%20enquire%20about%20exam%20preparation%20classes%20to%20help%20my%20child%20pass%20their%20upcoming%20exams."
        },
        excel: {
            title: "Excel",
            image: "./mission-excel.png",
            description: `
                <p class="modal-intro" style="font-size: 1.2rem; font-weight: 700; color: var(--secondary); margin-bottom: 1rem;">This can be you!</p>
                <p style="margin-bottom: 1.5rem; font-size: 1.05rem; line-height: 1.6;">Achieve long-term academic excellence and open doors to top grammar and secondary schools. Master critical thinking, build strong foundations, and graduate at the top of your class.</p>
                <p style="font-weight: 600; color: var(--neutral-dark);">Send Dr. J a message now to unlock academic excellence!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20your%20long-term%20academic%20excellence%20program%20for%20my%20child."
        }
    };

    if (flyerModal && modalClose) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const flyerKey = btn.getAttribute('data-flyer');
                const data = flyerData[flyerKey];
                
                if (data) {
                    modalImage.src = data.image;
                    modalImage.alt = data.title;
                    modalTitle.textContent = data.title;
                    modalDescription.innerHTML = data.description;
                    modalWhatsAppBtn.href = data.whatsappUrl;
                    
                    // Show modal
                    flyerModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Disable background scrolling
                }
            });
        });

        // Close modal function
        const closeModal = () => {
            flyerModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable background scrolling
        };

        modalClose.addEventListener('click', closeModal);

        // Close modal when clicking outside of modal-content
        flyerModal.addEventListener('click', (e) => {
            if (e.target === flyerModal) {
                closeModal();
            }
        });

        // Close modal on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && flyerModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    // ==========================================
    // 10. Testimonials Carousel Slider
    // ==========================================
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const btnTestimonialPrev = document.getElementById('btnTestimonialPrev');
    const btnTestimonialNext = document.getElementById('btnTestimonialNext');
    const carouselDots = document.getElementById('carouselDots');
    const slides = document.querySelectorAll('.testimonial-slide');

    if (testimonialsTrack && slides.length > 0) {
        let currentSlideIdx = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;

        // Populate indicators/dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoSlide();
            });
            carouselDots.appendChild(dot);
        }

        const dots = document.querySelectorAll('.carousel-dot');

        function updateSlider() {
            // Translate the track horizontally
            testimonialsTrack.style.transform = `translateX(-${currentSlideIdx * 100}%)`;
            
            // Update active dot classes
            dots.forEach((dot, idx) => {
                if (idx === currentSlideIdx) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function goToSlide(idx) {
            currentSlideIdx = (idx + totalSlides) % totalSlides;
            updateSlider();
        }

        function nextSlide() {
            goToSlide(currentSlideIdx + 1);
        }

        function prevSlide() {
            goToSlide(currentSlideIdx - 1);
        }

        if (btnTestimonialPrev && btnTestimonialNext) {
            btnTestimonialPrev.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
            
            btnTestimonialNext.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }

        // Auto slide every 6 seconds
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 6000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // Start auto slide
        startAutoSlide();

        // Support swipe gestures on mobile
        let touchStartX = 0;
        let touchEndX = 0;

        testimonialsTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialsTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50; // minimum distance for swipe
            if (touchStartX - touchEndX > threshold) {
                nextSlide(); // swipe left -> show next
                resetAutoSlide();
            } else if (touchEndX - touchStartX > threshold) {
                prevSlide(); // swipe right -> show prev
                resetAutoSlide();
            }
        }
    }
});
