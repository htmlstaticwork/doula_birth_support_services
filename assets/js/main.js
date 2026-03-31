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
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'navbar-light', 'bg-white');
        } else {
            navbar.classList.remove('scrolled', 'navbar-light', 'bg-white');
        }
    });

    // 4. Dark Mode Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // 5. RTL Toggle (Demo Purposes)
    const rtlBtn = document.getElementById('rtl-toggle');
    if (rtlBtn) {
        rtlBtn.addEventListener('click', toggleRTL);
    }

    // 6. Active Link Highlighting
    highlightActiveLink();

    // 7. Form Validation (Bootstrap 5)
    initForms();
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
