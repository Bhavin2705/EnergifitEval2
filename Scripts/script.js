// Check for user preference in localStorage on page load
const savedMode = localStorage.getItem('mode');
const body = document.body;
const navbar = document.querySelector('.navbar'); // Adjust this selector as necessary
const modeIcon = document.getElementById('modeIcon');
const lightStylesheet = document.getElementById('lightModeStylesheet');
const darkStylesheet = document.getElementById('darkModeStylesheet');

// Apply saved mode on page load
if (savedMode) {
    body.classList.add(savedMode);
    if (savedMode === 'dark-mode') {
        navbar.classList.add('dark-mode'); // Add dark mode class to navbar
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
        lightStylesheet.disabled = true;
        darkStylesheet.disabled = false;
    } else {
        // Ensure light mode styles are enabled
        lightStylesheet.disabled = false;
        darkStylesheet.disabled = true;
    }
}

// Toggle Light/Dark Mode for the entire website
// Toggle Light/Dark Mode for the entire website
function toggleMode() {
    const isLightMode = body.classList.contains('light-mode');

    if (isLightMode) {
        // Switch to dark mode
        body.classList.replace('light-mode', 'dark-mode'); // Use replace for better performance
        navbar.classList.add('dark-mode');
        modeIcon.classList.replace('fa-moon', 'fa-sun'); // Change icon to sun
        lightStylesheet.disabled = true;
        darkStylesheet.disabled = false;
        // Store the user's preference in localStorage
        localStorage.setItem('mode', 'dark-mode');
    } else {
        // Switch to light mode
        body.classList.replace('dark-mode', 'light-mode'); // Use replace for better performance
        navbar.classList.remove('dark-mode');
        modeIcon.classList.replace('fa-sun', 'fa-moon'); // Change icon to moon
        lightStylesheet.disabled = false;
        darkStylesheet.disabled = true;
        // Store the user's preference in localStorage
        localStorage.setItem('mode', 'light-mode');
    }
}


// Attach the toggle function to the mode icon click event
modeIcon.addEventListener('click', toggleMode);

// Select the navbar element
const banner = document.getElementById('banner'); // Make sure to define 'banner' here
const bannerHeight = banner ? banner.offsetHeight : 0; // Initialize bannerHeight

// Define the callback function to be executed on scroll
const onScroll = () => {
    // Change navbar background color on scroll
    if (window.scrollY > bannerHeight) {
        navbar.style.backgroundColor = '#333'; // Dark background
        navbar.style.color = '#fff'; // White text
    } else {
        navbar.style.backgroundColor = 'transparent'; // Reset to transparent
        navbar.style.color = '#000'; // Reset to black text
    }
};

// Add the scroll event listener to the window
window.addEventListener('scroll', onScroll);

// Slide show functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Function to show the current slide
function showSlide(index) {
    slides.forEach((slide) => {
        slide.classList.remove('active');
        slide.style.opacity = '0'; // Hide all slides
        slide.style.position = 'absolute'; // Ensure hidden slides stay in place
    });

    slides[index].classList.add('active');
    slides[index].style.opacity = '1'; // Show the active slide
    slides[index].style.position = 'relative'; // Ensure active slide is properly displayed
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Initialize the first slide
showSlide(currentSlide);

// Event listeners for navigation buttons
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);
