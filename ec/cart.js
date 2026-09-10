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


/* カート表示 */

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

  cartItems.innerHTML = cart.map((item, index) => {

    const subtotal = item.price * item.quantity;
    total += subtotal;

    return `
      <div class="cart-item">

        <div>
          <h3>${item.name}</h3>

          <p>
            ¥${item.price.toLocaleString()}
          </p>

          <div class="quantity-control">

            <button onclick="changeQuantity(${index}, -1)">
              −
            </button>

            <span>${item.quantity}</span>

            <button onclick="changeQuantity(${index}, 1)">
              ＋
            </button>

          </div>

          <button
            class="remove-button"
            onclick="removeItem(${index})">
            商品を削除
          </button>

        </div>

        <strong>
          ¥${subtotal.toLocaleString()}
        </strong>

      </div>
    `;

  }).join("");

  cartTotal.textContent = `¥${total.toLocaleString()}`;
}


/* 数量変更 */

function changeQuantity(index, amount) {

  const cart = getCart();

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);

  displayCart();
}


/* 商品削除 */

function removeItem(index) {

  const cart = getCart();

  cart.splice(index, 1);

  saveCart(cart);

  displayCart();
}


/* カートを空にする */

function clearCart() {

  localStorage.removeItem(cartKey);

  displayCart();

  alert("カートを空にしました！");
}


displayCart();
