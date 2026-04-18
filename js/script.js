 function updateDateTime() {
        const now = new Date();

        const currentDateTime = now.toLocaleString();

        document.querySelector('#dateTime').textContent = currentDateTime;
      }
      updateDateTime();
      setInterval(updateDateTime, 1000);

//index file data save 
document.addEventListener("click", function(e){

    if(e.target.classList.contains("add-to-cart")){

        let product = {
            name: e.target.dataset.name,
            price: e.target.dataset.price,
            img: e.target.dataset.img,
            qty: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added to cart!");
    }

});

// shopping cart e add 
document.addEventListener("DOMContentLoaded", function(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");

    cart.forEach(item => {

        let html = `
        <div class="row align-items-center mb-3 cart-item">
            <div class="col-md-3">
                <img src="${item.img}" class="img-fluid">
            </div>
            <div class="col-md-4">
                <h6>${item.name}</h6>
                <small>BDT - ${item.price}</small>
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control quantity" value="${item.qty}" min="1" data-price="${item.price}">
            </div>
            <div class="col-md-2">
                <strong class="item-total">৳${item.price * item.qty}</strong>
            </div>
            <div class="col-md-1">
                <button class="btn btn-danger btn-sm remove-item">×</button>
            </div>
        </div>
        `;

        container.insertAdjacentHTML("beforeend", html);
    });

});

// product remove and update 
document.addEventListener("click", function(e){
    if(e.target.classList.contains("remove-item")){

        let index = [...document.querySelectorAll(".remove-item")].indexOf(e.target);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        e.target.closest(".cart-item").remove();
    }
});


document.addEventListener("DOMContentLoaded", function () {

    function updateItemTotal(item) {
        let qty = item.querySelector(".quantity").value;
        let price = item.querySelector(".quantity").dataset.price;

        let total = qty * price;
        item.querySelector(".item-total").innerText = "$" + total.toFixed(2);
    }

    function updateCartTotal() {
        let grandTotal = 0;
        document.querySelectorAll(".cart-item").forEach(item => {
            let totalText = item.querySelector(".item-total").innerText.replace("$", "");
            grandTotal += parseFloat(totalText);
        });

        console.log("Total: $" + grandTotal.toFixed(2)); // চাইলে UI তে দেখাতে পারো
    }

    // Quantity change
    document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("input", function () {
            let item = this.closest(".cart-item");
            updateItemTotal(item);
            updateCartTotal();
        });
    });

    // Remove item
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", function () {
            let item = this.closest(".cart-item");
            item.remove();
            updateCartTotal();
        });
    });

});