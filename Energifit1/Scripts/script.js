let logoutTimer;

// Function to redirect to the login page
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

const userIcon = document.getElementById("userIcon");

// Function to check if user is logged in and show/hide UI elements accordingly
function checkUserStatus() {
    let userData;

    // Loop through localStorage to find user data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes("@gmail.com")) {
            userData = JSON.parse(localStorage.getItem(key));
            break;
        }
    }

    // If userData is not found or user is not logged in
    if (!userData || !userData.loggedIn) {
        console.log("User not logged in or no stored data");
        document.getElementById('registerNow').style.display = 'block'; // Show register button
        userIcon.style.display = 'none'; // Hide user icon
    } else {
        // If user is logged in
        console.log("User logged in");
        document.getElementById('registerNow').style.display = 'none'; // Hide register button
        userIcon.style.display = 'flex'; // Show user icon

        // Start the logout timer
        startLogoutTimer();

        // Call the function to update content based on gender
        updateContentBasedOnGender();
    }
}

// Function to update content based on gender
function updateContentBasedOnGender() {
    const gender = localStorage.getItem('gender'); // Retrieve gender from local storage

    // JSON data for gender-specific content
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

    // Update the DOM with the retrieved content
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

// Start the logout timer
function startLogoutTimer() {
    // Set the timer for 10 minutes (600000 milliseconds)
    logoutTimer = setTimeout(() => {
        logout(); // Call the logout function when the timer expires
    }, 600000); // Change this duration as needed
}

// Function to log out the user
function logout() {
    // Show the register button
    document.getElementById('registerNow').style.display = 'block';

    // Hide the user icon dropdown
    document.getElementById('userIcon').style.display = 'none';

    // Clear user-related data (optional)
    localStorage.removeItem('gender'); // Clear the gender data if necessary
    // You can also clear any other relevant user data stored in localStorage

    console.log("User logged out automatically due to inactivity.");
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
setTimeout(showCookieBanner, 3500); // Show the banner after 3.5 seconds

// Event listeners for buttons
document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
document.getElementById('deny-cookies').addEventListener('click', denyCookies);

// Simulate login success (call this function after successful login)
function loginSuccess() {
    // Hide the register button
    document.getElementById('registerNow').style.display = 'none';

    // Show the user icon dropdown
    document.getElementById('userIcon').style.display = 'flex';

    // Start the logout timer
    startLogoutTimer();
}

// Simulate logout functionality
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link action

    // Clear the logout timer
    clearTimeout(logoutTimer);

    // Log the user out
    logout();
});

document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to the dropdown toggle button
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent event bubbling
            const dropdownMenu = this.nextElementSibling; // Select the dropdown menu
            dropdownMenu.classList.toggle('show'); // Toggle the 'show' class
        });
    }

    // Hide dropdown on clicking outside
    window.addEventListener('click', function (event) {
        if (!event.target.closest('.user-icon-container')) { // Check if click is outside the dropdown
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
});
