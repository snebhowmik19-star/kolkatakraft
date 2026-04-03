// GLOBAL cart (used everywhere)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(name, price) {
    cart.push({
        name: name,
        price: Number(price)
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// Display cart
function displayCart() {
    let cartItemsDiv = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");

    if (!cartItemsDiv || !totalPrice) return;

    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p style='text-align:center;'>Cart is empty</p>";
        totalPrice.innerText = 0;
        return;
    }

    cartItemsDiv.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        cartItemsDiv.innerHTML += `
            <div style="background:white; padding:15px; margin:10px 0; border-radius:10px; display:flex; justify-content:space-between;">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>
                <button onclick="removeItem(${index})"
                    style="background:red; color:white; border:none; padding:8px 12px; border-radius:5px;">
                    Remove
                </button>
            </div>
        `;
    });

    totalPrice.innerText = total;
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Checkout → go to payment page
function checkout() {
    window.location.href = "payment.html";
}

// Payment page total
function loadPayment() {
    let totalAmount = document.getElementById("totalAmount");
    if (!totalAmount) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    totalAmount.innerText = total;
}

// Place order
function placeOrder() {
    alert("Payment Successful! Order Placed.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

// Run functions when needed
displayCart();
loadPayment();

// Show payment forms
function showCard() {
    document.getElementById("cardForm").style.display = "block";
    document.getElementById("upiForm").style.display = "none";
    document.getElementById("codMsg").style.display = "none";
}

function showUPI() {
    document.getElementById("cardForm").style.display = "none";
    document.getElementById("upiForm").style.display = "block";
    document.getElementById("codMsg").style.display = "none";
}

function showCOD() {
    document.getElementById("cardForm").style.display = "none";
    document.getElementById("upiForm").style.display = "none";
    document.getElementById("codMsg").style.display = "block";
}

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    // Simple login (you can change values)
    if (user === "admin" && pass === "1234") {
        localStorage.setItem("user", user);
        alert("Login Successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid Login!");
    }
}

// Load total
function loadPayment() {
    let total = 0;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => total += item.price);

    let totalAmount = document.getElementById("totalAmount");
    if (totalAmount) totalAmount.innerText = total;
}

// Place order
function placeOrder() {
    let method = document.querySelector('input[name="payment"]:checked');

    if (!method) {
        alert("Select payment method");
        return;
    }

    if (method.value === "upi") {
        let upi = document.getElementById("upiInput").value;
        if (upi === "") {
            alert("Enter UPI ID");
            return;
        }
    }

    alert("Order Successful!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

// Run
loadPayment();