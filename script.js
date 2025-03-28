document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Toggle mobile menu
    function toggleMenu() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        document.body.classList.toggle('no-scroll');
    }
    
    burger.addEventListener('click', toggleMenu);
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // ===== TOURNAMENT PAGE DROPDOWNS =====
    if (document.querySelector('.dropdown-btn')) {
        document.querySelectorAll('.dropdown-btn').forEach(button => {
            button.addEventListener('click', () => {
                const dropdownItem = button.parentElement;
                dropdownItem.classList.toggle('active');
                
                // Rotate chevron icon
                const icon = button.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-chevron-up');
                    icon.classList.toggle('fa-chevron-down');
                }
            });
        });
    }
    
    // ===== COUNTDOWN TIMER =====
    function updateCountdown() {
        const eventDate = new Date('August 10, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Safely update elements
        const updateElement = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value.toString().padStart(2, '0');
        };
        
        updateElement('days', days);
        updateElement('hours', hours);
        updateElement('minutes', minutes);
        updateElement('seconds', seconds);
    }
    
    // Initialize countdown if elements exist
    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
                
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    history.pushState(null, null, this.getAttribute('href'));
                }
            }
        });
    });
    
    // ===== ACTIVE LINK HIGHLIGHTING =====
    function setActiveNavLink() {
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === currentPage || 
                (currentPage === 'index.html' && link.getAttribute('href') === '#home')
            );
        });
    }
    setActiveNavLink();
    
    // ===== RESPONSIVE ADJUSTMENTS =====
    function handleResize() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    }
    window.addEventListener('resize', handleResize);
});

// ===== MOBILE VIEWPORT FIX =====
function mobileViewportFix() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
window.addEventListener('resize', mobileViewportFix);
mobileViewportFix();