let cart = [];

const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");
const modal = document.getElementById("cart-modal");

// ADD TO CART
function addToCart(name, price) {
    cart.push({name, price});
    updateCart();
}

// UPDATE CART
function updateCart() {
    cartItems.innerHTML = "";
    let sum = 0;

    cart.forEach((item, index) => {
        sum += item.price;

        cartItems.innerHTML += `
            <p>${item.name} - ₱${item.price} 
            <button onclick="removeItem(${index})">X</button></p>
        `;
    });

    total.innerText = sum;
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// CLOSE CART
function closeCart() {
    modal.style.display = "none";
}

// LOAD WISHLIST
window.onload = function () {
    let saved = JSON.parse(localStorage.getItem("wishlist")) || [];

    document.querySelectorAll(".card").forEach((card, index) => {
        if (saved.includes(index)) {
            card.querySelector(".wishlist").classList.add("active");
            card.querySelector(".wishlist").innerText = "♥";
        }
    });
};

// TOGGLE WISHLIST
function toggleWishlist(el) {
    let cards = document.querySelectorAll(".card");
    let index = Array.from(cards).indexOf(el.closest(".card"));

    let saved = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (saved.includes(index)) {
        saved = saved.filter(i => i !== index);
        el.classList.remove("active");
        el.innerText = "♡";
    } else {
        saved.push(index);
        el.classList.add("active");
        el.innerText = "♥";
    }

    localStorage.setItem("wishlist", JSON.stringify(saved));
}
// Wishlist toggle
function toggleWishlist(el) {
  if (el.innerHTML === "♡") {
    el.innerHTML = "♥"; // Mark as wished
    el.style.color = "#ff4b5c";
  } else {
    el.innerHTML = "♡"; // Remove from wishlist
    el.style.color = "#ff4b5c";
  }
}

// Search filter
document.getElementById("searchInput").addEventListener("input", function() {
  let filter = this.value.toLowerCase();
  let cards = document.querySelectorAll("#products .card");

  cards.forEach(card => {
    let name = card.querySelector("h3").innerText.toLowerCase();
    if (name.includes(filter)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
// Mobile menu toggle
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
