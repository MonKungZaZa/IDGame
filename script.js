let cart = [];

function renderProducts() {
  const container = document.getElementById('product-list');
  container.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>ราคา: ${p.price} 🪙</p>
      <p>เหลือ ${p.stock} ชิ้น</p>
      <button onclick="addToCart(${p.id})">ใส่ตะกร้า</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  if (!currentUser) return alert("กรุณาเข้าสู่ระบบก่อน");
  const product = products.find(p => p.id === id);
  if (product.stock < 1) return alert("สินค้าหมด");
  const inCart = cart.find(item => item.id === id);
  if (inCart) {
    if (inCart.qty >= product.stock) return alert("ใส่เกินจำนวนในสต๊อก");
    inCart.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-list');
  container.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.qty * item.price;
    const div = document.createElement('div');
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>${item.price * item.qty} 🪙 
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button onclick="changeQty(${item.id}, -1)">-</button>
      </span>
    `;
    container.appendChild(div);
  });
  document.getElementById('total').innerText = total;
}

function changeQty(id, diff) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += diff;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  renderCart();
}

function checkout() {
  if (!currentUser) return alert("กรุณาเข้าสู่ระบบก่อน");
  let total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  if (currentUser.coins < total) return alert("เหรียญไม่พอ");

  cart.forEach(c => {
    const p = products.find(p => p.id === c.id);
    p.stock -= c.qty;
  });
  currentUser.coins -= total;
  cart = [];
  updateCoinsDisplay();
  renderProducts();
  renderCart();
  alert("ซื้อสำเร็จ!");
}

// เริ่มโหลด
window.onload = () => {
  loadUserInfo();
  renderProducts();
}

function exportUsersToFile() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const blob = new Blob([JSON.stringify(users, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "users.json";
  a.click();
  URL.revokeObjectURL(url);
}
