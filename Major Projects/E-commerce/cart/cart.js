import { showNotification } from "../notification.js";

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    if (cart.length > 0) {
      cartCountElement.textContent = `(${cart.length})`;
    } else {
      cartCountElement.textContent = "";
    }
  }
}

function addToCart(productImage, productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = { image: productImage, name: productName, price: productPrice };
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("Product added to cart successfully!", "success");
}

function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotal) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
            <img src="../${item.image}" alt="${
      item.name
    }" width="150px" height="100px"> ${item.name} - ₹${item.price.toFixed(2)}

            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        `;
    cartItemsContainer.appendChild(listItem);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
  updateCartCount();
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  showNotification("Item removed from cart!", "warning");
}

function clearCart() {
  localStorage.removeItem("cart");
  displayCart();
  showNotification("Your cart has been cleared!", "info");
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length > 0) {
    sessionStorage.setItem("checkoutCart", JSON.stringify(cart));
    showNotification("Proceeding to checkout!", "success");
    setTimeout(() => {
      window.location.href = "../checkout/checkout.html";
    }, 1500);
    localStorage.removeItem("cart");
  } else {
    showNotification(
      "Your cart is empty. Add items before checking out!",
      "error"
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
});

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.checkout = checkout;
