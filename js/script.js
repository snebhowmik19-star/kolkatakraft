// ADD TO CART
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
}


// DISPLAY CART
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cartList");

    if (!cartList) return; // prevents error on other pages

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button onclick="removeItem(${index})"
                style="background:red; color:white; border:none; padding:5px 10px; border-radius:5px;">
                Remove
            </button>
        `;

        cartList.appendChild(li);
        total += item.price;
    });

    let totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.innerText = total;
    }

    localStorage.setItem("total", total);
}


// REMOVE ITEM
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart(); // refresh
}

<script>
function payNow() {

    let total = localStorage.getItem("total") || 100;

    let options = {
        "key": "rzp_test_1234567890", // replace with your test key
        "amount": total * 100,
        "currency": "INR",
        "name": "KolkataKraft",
        "description": "Test Payment",
        "handler": function (response){
            alert("Payment Successful!");
        },
        "prefill": {
            "name": "Customer",
            "email": "test@gmail.com"
        },
        "theme": {
            "color": "#f4a261"
        }
    };

    let rzp = new Razorpay(options);
    rzp.open();
}
</script>


// LOAD CART AUTOMATICALLY (FIXED)
document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});
