let allProducts = [];
let displayedProducts = [];
let currentPage = 1;
const productsPerPage = 8;
const container = document.getElementById('product-container');
const paginationContainer = document.getElementById('pagination');

async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  const json = await res.json();
  allProducts = json;
  updatePage(currentPage);
  setupPagination();
}

function displayProducts(products) {
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded shadow w-60 text-center hover:scale-105 transition-transform";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="h-40 w-full object-contain mb-2 rounded" />
      <h2 class="text-sm font-semibold h-12 overflow-hidden">${product.title}</h2>
      <p class="text-gray-600 font-medium">₹${product.price}</p>
    `;
    container.appendChild(card);
  });
}

function updatePage(page) {
  currentPage = page;
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  displayedProducts = allProducts.slice(start, end);
  displayProducts(displayedProducts);
  setupPagination();
}

function setupPagination() {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `px-3 py-1 mx-1 rounded ${i === currentPage ? 'bg-green-500 text-white' : 'bg-gray-200'}`;
    btn.textContent = i;
    btn.onclick = () => updatePage(i);
    paginationContainer.appendChild(btn);
  }
}

function searchProducts() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allProducts.filter(p => p.title.toLowerCase().includes(keyword));
  displayProducts(filtered);
}
document.getElementById('sortSelect').addEventListener('change', sortProducts);
function sortProducts() {
  const order = document.getElementById('sortSelect').value;
  if (order === 'asc') allProducts.sort((a, b) => a.price - b.price);
  if (order === 'desc') allProducts.sort((a, b) => b.price - a.price);
  currentPage = 1;
  updatePage(currentPage);
  setupPagination();
}

// Form Handling and Storage
document.getElementById('interestForm').addEventListener('submit', () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const product = document.getElementById('product').value;

  if (!name || !email || !product) {
    alert('Please fill all fields');
    return;
  }
  localStorage.setItem('name', name);
  localStorage.setItem('product', product);
  alert('Thanks for your interest!');
});

// Welcome back message
window.onload = () => {
  const name = localStorage.getItem('name');
  const product = localStorage.getItem('product');
  if (name && product) {
    document.getElementById('welcomeMsg').innerText = `Welcome back, ${name}! You were interested in ${product}.`;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos)=>{
      const { latitude, longitude } = pos.coords;
      document.getElementById('locationMsg').innerText = `Your location: Lat ${latitude}, Long ${longitude}`;
    });
  }
}

fetchProducts();
