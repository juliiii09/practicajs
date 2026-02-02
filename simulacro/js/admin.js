/*
protectRoute("admin");

const tableBody = document.getElementById("ordersTable");
const detailsBox = document.getElementById("orderDetails");
const statusSelect = document.getElementById("statusSelect");

let selectedOrderId = null;

/CARGAR ÓRDENES *
fetch("http://localhost:3000/orders")
  .then(res => res.json())
  .then(orders => {
    // MÉTRICAS
    document.getElementById("totalOrders").textContent = orders.length;
    document.getElementById("pendingOrders").textContent =
      orders.filter(o => o.status === "pending").length;

    const today = new Date().toDateString();
    const revenue = orders
      .filter(o => new Date(o.date).toDateString() === today)
      .reduce((sum, o) => sum + o.total, 0);

    document.getElementById("todayRevenue").textContent = revenue.toFixed(2);

    // TABLA
    orders.forEach(o => {
      tableBody.innerHTML += `
        <tr>
          <td>#ORD-${o.id}</td>
          <td>User ${o.userId}</td>
          <td>${new Date(o.date).toLocaleDateString()}</td>
          <td>
            <span class="badge ${
              o.status === "pending" ? "badge-yellow" :
              o.status === "delivered" ? "badge-green" :
              o.status === "cancelled" ? "badge-red" : "bg-light text-dark"
            }">${o.status}</span>
          </td>
          <td>$${o.total.toFixed(2)}</td>
          <td>
            <button class="btn btn-sm btn-outline-success"
              onclick='selectOrder(${JSON.stringify(o)})'>
              View
            </button>
          </td>
        </tr>
      `;
    });
  });

//SELECCIONAR ORDEN 
function selectOrder(order) {
  selectedOrderId = order.id;

  detailsBox.innerHTML = `
    <p><strong>Order ID:</strong> #ORD-${order.id}</p>
    <p><strong>User ID:</strong> ${order.userId}</p>
    <p><strong>Items:</strong> ${order.items.length}</p>
    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
  `;

  statusSelect.value = order.status;
}

// ACTUALIZAR ESTADO 
function updateStatus() {
  if (!selectedOrderId) {
    alert("Select an order first");
    return;
  }

  fetch(`http://localhost:3000/orders/${selectedOrderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: statusSelect.value })
  }).then(() => location.reload());
}

*/






// BORRADOR CON CRUDDDD


document.addEventListener("DOMContentLoaded", () => {

  protectRoute("admin");

  const tableBody = document.getElementById("ordersTable");
  const detailsBox = document.getElementById("orderDetails");
  const statusSelect = document.getElementById("statusSelect");

  let selectedOrderId = null;
  let ordersCache = [];

  /* =========================
     CARGAR ÓRDENES
  ========================= */

  fetch("http://localhost:3000/orders")
    .then(res => res.json())
    .then(orders => {
      ordersCache = orders;

      // MÉTRICAS
      document.getElementById("totalOrders").textContent = orders.length;
      document.getElementById("pendingOrders").textContent =
        orders.filter(o => o.status === "pending").length;

      const today = new Date().toDateString();
      const revenue = orders
        .filter(o => new Date(o.date).toDateString() === today)
        .reduce((sum, o) => sum + o.total, 0);

      document.getElementById("todayRevenue").textContent = revenue.toFixed(2);

      // TABLA
      tableBody.innerHTML = "";

      orders.forEach(o => {
        tableBody.innerHTML += `
          <tr>
            <td>#ORD-${o.id}</td>
            <td>User ${o.userId}</td>
            <td>${new Date(o.date).toLocaleDateString()}</td>
            <td>
              <span class="badge ${
                o.status === "pending" ? "badge-yellow" :
                o.status === "delivered" ? "badge-green" :
                o.status === "cancelled" ? "badge-red" : "bg-light text-dark"
              }">${o.status}</span>
            </td>
            <td>$${o.total.toFixed(2)}</td>
            <td>
              <button class="btn btn-sm btn-outline-success"
                onclick="selectOrder(${o.id})">
                View
              </button>
            </td>
          </tr>
        `;
      });
    })
    .catch(err => console.error("Error cargando órdenes:", err));

  /* =========================
     SELECCIONAR ORDEN
  ========================= */

  window.selectOrder = function (orderId) {
    const order = ordersCache.find(o => o.id === orderId);
    if (!order) return;

    selectedOrderId = order.id;

    detailsBox.innerHTML = `
      <p><strong>Order ID:</strong> #ORD-${order.id}</p>
      <p><strong>User ID:</strong> ${order.userId}</p>
      <p><strong>Items:</strong> ${order.items.length}</p>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
    `;

    statusSelect.value = order.status;
  };

  /* =========================
     ACTUALIZAR ESTADO
  ========================= */

  window.updateStatus = function () {
    if (!selectedOrderId) {
      alert("Select an order first");
      return;
    }

    fetch(`http://localhost:3000/orders/${selectedOrderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusSelect.value })
    }).then(() => location.reload());
  };

});
