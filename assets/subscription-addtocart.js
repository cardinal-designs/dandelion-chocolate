/**
 * Add subscriptions to cart
 */
function addSubscriptionsToCart() {
  const rechargeButtons = document.querySelectorAll('.subscription__btn');
  const addToCartButton = document.getElementById('add-to-cart-button');

  let selectedSellingPlanID = null;
  let selectedVariantID = null;

  // Disable add to cart button by default
  addToCartButton.disabled = true;

  if (!rechargeButtons) return;
  rechargeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const currentTarget = e.target;
      selectedSellingPlanID = currentTarget.dataset.sellingPlanId;
      selectedVariantID = currentTarget.dataset.variantId;

      // Enable add to cart button when a recharge button is clicked
      addToCartButton.disabled = false;
    });
  });

  addToCartButton.addEventListener('click', () => { 
    addToCart(selectedSellingPlanID, selectedVariantID);
  });

  /**
   * Add selected subscription to cart
   */
  function addToCart(sellingPlanID, variantID) {
    if (sellingPlanID && variantID) {
      const data = {
        "id": variantID,
        "quantity": 1,
        "selling_plan": sellingPlanID
      };

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
          window.location.href = '/cart';
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.error('Selling Plan ID or Variant ID is missing.');
    }
  }
}

addSubscriptionsToCart();