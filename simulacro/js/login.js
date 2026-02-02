console.log("login.js cargó");

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;

  fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(users => {
      const user = users.find(u => u.email === email);

      if (!user) {
        alert("Usuario no existe");
        return;
      }

      localStorage.setItem("session", JSON.stringify(user));

      if (user.role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "menu.html";
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error cargando usuarios");
    });
});

function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;

  if (!name || !email) {
    alert("Fill all fields");
    return;
  }

  const newUser = { name, email, role };

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  })
    .then(res => res.json())
    .then(() => {
      alert("User registered");
    });
}







/*document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;

  fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(users => {
      const user = users.find(
        u => u.email === email && u.role === role
      );

      if (!user) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("session", JSON.stringify(user));

      if (user.role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "menu.html";
      }
    });
});
*/