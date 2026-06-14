

document.addEventListener('DOMContentLoaded', () => {

    
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const body = document.body;

    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }

    // Toggle 
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'light');
            showToast('Switched to Light Mode ☀️');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'dark');
            showToast('Switched to Dark Mode 🌙');
        }
    });


    
    const navbar = document.getElementById('navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check on load


    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    
    const progressBars = document.querySelectorAll('.progress');
    
    // Store target width and reset to 0 for scroll animation trigger
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        bar.dataset.targetWidth = targetWidth;
    });


    
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a skills category card, animate its progress bars
                if (entry.target.classList.contains('skills-category')) {
                    const categoryBars = entry.target.querySelectorAll('.progress');
                    categoryBars.forEach(bar => {
                        bar.style.width = bar.dataset.targetWidth;
                    });
                }
                
                // Unobserve once revealed to keep performance high
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Viewport
        threshold: 0.15, 
        rootMargin: '0px 0px -50px 0px' 
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    
    const sections = document.querySelectorAll('section');

    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        threshold: 0.5, // Trigger when section occupies 50% of the viewport
        rootMargin: '-80px 0px -20% 0px' // Adjust for sticky navbar offset
    });

    sections.forEach(section => {
        activeLinkObserver.observe(section);
    });


    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Basic client-side validation check
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showToast('Please fill out all fields ⚠️', 'warning');
            return;
        }

        // Simulate form submission (e.g. Formspree / backend call)
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

        setTimeout(() => {
            // Success Simulation
            showToast('Message sent successfully! 🚀');
            contactForm.reset();
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }, 1500);
    });


    
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMsg = toast.querySelector('.toast-message');
    let toastTimeout;

    function showToast(message, type = 'success') {
        // Clear existing timeout if showing another toast quickly
        clearTimeout(toastTimeout);

        toastMsg.textContent = message;
        
        if (type === 'success') {
            toastIcon.className = 'fa-solid fa-circle-check toast-icon';
            toastIcon.style.color = '#22c55e';
            toast.style.borderColor = 'rgba(34, 197, 94, 0.4)';
        } else {
            toastIcon.className = 'fa-solid fa-circle-exclamation toast-icon';
            toastIcon.style.color = '#eab308';
            toast.style.borderColor = 'rgba(234, 179, 8, 0.4)';
        }

        toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
});
