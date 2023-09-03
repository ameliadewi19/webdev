const cartItems = document.getElementById("cartItems");

document.addEventListener("DOMContentLoaded", () => {
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Keranjang Anda kosong.</p>";
    } else {
        updateCart();
    }
});

const cart = [];

function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity; // Update quantity if item already exists
    } else {
        cart.push({ ...product, quantity }); // Add new item to car
    }
    
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let totalAmount = 0; // Variable to store total amount

    cart.forEach(item => {
        if (item.quantity > 0) {
            const cartItem = document.createElement("li");

            // Create an image element for the product
            const productImage = document.createElement("img");
            productImage.src = item.image; // Set the image source
            productImage.alt = item.name; // Set the alt text
            productImage.classList.add("cart-product-image");
            cartItem.appendChild(productImage);

            // Create elements for item name, quantity, price, and buttons
            const itemInfo = document.createElement("div");
            itemInfo.classList.add("cart-item-info");

            const itemNameQuantity = document.createElement("div");
            itemNameQuantity.classList.add("cart-item-name-quantity");
            itemNameQuantity.innerHTML = `${item.name}<br>${formatCurrency(item.price)}`;

            itemInfo.appendChild(itemNameQuantity);

            const item2 = document.createElement("div");
            item2.classList.add("cart-item-total");

            const itemPrice = document.createElement("div");
            const itemTotal = item.price * item.quantity;
            itemPrice.textContent = formatCurrency(itemTotal);
            itemPrice.classList.add("cart-item-price");
            item2.appendChild(itemPrice);

            const itemControl = document.createElement("div");
            itemControl.classList.add("cart-item-control");

            const increaseButton = document.createElement("button");
            increaseButton.textContent = "+";
            increaseButton.classList.add("quantity-button");
            increaseButton.addEventListener("click", () => {
                increaseQuantity(item.id);
            });
            itemControl.appendChild(increaseButton);

            const itemQuantity = document.createElement("div");
            itemQuantity.textContent = `x${item.quantity}`;
            itemQuantity.classList.add("cart-item-quantity");
            itemControl.appendChild(itemQuantity);

            const decreaseButton = document.createElement("button");
            decreaseButton.textContent = "-";
            decreaseButton.classList.add("quantity-button");
            decreaseButton.addEventListener("click", () => {
                decreaseQuantity(item.id);
            });
            itemControl.appendChild(decreaseButton);

            cartItem.appendChild(itemInfo);
            cartItem.appendChild(itemControl);
            cartItem.appendChild(item2);


            totalAmount += itemTotal; // Add to the total amount

            cartItems.appendChild(cartItem);
            cartItems.appendChild(document.createElement("hr"));
        }
    });

    // Display the total amount
    const totalElement = document.createElement("div");
    totalElement.classList.add("total");
    totalElement.textContent = `Total: ${formatCurrency(totalAmount)}`;
    cartItems.appendChild(totalElement);

    // Sebelum menampilkan total amount, hitung jumlah pajak
    const taxRate = 0.11; // Pajak sebesar 11%
    const taxAmount = totalAmount * taxRate;

    // Hitung total keseluruhan (total amount + pajak)
    const totalIncludingTax = totalAmount + taxAmount;

    // Tambahkan item untuk pajak
    const taxItem = document.createElement("div");
    taxItem.classList.add("total");
    taxItem.textContent = `Tax (11%): ${formatCurrency(taxAmount)}`;
    cartItems.appendChild(taxItem);

    // Tampilkan total keseluruhan (total amount + pajak)
    const totalIncludingTaxItem = document.createElement("div");
    totalIncludingTaxItem.classList.add("total");
    totalIncludingTaxItem.textContent = `Total (Including Tax): ${formatCurrency(totalIncludingTax)}`;
    cartItems.appendChild(totalIncludingTaxItem);

    // Add a div to contain the Checkout button
    const checkoutButtonContainer = document.createElement("div");
    checkoutButtonContainer.classList.add("align-right"); // Add CSS class to align it to the right

    // Create the Checkout button
    const checkoutButton = document.createElement("button");
    checkoutButton.classList.add("btn", "btn-success", "checkout");
    checkoutButton.textContent = "Checkout";

    // Append the Checkout button to the div
    checkoutButtonContainer.appendChild(checkoutButton);

    // Append the div containing the Checkout button to the cartItems
    cartItems.appendChild(checkoutButtonContainer);

    // Add event listener to "Checkout" button
    checkoutButton.addEventListener("click", () => {
        checkout();
    });

    // Update tampilan keranjang
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Keranjang Anda kosong.</p>";
    }
}

// Function to increase quantity
function increaseQuantity(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity++;
        updateCart();
    }
}

// Function to decrease quantity
function decreaseQuantity(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity--; // Kurangi jumlah barang
        if (cart[itemIndex].quantity <= 0) {
            // Jika jumlahnya kurang dari atau sama dengan 0, hapus item dari keranjang
            cart.splice(itemIndex, 1);
        }
        updateCart();
    }
}

// Function to handle checkout
function checkout() {
    const checkoutItems = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        total: item.price * item.quantity
    }));

    // Calculate the total amount for the entire receipt
    const totalAmount = checkoutItems.reduce((total, item) => total + item.total, 0);

    // Calculate the tax amount (11% of totalAmount)
    const taxRate = 0.11; // 11% tax rate
    const taxAmount = totalAmount * taxRate;

    // Calculate the total including tax
    const totalIncludingTax = totalAmount + taxAmount;

    // Display the checkout receipt
    const receipt = document.createElement("div");
    receipt.classList.add("receipt");

    receipt.innerHTML = `
        <h4 style="font-weight: bold">Receipt</h4>
        <hr>
        <ul>
            ${checkoutItems.map((item, index) => `
                <li style="margin-bottom: 0">${index + 1}. ${item.name} (Qty: ${item.quantity}) - ${formatCurrency(item.total)}</li>
            `).join('')}
        </ul>
        <hr>
        <p>Total: ${formatCurrency(totalAmount)}</p>
        <p>Tax (11%): ${formatCurrency(taxAmount)}</p>
        <p>Total (Including Tax): ${formatCurrency(totalIncludingTax)}</p>
    `;

    // Clear the cart and update display
    cart.length = 0;
    updateCart();

    // Hide all elements within the cartItems container
    const cartItemsContainer = document.getElementById("cartItems");
    const childElements = cartItemsContainer.children;
    for (let i = 0; i < childElements.length; i++) {
        childElements[i].style.display = "none";
    }

    // Append the receipt to the cartItems container
    cartItemsContainer.appendChild(receipt);
}
