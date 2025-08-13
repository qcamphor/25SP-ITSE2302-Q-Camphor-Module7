// Constant
const submitBtn = document.getElementById("submitButton");
const resetBtn = document.getElementById("resetButton");
const cartSection = document.getElementById("cart");

// Event Listener
submitBtn.addEventListener("click", handleOrder);
resetBtn.addEventListener("click", resetOrder);

// Function with argument and returns value
function calculateTotal(checkboxes, radio, quantity) {
  var total = 0;
  for (var i = 0; i < checkboxes.length; i++) {
    var price = parseFloat(checkboxes[i].value.split("-")[1]);
    total += price;
  }
  if (radio) {
    var radioPrice = parseFloat(radio.value.split("-")[1]);
    total += radioPrice;
  }
  total = total * quantity;
  return total;
}

// Order function
function handleOrder() {
  var firstName = document.querySelector('input[name="firstName"]')
    ? document.querySelector('input[name="firstName"]').value.trim()
    : "";
  var lastName = document.querySelector('input[name="lastName"]')
    ? document.querySelector('input[name="lastName"]').value.trim()
    : "";
  var email = document.querySelector('input[name="email"]')
    ? document.querySelector('input[name="email"]').value.trim()
    : "";
  var phone = document.querySelector('input[name="phone"]')
    ? document.querySelector('input[name="phone"]').value.trim()
    : "";
  var quantity = parseInt(document.getElementById("quantity").value);

  // Array checks radio and checkboxes
  var checkboxes = [];
  var checkboxCircle = document.querySelectorAll(
    'input[type="checkbox"][name="printColor"]'
  );
  for (var i = 0; i < checkboxCircle.length; i++) {
    if (checkboxCircle[i].checked) {
      checkboxes.push(checkboxCircle[i]);
    }
  }

  var radios = [];
  var radioCircle = document.querySelectorAll(
    'input[type="radio"][name="size"]'
  );
  for (var j = 0; j < radioCircle.length; j++) {
    if (radioCircle[j].checked) {
      radios.push(radioCircle[j]);
    }
  }

  // Print colors
  var printColors = "";
  for (i = 0; i < checkboxes.length; i++) {
    if (i > 0) printColors += ", ";
    printColors += checkboxes[i].parentElement.textContent.trim();
  }

  // If and Else, Boolean for info
  var valid = true;

  if (!firstName) {
    alert("Please enter your first name.");
    valid = false;
  } else if (!lastName) {
    alert("Please enter your last name.");
    valid = false;
  } else if (!email || !email.includes("@")) {
    alert("Please enter a valid email address.");
    valid = false;
  } else if (!phone) {
    alert("Please enter your phone number.");
    valid = false;
  } else if (checkboxes.length === 0) {
    alert("Please select at least one style/color.");
    valid = false;
  } else if (radios.length === 0) {
    alert("Please select a size.");
    valid = false;
  } else if (isNaN(quantity) || quantity < 1) {
    alert("Please enter a valid quantity.");
    valid = false;
  }

  if (!valid) return;

  // Switch for sizes
  var sizeLabel = "";
  switch (radios[0].value.split("-")[0]) {
    case "S":
      sizeLabel = "Small";
      break;
    case "M":
      sizeLabel = "Medium";
      break;
    case "L":
      sizeLabel = "Large";
      break;
    case "XL":
      sizeLabel = "X-Large";
      break;
    case "2XL":
      sizeLabel = "2X-Large";
      break;
    case "3XL":
      sizeLabel = "3X-Large";
      break;
    case "4XL":
      sizeLabel = "4X-Large";
      break;
    default:
      sizeLabel = "Other";
  }

  // Get selected style and price
  var styleSelect = document.getElementById("style");
  var selectedStyleOption = styleSelect.options[styleSelect.selectedIndex];
  var styleName = selectedStyleOption.textContent;
  var stylePrice =
    parseFloat(selectedStyleOption.getAttribute("data-price")) || 0;

  // Get selected design style and price
  var designRadio = document.querySelector('input[name="design"]:checked');
  var designLabel = "";
  var designPrice = 0;
  var designFileName = "";
  if (designRadio) {
    designLabel = designRadio.parentElement.textContent.trim();
    designPrice = parseFloat(designRadio.getAttribute("data-price")) || 0;
    // Show file name if upload is selected
    if (designRadio.value === "upload") {
      var uploadInput = document.getElementById("designUpload");
      if (uploadInput && uploadInput.files.length > 0) {
        designFileName = uploadInput.files[0].name;
        designLabel += " (Uploaded: ${designFileName})";
      }
    }
  }

  // Calculate subtotal (style + design) * quantity
  var perShirt = stylePrice + designPrice;
  var subtotal = perShirt * quantity;

  // Calculate tax (e.g., 1.25%)
  var taxRate = 0.0125;
  var tax = subtotal * taxRate;

  // Calculate total
  var total = subtotal + tax;

  // Get credit card info
  var cardNumber = document.getElementById("cardNumber").value.trim();
  var cardExpiry = document.getElementById("cardExpiry").value.trim();
  var cardCVC = document.getElementById("cardCVC").value.trim();

  // Validate credit card info (basic example)
  if (!cardNumber || !cardExpiry || !cardCVC) {
    alert("Please enter your credit card information.");
    return;
  }

  // Order summary
  var summary = `
    <h2>Order Summary</h2> 
    <p>Name: ${firstName} ${lastName}</p> 
    <p>Email: ${email}</p> 
    <p>Phone: ${phone}</p> 
    <p>Shirt Style: $${stylePrice.toFixed(2)}</p> 
    <p>Design Style: $${designPrice.toFixed(2)}</p> 
    <p>Quantity: ${quantity}</p> 
    <p>Subtotal: $${subtotal.toFixed(2)}</p> 
    <p>Tax (1.25%): $${tax.toFixed(2)}</p> 
    <p>Total Price: $${total.toFixed(2)}</p> 
    <p><strong>Card Number:</strong> **** **** **** ${cardNumber.slice(-4)}</p>
    <p><strong>Expiry:</strong> ${cardExpiry}</p>
    <button id="checkoutButton" type="button">Checkout</button>
    <button id="resetButton" type="button">Reset</button>`;
  cartSection.innerHTML = summary;

  // Show alert when checkout button is clicked
  var checkoutBtn = document.getElementById("checkoutButton");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      alert("Thank you for your order! Your checkout is being processed.");
    });
  }

  var resetBtn = document.getElementById("resetButton");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetOrder);
  }
}

// Function, Try/Catch
function resetOrder() {
  // Reset all forms
  document.getElementById("contactForm").reset();
  document.getElementById("orderForm").reset();
  document.getElementById("colorForm").reset();
  document.getElementById("extrasForm").reset();
  document.getElementById("designForm").reset();
  document.getElementById("creditCardForm").reset();

  // Restore the cart section to its original state
  cartSection.innerHTML = `
    <h2>Your Cart</h2>
    <p id="emptyCartMessage" class="cart-empty-message">
      Your cart is currently empty.
    </p>
    <button type="submit" id="submitButton">Submit</button>
    <button type="reset" id="resetButton">Reset</button>
  `;

  // Re-attach event listeners to the new buttons
  document
    .getElementById("submitButton")
    .addEventListener("click", handleOrder);
  document.getElementById("resetButton").addEventListener("click", resetOrder);
}
