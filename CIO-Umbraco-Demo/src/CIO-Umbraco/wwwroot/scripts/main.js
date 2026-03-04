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

    // Accordion toggle functionality - scoped per accordion container
    const accordionContainers = document.querySelectorAll('.accordion__container');

    accordionContainers.forEach(function(container) {
        const togglesInContainer = container.querySelectorAll('.accordion__toggle');

        togglesInContainer.forEach(function(toggle) {
            toggle.addEventListener('click', function() {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                const drawerId = toggle.getAttribute('aria-controls');
                const drawer = document.getElementById(drawerId);

                // Close all accordions within THIS container only
                togglesInContainer.forEach(function(otherToggle) {
                    const otherDrawerId = otherToggle.getAttribute('aria-controls');
                    const otherDrawer = document.getElementById(otherDrawerId);

                    if (otherDrawer) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                        otherDrawer.classList.remove('is-open');
                    }
                });

                // If the clicked toggle was closed, open it
                if (!isExpanded && drawer) {
                    toggle.setAttribute('aria-expanded', 'true');
                    drawer.classList.add('is-open');
                }
            });
        });
    });

    // Tabs functionality
    const tabContainers = document.querySelectorAll('.accordion-tabs__container');

    tabContainers.forEach(function(container) {
        const tabs = container.querySelectorAll('.accordion-tabs__tab');
        const panels = container.querySelectorAll('.accordion-tabs__panel');

        tabs.forEach(function(tab, index) {
            tab.addEventListener('click', function() {
                // Deactivate all tabs
                tabs.forEach(function(t) {
                    t.setAttribute('aria-selected', 'false');
                    t.setAttribute('tabindex', '-1');
                });

                // Hide all panels
                panels.forEach(function(panel) {
                    panel.setAttribute('hidden', '');
                    panel.classList.remove('tabs__panel--active');
                });

                // Activate clicked tab
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');

                // Show corresponding panel
                const panelId = tab.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);
                if (panel) {
                    panel.removeAttribute('hidden');
                    panel.classList.add('tabs__panel--active');
                }
            });

            // Keyboard navigation
            tab.addEventListener('keydown', function(e) {
                let targetTab = null;

                if (e.key === 'ArrowRight') {
                    targetTab = tabs[index + 1] || tabs[0];
                } else if (e.key === 'ArrowLeft') {
                    targetTab = tabs[index - 1] || tabs[tabs.length - 1];
                } else if (e.key === 'Home') {
                    targetTab = tabs[0];
                } else if (e.key === 'End') {
                    targetTab = tabs[tabs.length - 1];
                }

                if (targetTab) {
                    e.preventDefault();
                    targetTab.click();
                    targetTab.focus();
                }
            });
        });
    });
});