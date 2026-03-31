/**
 * NurtureBirth - Dashboard Script
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Initial State
    // Default tab is 'overview'
    showTab('overview');

    // 2. Sample Dynamic Logic: Due Date Countdown
    // Assuming a target date (e.g., 84 days from now)
    initCountdown();
});

/**
 * Switch dashboard tabs
 * @param {string} tabID - The ID prefix of the tab to show
 * @param {HTMLElement} element - The clicked nav link
 */
window.showTab = (tabID, element = null) => {
    // Hide all tabs
    const tabs = document.querySelectorAll('.dashboard-tab');
    tabs.forEach(tab => tab.classList.add('d-none'));

    // Show target tab
    const target = document.getElementById(`${tabID}-tab`);
    if (target) {
        target.classList.remove('d-none');
    }

    // Update active state in sidebar
    if (element) {
        const links = document.querySelectorAll('.nav-sidebar-link');
        links.forEach(link => link.classList.remove('active'));
        element.classList.add('active');
    }

    // Close mobile sidebar if open
    const sidebar = document.querySelector('.sidebar-nav');
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
};

/**
 * Simple Countdown Logic
 */
function initCountdown() {
    const countdownEl = document.getElementById('days-left');
    if (countdownEl) {
        // Just for demo: randomize slightly or keep static
        let days = parseInt(countdownEl.innerText);
        // Logic could go here for real date diff
    }
}

/**
 * Mobile Sidebar Toggle logic (redundant helper if not using inline onclick)
 */
window.toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar-nav');
    sidebar.classList.toggle('active');
};
