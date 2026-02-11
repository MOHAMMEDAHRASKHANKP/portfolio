import '../styles/global.css';

// Always scroll to top on page load/refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // Hide System Loader
    const loader = document.getElementById('system-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loaded');
        }, 2500); // 2.5 seconds
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ScrollSpy: Update active link on scroll
    const sections = document.querySelectorAll('section[id]');

    const scrollSpyOptions = {
        threshold: [0.2, 0.5, 0.8], // Multi-threshold for better detection
        rootMargin: "-20% 0px -20% 0px"
    };

    let currentSectionId = 'hero';
    let inactivityTimer;

    const resetInactivityTimer = () => {
        header.classList.remove('header-hidden');
        clearTimeout(inactivityTimer);

        // Only hide if NOT in hero section
        if (currentSectionId !== 'hero') {
            inactivityTimer = setTimeout(() => {
                header.classList.add('header-hidden');
            }, 4000); // 4 seconds
        }
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                currentSectionId = id;

                // Reset timer whenever section changes or we scroll
                resetInactivityTimer();

                // Clear all active classes
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });

    window.addEventListener('scroll', resetInactivityTimer);
    // Also reset on mouse move to be user friendly
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('touchstart', resetInactivityTimer);

    // Typewriter Effect
    const typeWriterElement = document.getElementById('typewriter');
    const textArray = ["Cybersecurity Specialist", "SOC Analyst", "Ethical Hacker", "Security Researcher"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];

        if (isDeleting) {
            typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typeWriterElement) {
        type();
    }

    // Project Data for Modals
    const projectData = {
        'secure-text': {
            title: 'SecureText – Text Encryption Application',
            objective: 'To develop a secure communication tool for protecting sensitive text data using robust cryptographic algorithms.',
            features: [
                'Implementation of secure encryption and decryption workflows.',
                'Key handling logic to ensure secure data exchange.',
                'Input validation and data integrity checks.'
            ],
            tech: ['Python', 'Cryptography', 'Encryption Algorithms'],
            results: 'Successfully developed a reliable application for secure text transmission, ensuring confidentiality and integrity.'
        },
        'pose-estimation': {
            title: 'Human Pose Estimation Using Machine Learning',
            objective: 'To build a high-performance, real-time system for estimating human poses using computer vision and machine learning.',
            features: [
                'Real-time detection and visualization of human body keypoints.',
                'Efficient processing of video frames for live inference.',
                'Integration of advanced ML models (TensorFlow/PyTorch).'
            ],
            tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV'],
            results: 'Achieved an accurate real-time pose estimation pipeline capable of identifying body keypoints from live video feeds.'
        },
        'gas-detector': {
            title: 'IoT-Based Gas Leakage Detection System',
            objective: 'To design and implement an automated safety system that monitors gas concentrations and provides immediate alerts.',
            features: [
                'Continuous real-time monitoring of gas levels via MQ2 sensors.',
                'Automated alert mechanism triggered at safety thresholds.',
                'Cloud-ready IoT communication fundamentals.'
            ],
            tech: ['Arduino UNO', 'ESP8266', 'MQ2 Sensor', 'IoT'],
            results: 'Created a functional IoT prototype that demonstrated reliable gas detection and instantaneous alerting.'
        }
    };

    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const viewDetailsBtns = document.querySelectorAll('[data-project]');

    if (modal && modalClose) {
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                const data = projectData[projectId];

                if (data) {
                    document.getElementById('modal-title').textContent = data.title;
                    document.getElementById('modal-objective').textContent = data.objective;
                    document.getElementById('modal-results').textContent = data.results;

                    // Populate Features
                    const featuresList = document.getElementById('modal-features');
                    featuresList.innerHTML = '';
                    data.features.forEach(f => {
                        const li = document.createElement('li');
                        li.textContent = f;
                        featuresList.appendChild(li);
                    });

                    // Populate Tech
                    const techList = document.getElementById('modal-tech');
                    techList.innerHTML = '';
                    data.tech.forEach(t => {
                        const span = document.createElement('span');
                        span.className = 'modal-tech-item';
                        span.textContent = t;
                        techList.appendChild(span);
                    });

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scroll
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Labs Tab Switching & Toggle
    const tabBtns = document.querySelectorAll('.lab-tab-btn');
    const tabPanels = document.querySelectorAll('.lab-panel');
    const labsPlaceholder = document.querySelector('.labs-placeholder');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(`${target}-panel`);
            const isActive = btn.classList.contains('active');

            // Reset current state
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            if (isActive) {
                // If already active, just leave it hidden (placeholder will show)
                labsPlaceholder.style.display = 'flex';
            } else {
                // Show selected panel
                btn.classList.add('active');
                targetPanel.classList.add('active');
                labsPlaceholder.style.display = 'none';
            }
        });
    });

    // Certificate Lightbox
    const certPreviews = document.querySelectorAll('.cert-preview');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" src="" alt="Certificate Detail">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    certPreviews.forEach(preview => {
        preview.addEventListener('click', () => {
            const imgSrc = preview.querySelector('img').src;
            if (imgSrc) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            }
        });
    });

    const closeLightbox = () => lightbox.classList.remove('active');
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Reveal on Scroll (Scan Effect)
    const revealElements = document.querySelectorAll('.reveal-scan');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed to keep the light sweep clean
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Session Status Bar Updates
    const sessionTimeEl = document.getElementById('session-time');
    const sessionBitrateEl = document.getElementById('session-bitrate');

    const updateSessionBar = () => {
        // Update IST Time (India Standard Time)
        const now = new Date();
        const istStr = now.toLocaleTimeString('en-IN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Kolkata'
        }) + ' IST';

        if (sessionTimeEl) sessionTimeEl.textContent = istStr;

        // Random Bitrate (for aesthetic)
        if (sessionBitrateEl) {
            const bitrate = (Math.random() * (850.00 - 845.00) + 845.00).toFixed(2);
            sessionBitrateEl.textContent = `${bitrate} Kbps`;
        }
    };

    setInterval(updateSessionBar, 1000);
    updateSessionBar(); // Initial call

    // Custom Cyber Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Update dot position immediately
        if (cursorDot) {
            cursorDot.style.transform = `translate(${posX - 3}px, ${posY - 3}px)`;
        }

        // Update outline position with a slight delay
        if (cursorOutline) {
            cursorOutline.animate({
                transform: `translate(${posX - 15}px, ${posY - 15}px)`
            }, { duration: 300, fill: 'forwards' });
        }

        // Handle Hover States
        const target = e.target;
        const isHoverable = target.closest('a') || target.closest('button') || target.closest('.project-card') || target.closest('.lab-tab-btn');

        if (isHoverable) {
            document.body.classList.add('cursor-hover');
        } else {
            document.body.classList.remove('cursor-hover');
        }
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.style.opacity = '0';
        if (cursorOutline) cursorOutline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorOutline) cursorOutline.style.opacity = '1';
    });

    // Skill Radar Interactivity
    const radarArea = document.querySelector('.radar-data-area');
    if (radarArea) {
        radarArea.addEventListener('mouseenter', () => {
            radarArea.style.fill = 'rgba(0, 255, 157, 0.4)';
            radarArea.style.strokeWidth = '3px';
        });
        radarArea.addEventListener('mouseleave', () => {
            radarArea.style.fill = 'rgba(0, 255, 157, 0.15)';
            radarArea.style.strokeWidth = '2px';
        });
    }

    // Neural 3D Focus Carousel Logic
    const carousel = document.getElementById('focal-carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let currentIndex = 0;

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'far-left', 'far-right');

            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
                item.classList.add('prev');
            } else if (index === (currentIndex + 1) % carouselItems.length) {
                item.classList.add('next');
            } else if (index < currentIndex) {
                item.classList.add('far-left');
            } else {
                item.classList.add('far-right');
            }
        });
    }

    if (carousel && carouselItems.length > 0) {
        updateCarousel();

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
                updateCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % carouselItems.length;
                updateCarousel();
            });
        }

        // Auto-rotation (Optional, slow)
        let autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel();
        }, 5000);

        carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
        carousel.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                currentIndex = (currentIndex + 1) % carouselItems.length;
                updateCarousel();
            }, 5000);
        });

        // Item click brings to focus or opens lightbox
        carouselItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (index === currentIndex) {
                    const img = item.querySelector('img');
                    if (img && img.src) {
                        lightboxImg.src = img.src;
                        lightbox.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                } else {
                    currentIndex = index;
                    updateCarousel();
                }
            });
        });
    }

    // --- Deep Archive Vault Logic ---
    const vaultOverlay = document.getElementById('vault-overlay');
    const openVaultBtn = document.getElementById('open-vault');
    const closeVaultBtn = document.getElementById('close-vault');
    const vaultGrid = document.getElementById('vault-grid');

    const vaultItems = Array.from(carouselItems).map(item => ({
        img: item.querySelector('img').src,
        title: item.querySelector('.item-title').textContent,
        badge: item.querySelector('.item-badge').textContent,
        category: item.getAttribute('data-category')
    }));

    function populateVault() {
        if (!vaultGrid) return;
        vaultGrid.innerHTML = '';
        vaultItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'vault-card';
            card.innerHTML = `
                <div class="v-card-visual">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="v-card-info">
                    <span>${item.badge}</span>
                    <h4>${item.title}</h4>
                </div>
            `;
            card.addEventListener('click', () => {
                lightboxImg.src = item.img;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            vaultGrid.appendChild(card);
        });
    }

    if (openVaultBtn) {
        openVaultBtn.addEventListener('click', () => {
            populateVault();
            vaultOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (closeVaultBtn) {
            closeVaultBtn.addEventListener('click', () => {
                vaultOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    }

    // ScrollSpy: Update active link on scroll
    // (Previous ScrollSpy logic continues...)

    // Hero System Metrics Fluctuation
    const metricFills = document.querySelectorAll('.metric-fill');
    setInterval(() => {
        metricFills.forEach(fill => {
            const randomWidth = Math.floor(Math.random() * (90 - 30 + 1) + 30);
            fill.style.width = `${randomWidth}%`;
        });
    }, 3000);
});

