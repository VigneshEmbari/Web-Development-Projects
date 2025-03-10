import { showNotification } from "../notification.js";

document.addEventListener("DOMContentLoaded", function () {
  let checkoutCart = JSON.parse(sessionStorage.getItem("checkoutCart")) || [];

  const cartTotalElement = document.getElementById("cart-total");
  const checkoutItemsContainer = document.getElementById("checkout-items");

  if (!cartTotalElement || !checkoutItemsContainer) return;

  let total = 0;
  checkoutItemsContainer.innerHTML = "";

  function updateCart() {
    checkoutItemsContainer.innerHTML = "";
    total = 0;

    checkoutCart.forEach((item, index) => {
      total += item.price;

      let listItem = document.createElement("li");
      listItem.innerHTML = `
        <div class="checkout-item">
          <img src="../${item.image}" alt="${
        item.name
      }" width="100px" height="80px">
          <p><b>${item.name}</b> - ₹${item.price.toFixed(2)}</p>
          <button class="remove-item" data-index="${index}">Remove</button>
        </div>
      `;
      checkoutItemsContainer.appendChild(listItem);
    });

    cartTotalElement.textContent = total.toFixed(2);
    sessionStorage.setItem("checkoutCart", JSON.stringify(checkoutCart));
  }

  updateCart();

  checkoutItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      const index = event.target.getAttribute("data-index");
      checkoutCart.splice(index, 1);
      updateCart();
      showNotification("Item removed from checkout.", "success");
    }
  });

  document
    .querySelector("#place-order-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      let fullName = document.querySelector(
        "input[placeholder='Enter your name']"
      ).value;
      let email = document.querySelector(
        "input[placeholder='Enter your email']"
      ).value;
      let address = document.querySelector(
        "input[placeholder='Enter your address']"
      ).value;
      let cardNumber = document.querySelector(
        "input[placeholder='Enter card number']"
      ).value;
      let cvv = document.querySelector("input[placeholder='CVV']").value;

    //   if (!fullName || !email || !address || !cardNumber || !cvv) {
    //     showNotification(
    //       "Please fill in all fields before placing the order.",
    //       "error"
    //     );
    //     return;
    //   }

      sessionStorage.removeItem("checkoutCart");
      localStorage.removeItem("cart");
      document.querySelector(".checkout-form").reset();
      document.getElementById("checkout-items").innerHTML = "";
      document.getElementById("cart-total").textContent = "0";
      showNotification("Order placed successfully !", "success");
    });
});
