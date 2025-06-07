class HeroCarousel {
    constructor() {
        this.carousel = document.querySelector('.hero-carousel');
        if (!this.carousel) return;
        
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicatorsContainer = document.querySelector('.hero-indicators');
        this.prevBtn = document.querySelector('.hero-prev');
        this.nextBtn = document.querySelector('.hero-next');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        this.createIndicators();
        this.setupEventListeners();
        this.startAutoSlide();
    }
    
    createIndicators() {
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('hero-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    goToSlide(n) {
        this.slides[this.currentSlide].classList.remove('active');
        document.querySelectorAll('.hero-indicator')[this.currentSlide].classList.remove('active');
        
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        
        this.slides[this.currentSlide].classList.add('active');
        document.querySelectorAll('.hero-indicator')[this.currentSlide].classList.add('active');
    }
    
    prevSlide() {
        this.resetAutoSlide();
        this.goToSlide(this.currentSlide - 1);
    }
    
    nextSlide() {
        this.resetAutoSlide();
        this.goToSlide(this.currentSlide + 1);
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;

    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let currentIndex = 0;
    let intervalId;

    // Función para cambiar slide
    const goToSlide = (index) => {
        slides[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        currentIndex = (index + slides.length) % slides.length;
        
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    };

    // Auto-avance
    const startAutoSlide = () => {
        intervalId = setInterval(() => goToSlide(currentIndex + 1), 5000);
    };

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        goToSlide(currentIndex - 1);
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        goToSlide(currentIndex + 1);
        startAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(intervalId);
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Iniciar
    startAutoSlide();

    // Pausar al hacer hover
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', startAutoSlide);
});
