function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

async function fetchProducts() {
  try {
    const response = await fetch("./ProductsData.json");
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderProducts(products) {
  const productsContainer = document.querySelector(".products");
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  const urlParams = new URLSearchParams(window.location.search);
  const currentCategory = urlParams.get("category");

  const categoriesToRender = currentCategory
    ? products.filter(
        (cat) => cat.category.toLowerCase() === currentCategory.toLowerCase()
      )
    : products;

  if (categoriesToRender.length === 0) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  categoriesToRender.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("product-category");

    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.category;
    categoryDiv.appendChild(categoryTitle);

    const productList = document.createElement("div");
    productList.classList.add("product-list");

    const itemsToDisplay = currentCategory
      ? category.items
      : category.items.slice(0, 10);

    itemsToDisplay.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <p>${product.name}</p>
        <span>₹${product.price.toFixed(2)}</span>
        <button class="add-to-cart" onclick="addToCart('${product.image}', '${
        product.name
      }', ${product.price})">Add to Cart</button>
      `;

      productList.appendChild(productItem);
    });

    categoryDiv.appendChild(productList);
    productsContainer.appendChild(categoryDiv);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const bannerWrapper = document.querySelector(".banner-wrapper");
  const images = document.querySelectorAll(".banner-image");
  let currentIndex = 0;

  const firstClone = images[0].cloneNode(true);
  bannerWrapper.appendChild(firstClone);

  function changeImage() {
    currentIndex++;
    bannerWrapper.style.transition = "transform 1s ease-in-out";
    bannerWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (currentIndex === images.length) {
      setTimeout(() => {
        bannerWrapper.style.transition = "none";
        bannerWrapper.style.transform = "translateX(0%)";
        currentIndex = 0;
      }, 1000);
    }
  }

  setInterval(changeImage, 4000);
});

window.toggleMenu = toggleMenu;
window.fetchProducts = fetchProducts;
window.renderProducts = renderProducts;

document.addEventListener("DOMContentLoaded", fetchProducts);
