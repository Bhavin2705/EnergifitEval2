function redirectToLogin() {
    window.location.href = 'login.html'; // Change this to your actual login page URL
}

const body = document.body;
const navbar = document.querySelector('.navbar');
const darkStylesheet = document.getElementById('darkModeStylesheet');

// Apply dark mode styles
body.classList.add('dark-mode');
navbar.classList.add('dark-mode');
darkStylesheet.disabled = false;

const banner = document.getElementById('banner');
const bannerHeight = banner ? banner.offsetHeight : 0;

const userIcon = document.getElementById("userIcon");

// Function to update login status in local storage
function updateUserLoginStatus(email, status) {
    if (localStorage.getItem(email)) { // Directly check if the email exists in local storage
        let userData = JSON.parse(localStorage.getItem(email));
        userData.loggedIn = status; // Set loggedIn flag
        localStorage.setItem(email, JSON.stringify(userData)); // Update localStorage
    }
}

// Function to check if user is logged in and show/hide UI elements accordingly
function checkUserStatus() {
    let userData;

    // Loop through localStorage to find user data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes("@")) { // Check if any email is stored
            userData = JSON.parse(localStorage.getItem(key));
            if (userData.loggedIn) {
                break;
            } else {
                userData = null; // Ensure data is reset if not logged in
            }
        }
    }

    // Show/hide elements based on login status
    if (!userData) {
        document.getElementById('registerNow').style.display = 'block'; // Show register button
        userIcon.style.display = 'none'; // Hide user icon
    } else {
        document.getElementById('registerNow').style.display = 'none'; // Hide register button
        userIcon.style.display = 'flex'; // Show user icon
        updateContentBasedOnGender(); // Update content based on gender
    }
}

// Function to update content based on gender
function updateContentBasedOnGender() {
    const gender = localStorage.getItem('gender'); // Retrieve gender from local storage

    const contentData = {
        male: {
            welcomeMessage: "Welcome to Energifit, gentlemen!",
            features: ["Personal Training", "Nutrition Plans", "Exclusive Men's Workouts"],
            image: "path/to/male-image.jpg"
        },
        female: {
            welcomeMessage: "Welcome to Energifit, ladies!",
            features: ["Personal Training", "Nutrition Plans", "Exclusive Women's Workouts"],
            image: "path/to/female-image.jpg"
        }
    };

    if (gender && contentData[gender]) {
        document.getElementById('welcome-message').textContent = contentData[gender].welcomeMessage;

        const featuresList = document.getElementById('features-list');
        featuresList.innerHTML = ''; // Clear existing content
        contentData[gender].features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        const genderImage = document.getElementById('gender-image');
        genderImage.src = contentData[gender].image;
    }
}

// Initial call to check user status
checkUserStatus();

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
    banner.classList.remove('hidden');
    banner.classList.add('show'); // Add the show class for animation
}

// Function to handle cookie acceptance
function acceptCookies() {
    document.getElementById('cookie-banner').style.display = 'none';
}

// Function to handle cookie denial
function denyCookies() {
    document.getElementById('cookie-banner').style.display = 'none';
}

// Use setTimeout to delay the banner appearance
setTimeout(showCookieBanner, 3500); // Show the banner after 3.5 seconds

// Event listeners for buttons
document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
document.getElementById('deny-cookies').addEventListener('click', denyCookies);

// Simulate login success (call this function after successful login)
function loginSuccess(email) {
    updateUserLoginStatus(email, true); // Update the loggedIn flag
    checkUserStatus(); // Update UI based on new login status
}

// Simulate logout functionality
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link action
    updateUserLoginStatus(localStorage.getItem('loggedInEmail'), false); // Update the loggedIn flag
    document.getElementById('registerNow').style.display = 'block'; // Show register button
    userIcon.style.display = 'none'; // Hide user icon
});

document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent event bubbling
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show'); // Toggle the 'show' class
        });
    }

    window.addEventListener('click', function (event) {
        if (!event.target.closest('.user-icon-container')) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
});
