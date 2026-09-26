const form = document.getElementById("registerForm");
const message = document.getElementById("registerMessage");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.innerHTML = "⏳ Creating your account...";

    try {

        const response = await fetch("/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        console.log("Registration response:", data);

        if (response.ok && data.success === true) {

            message.innerHTML = `
                <p style="color: green;">
                    ✅ ${data.message}
                </p>
            `;

            form.reset();

        } else {

            message.innerHTML = `
                <p style="color: red;">
                    ❌ Registration failed
                </p>

                <p>
                    ${data.message || "Unknown error"}
                </p>
            `;
        }

    } catch (error) {

        console.error("Registration error:", error);

        message.innerHTML = `
            <p style="color: red;">
                ❌ Unable to connect to the server.
            </p>
        `;
    }

});