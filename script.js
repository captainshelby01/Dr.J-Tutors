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
                    if (filterValue === 'all' || (category && category.split(' ').includes(filterValue))) {
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

    const flyerData = {
        school: {
            title: "Welcome Back to School!",
            image: "./flyer-back-to-school.jpg",
            description: `
                <p class="modal-intro">🏫🎒 <strong>Welcome Back to School! Here's to Academic Excellence!</strong></p>
                <p>Start the new academic year with maximum confidence! <em>Dr. J Tutors</em> provides personalized home and online tutoring structured to build solid foundations, boost grades, and foster true academic mastery.</p>
                
                <h4 class="modal-subheading">Core Subjects Covered:</h4>
                <ul class="modal-bullets">
                    <li>📐 <strong>Mathematics:</strong> Algebra, Geometry, Arithmetic & Exam Prep</li>
                    <li>📖 <strong>English Language:</strong> Reading, Writing, Grammar & Literature</li>
                    <li>🔬 <strong>Sciences:</strong> Physics, Chemistry, Biology & General Science</li>
                </ul>

                <h4 class="modal-subheading">Why Learn With Dr. J Tutors?</h4>
                <ul class="modal-bullets">
                    <li>🌟 Tailored 1-on-1 tutoring designed for your child's learning pace</li>
                    <li>💻 Flexible online and physical (home) tutoring options</li>
                    <li>🌍 Aligned with UK, US, Canadian, and Nigerian curriculums</li>
                </ul>
                <p class="modal-footnote">✨ Here's to academic excellence this school year!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20the%20Welcome%20Back%20to%20School%20tutoring%20package."
        },
        september: {
            title: "Happy New Month (September)",
            image: "./flyer-september.jpg",
            description: `
                <p class="modal-intro">🗓️✨ <strong>Happy New Month! We Are Ready to Serve You Better in September!</strong></p>
                <p>A new month brings fresh goals and new academic opportunities. Dr. J Tutors is <strong>just a booking away!</strong> whether your child needs help mastering challenging topics or getting ahead of their class syllabus.</p>
                
                <h4 class="modal-subheading">What We Offer:</h4>
                <ul class="modal-bullets">
                    <li>📚 Structured weekly & monthly tutoring programs</li>
                    <li>📊 Comprehensive progress monitoring and parent feedback</li>
                    <li>🎓 Dedicated tutors passionate about student success</li>
                </ul>
                <p class="modal-summary">Give your child the support they deserve this September!</p>
                <p class="modal-footnote">📲 Just a booking away — contact us today!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20booking%20tutoring%20sessions%20for%20September."
        },
        summer: {
            title: "Dr. J Summer Lessons (Purple)",
            image: "./flyer-summer.jpg",
            description: `
                <p class="modal-intro">☀️🚀 <strong>Give Your Child a Head Start with Dr. J Summer Lessons!</strong></p>
                <p>The <em>Dr. J Summer Lessons (DSL)</em> program provides <strong>personalized</strong> home and online tutoring structured to build confidence, improve grades, and prepare students for the upcoming academic session.</p>
                
                <h4 class="modal-subheading">Who Can Be Enrolled?</h4>
                <ul class="modal-bullets">
                    <li>🏫 <strong>Levels:</strong> Year 1–12 | Grade 1–12 | Primary 1–6 | JSS 1–3 | SSS 1–3</li>
                    <li>📝 <strong>Exam Prep:</strong> SAT, GCSE, UK 11+, WAEC, JAMB, Common Entrance</li>
                    <li>📚 <strong>Subjects:</strong> Maths, English, Sciences, Commercial & Art Subjects</li>
                    <li>🌍 <strong>Curriculums:</strong> UK, US, Nigerian, Canadian, and other international systems</li>
                </ul>

                <h4 class="modal-subheading">Why Parents Choose Us:</h4>
                <ul class="modal-bullets">
                    <li>🗓️ Flexible learning schedules</li>
                    <li>🎓 Experienced & professional tutors</li>
                    <li>💻 Home & Online classes available</li>
                    <li>📈 Proven academic strategies</li>
                </ul>
                <p class="modal-footnote">✨ Secure your child's spot for the summer today!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20enrolling%20my%20child%20in%20the%20Summer%20Lessons%20Package."
        },
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
            title: "IGCSE / GCSE Online Tutor",
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
            title: "Is Your Child Struggling with Maths?",
            image: "./flyer-maths.jpg",
            description: `
                <p class="modal-intro"><strong>Is your child struggling with Maths?</strong></p>
                <p>Worry no more! Because with Dr. J Tutors, your child can become a Maths genius!</p>
                <ul class="modal-bullets">
                    <li>🇺🇸 <strong>USA:</strong> Grade 1–6</li>
                    <li>🇳🇬 <strong>Nigeria:</strong> Primary 1–6</li>
                    <li>🇬🇧 <strong>UK:</strong> Year 1–6</li>
                </ul>
                <p><strong>Open for Virtual and Physical Classes</strong></p>
                <p class="modal-summary">A 30-day trial will convince you!</p>
                <p class="modal-footnote">✨ Dr. J Kiddies Tutorials!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20enrolling%20my%20child%20in%20the%20Kiddies%20Maths%20Tutorials%20Package."
        },
        term3_result: {
            title: "3rd Term Result Is Out",
            image: "./flyer-3rd-term-results.jpg",
            description: `
                <p class="modal-intro">📊 <strong>3rd Term Result Is Out! How Did Your Child Perform?</strong></p>
                <p>Are you happy with their progress, or is it time for professional learning support? Give your child the academic boost they need by hiring Dr. J Tutors.</p>
                <h4 class="modal-subheading">Key Highlights:</h4>
                <ul class="modal-bullets">
                    <li>🏫 Standard teachers for home and online lessons</li>
                    <li>📈 Upscale academic performance across all grades</li>
                    <li>🎓 Tailored strategies for exam preparation and subject mastery</li>
                </ul>
                <p class="modal-footnote">✨ We accept children from ALL GRADES!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%203rd%20Term%20result%20learning%20support%20for%20my%20child."
        },
        improvement: {
            title: "Has Your Child's Grades Been Declining?",
            image: "./flyer-academic-improvement.jpg",
            description: `
                <p class="modal-intro">📉➡️📈 <strong>Has Your Child's Grades Been Declining?</strong></p>
                <p>Now is the best time to step in before the gap widens! Enroll in our specialized <strong>Academic Improvement Program</strong>.</p>
                <h4 class="modal-subheading">Why Parents Choose Us:</h4>
                <ul class="modal-bullets">
                    <li>👶 Kindergarten to Year 12 coverage</li>
                    <li>🗓️ Flexible learning schedules & convenient payment plans</li>
                    <li>🤝 Qualified tutors matched within 48 hours</li>
                    <li>🌟 Intentional tutoring with proven academic strategies</li>
                </ul>
                <p class="modal-footnote">🎁 Enjoy a FREE TRIAL CLASS! Contact us today.</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27d%20like%20to%20enroll%20my%20child%20in%20the%20Academic%20Improvement%20Program%20and%20claim%20a%20Free%20Trial%20Class."
        },
        scholarly_intl: {
            title: "Get a Scholarly International Tutor",
            image: "./flyer-scholarly-intl.jpg",
            description: `
                <p class="modal-intro">🌍✈️ <strong>Get a Scholarly International Tutor for Your Kids!</strong></p>
                <p>Global expertise for students everywhere. Whether you're in the 🇬🇧 UK, 🇺🇸 US, 🇨🇦 CANADA, or beyond, we provide expert virtual instruction tailored to your child's needs.</p>
                <h4 class="modal-subheading">Experienced In:</h4>
                <ul class="modal-bullets">
                    <li>📚 Curriculum mastery for any country</li>
                    <li>💡 Subject confidence booster (Maths, English, Sciences)</li>
                    <li>📝 Special exam prep (SATs, GCSE, 11+ Exam)</li>
                    <li>🗣️ Personal counseling session with your kids</li>
                </ul>
                <p class="modal-footnote">🎓 Personalized virtual/online tutoring for all levels!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20looking%20for%20a%20Scholarly%20International%20Tutor%20for%20my%20child."
        },
        improve_school: {
            title: "Help Your Child Improve in School",
            image: "./flyer-academic-boost.jpg",
            description: `
                <p class="modal-intro">🎒💡 <strong>Help Your Child Improve in School!</strong></p>
                <p>Get your child a <strong>Lesson Teacher</strong> for the academic boost needed. At Dr. J Tutors, we offer a wide range of expertise and experience to ensure your child excels.</p>
                <h4 class="modal-subheading">Subjects Available:</h4>
                <ul class="modal-bullets">
                    <li>📐 Mathematics & Basic Science</li>
                    <li>📖 English, Verbal & Quantitative Reasoning</li>
                    <li>🔬 Physics, Chemistry, Biology</li>
                    <li>💼 Economics, Government, Literature, Computer Studies</li>
                </ul>
                <p class="modal-footnote">✨ Home & online options available for all grades!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%20want%20to%20get%20a%20lesson%20teacher%20for%20my%20child%20to%20improve%20in%20school."
        },
        meet_tutor: {
            title: "Meet Our Tutor",
            image: "./flyer-meet-your-tutor.jpg",
            description: `
                <p class="modal-intro">👩‍🏫⭐ <strong>Meet Your Tutor – Dr. Judith Ekemezie (CEO, Dr. J Tutors)</strong></p>
                <p>Dedicated educator helping students excel in core subjects. I make complex topics simple, clear, and enjoyable through engaging lessons.</p>
                <h4 class="modal-subheading">Teaching Experience & Expertise:</h4>
                <ul class="modal-bullets">
                    <li>⏱️ Over 6 years teaching Physics, Chemistry, Maths, Biology & English</li>
                    <li>📝 Exam preparation specialist: WAEC, JAMB, IGCSE, GCSE, UK 11+</li>
                    <li>💻 Uses writing tablet for seamless online classes</li>
                    <li>🏠 Home & Online lessons (individual & group) for JSS1–SS3 & Year 7–Year 12</li>
                </ul>
                <p class="modal-footnote">🌟 Proven track record of improving grades and building student confidence!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20Judith%2C%20I%20saw%20your%20profile%20and%20would%20like%20to%20enquire%20about%20tutoring%20lessons."
        },
        welcome_3rd_term: {
            title: "Dr. J Tutors Welcomes You Back to School",
            image: "./flyer-welcome-3rd-term.jpg",
            description: `
                <p class="modal-intro">🏫🔔 <strong>Welcome Back to School – 3rd Term!</strong></p>
                <p>Learning made easy! Prepare your child for top grades and full comprehension this 3rd term with Dr. J Tutors.</p>
                <h4 class="modal-subheading">Program Highlights:</h4>
                <ul class="modal-bullets">
                    <li>📐 Mathematics, English & Science mastery</li>
                    <li>📝 Intensive revision and past question drills</li>
                    <li>💻 Interactive online and home physical tutoring</li>
                </ul>
                <p class="modal-footnote">✨ Dedicated tutoring designed for academic success!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%203rd%20Term%20tutoring%20lessons."
        },
        under_ctrl: {
            title: "under CTRL",
            image: "./flyer-under-ctrl.jpg",
            description: `
                <p class="modal-intro">⌨️🔒 <strong>Your Child's Academic Future is Under Control!</strong></p>
                <p>Dear Parents, at Dr. J Tutors, we take charge of your child's learning journey with personalized care, structured study habits, and clear explanations.</p>
                <h4 class="modal-subheading">Why Book With Us:</h4>
                <ul class="modal-bullets">
                    <li>🎯 Customized learning plan matching school curriculum</li>
                    <li>📱 We are just a booking away on WhatsApp or Phone</li>
                    <li>📈 Real-time monitoring and weekly parent feedback</li>
                </ul>
                <p class="modal-footnote">🚀 Take control of your child's success today!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%20want%20to%20take%20control%20of%20my%20child%27s%20academic%20future."
        },
        term2_result: {
            title: "New Class, New Challenge",
            image: "./flyer-2nd-term-results.jpg",
            description: `
                <p class="modal-intro">📄 <strong>2nd Term Result Is Out. How Did Your Child Perform?</strong></p>
                <p>Are you happy with their progress, or is it time for professional learning support?</p>
                <h4 class="modal-subheading">How We Help:</h4>
                <ul class="modal-bullets">
                    <li>💡 Academic boost in weak subjects (Maths, Physics, Chemistry, English)</li>
                    <li>🎓 Experienced tutors with success-proven strategies</li>
                    <li>💻 Available for Home or Online lessons for all grades</li>
                </ul>
                <p class="modal-footnote">✨ Book us now to elevate your child's grades!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27d%20like%20to%20book%20a%20consultation%20regarding%20my%20child%27s%202nd%20term%20results."
        },
        which_child: {
            title: "Which Child Will You Have This Term?",
            image: "./flyer-which-child.jpg",
            description: `
                <p class="modal-intro">🤔❓ <strong>Which Child Will You Have This Term?</strong></p>
                <p>Will your child be <em>the one who struggles to keep up</em>, or <em>the one who stays ahead</em>?</p>
                <p>Every child has the potential to do better. With the right guidance, personalised attention, and consistent support, your child can approach the new session with greater confidence and improved performance.</p>
                <h4 class="modal-subheading">Why Work With Dr. J Tutors?</h4>
                <ul class="modal-bullets">
                    <li>🌟 Tailored 1-on-1 attention for every student</li>
                    <li>📚 Personalised learning strategies matching syllabus demands</li>
                    <li>📈 Consistent progress tracking and parent updates</li>
                </ul>
                <p class="modal-footnote">📩 Contact us now to get started!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%20saw%20the%20%27Which%20child%20will%20you%20have%20this%20term%3F%27%20flyer%20and%20would%20like%20to%20get%20started."
        },
        scholarly_intl_alt: {
            title: "Unlock Your Child's Academic Potential",
            image: "./flyer-scholarly-intl-alt.jpg",
            description: `
                <p class="modal-intro">🌐🎓 <strong>Unlock Your Child's Academic Potential</strong></p>
                <p>Dedicated virtual instruction for international students preparing for GCSE, IGCSE, SATs, and 11+ Exams.</p>
                <h4 class="modal-subheading">Specialized Features:</h4>
                <ul class="modal-bullets">
                    <li>🇬🇧 UK, 🇺🇸 US, and 🇨🇦 Canadian curriculum alignment</li>
                    <li>1-on-1 virtual sessions with interactive digital whiteboard</li>
                    <li>Targeted exam techniques and time management practice</li>
                </ul>
                <p class="modal-footnote">🌍 Global expertise for students everywhere!</p>
            `,
            whatsappUrl: "https://wa.me/2349074818280?text=Hi%20Dr.%20J%20Tutors%2C%20I%27m%20interested%20in%20International%20Curriculum%20Mastery%20for%20my%20child."
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
