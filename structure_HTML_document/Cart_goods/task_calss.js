class Cart {
    constructor(cartSelector) {
      this.cart = document.querySelector(cartSelector);
      this.cartProducts = this.cart.querySelector(".cart__products");
      this.loadCartFromStorage();
      this.updateCartVisibility();
    }
  
    updateCartVisibility() {
      this.cart.style.display = this.cartProducts.children.length > 0 ? "block" : "none";
    }
  
    saveCartToStorage() {
      const cartItems = [...this.cartProducts.children].map(cartProduct => ({
        id: cartProduct.dataset.id,
        quantity: cartProduct.querySelector(".cart__product-count").textContent,
        img: cartProduct.querySelector(".cart__product-image").src
      }));
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  
    loadCartFromStorage() {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      cartItems.forEach(({ id, quantity, img }) => this.addProduct(id, quantity, img));
    }
  
    addProduct(id, quantity, imgSrc) {
      let cartProduct = this.cartProducts.querySelector(`.cart__product[data-id="${id}"]`);
  
      if (cartProduct) {
        let countElement = cartProduct.querySelector(".cart__product-count");
        countElement.textContent = parseInt(countElement.textContent) + parseInt(quantity);
      } else {
        cartProduct = document.createElement("div");
        cartProduct.className = "cart__product";
        cartProduct.dataset.id = id;
  
        const cartProductImage = document.createElement("img");
        cartProductImage.className = "cart__product-image";
        cartProductImage.src = imgSrc;
  
        const cartProductCount = document.createElement("div");
        cartProductCount.className = "cart__product-count";
        cartProductCount.textContent = quantity;
  
        const removeButton = document.createElement("div");
        removeButton.className = "cart__product-remove";
        removeButton.textContent = "❌";
        removeButton.style.cursor = "pointer";
        removeButton.addEventListener("click", () => this.removeProduct(cartProduct));
  
        cartProduct.append(cartProductImage, cartProductCount, removeButton);
        this.cartProducts.appendChild(cartProduct);
      }
  
      this.updateCartVisibility();
      this.saveCartToStorage();
    }
  
    removeProduct(cartProduct) {
      cartProduct.remove();
      this.updateCartVisibility();
      this.saveCartToStorage();
    }
  }
  
  class Product {
    constructor(element, cart) {
      this.product = element;
      this.cart = cart;
      this.quantityValue = this.product.querySelector(".product__quantity-value");
      this.imgSrc = this.product.querySelector(".product__image").src;
      this.id = this.product.dataset.id;
  
      this.product.querySelector(".product__quantity-control_dec").addEventListener("click", () => this.decreaseQuantity());
      this.product.querySelector(".product__quantity-control_inc").addEventListener("click", () => this.increaseQuantity());
      this.product.querySelector(".product__add").addEventListener("click", () => this.addToCart());
    }
  
    decreaseQuantity() {
      let value = parseInt(this.quantityValue.textContent);
      if (value > 1) value--;
      this.quantityValue.textContent = value;
    }
  
    increaseQuantity() {
      let value = parseInt(this.quantityValue.textContent);
      value++;
      this.quantityValue.textContent = value;
    }
  
    addToCart() {
      const quantity = parseInt(this.quantityValue.textContent);
      this.animateToCart(() => this.cart.addProduct(this.id, quantity, this.imgSrc));
    }
  
    animateToCart(callback) {
      const img = this.product.querySelector(".product__image");
      const cartRect = this.cart.cartProducts.getBoundingClientRect();
      const imgClone = img.cloneNode();
      const imgRect = img.getBoundingClientRect();
  
      imgClone.style.position = "fixed";
      imgClone.style.left = `${imgRect.left}px`;
      imgClone.style.top = `${imgRect.top}px`;
      imgClone.style.width = `${imgRect.width}px`;
      imgClone.style.height = `${imgRect.height}px`;
      imgClone.style.transition = "all 0.5s ease-in-out";
      document.body.appendChild(imgClone);
  
      setTimeout(() => {
        imgClone.style.left = `${cartRect.left}px`;
        imgClone.style.top = `${cartRect.top}px`;
        imgClone.style.width = "50px";
        imgClone.style.height = "50px";
        imgClone.style.opacity = "0.5";
      }, 50);
  
      setTimeout(() => {
        imgClone.remove();
        callback();
      }, 600);
    }
  }
  
  class Shop {
    constructor(productsSelector, cartSelector) {
      this.cart = new Cart(cartSelector);
      this.products = [...document.querySelector(productsSelector).children].map(product => new Product(product, this.cart));
    }
  }
  
  // Запускаем магазин
  document.addEventListener("DOMContentLoaded", () => {
    new Shop(".products", ".cart");
  });
  