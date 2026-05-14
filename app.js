/**
 * CSSH - Client Side Controller
 * Handles view routing, authentication, and dynamic data injection.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* =======================================================
       1. Application Routing Logic
       ======================================================= */
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view-section');
    const actionLinks = document.querySelectorAll('[data-navigate]');

    const switchView = (targetId) => {
        navItems.forEach(item => item.classList.remove('active'));
        views.forEach(view => view.classList.remove('active'));

        const targetNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        const targetView = document.getElementById(targetId);

        if (targetNav) targetNav.classList.add('active');
        if (targetView) targetView.classList.add('active');

        document.getElementById('main-content').scrollTo({ top: 0, behavior: 'smooth' });
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); 
            const target = item.getAttribute('data-target');
            if (target) switchView(target);
        });
    });

    actionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-navigate');
            if (target) switchView(target);
        });
    });

    switchView('view-home'); // Initialize app view

    /* =======================================================
       2. Authentication & Data Injection Logic
       ======================================================= */
    const authOverlay = document.getElementById('auth-overlay');
    const switchAuthLinks = document.querySelectorAll('.switch-auth');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Dashboard elements to update
    const dashboardGreeting = document.querySelector('.user-greeting h2');
    const dashboardSchool = document.querySelector('.user-greeting p');

    // Toggle between Login and Signup forms
    switchAuthLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.auth-view').forEach(view => view.classList.remove('active'));
            document.getElementById(link.getAttribute('data-target')).classList.add('active');
        });
    });

    // Helper function to format the dashboard after login
    const authenticateUser = (name, school) => {
        // Update the DOM with the provided info
        dashboardGreeting.innerHTML = `Good morning, ${name} 👋`;
        dashboardSchool.innerHTML = school;
        
        // Hide the auth overlay with a smooth transition
        authOverlay.classList.add('hidden');
    };

    // Handle Sign Up
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get values from the inputs
        const userName = document.getElementById('signup-name').value;
        const userSchool = document.getElementById('signup-school').value;
        
        // In a real app, you'd send this to a backend. Here, we mock it:
        authenticateUser(userName, userSchool);
    });

    // Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Since we don't have a backend to fetch the real user data during login,
        // we'll extract the name from the email (e.g., "admin@school.com" -> "Admin")
        const email = document.getElementById('login-email').value;
        let inferredName = email.split('@')[0];
        // Capitalize the first letter
        inferredName = inferredName.charAt(0).toUpperCase() + inferredName.slice(1);
        
        authenticateUser(inferredName, "Government Secondary School, Ikorodu");
    });
});