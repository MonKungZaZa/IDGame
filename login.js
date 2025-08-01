document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();

    if (result.success) {
      alert("เข้าสู่ระบบสำเร็จ");
      localStorage.setItem("currentUser", username);
      window.location.href = "store.html";  // เปลี่ยนหน้าไปหน้าร้านค้า
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  } catch (error) {
    alert("เกิดข้อผิดพลาด: " + error.message);
    console.error(error);
  }
});
