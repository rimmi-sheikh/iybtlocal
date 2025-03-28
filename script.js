document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Toggle mobile menu
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.classList.remove('no-scroll');
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
    
    // ===== COUNTDOWN TIMER (ALL PAGES) =====
    function updateCountdown() {
        const eventDate = new Date('August 10, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Safely update elements if they exist on page
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Initialize countdown if elements exist
    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if this is an external link
            if (this.getAttribute('href').startsWith('#') === false) return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.classList.remove('no-scroll');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    function setActiveNavLink() {
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if ((currentPage === 'index.html' && linkPage === '#home') || 
                linkPage.includes(currentPage)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveNavLink();
});

// ===== POLYFILLS =====
// Smooth scrolling polyfill
if (typeof window.scrollBehavior === 'undefined') {
    window.scrollBehavior = function(options) {
        const start = window.pageYOffset;
        const target = options.top + start;
        const duration = options.behavior === 'smooth' ? 500 : 0;
        const startTime = performance.now();
        
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = function(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t };
            
            window.scrollTo(0, start + (target - start) * ease(progress));
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        
        if (duration > 0) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, target);
        }
    };
}

// ===== MOBILE VIEWPORT FIX =====
function mobileViewportFix() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', mobileViewportFix);
mobileViewportFix();