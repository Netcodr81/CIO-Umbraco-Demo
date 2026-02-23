document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close-button');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('is-open');
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function () {
            mobileMenu.classList.remove('is-open');
        });
    }

    // Accordion toggle functionality
    const accordionToggles = document.querySelectorAll('.accordion__toggle');

    accordionToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const drawerId = toggle.getAttribute('aria-controls');
            const drawer = document.getElementById(drawerId);

            if (drawer) {
                if (isExpanded) {
                    toggle.setAttribute('aria-expanded', 'false');
                    drawer.classList.remove('is-open');
                } else {
                    toggle.setAttribute('aria-expanded', 'true');
                    drawer.classList.add('is-open');
                }
            }
        });
    });
});