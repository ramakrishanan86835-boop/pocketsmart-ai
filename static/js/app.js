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

        if (!response.ok) {
            throw new Error("Backend request failed");
        }

        const data = await response.json();

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
                ₹${data.budget.toLocaleString()}
            </p>
        `;

        /* Products */

        html += `
            <hr>
            <h3>🛋️ Recommended Products</h3>
        `;

        if (data.recommended_products.length === 0) {

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
                            💰 <strong>₹${product.price.toLocaleString()}</strong>
                        </p>

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
                ₹${data.total_cost.toLocaleString()}
            </p>

            <p>
                <strong>Remaining Budget:</strong>
                ₹${data.remaining_budget.toLocaleString()}
            </p>
        `;


        /* Unavailable items */

        if (data.unavailable_items.length > 0) {

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

        console.error(error);

        result.innerHTML = `
            <p>
                ❌ Unable to connect to the PocketSmart AI backend.
            </p>

            <p>
                Please make sure FastAPI is running.
            </p>
        `;
    }
});