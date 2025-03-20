document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelector(".products");
    const cart = document.querySelector(".cart");
    const cartProducts = document.querySelector(".cart__products");
  
    
    function updateCartVisibility() {
      cart.style.display = cartProducts.children.length > 0 ? "block" : "none";
    }
  
    
    function saveCartToStorage() {
      const cartItems = [...cartProducts.children].map((cartProduct) => ({
        id: cartProduct.dataset.id,
        quantity: cartProduct.querySelector(".cart__product-count").textContent,
        img: cartProduct.querySelector(".cart__product-image").src,
      }));
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  
    
    function loadCartFromStorage() {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      cartItems.forEach(({ id, quantity, img }) => addToCart(id, quantity, img));
      updateCartVisibility();
    }
  
    
    function addToCart(id, quantity, imgSrc) {
      let cartProduct = cartProducts.querySelector(`.cart__product[data-id="${id}"]`);
  
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
        removeButton.addEventListener("click", () => {
          cartProduct.remove();
          updateCartVisibility();
          saveCartToStorage();
        });
  
        cartProduct.append(cartProductImage, cartProductCount, removeButton);
        cartProducts.appendChild(cartProduct);
      }
  
      updateCartVisibility();
      saveCartToStorage();
    }
  
    
    products.addEventListener("click", (event) => {
      if (event.target.classList.contains("product__quantity-control_dec")) {
        const quantityValue = event.target.closest(".product__quantity-controls").querySelector(".product__quantity-value");
        let value = parseInt(quantityValue.textContent);
        if (value > 1) value--;
        quantityValue.textContent = value;
      }
  
      if (event.target.classList.contains("product__quantity-control_inc")) {
        const quantityValue = event.target.closest(".product__quantity-controls").querySelector(".product__quantity-value");
        let value = parseInt(quantityValue.textContent);
        value++;
        quantityValue.textContent = value;
      }
  
      if (event.target.classList.contains("product__add")) {
        const product = event.target.closest(".product");
        const productId = product.dataset.id;
        const quantity = parseInt(product.querySelector(".product__quantity-value").textContent);
        const imgSrc = product.querySelector(".product__image").src;
  
        
        animateProductToCart(product, () => {
          addToCart(productId, quantity, imgSrc);
        });
      }
    });
  
    
    function animateProductToCart(product, callback) {
      const img = product.querySelector(".product__image");
      const cartRect = cartProducts.getBoundingClientRect();
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
        imgClone.style.width = "900px";
        imgClone.style.height = "50px";
        imgClone.style.opacity = "0.5";
      }, 50);
  
      setTimeout(() => {
        imgClone.remove();
        callback();
      }, 600);
    }
  
    // Загрузка корзины при загрузке страницы
    loadCartFromStorage();
  });
  