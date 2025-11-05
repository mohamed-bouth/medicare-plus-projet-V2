document.addEventListener('DOMContentLoaded', function () {
    initializeCarousel();
});

function initializeCarousel() {
    const carouselElement = document.getElementById('healthTipsCarousel');
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: 4000
        });
    }
}