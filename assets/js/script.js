/**
 * Laundromat Modern V2 - Core JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Toggling ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle?.querySelector('i');

    const savedTheme = localStorage.getItem('v2_theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        if (icon) icon.classList.replace('bi-moon', 'bi-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('v2_theme', isDark ? 'dark' : 'light');

            if (isDark) {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-bs-theme');
            }

            if (icon) {
                icon.classList.replace(
                    isDark ? 'bi-moon' : 'bi-sun',
                    isDark ? 'bi-sun' : 'bi-moon'
                );
            }
        });
    }

    // --- 2. Dynamic Glass Navbar ---
    const navbar = document.querySelector('.glass-nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 3. Intersection Observer (Scroll Animations) ---
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on order in DOM if they appear together
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
