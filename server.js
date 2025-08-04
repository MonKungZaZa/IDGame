const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.static(".")); 
app.use(express.json());

// ระบบสมัครสมาชิก
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  let users = [];
  if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json"));
  }

  if (users.find(u => u.username === username)) {
    return res.json({ success: false, message: "Username ซ้ำ" });
  }

  users.push({ username, password, coins: 500 });
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.json({ success: true });
});

// ระบบล็อกอิน
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let users = [];
  if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json"));
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});
