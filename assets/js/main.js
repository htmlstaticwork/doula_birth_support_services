/**
 * Doula & Birth Support Services - Main Script
 * Version: 1.0.0
 * Features: Dark Mode, RTL, Sticky Nav, Preloader
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Initial State / Theme Check
    initTheme();
    initRTL();

    // 2. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 500);
            }, 1000);
        });
    }

    // 3. Sticky Navbar
    const navbar = document.querySelector('.navbar');
    const navbarStartsTransparent = navbar ? navbar.hasAttribute('data-starts-transparent') : false;
    window.addEventListener('scroll', () => {
        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        if (window.scrollY > 50) {
            if (navbar) {
                navbar.classList.add('scrolled');
                if (isDark) {
                    navbar.classList.add('navbar-dark', 'bg-dark');
                    navbar.classList.remove('navbar-light', 'bg-white');
                } else {
                    navbar.classList.add('navbar-light', 'bg-white');
                    navbar.classList.remove('navbar-dark', 'bg-dark');
                }
                
                if (navbarStartsTransparent) {
                    navbar.classList.remove('bg-transparent');
                }
            }
        } else {
            if (navbar) {
                navbar.classList.remove('scrolled', 'navbar-light', 'bg-white', 'navbar-dark', 'bg-dark');
                if (navbarStartsTransparent) {
                    navbar.classList.add('navbar-dark', 'bg-transparent');
                }
            }
        }
    });

    // 4. Scroll-to-top control
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.type = 'button';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up-short fs-4"></i>';
    document.body.appendChild(scrollBtn);

    const toggleScrollBtn = () => {
        if (window.scrollY > 250) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleScrollBtn);
    toggleScrollBtn();

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Dark Mode Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // 6. RTL Toggle (Demo Purposes)
    const rtlBtn = document.getElementById('rtl-toggle');
    if (rtlBtn) {
        rtlBtn.addEventListener('click', toggleRTL);
    }

    // 7. Active Link Highlighting
    highlightActiveLink();

    // 8. Form Validation (Bootstrap 5)
    initForms();

    // 9. Offcanvas helpers (improve mobile/ tablet menu interactivity)
    initOffcanvasMenu();
});

/* --- FUNCTIONS --- */

/**
 * Persists theme state
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

/**
 * Handle RTL support
 */
function initRTL() {
    const savedRTL = localStorage.getItem('rtl') === 'true';
    if (savedRTL) document.documentElement.setAttribute('dir', 'rtl');
}

function toggleRTL() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    document.documentElement.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
    localStorage.setItem('rtl', !isRTL);
}

/**
 * Highlighting active page link in Navbar
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Bootstrap validation starter
 */
function initForms() {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

/**
 * Init offcanvas helpers so the mobile menu closes on link tap and aria-expanded is accurate.
 */
function initOffcanvasMenu() {
    // Wait for Bootstrap to be fully loaded
    const checkBootstrap = () => {
        if (typeof bootstrap !== 'undefined' && typeof bootstrap.Offcanvas !== 'undefined') {
            const offcanvasElement = document.getElementById('offcanvasNavbar');
            const toggler = document.querySelector('.navbar-toggler[data-bs-target="#offcanvasNavbar"]');
            if (!offcanvasElement || !toggler) return;

            // Create Bootstrap offcanvas instance
            const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
            
            // Update aria-expanded attributes
            offcanvasElement.addEventListener('shown.bs.offcanvas', () => toggler.setAttribute('aria-expanded', 'true'));
            offcanvasElement.addEventListener('hidden.bs.offcanvas', () => toggler.setAttribute('aria-expanded', 'false'));

            // Close menu when clicking on nav links (except dropdown toggles)
            const navLinks = offcanvasElement.querySelectorAll('.nav-link:not(.dropdown-toggle)');
            navLinks.forEach(link => link.addEventListener('click', () => offcanvas.hide()));
        } else {
            // If Bootstrap is not ready, wait and check again
            setTimeout(checkBootstrap, 100);
        }
    };
    
    checkBootstrap();
    
    // Fallback: Manual toggle if Bootstrap offcanvas fails
    const toggler = document.querySelector('.navbar-toggler[data-bs-target="#offcanvasNavbar"]');
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const closeBtn = offcanvasElement?.querySelector('.btn-close');
    
    if (toggler && offcanvasElement) {
        toggler.addEventListener('click', (e) => {
            e.preventDefault();
            offcanvasElement.classList.toggle('show');
            toggler.setAttribute('aria-expanded', offcanvasElement.classList.contains('show'));
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            offcanvasElement.classList.remove('show');
            toggler.setAttribute('aria-expanded', 'false');
        });
    }
}

/**
 * Password Visibility Toggle
 */
window.togglePassword = (btn) => {
    const input = btn.parentElement.querySelector('input');
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
};
