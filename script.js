// GLOBAL CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {
        name: name,
        price: price
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}

// DISPLAY CART
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
            <div style="background:white; padding:15px; margin:10px 0; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
                
                <div>
                    <h5>${item.name}</h5>
                    <p>₹${item.price}</p>
                </div>

                <button onclick="removeItem(${index})"
                    style="background:#e63946; color:white; border:none; padding:6px 10px; border-radius:5px;">
                    Remove
                </button>

            </div>
        `;
    });

    totalPrice.innerText = total;
    localStorage.setItem("total", total);
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // refresh UI
}

// GO TO PAYMENT
function checkout() {
    window.location.href = "payment.html";
}

// LOAD PAYMENT TOTAL
function loadPayment() {
    let totalAmount = document.getElementById("totalAmount");
    if (!totalAmount) return;

    let total = 0;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => total += item.price);

    totalAmount.innerText = total;
}

// PLACE ORDER
function placeOrder() {
    let method = document.querySelector('input[name="payment"]:checked');

    if (!method) {
        alert("Please select payment method");
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

// PAYMENT FORM SWITCH
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

// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("user", user);
        alert("Login Successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid Login!");
    }
}

// RUN FUNCTIONS SAFELY
window.onload = function () {
    displayCart();
    loadPayment();
};
