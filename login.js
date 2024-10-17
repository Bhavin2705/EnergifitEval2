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
    signInForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = signInForm.querySelector("input[type='email']").value;
        const password = signInForm.querySelector("input[type='password']").value;

        const storedUserData = localStorage.getItem(email);

        if (storedUserData) {
            const { password: storedPassword, gender } = JSON.parse(storedUserData);

            if (password === storedPassword) {
                alert("Sign in successful! Welcome back.");

                // Save login status and gender in localStorage
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userGender", gender);
                
                // Redirect to index.html after successful login
                window.location.href = "index.html"; // Redirect to the main page
            } else {
                alert("Incorrect password. Please try again.");
            }
        } else {
            alert("No account found with this email. Please register.");
        }

        // Clear the form fields
        signInForm.reset();
    });
});
