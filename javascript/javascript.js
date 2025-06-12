// Store cart data
let cart = []; // Array
let cartTotal = 0;

// "Add to Cart" button in the form
document
  .getElementById("addToCartButton")
  .addEventListener("click", function () {
    // Get form data
    const firstName = document.getElementById("firstName").value; // String Methods
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const size = document.querySelector('input[name="size"]:checked'); // Constant
    const extras = Array.from(
      document.querySelectorAll('input[name="extras"]:checked')
    ).map((extra) => Number(extra.value)); // Array
    const color = document.getElementById("color").value;
    const quantity = Number(document.getElementById("quantity").value);

    // Validate required fields
    if (!firstName || !lastName || !email || !size || quantity <= 0) {
      // If and Else
      alert("Please fill out all required fields.");
      return;
    }

    // Calculate the total price
    const basePrice = Number(size.value);
    const extrasTotal = extras.reduce((sum, price) => sum + price, 0); // Loop
    const totalPrice = calculateTotal(basePrice, extrasTotal, quantity);

    // Add the product to the cart
    addToCart({
      name: `${size.parentElement.textContent.trim()} T-Shirt`,
      price: basePrice + extrasTotal,
      quantity: quantity,
      color: color,
      totalPrice: totalPrice,
    });

    // Show a confirmation alert
    alert("Your item has been added to the cart!");

    // Display a message in the message container
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.textContent = "Your item has been added to the cart!";
    messageContainer.style.display = "block";
  });

// "Add to Cart" buttons in the featured products section
const addToCartButtons = document.querySelectorAll(".add-to-cart"); // Constant
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productName = button.getAttribute("data-product"); // String Methods
    const productPrice = Number(button.getAttribute("data-price"));

    // Add the product to the cart
    addToCart({
      name: productName,
      price: productPrice,
      quantity: 1,
      totalPrice: productPrice,
    });

    // Show a confirmation alert
    alert(`${productName} has been added to your cart!`);
  });
});

// Function to calculate the total price
function calculateTotal(basePrice, extrasTotal, quantity) {
  return (basePrice + extrasTotal) * quantity;
}

// Function to add an item to the cart
function addToCart(item) {
  if (!item.price) {
    console.error("Item price is missing. Cannot add to cart.");
    return;
  }
  cart.push(item);
  cartTotal += item.totalPrice;
  updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalContainer = document.getElementById("cartTotal");

  // Clear the current cart display
  cartItemsContainer.innerHTML = "";

  // Loop through the cart and display each item
  cart.forEach((item, index) => {
    const row = document.createElement("tr");

    // Item Name
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name || "Unknown Item";
    row.appendChild(nameCell);

    // Item Price
    const priceCell = document.createElement("td");
    priceCell.textContent = `$${item.price.toFixed(2)}`;
    row.appendChild(priceCell);

    // Item Quantity
    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity || 1;
    row.appendChild(quantityCell);

    // Item Total
    const totalCell = document.createElement("td");
    totalCell.textContent = `$${item.totalPrice.toFixed(2)}`;
    row.appendChild(totalCell);

    // Remove Button
    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener("click", () => removeFromCart(index));
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    cartItemsContainer.appendChild(row);
  });

  // Update the total price display
  cartTotalContainer.textContent = `Total: $${cartTotal.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
  const item = cart[index];
  cartTotal -= item.totalPrice;
  cart.splice(index, 1);
  updateCartDisplay();
}

// Add a reset event listener to the form
document.getElementById("orderForm").addEventListener("reset", function () {
  cart = [];
  cartTotal = 0;
  updateCartDisplay();
  alert("The form has been reset.");
});
