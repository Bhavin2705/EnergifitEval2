

function redirectToLogin() {
    window.location.href = 'login.html'; // Change this to your actual login page URL
}

const body = document.body;
const navbar = document.querySelector('.navbar');
const darkStylesheet = document.getElementById('darkModeStylesheet');

body.classList.add('dark-mode');
navbar.classList.add('dark-mode');
darkStylesheet.disabled = false;

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

// Function to show the cookie banner after a delay
function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    banner.classList.remove('hidden'); // Show the banner
    banner.classList.add('show'); // Add the show class for animation
}

// Function to handle cookie acceptance
function acceptCookies() {
    console.log('Cookies accepted');
    document.getElementById('cookie-banner').style.display = 'none';
}

// Function to handle cookie denial
function denyCookies() {
    console.log('Cookies denied');
    document.getElementById('cookie-banner').style.display = 'none';
}

// Use setTimeout to delay the banner appearance
setTimeout(showCookieBanner, 3500); // Show the banner after 2 seconds

// Event listeners for buttons
document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
document.getElementById('deny-cookies').addEventListener('click', denyCookies);



// Assume this function runs after successful login
function showUserIcon(gender) {
    const userIcon = document.getElementById('userIcon');
    userIcon.style.display = 'block';

    const genderIcon = document.getElementById('genderIcon');
    genderIcon.textContent = gender === 'male' ? '♂' : '♀'; // Set icon based on gender
}

// Logout functionality
document.getElementById('logout').onclick = function() {
    localStorage.removeItem('username'); // Clear stored username
    localStorage.removeItem('password'); // Clear stored password
    document.getElementById('userIcon').style.display = 'none'; // Hide user icon
    alert('You have logged out.');
};

// Example login logic (to be integrated into your login handling)
document.getElementById('signInForm').onsubmit = function(e) {
    e.preventDefault(); // Prevent default form submission

    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (email === storedUsername && password === storedPassword) {
        alert('Login successful!');
        showUserIcon('male'); // Change this to dynamically retrieve user gender
        document.querySelector('.sign-in').style.display = 'none'; // Optionally hide sign-in form
    } else {
        alert('Invalid username or password.');
    }
};
