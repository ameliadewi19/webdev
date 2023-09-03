fetch("products.json")
  .then(response => response.json())
  .then(data => {
    renderProducts(data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
});

function formatCurrency(number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number);
}