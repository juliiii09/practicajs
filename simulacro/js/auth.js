

function protectRoute(requiredRole) {
  const session = JSON.parse(localStorage.getItem("session"));

  if (!session) {
    window.location.href = "../restorapp/login.html";
    return;
  }

  if (requiredRole && session.role !== requiredRole) {
    alert("Acceso no permitido");
    window.location.href = "../js/login.js";
  }
}
