const cartKey = "konohaCart";

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();

  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  saveCart(cart);

  alert("カートに追加しました。");
}

function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}


function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>カートに商品はありません。</p>";
    cartTotal.textContent = "¥0";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    return `
      <div class="cart-item">
        <div>
          <h3>${item.name}</h3>
          <p>¥${item.price.toLocaleString()} × ${item.quantity}</p>
        </div>
        <strong>¥${subtotal.toLocaleString()}</strong>
      </div>
    `;
  }).join("");

  cartTotal.textContent = `¥${total.toLocaleString()}`;
}

displayCart();
