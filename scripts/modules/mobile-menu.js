export function initMobileMenu() {
    // your code goes here
}

  // Function to control the mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if the elements exist
    if (mobileMenuBtn && navLinks) {
        // Event listener for the menu button
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle the 'mobile-active' class on the menu
            navLinks.classList.toggle('mobile-active');
            
            // Change the icon 
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('mobile-active')) {
                    icon.className = 'fas fa-times'; // X icon
                } else {
                    icon.className = 'fas fa-bars'; // hamburger icon
                }
            }
        });
        
        // Close the menu when clicking on a link
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-active');
                // Revert the icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });
        
        // Close the menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnMenuButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnMenuButton && navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                // Revert the icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
});
