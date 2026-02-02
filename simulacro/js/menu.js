
alert("menu.js cargó");


protectRoute("user");



const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cartItems");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//  /* LISTAR PRODUCTOSmm 
fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(p => {
      productsContainer.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card menu-card shadow-soft">
            <img src="https://via.placeholder.com/300x200">
            <div class="card-body">
              <h6>${p.name}</h6>
              <p class="text-success fw-bold">$${p.price}</p>
              <button class="btn btn-outline-success w-100"
                onclick="addToCart(${p.id}, '${p.name}', ${p.price})">
                Add to order
              </button>
            </div>
          </div>
        </div>
      `;
    });
  });

//  /* AGREGAR AL CARRITO 
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

//  /* RENDER CARRITO 
function renderCart() {
  cartContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price;
    cartContainer.innerHTML += `
      <div class="d-flex justify-content-between mb-2">
        <span>${item.name}</span>
        <strong>$${item.price}</strong>
      </div>
    `;
  });

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

renderCart();

//  /* CONFIRMAR ORDEN 
function confirmOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  const session = JSON.parse(localStorage.getItem("session"));

  const subtotal = cart.reduce((sum, i) => sum + i.price, 0);
  const total = subtotal * 1.08;

  const order = {
    userId: session.id,
    items: cart,
    total: total,
    status: "pending",
    date: new Date().toISOString()
  };

  fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify(order)
  }).then(() => {
    localStorage.removeItem("cart");
    window.location.href = "../restorapp/orders.html";
  });
}

