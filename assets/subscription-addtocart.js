const rechargeButtons = document.querySelectorAll('.subscription__btn');
const addToCartButton = document.getElementById('add-to-cart-button');
const rechargeInput = document.getElementById('Recharge');

rechargeButtons.forEach(button => {
  button.addEventListener('click', function () {
    const selectedSubinterval = this.getAttribute('data-subinterval');
    rechargeInput.value = selectedSubinterval;
    console.log(selectedSubinterval)
  });
});

addToCartButton.addEventListener('click', function () {
  addToCart();
});

function addToCart() {
  const variantId = "41870385610892";
  const quantity = 1;
  const frequency = "1";
  const unitType = "Months";

  let data;
  data = {
    "id": variantId,
    "quantity": quantity,
    "properties": {
      "shipping_interval_frequency": frequency,
      "shipping_interval_unit_type": unitType
    }
  }

  fetch('/cart/add.js', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'xmlhttprequest'
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('hey', data);
      // window.location.href = '/cart';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}