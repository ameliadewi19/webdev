const productRow = document.getElementById("productRow");

// Function to render products
function renderProducts(products) {
    products.forEach(product => {
        const productCol = document.createElement("div");

        let numColumns = 3; 
        if (window.innerWidth <= 768) {
            numColumns = 2; 
        }
        if (window.innerWidth <= 480) {
            numColumns = 1; 
        }

        productCol.classList.add("col-md-4");
        productCol.innerHTML = `
            <div class="card mb-4 custom-card-style">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body custom-card-body-style">
                    <h5 class="card-title custom-title-style">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <span class="price">${formatCurrency(product.price)}</span>
                    <div class="quantity mb-4 mt-2">
                        <div class="input-group">
                            <button class="btn minus btn-primary" data-id="${product.id}" disabled>-</button>
                            <input type="number" class="qty form-control" value="0" min="0" readonly>
                            <button class="btn plus btn-primary" data-id="${product.id}">+</button>
                        </div>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-success addToCart" style="font-size: 10pt">Tambah Barang</button>
                    </div>
                </div>
            </div>
        `;
        productRow.appendChild(productCol);

        const qtyInput = productCol.querySelector(".qty"); // Declare qtyInput here
        
        // Set default value for quantity input
        qtyInput.value = 0;

        // Add event listeners to plus and minus buttons
        const minusButton = productCol.querySelector(".minus");
        const plusButton = productCol.querySelector(".plus");

        minusButton.addEventListener("click", () => {
            const currentQuantity = parseInt(qtyInput.value, 10);
            if (currentQuantity > 1) {
                qtyInput.value = currentQuantity - 1; // Decrease input value
                minusButton.disabled = currentQuantity - 1 === 1;
            }
        });
        
        plusButton.addEventListener("click", () => {
            qtyInput.value = parseInt(qtyInput.value, 10) + 1; // Increase input value
            minusButton.disabled = false;
        });

        // Add event listener to "Add to Cart" button
        const addToCartButton = productCol.querySelector(".addToCart");
        addToCartButton.addEventListener("click", () => {
            const quantity = parseInt(qtyInput.value, 10); // Get the quantity from input
            if (quantity > 0) {
                addToCart(product, quantity); // Call addToCart with product and quantity
            }
        });

    });
}


