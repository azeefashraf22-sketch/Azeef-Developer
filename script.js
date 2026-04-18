// 1. PRELOADER LOGIC
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('loader-hidden');
            document.body.classList.remove('loading');
        }
        if (typeof AOS !== 'undefined') AOS.refresh();
    }, 1000);
});

// 2. NAVIGATION & MOBILE MENU
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// 3. SCROLL EFFECTS (NAVBAR & ACTIVE LINKS)
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);

    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
});

// 4. TYPED.JS INITIALIZATION
if (typeof Typed !== 'undefined' && document.getElementById('typed-output')) {
    new Typed('#typed-output', {
        strings: ['Full Stack Developer', 'MERN Stack Expert', 'UI/UX Enthusiast', 'Problem Solver'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });
}

// 5. AOS ANIMATION INITIALIZATION
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true, offset: 100 });
}

// 6. DARK/LIGHT THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('i');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark' && themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// 7. CONTACT FORM INTEGRATION 
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        let isValid = true;

        for (let [key, value] of formData.entries()) {
            if (value.trim().length === 0) {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            showValidationErrorToast();
            return;
        }

        const btn = document.getElementById('submit-btn');
        const originalText = btn.innerText;

        // Show Loading State
        btn.innerText = 'Sending...';
        btn.disabled = true;

        // EmailJS Credentials
        const serviceID = 'service_htlbvwg';
        const templateID = 'template_wosxtln';

        // REAL EMAIL SENDING LOGIC (LIVE)
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // Success State
                btn.innerText = originalText;
                btn.disabled = false;
                showSuccessToast();
                contactForm.reset();
            }, (err) => {
                // Error State
                btn.innerText = originalText;
                btn.disabled = false;
                showErrorToast();
                console.error('EmailJS Error:', err);
            });
    });
}


// 1. Success Toast
function showSuccessToast() {
    Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        width: '280px',
        background: '#ffffff',
        color: '#333',
        icon: 'success',
        title: 'Message sent!',
        didOpen: (toast) => {
            toast.style.borderRadius = '12px';
            toast.style.marginTop = '20px';
            toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            toast.style.padding = '10px 15px';
        }
    });
}

// 2. Error Toast
function showErrorToast() {
    Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        width: '280px',
        background: '#ffffff',
        color: '#333',
        icon: 'error',
        title: 'Error occurred!',
        didOpen: (toast) => {
            toast.style.borderRadius = '12px';
            toast.style.marginTop = '20px';
            toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            toast.style.padding = '10px 15px';
        }
    });
}

// 3. Validation Error (Updated width for single line text)
function showValidationErrorToast() {
    Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        width: '300px',
        background: '#fff3cd',
        color: '#856404',
        icon: 'warning',
        title: 'Please fill all fields!',
        didOpen: (toast) => {
            toast.style.borderRadius = '12px';
            toast.style.marginTop = '20px';
            toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            toast.style.padding = '10px 15px';
            const title = toast.querySelector('.swal2-title');
            if (title) title.style.whiteSpace = 'nowrap';
        }
    });
}