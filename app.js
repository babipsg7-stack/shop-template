const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const filtersBox = document.getElementById("filters");

let activeCategory = "All";

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

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = PRODUCTS.filter(function (p) {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesQuery =
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  renderProducts(filtered);
}

function renderFilters() {
  const categories = ["All"].concat(
    Array.from(new Set(PRODUCTS.map(function (p) { return p.category; })))
  );

  filtersBox.innerHTML = "";
  categories.forEach(function (name) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn" + (name === activeCategory ? " active" : "");
    btn.textContent = name;
    btn.addEventListener("click", function () {
      activeCategory = name;
      renderFilters();
      applyFilters();
    });
    filtersBox.appendChild(btn);
  });
}

searchInput.addEventListener("input", applyFilters);

renderFilters();
applyFilters();
