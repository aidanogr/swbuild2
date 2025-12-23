// ===== NAVIGATION TOGGLE =====
function toggleNav() {
    const nav = document.getElementById("nav");
    nav.classList.toggle("responsive");
}

// Close nav when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav ul li a:not(.icon)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById("nav");
            if (nav.classList.contains("responsive")) {
                nav.classList.remove("responsive");
            }
        });
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PORTFOLIO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Create dots
function createDots() {
    const dotsContainer = document.getElementById('sliderDots');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Update slider position
function updateSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update active slide
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

// Change slide
function changeSlide(direction) {
    currentSlide += direction;
    
    // Loop around
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    updateSlider();
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Auto-advance slider
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Pause auto-slide on hover
document.querySelector('.portfolio-slider')?.addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.portfolio-slider')?.addEventListener('mouseleave', startAutoSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
        stopAutoSlide();
        setTimeout(startAutoSlide, 10000); // Resume after 10 seconds
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
        stopAutoSlide();
        setTimeout(startAutoSlide, 10000);
    }
});

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    startAutoSlide();
});

// ===== GOOGLE MAPS =====
function initMap() {
    const center = { lat: 41.77, lng: -87.72 };
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 9,
        center: center,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{"weight": "2.00"}]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#9c9c9c"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{"visibility": "on"}]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{"color": "#f2f2f2"}]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{"color": "#2B4162"}, {"visibility": "on"}]
            }
        ]
    });
    
    const serviceAreaCoords = [
        { lat: 42.0884, lng: -87.9806 }, // Arlington Heights
        { lat: 42.0354, lng: -88.2826 }, // Elgin
        { lat: 41.9142, lng: -88.3087 }, // St. Charles
        { lat: 41.7606, lng: -88.3201 }, // Aurora
        { lat: 41.4553, lng: -88.2784 }, // Minooka
        { lat: 41.1200, lng: -87.8612 }, // Kankakee
        { lat: 41.4942, lng: -87.5214 }, // Dyer
        { lat: 41.6792, lng: -87.4945 }, // Whiting
        { lat: 42.0086, lng: -87.6609 }, // Near north Lake Michigan
        { lat: 42.0451, lng: -87.6877 }, // Evanston
        { lat: 42.0884, lng: -87.9806 }  // Back to Arlington Heights
    ];
    
    const serviceArea = new google.maps.Polygon({
        paths: serviceAreaCoords,
        strokeColor: "#de7326",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#de7326",
        fillOpacity: 0.35,
    });
    
    serviceArea.setMap(map);
    
    // Add marker at center
    new google.maps.Marker({
        position: center,
        map: map,
        title: "Southwest Builders",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#de7326",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2
        }
    });
}

// ===== FORM SUBMISSION =====
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send this to a server
    // For now, we'll just show a success message
    console.log('Form submitted:', formData);
    
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// ===== SAFARI SVG FIX =====
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        document.querySelectorAll('img').forEach(function(img) {
            if (img.src.endsWith('.svg')) {
                img.src = img.src.replace(/\.svg$/, '.png');
            }
        });
    }
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
