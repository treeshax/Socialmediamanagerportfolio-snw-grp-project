const SMMPortfolio = {
    init() {
        this.initMobileMenu();
        this.initScrollAnimations();
        this.initNavbarScroll();

        this.initModals();
    },

    initMobileMenu() {
        const toggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('.nav-links');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                const isOpen = nav.classList.contains('active');
                toggle.textContent = isOpen ? '✕' : '☰';
                toggle.setAttribute('aria-expanded', isOpen);

                document.body.style.overflow = isOpen ? 'hidden' : '';
            });
        }
    },

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    },

    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    },



    initModals() {
        window.openModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    window.closeModal(modal.id);
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    window.closeModal(modal.id);
                });
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    SMMPortfolio.init();
});
