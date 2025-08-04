document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const response = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();
  if (result.success) {
    alert("สมัครสมาชิกสำเร็จ");
    localStorage.setItem("currentUser", username);
    window.location.href = "store.html"; // เปลี่ยนหน้าไปเว็บขายไอดี
  } else {
    alert(result.message);
  }
});