const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");


form.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Get input values
    const email = document
        .getElementById("email")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value;


    // Show loading message
    message.innerHTML = `
        <p style="color: #555;">
            ⏳ Logging in...
        </p>
    `;


    try {

        // Send login request to FastAPI
        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });


        // Convert response to JSON
        const data = await response.json();


        console.log("Login response:", data);


        // Successful login
        if (response.ok && data.success === true) {

            message.innerHTML = `
                <p style="color: green;">
                    ✅ ${data.message}
                </p>
            `;


            // Redirect to dashboard
            setTimeout(function () {

                window.location.href = "/dashboard";

            }, 700);


        } else {

            // Login failed
            message.innerHTML = `
                <p style="color: red;">
                    ❌ ${data.message}
                </p>
            `;

        }


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        message.innerHTML = `
            <p style="color: red;">
                ❌ Unable to connect to the server.
            </p>
        `;

    }

});