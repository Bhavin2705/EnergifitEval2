document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const signUpForm = document.getElementById("signUpForm");
    const signInForm = document.getElementById("signInForm");

    // Toggle between Sign Up and Sign In
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');

    signupLink.onclick = function(event) {
        event.preventDefault();
        container.classList.add("active");
    };

    loginLink.onclick = function(event) {
        event.preventDefault();
        container.classList.remove("active");
    };

    // Handle Sign Up
    signUpForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = signUpForm.querySelector("#name").value;
        const email = signUpForm.querySelector("#email").value;
        const password = signUpForm.querySelector("#password").value;
        const gender = signUpForm.querySelector("#gender").value;

        // Validate fields
        if (!name || !email || !password || !gender) {
            alert("Please fill in all fields.");
            return;
        }

        // Store user data in local storage
        const userData = { name, email, password, gender };
        localStorage.setItem(email, JSON.stringify(userData));

        signUpForm.reset();
        alert("Registration successful! You can now sign in.");
        container.classList.remove("active");
    });

    // Handle Sign In
    if (signInForm) {
        signInForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = signInForm.querySelector("input[type='email']").value;
            const password = signInForm.querySelector("input[type='password']").value;

            const storedUserData = localStorage.getItem(email);

            if (storedUserData) {
                const { password: storedPassword, gender, name } = JSON.parse(storedUserData);

                if (password === storedPassword) {
                    alert("Sign in successful! Welcome back.");

                    // Show the user icon with gender and name
                    showUserIcon(gender, name);
                    
                    // Save login status in localStorage
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userGender", gender);
                    localStorage.setItem("userName", name);
                    
                    // Redirect to the main page after a brief delay to show the icon
                    setTimeout(() => {
                        window.location.href = "index.html"; // Adjust to your home page path
                    }, 500); // Optional delay for the alert to show
                } else {
                    alert("Incorrect password. Please try again.");
                }
            } else {
                alert("No account found with this email. Please register.");
            }

            // Clear the form fields
            signInForm.reset();
        });
    } else {
        console.error("signInForm not found in the DOM.");
    }
});

// Function to show the user icon based on gender
function showUserIcon(gender, name) {
    const userIcon = document.getElementById('userIcon');
    const genderIcon = document.getElementById('genderIcon');
    const userName = document.getElementById('userName'); // Get userName element

    if (userIcon && genderIcon && userName) {
        userIcon.style.display = 'flex'; // Show the user icon
        genderIcon.textContent = gender === 'male' ? '♂️' : '♀️'; // Set gender icon
        userName.textContent = name; // Set user name
    } else {
        console.error("User icon or gender icon element not found.");
    }
}
