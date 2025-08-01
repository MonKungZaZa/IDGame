let currentUser = null;

function saveUserToStorage(userObj) {
  localStorage.setItem("currentUser", JSON.stringify(userObj));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function register() {
  const uname = document.getElementById('reg-username').value.trim();
  const pwd = document.getElementById('reg-password').value;
  if (!uname || !pwd) return alert("กรุณากรอกข้อมูลให้ครบ");

  const users = getUsers();
  if (users.find(u => u.username === uname)) {
    return alert("ชื่อผู้ใช้นี้มีอยู่แล้ว");
  }

  const newUser = { username: uname, password: pwd, coins: 500 };
  users.push(newUser);
  setUsers(users);
  alert("สมัครสมาชิกสำเร็จ! กรุณาล็อกอิน");
  document.getElementById('reg-username').value = "";
  document.getElementById('reg-password').value = "";
}

function login() {
  const uname = document.getElementById('login-username').value.trim();
  const pwd = document.getElementById('login-password').value;

  const users = getUsers();
  const found = users.find(u => u.username === uname && u.password === pwd);

  if (!found) return alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");

  currentUser = found;
  saveUserToStorage(currentUser);
  alert("เข้าสู่ระบบสำเร็จ!");
  loadUserInfo();
  renderProducts();
}

function loadUserInfo() {
  const saved = localStorage.getItem("currentUser");
  if (saved) {
    currentUser = JSON.parse(saved);
    document.getElementById('welcome').innerText = `ยินดีต้อนรับ, ${currentUser.username}`;
    document.getElementById('coins').innerText = currentUser.coins;
  }
}

function updateCoinsDisplay() {
  document.getElementById('coins').innerText = currentUser.coins;
  saveUserToStorage(currentUser);

  // อัปเดต user ในรายชื่อทั้งหมด
  const users = getUsers();
  const index = users.findIndex(u => u.username === currentUser.username);
  if (index !== -1) {
    users[index] = currentUser;
    setUsers(users);
  }
}
