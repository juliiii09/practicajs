protectRoute("user");

const ordersContainer = document.getElementById("ordersList");
const session = JSON.parse(localStorage.getItem("session"));

/* ACCOUNT DETAILS */
document.getElementById("userName").textContent = session.name || "User";
document.getElementById("userEmail").textContent = session.email;

/* TRAER SOLO MIS PEDIDOS */
fetch(`http://localhost:3000/orders?userId=${session.id}`)
  .then(res => res.json())
  .then(orders => {
    document.getElementById("totalOrders").textContent = orders.length;

    if (orders.length === 0) {
      ordersContainer.innerHTML = `
        <div class="card shadow-soft p-4">
          <p class="text-muted mb-0">No orders yet.</p>
        </div>
      `;
      return;
    }

    orders.forEach(o => {
      const badgeClass =
        o.status === "delivered" ? "badge-green" :
        o.status === "preparing" ? "badge-yellow" :
        o.status === "cancelled" ? "badge-red" : "bg-light text-dark";

      ordersContainer.innerHTML += `
        <div class="card shadow-soft p-3 mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>#ORD-${o.id}</strong>
              <p class="text-muted mb-0">
                ${new Date(o.date).toLocaleDateString()} · ${o.items.length} Items
              </p>
            </div>
            <div class="text-end">
              <strong>$${o.total.toFixed(2)}</strong>
              <span class="badge ${badgeClass} ms-2">${o.status}</span>
            </div>
          </div>
        </div>
      `;
    });
  });
