// Inicializamos el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

document.getElementById('checkout').addEventListener('click', checkout);

// Función para agregar productos al carrito
function addToCart(event) {
    const productElement = event.target.closest('.product');
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));

    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardamos el carrito en localStorage
    renderCart();
}

// Función para renderizar el carrito
function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsElement.appendChild(li);
        total += item.price;
    });

    document.getElementById('total-price').textContent = `Total: $${total}`;
}

// Función para realizar el pago
function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de pagar.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Total a pagar: $${total}. Gracias por tu compra!`);
    
    cart = []; // Vaciar el carrito
    localStorage.removeItem('cart'); // Limpiar el localStorage
    renderCart(); // Actualizar la vista del carrito
}

// Renderizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', renderCart);
