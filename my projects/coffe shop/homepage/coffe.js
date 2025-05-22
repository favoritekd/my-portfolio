// DARK MODE TOGGLE
const toggleBtn = document.getElementById('dark-mode-toggle');
toggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// ADD TO CART FUNCTIONALITY
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
}

// This function should be called from the menu page buttons
function handleAddToCart(event) {
    const button = event.target;
    const itemCard = button.closest('.menu-item');
    const name = itemCard.querySelector('h3').textContent;
    const price = itemCard.querySelector('p').textContent;

    const item = {
        name,
        price
    };

    addToCart(item);
}

// Attach to all "Add to Cart" buttons on the Menu Page
document.querySelectorAll('.add-to-cart')?.forEach(btn => {
    btn.addEventListener('click', handleAddToCart);
});

// DISPLAY CART ITEMS (for cart.html)
function displayCartItems() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    if (!container || !totalElement) return;

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('$', ''));
        total += price;

        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price}</span>
      <button onclick="removeFromCart(${index})">❌</button>
    `;
        container.appendChild(div);
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// REMOVE ITEM FROM CART
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// CONTACT FORM VALIDATION
function validateContactForm() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const budget = document.getElementById('budget')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !budget || !message) {
        alert('Please fill in all fields.');
        return false;
    }

    alert('Message sent successfully!');
    return true;
}

// AUTO RUN DISPLAY IF ON CART PAGE
window.onload = () => {
    displayCartItems();
};
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    if (!container || !totalElement) return;

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('$', ''));
        total += price;

        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price}</span>
        <button onclick="removeFromCart(${index})">❌</button>
      `;
        container.appendChild(div);
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

window.onload = () => {
    displayCartItems();
};
