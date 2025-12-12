class Carousel {
    constructor(element) {
        this.container = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = element.querySelector('.carousel-btn.next');
        this.prevButton = element.querySelector('.carousel-btn.prev');
        this.dotsContainer = element.querySelector('.carousel-dots');

        this.currentIndex = 0;
        this.isPlaying = true;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        if (this.nextButton) this.nextButton.addEventListener('click', () => this.next());
        if (this.prevButton) this.prevButton.addEventListener('click', () => this.prev());

        this.track.addEventListener('touchstart', e => this.touchStartX = e.changedTouches[0].screenX, { passive: true });
        this.track.addEventListener('touchend', e => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        this.container.addEventListener('mouseenter', () => this.pause());
        this.container.addEventListener('mouseleave', () => this.play());

        this.updateSlidePosition();
        this.startAutoplay();
    }

    updateSlidePosition() {
        const slideWidth = this.slides[0].getBoundingClientRect().width;
        this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlidePosition();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        if (this.touchStartX - this.touchEndX > swipeThreshold) this.next();
        if (this.touchEndX - this.touchStartX > swipeThreshold) this.prev();
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            if (this.isPlaying) this.next();
        }, 4000);
    }

    pause() {
        this.isPlaying = false;
    }

    play() {
        this.isPlaying = true;
    }
}

class Carousel3D {
    constructor(element) {
        this.container = element;
        this.track = element.querySelector('.carousel-3d-track');
        this.items = Array.from(this.track.children);
        this.nextBtn = element.querySelector('.carousel-3d-btn.next');
        this.prevBtn = element.querySelector('.carousel-3d-btn.prev');

        this.rotation = 0;
        this.itemCount = this.items.length;
        this.anglePerItem = 360 / this.itemCount;
        this.radius = Math.round((this.items[0].offsetWidth / 2) / Math.tan(Math.PI / this.itemCount));

        // Adjust radius for spacing
        this.radius = 400; // Fixed radius for consistent look

        this.isPlaying = true;
        this.autoRotateInterval = null;

        this.init();
    }

    init() {
        this.setupItems();
        this.setupControls();
        this.startAutoRotate();

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoRotate());
        this.container.addEventListener('mouseleave', () => this.startAutoRotate());

        // Window resize handling for responsiveness could go here
    }

    setupItems() {
        this.items.forEach((item, index) => {
            const angle = index * this.anglePerItem;
            item.style.transform = `rotateY(${angle}deg) translateZ(${this.radius}px)`;
        });
    }

    setupControls() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.rotate(-1);
            });
        }

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.rotate(1);
            });
        }
    }

    rotate(direction) {
        this.rotation += direction * this.anglePerItem;
        this.track.style.transform = `rotateY(${this.rotation}deg)`;
    }

    startAutoRotate() {
        if (this.autoRotateInterval) clearInterval(this.autoRotateInterval);
        this.autoRotateInterval = setInterval(() => {
            if (this.isPlaying) {
                this.rotate(-1);
            }
        }, 3000);
    }

    pauseAutoRotate() {
        clearInterval(this.autoRotateInterval);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel-container').forEach(el => new Carousel(el));
    document.querySelectorAll('.carousel-3d-container').forEach(el => new Carousel3D(el));
});
