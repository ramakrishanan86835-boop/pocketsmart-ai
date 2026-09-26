const form = document.getElementById("homeForm");
const result = document.getElementById("result");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const budget = Number(document.getElementById("budget").value);
    const room = document.getElementById("room").value;
    const style = document.getElementById("style").value;
    const itemsText = document.getElementById("items").value;

    const required_items = itemsText
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");

    const requestData = {
        budget: budget,
        room: room,
        style: style,
        required_items: required_items
    };

    result.innerHTML = `
        <p>⏳ Generating your PocketSmart AI plan...</p>
    `;

    try {
        const response = await fetch("/generate-home", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        /*
         * Read the response first.
         * This helps us see the actual FastAPI error
         * instead of showing only "Unable to connect".
         */
        const responseText = await response.text();

        if (!response.ok) {
            console.error(
                "Backend error:",
                response.status,
                responseText
            );

            throw new Error(
                `Backend returned ${response.status}: ${responseText}`
            );
        }

        const data = JSON.parse(responseText);

        let html = "";

        html += `
            <h3>🏠 Your Home Recommendation</h3>

            <p>
                <strong>Room:</strong>
                ${data.room}
            </p>

            <p>
                <strong>Style:</strong>
                ${data.style}
            </p>

            <p>
                <strong>Budget:</strong>
                ₹${Number(data.budget).toLocaleString()}
            </p>
        `;

        /* Products */

        html += `
            <hr>
            <h3>🛋️ Recommended Products</h3>
        `;

        if (
            !data.recommended_products ||
            data.recommended_products.length === 0
        ) {

            html += `
                <p>
                    No products could be selected within your budget.
                </p>
            `;

        } else {

            html += `<div class="product-list">`;

            data.recommended_products.forEach(product => {

                html += `
                    <div class="product-card">

                        <h4>${product.name}</h4>

                        <p>
                            <strong>Category:</strong>
                            ${product.category}
                        </p>

                        <p>
                            💰 <strong>
                                ₹${Number(product.price).toLocaleString()}
                            </strong>
                        </p>

                        ${
                            product.amazon_url
                                ? `
                                <a
                                    href="${product.amazon_url}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    🛒 Amazon
                                </a>
                                `
                                : ""
                        }

                        ${
                            product.flipkart_url
                                ? `
                                <a
                                    href="${product.flipkart_url}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    🛒 Flipkart
                                </a>
                                `
                                : ""
                        }

                        ${
                            product.ikea_url
                                ? `
                                <a
                                    href="${product.ikea_url}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    🛒 IKEA
                                </a>
                                `
                                : ""
                        }

                    </div>
                `;

            });

            html += `</div>`;
        }


        /* Budget summary */

        html += `
            <hr>

            <h3>💰 Budget Summary</h3>

            <p>
                <strong>Total Cost:</strong>
                ₹${Number(data.total_cost).toLocaleString()}
            </p>

            <p>
                <strong>Remaining Budget:</strong>
                ₹${Number(data.remaining_budget).toLocaleString()}
            </p>
        `;


        /* Unavailable items */

        if (
            data.unavailable_items &&
            data.unavailable_items.length > 0
        ) {

            html += `
                <hr>

                <h3>⚠️ Unavailable Items</h3>

                <ul>
            `;

            data.unavailable_items.forEach(item => {

                html += `
                    <li>
                        ${item}
                    </li>
                `;

            });

            html += `</ul>`;
        }


        /* Gemini AI explanation */

        if (data.ai_explanation) {

            html += `
                <hr>

                <h3>🤖 PocketSmart AI Advice</h3>

                <div class="ai-explanation">
                    ${data.ai_explanation.replace(/\n/g, "<br>")}
                </div>
            `;
        }


        result.innerHTML = html;

    } catch (error) {

        console.error("PocketSmart AI Error:", error);

        result.innerHTML = `
            <div class="error-message">

                <h3>❌ Unable to generate recommendation</h3>

                <p>
                    The PocketSmart AI server returned an error.
                </p>

                <p>
                    <strong>Error:</strong>
                    ${error.message}
                </p>

                <p>
                    Please try again after a few seconds.
                </p>

            </div>
        `;
    }
});