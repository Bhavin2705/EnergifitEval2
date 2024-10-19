// Redirect to Login Page
function redirectToLogin() {
    window.location.href = './login.html'; // Replace with your actual login page URL
}

// Apply Dark Mode (assuming dark mode styles are defined)
const body = document.body;
const navbar = document.querySelector('.navbar');
const darkStylesheet = document.getElementById('darkModeStylesheet');

body.classList.add('dark-mode');
navbar.classList.add('dark-mode');
darkStylesheet.disabled = false;

// Banner scroll effect
const banner = document.getElementById('banner');
const bannerHeight = banner ? banner.offsetHeight : 0;

const onScroll = () => {
    if (window.scrollY > bannerHeight) {
        navbar.style.backgroundColor = '#333';
        navbar.style.color = '#fff';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.color = '#000';
    }
};
window.addEventListener('scroll', onScroll);

// Carousel logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.position = 'absolute';
    });

    slides[index].classList.add('active');
    slides[index].style.opacity = '1';
    slides[index].style.position = 'relative';
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}
setInterval(nextSlide, 5000);
showSlide(currentSlide);

// Cookie Banner
function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    banner.classList.remove('hidden');
    banner.classList.add('show');
}

function acceptCookies() {
    console.log('Cookies accepted');
    document.getElementById('cookie-banner').style.display = 'none';
}

function denyCookies() {
    console.log('Cookies denied');
    document.getElementById('cookie-banner').style.display = 'none';
}
setTimeout(showCookieBanner, 3500);

document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
document.getElementById('deny-cookies').addEventListener('click', denyCookies);

function showUserIcon(gender) {
    const userIcon = document.getElementById('userIcon');
    const genderIcon = document.getElementById('genderIcon');
    const registerNowButton = document.getElementById('registerNow');

    if (gender === 'male') {
        genderIcon.src = './assets/male-icon.png';
    } else if (gender === 'female') {
        genderIcon.src = './assets/female-icon.png';
    } else {
        genderIcon.src = './assets/default-icon.png';
    }

    userIcon.style.display = 'flex';
    registerNowButton.style.display = 'none';
}

document.getElementById('logout').onclick = function () {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    document.getElementById('userIcon').style.display = 'none';
    document.getElementById('registerNow').style.display = 'block';
    alert('You have logged out.');
};
