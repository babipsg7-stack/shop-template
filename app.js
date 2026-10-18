const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

function formatPrice(value) {
  return "$" + value.toFixed(2);
}

function renderProducts(items) {
  productList.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No products found.";
    productList.appendChild(empty);
    return;
  }

  items.forEach(function (product) {
    const card = document.createElement("article");
    card.className = "card";

    const category = document.createElement("span");
    category.className = "card-category";
    category.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const desc = document.createElement("p");
    desc.textContent = product.description;

    const price = document.createElement("strong");
    price.textContent = formatPrice(product.price);

    card.append(category, title, desc, price);
    productList.appendChild(card);
  });
}

searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = PRODUCTS.filter(function (p) {
    return (
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  });
  renderProducts(filtered);
});

renderProducts(PRODUCTS);
