/* ==========================================================================
   TRANQUILO LOUNGE AND DINNER - INTERACTIVE SCRIPT
   Bilwi, Puerto Cabezas, Nicaragua
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initHeroSlideshow();
    initMobileNav();
    initScrollReveal();
    initMenuTabs();
});

/**
 * 1. Header Scroll Behavior
 * Shrinks padding and adds solid black background when scrolled.
 */
function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("collapsed");
        } else {
            header.classList.remove("collapsed");
        }
    };

    // Run on init in case user reloads scrolled
    handleScroll();
    window.addEventListener("scroll", handleScroll);
}

/**
 * 2. Hero Background Slideshow
 * Automatically rotates background images with a cross-fade transition.
 */
function initHeroSlideshow() {
    const slides = document.querySelectorAll(".gallery__item");
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const intervalTime = 6000; // 6 seconds per slide

    setInterval(() => {
        // Remove active class from current slide
        slides[currentIndex].classList.remove("active");

        // Calculate next slide index
        currentIndex = (currentIndex + 1) % slides.length;

        // Add active class to next slide
        slides[currentIndex].classList.add("active");
    }, intervalTime);
}

/**
 * 3. Mobile Navigation Drawer
 * Toggles fullscreen menu slide-in on mobile viewport.
 */
function initMobileNav() {
    const toggleBtn = document.querySelector(".nav-toggle-btn");
    const navDrawer = document.querySelector(".mobile-nav-drawer");
    const drawerLinks = document.querySelectorAll(".mobile-nav-menu .site-nav-link");

    if (!toggleBtn || !navDrawer) return;

    const toggleMenu = () => {
        const isOpen = navDrawer.classList.toggle("open");
        toggleBtn.classList.toggle("open", isOpen);
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    };

    toggleBtn.addEventListener("click", toggleMenu);

    // Close menu when clicking on any link
    drawerLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navDrawer.classList.contains("open")) {
                toggleMenu();
            }
        });
    });
}

/**
 * 4. Intersection Observer for Scroll Reveals
 * Adds active class to elements as they enter the screen for elegant fade-up animations.
 */
function initScrollReveal() {
    const revealables = document.querySelectorAll(".revealable");
    if (revealables.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealables.forEach(el => observer.observe(el));
}

/**
 * 5. Menu Categories Tab Switching
 * Toggles active class on tab content blocks on menu.html.
 */
function initMenuTabs() {
    const tabBtns = document.querySelectorAll(".menu-tab-btn");
    const tabContents = document.querySelectorAll(".menu-tab-content");

    if (tabBtns.length === 0 || tabContents.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");

            // Deactivate all buttons & hide all contents
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            // Activate current button & show corresponding content
            btn.classList.add("active");
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });
}
