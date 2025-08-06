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

  // Array chceks radio and checkboxes
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
  var stylePrice = selectedStyleOption.getAttribute("data-price");

  // Calculate total
  var total = calculateTotal(checkboxes, radios[0], quantity);

  // Calculate shirt cost (shirt price * quantity)
  var shirtCost = stylePrice * quantity;

  // Order summary
  var summary = `
    <h2>Order Summary</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Shirt Style:</strong> ${styleName}</p>
    <p><strong>Quantity:</strong> ${quantity}</p>
    <p><strong>Size:</strong> ${sizeLabel}</p>
    <p><strong>Print Colors:</strong> ${printColors}</p>
    <p><strong>Total Price:</strong> $${shirtCost.toFixed(2)}</p>
    <button id="checkoutButton" type="button">Checkout</button>
  `;
  cartSection.innerHTML = summary;

  // Show popup when checkout button is clicked
  var checkoutBtn = document.getElementById("checkoutButton");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      alert("Thank you for your order! Your checkout is being processed.");
    });
  }
}

// Function, Try/Catch
function resetOrder() {
  try {
    // Reset all forms by their IDs
    document.getElementById("contactForm").reset();
    document.getElementById("orderForm").reset();
    document.getElementById("extrasForm").reset();
    document.getElementById("colorForm").reset();

    // Clear the cart summary
    cartSection.innerHTML = "";
  } catch (err) {
    alert("Could not reset the order summary.");
  }
}
