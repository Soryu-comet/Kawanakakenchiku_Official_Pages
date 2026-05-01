// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Fix for Windows Middle-Click Autoscroll
let isAutoScrolling = false;
window.addEventListener('mousedown', (e) => {
    if (e.button === 1) {
        if (!isAutoScrolling) {
            lenis.stop(); // Stop Lenis
            isAutoScrolling = true;
        } else {
            lenis.start(); // Restart if middle clicked again
            isAutoScrolling = false;
        }
    } else {
        if (isAutoScrolling) {
            lenis.start(); // Other clicks exit autoscroll
            isAutoScrolling = false;
        }
    }
});
window.addEventListener('wheel', () => {
    if (isAutoScrolling) {
        lenis.start(); // Wheel scroll exits autoscroll
        isAutoScrolling = false;
    }
}, {passive: true});


document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fade in up animations
        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach((el) => {
            gsap.fromTo(el, 
                { y: 50, opacity: 0, autoAlpha: 0 },
                { 
                    y: 0, 
                    opacity: 1,
                    autoAlpha: 1, 
                    duration: 1.2, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Stagger animations
        const staggerContainers = document.querySelectorAll('.stagger-container');
        staggerContainers.forEach(container => {
            const items = container.querySelectorAll('.stagger-item');
            gsap.fromTo(items, 
                { y: 50, opacity: 0, autoAlpha: 0 },
                { 
                    y: 0, 
                    opacity: 1,
                    autoAlpha: 1, 
                    duration: 1.2, 
                    ease: 'power3.out',
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Parallax for Hero Video
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            gsap.to(heroVideo, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    }

    // 3D Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('.card-hover');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const multiplier = 15; 
            const xRotate = (-y / rect.height) * multiplier;
            const yRotate = (x / rect.width) * multiplier;
            
            card.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) translateY(-5px) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)`;
        });
    });

    // Header & Mobile Menu Logic
    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const logoImg = document.getElementById('header-logo-img');
    const bars = [document.getElementById('bar1'), document.getElementById('bar2'), document.getElementById('bar3')];
    const navLinks = document.querySelectorAll('.nav-link');
    let isMenuOpen = false;

    // Initial Header Reveal Animation
    if (header) {
        const headerElements = header.querySelectorAll('a, button, img');
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(headerElements,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power3.out", delay: 0.2 }
            );
        }
    }

    let lastScrollY = window.scrollY;

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            

            menuBtn.setAttribute('aria-expanded', isMenuOpen);
            menuBtn.setAttribute('aria-label', isMenuOpen ? 'メニューを閉じる' : 'メニューを開く');

            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => mobileMenu.classList.remove('opacity-0'), 10);
                lenis.stop(); // Pause smooth scrolling when menu is open
                
                bars[0].classList.add('transform', 'translate-y-[9px]', 'rotate-45', 'bg-brand-dark');
                bars[0].classList.remove('bg-white');
                bars[1].classList.add('opacity-0');
                bars[2].classList.add('transform', '-translate-y-[9px]', '-rotate-45', 'bg-brand-dark');
                bars[2].classList.remove('bg-white');
                
                if(logoImg) logoImg.classList.remove('logo-white');
            } else {
                mobileMenu.classList.add('opacity-0');
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
                lenis.start(); 
                
                bars[0].classList.remove('transform', 'translate-y-[9px]', 'rotate-45', 'bg-brand-dark');
                bars[0].classList.add('bg-white');
                bars[1].classList.remove('opacity-0');
                bars[2].classList.remove('transform', '-translate-y-[9px]', '-rotate-45', 'bg-brand-dark');
                bars[2].classList.add('bg-white');
                
                updateHeaderStyle();
            }
        });
    }

    const updateHeaderStyle = () => {
        if (!header) return;
        const currentScrollY = window.scrollY;
        
        // Smart Header Hide/Show mechanism
        if (currentScrollY > lastScrollY && currentScrollY > 200 && !isMenuOpen) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;

        if (currentScrollY > 100) {
            header.classList.add('header-glass', 'py-4');
            header.classList.remove('bg-transparent', 'py-6');
            if(logoImg) logoImg.classList.remove('logo-white');
            
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-brand-dark');
            });

            if (!isMenuOpen) {
                bars.forEach(b => {
                    if(b) {
                        b.classList.remove('bg-white'); 
                        b.classList.add('bg-brand-dark');
                    }
                });
            }
        } else {
            const isWhiteHeaderPage = document.querySelector('.hero-section, .about-hero');
            if (isWhiteHeaderPage) {
                header.classList.remove('header-glass', 'py-4');
                header.classList.add('bg-transparent', 'py-6');
                
                if (!isMenuOpen) {
                    if(logoImg) logoImg.classList.add('logo-white');
                    bars.forEach(b => {
                        if(b) {
                            b.classList.remove('bg-brand-dark'); 
                            b.classList.add('bg-white');
                        }
                    });
                }
                
                navLinks.forEach(link => {
                    link.classList.remove('text-brand-dark');
                    link.classList.add('text-white');
                });
            } else {
                header.classList.add('header-glass', 'py-4');
                header.classList.remove('py-6');
            }
        }
    };

    window.addEventListener('scroll', updateHeaderStyle);
    updateHeaderStyle();

    // Form submission animation handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                
                const formData = new FormData(contactForm);
                fetch('/api/contact', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    submitBtn.classList.remove('loading');
                    submitBtn.textContent = '送信完了しました';
                    submitBtn.classList.add('bg-brand-green');
                    submitBtn.classList.remove('bg-brand-dark', 'hover:bg-black');
                    contactForm.reset();
                })
                .catch(err => {
                    submitBtn.classList.remove('loading');
                    submitBtn.textContent = '送信失敗';
                    submitBtn.classList.add('bg-red-500');
                    submitBtn.classList.remove('bg-brand-dark', 'hover:bg-black');
                });
            }
        });
    }


    const ptOverlay = document.getElementById('page-transition');
    const ptSpinner = document.getElementById('page-transition-spinner');
    

    if (ptOverlay) {

        window.addEventListener('pageshow', (e) => {
            if (e.persisted) {
                ptOverlay.classList.remove('translate-y-0');
                ptOverlay.classList.add('translate-y-full');
            }
        });
    }

    document.querySelectorAll('a[href]').forEach(a => {
        a.addEventListener('click', (e) => {
            try {
                const url = new URL(a.href, window.location.origin);
                // Same origin, different path, no raw hash link, no blank target
                if (url.origin === window.location.origin && 
                    url.pathname !== window.location.pathname && 
                    a.target !== '_blank' && 
                    !a.hasAttribute('download') &&
                    !a.href.includes('mailto:') &&
                    !a.href.includes('tel:')) {
                    
                    e.preventDefault();
                    if(ptOverlay) {
                        ptOverlay.classList.remove('translate-y-full');
                        ptOverlay.classList.add('translate-y-0');
                    }
                    if(ptSpinner) {
                        setTimeout(() => {
                            ptSpinner.classList.remove('opacity-0');
                            ptSpinner.classList.add('opacity-100');
                        }, 300);
                    }
                    
                    setTimeout(() => {
                        window.location.href = a.href;
                    }, 700);
                }
            } catch(e) {}
        });
    });


    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left) - rect.width / 2;
            const y = (e.clientY - rect.top) - rect.height / 2;
            
            // Calculate ratio (-1 to 1) from the center
            const xRatio = x / (rect.width / 2);
            const yRatio = y / (rect.height / 2);
            
            // Seamless, subtle tracking (fixed max distance of 4px)
            gsap.to(btn, {
                x: xRatio * 4,
                y: yRatio * 4,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.4)",
                overwrite: "auto"
            });
        });
    });


    if (typeof SplitType !== 'undefined') {
        const splitElements = document.querySelectorAll('h1, h2:not(.sr-only), h3, h4.font-serif');
        splitElements.forEach(el => {
            if(el.classList.contains('is-split') || el.closest('.noise-overlay')) return;
            
            const text = new SplitType(el, { types: 'lines, words, chars' });
            el.classList.add('is-split');
            
            gsap.set(text.chars, { y: 20, opacity: 0, scale: 0.95 });
            
            ScrollTrigger.create({
                trigger: el,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(text.chars, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.015,
                        ease: "power3.out"
                    });
                },
                once: true
            });
        });
    }


    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor(initRandomY = false) {
                this.reset();
                if(initRandomY) {
                    this.y = Math.random() * canvas.height;
                }
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + 10;
                this.size = Math.random() * 2 + 0.5;
                this.speedY = Math.random() * 0.7 + 0.2;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.6 + 0.1;
                this.life = 0;
                this.maxLife = Math.random() * 300 + 150;
                
                const colors = ['#f97316', '#fb923c', '#d97706', '#5d6f62', '#ffffff'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                this.y -= this.speedY;
                this.x += this.speedX + Math.sin(this.life * 0.02) * 0.3;
                this.life++;
                
                const fadeDur = 50;
                if (this.life > this.maxLife - fadeDur) {
                    this.opacity = Math.max(0, this.opacity - Math.random() * 0.03);
                }
                
                if (this.y < -10 || this.opacity <= 0) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity * 0.5;
                ctx.fill();
            }
        }

        for (let i = 0; i < 35; i++) {
            particles.push(new Particle(true));
        }

        const animateCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateCanvas);
        };
        animateCanvas();
    }
});
