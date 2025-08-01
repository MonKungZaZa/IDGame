const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  alert("กรุณาเข้าสู่ระบบก่อน");
  window.location.href = "index.html";
} else {
  document.getElementById("welcomeUser").textContent = `ยินดีต้อนรับ, ${currentUser}`;
}

let cart = [];

function logout() {
  localStorage.removeItem("currentUser");
  alert("ออกจากระบบแล้ว");
  window.location.href = "index.html";
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const itemInCart = cart.find(item => item.id === productId);

  if (itemInCart) {
    if (itemInCart.quantity < product.stock) {
      itemInCart.quantity += 1;
    } else {
      alert("จำนวนเกินสินค้าที่มีในสต็อก");
    }
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function renderProducts() {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>ราคา: ${p.price} เหรียญ</p>
      <p>จำนวน: ${p.stock} ชิ้น</p>
      <button onclick="addToCart(${p.id})" ${p.stock === 0 ? "disabled" : ""}>ใส่ตะกร้า</button>
    `;
    container.appendChild(div);
  });
}

function renderCart() {
  const container = document.getElementById("cart");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>ยังไม่มีสินค้าในตะกร้า</p>";
    document.getElementById("totalPrice").textContent = 0;
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} × ${item.quantity} = ${item.price * item.quantity} เหรียญ</p>
    `;
    container.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("totalPrice").textContent = total;
}

function checkout() {
  if (cart.length === 0) {
    alert("ยังไม่มีสินค้าในตะกร้า");
    return;
  }

  // ตรวจสอบว่าสินค้ามีพอหรือไม่
  for (let item of cart) {
    const product = products.find(p => p.id === item.id);
    if (!product || product.stock < item.quantity) {
      alert(`สินค้า ${item.name} มีไม่พอในคลัง`);
      return;
    }
  }

  // หักสต็อก
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    product.stock -= item.quantity;
  });

  alert("ซื้อสินค้าสำเร็จ!");
  cart = [];
  renderCart();
  renderProducts(); // อัปเดตหน้าร้าน
}

renderProducts();
