// const container = document.getElementById('container');
// const registerbtn = document.getElementById('register');
// const loginbtn = document.getElementById('login');

// registerbtn.addEventListener('click',() =>{
//     container.classList.add("active");
// });

// loginbtn.addEventListener("click",() => {
//     container.classList.remove("active");
// });



document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const signUpForm = document.getElementById("signUpForm");
    const signInForm = document.getElementById("signInForm");

    // Toggle between Sign Up and Sign In
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');

    signupLink.onclick = function(event) {
        event.preventDefault(); // Prevent the default link behavior
        container.classList.add("active"); // Show the sign-up form
    };

    loginLink.onclick = function(event) {
        event.preventDefault(); // Prevent the default link behavior
        container.classList.remove("active"); // Show the sign-in form
    };

    // Handle Sign Up
    signUpForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission
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
        const userData = {
            name,
            email,
            password,
            gender // Save gender as part of the user data
        };

        // Save the user data in local storage with the email as the key
        localStorage.setItem(email, JSON.stringify(userData));

        // Clear the form fields
        signUpForm.reset();
        alert("Registration successful! You can now sign in.");
        container.classList.remove("active"); // Switch to sign in after registration
    });

    // Handle Sign In
    signInForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission
        const email = signInForm.querySelector("input[type='email']").value;
        const password = signInForm.querySelector("input[type='password']").value;

        // Retrieve the user data from local storage
        const storedUserData = localStorage.getItem(email);

        if (storedUserData) {
            const { password: storedPassword, gender } = JSON.parse(storedUserData);

            // Check if the password matches
            if (password === storedPassword) {
                alert("Sign in successful! Welcome back.");

                // Save login status and gender in localStorage
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userGender", gender);

                // Redirect to the desired webpage
                window.location.href = "index.html"; // Change this to your target page URL
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
