﻿
document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    function closeAll(exceptDropdown) {
        document.querySelectorAll('.cio__dropdown-list').forEach(function (d) {
            if (d !== exceptDropdown) d.classList.add('hidden');
        });
        document.querySelectorAll('.dropdown-toggle .chevron-icon').forEach(function (c) {
            if (!exceptDropdown) {
                c.classList.remove('rotate-180');
            } else {
                const parent = c.closest('.cio__nav-dropdown');
                const ownDropdown = parent ? parent.querySelector('.cio__dropdown-list') : null;
                if (ownDropdown !== exceptDropdown) c.classList.remove('rotate-180');
            }
        });
    }

    dropdownToggles.forEach(function (toggle) {
        const parentDropdownItem = toggle.closest('.cio__nav-dropdown');
        const dropdown = parentDropdownItem ? parentDropdownItem.querySelector('.cio__dropdown-list') : toggle.nextElementSibling;
        const chevron = toggle.querySelector('.chevron-icon');

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!dropdown) return;
            const isVisible = !dropdown.classList.contains('hidden');

            if (isVisible) {
                dropdown.classList.add('hidden');
                if (chevron) chevron.classList.remove('rotate-180');
            } else {
                closeAll(dropdown);
                dropdown.classList.remove('hidden');
                if (chevron) chevron.classList.add('rotate-180');
            }
        });

        // Close dropdown when a link inside it is clicked (selecting a menu item)
        if (dropdown) {
            dropdown.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    closeAll();
                });
            });
        }
    });

    window.addEventListener('click', function (e) {
        // normalize to an Element in case the target is a text node
        var target = e.target;
        while (target && target.nodeType !== 1) {
            target = target.parentNode;
        }

        if (!target || !target.closest || !target.closest('.cio__nav-dropdown')) {
            closeAll();
        }
    });

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuCloseButton = document.getElementById('mobile-menu-close-button');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const opening = !mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', String(!mobileMenu.classList.contains('open')));
  });
}

if (mobileMenuCloseButton && mobileMenu) {
  mobileMenuCloseButton.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
}

/* Optional: close menu when a link is clicked (mobile behavior) */
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

  // Toggle plus/minus icons inside mobile menu <details> summaries
  try {
    const mobileDetails = document.querySelectorAll('#mobile-menu details');
    mobileDetails.forEach(function (d) {
      const plus = d.querySelector('.plus-icon');
      const minus = d.querySelector('.minus-icon');

      function updateIcons() {
        if (d.open) {
          if (plus) plus.classList.add('hidden');
          if (minus) minus.classList.remove('hidden');
        } else {
          if (plus) plus.classList.remove('hidden');
          if (minus) minus.classList.add('hidden');
        }
      }

      // initial state
      updateIcons();

      // details supports the 'toggle' event when opened/closed
      d.addEventListener('toggle', updateIcons);
    });
  } catch (err) {
    // ignore if mobileMenu not present
  }
});