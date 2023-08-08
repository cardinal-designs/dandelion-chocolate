var elem = document.querySelector('.carousel__quotes--inner');
var flkty = new Flickity( elem, {
  prevNextButtons: true,
  pageDots: false,
  adaptiveHeight: true
});
document.addEventListener("DOMContentLoaded", function () {

  // Define a function to handle the attribute change event
  document.addEventListener("click", function () {
    if (document.querySelector(".checkoutMethodContainer")?.classList.contains("shipping")) {
      document.querySelectorAll(".cart__summer-shipping").forEach( elm => {
        elm.style.display = "block";  
      })            
    } else {
       document.querySelectorAll(".cart__summer-shipping").forEach( elm => {
        elm.style.display = "none";  
      })
    }
  })

  const cartIsGiftCheckbox = document.getElementById("CartIsGiftCheckbox");
  const cartGiftNoteContainer = document.getElementById("CartGiftNoteContainer");
  const giftNoteInput = document.getElementById("gift-note");
  const giftFromInput = document.getElementById("gift-from");
  
  if(cartIsGiftCheckbox){
    cartIsGiftCheckbox.addEventListener("change", function () {
    if (this.checked) {
      cartGiftNoteContainer.style.display = "block";
      giftNoteInput.required = true;
      giftFromInput.required = true;
    } else {
      cartGiftNoteContainer.style.display = "none";
      giftNoteInput.required = false;
      giftFromInput.required = false;
      giftNoteInput.value = "";
      giftFromInput.value = "";
    }
    });
  }
  
  
  const cartSpecialInstructionsCheckbox = document.getElementById("CartSpecialInstructionsCheckbox");
  const cartSpecialInstructionsContainer = document.getElementById("CartSpecialInstructionsContainer");
  const cartSpecialInstructionsInput = document.getElementById("CartSpecialInstructions");
  
  if(cartSpecialInstructionsCheckbox){
    cartSpecialInstructionsCheckbox.addEventListener("change", function () {
    if (this.checked) {
      cartSpecialInstructionsContainer.style.display = "block";
      cartSpecialInstructionsInput.required = true;
    } else {
      cartSpecialInstructionsContainer.style.display = "none";
      cartSpecialInstructionsInput.required = false;
      cartSpecialInstructionsInput.value = "";
    }
    });
  }
  
  
  function onShipDateCheckboxUpdate() {
    var shipDateCheckbox = document.getElementById("ShipDateCheckbox");
    var shipDateContainer = document.getElementById("ShipDateContainer");
    var shipDateSelect = document.getElementById("ShipDateSelect");
  
    if(shipDateCheckbox){
      if (shipDateCheckbox.checked) {
      shipDateContainer.style.display = "block";
      shipDateSelect.disabled = false;
    } else {
      shipDateContainer.style.display = "none";
      shipDateSelect.disabled = true;
    }
    }
  }
  
  function updateShopPayInstallments(disableNoticeDueToPickup) {
    var shopifyPayInstallments = document.querySelectorAll(".shopify-pay-installments");
  
    if (disableNoticeDueToPickup) {
      shopifyPayInstallments.forEach(function (element) {
        element.setAttribute("pickup-disabled", "true");
      });
    } else {
      shopifyPayInstallments.forEach(function (element) {
        element.removeAttribute("pickup-disabled");
      });
    }
  }
  
  function setShopPayRedirectCookieInit() {
    let setShopPayRedirectCookie = true;
    let shopPayRedirectCookieValue = false;
  
    if (window.statsig) {
      setShopPayRedirectCookie = statsig
        .getExperiment("shop_pay_redirect_shipping")
        .get("set_shopify_pay_redirect_cookie", setShopPayRedirectCookie);
      shopPayRedirectCookieValue = statsig
        .getExperiment("shop_pay_redirect_shipping")
        .get("shop_pay_redirect", shopPayRedirectCookieValue);
    }
  
    if (setShopPayRedirectCookie) {
      document.cookie = `shopify_pay_redirect=${shopPayRedirectCookieValue}; path=/`;
    }
  }

  if(document.querySelector('.prop65_moreinfo') != null){
    document.querySelector('.prop65_moreinfo').addEventListener('click', function(){
      document.querySelector('.modaloverlay').style.display = 'flex';
    });
  }

  if(document.querySelector('.close') != null){
    document.querySelector('.close').addEventListener('click', function(){
      document.querySelector('.modaloverlay').style.display = 'none';
    });
  }
  
  const modal = document.querySelector('.modaloverlay');
  
  function closeModal() {
    modal.style.display = 'none';
  }
  
  function windowClickHandler(event) {
    if (event.target === modal) {
      closeModal();
    }
  }
  
  window.addEventListener('click', windowClickHandler);
  
})
const cart_drawer_checkout_button=document.querySelector(".cart_drawer_checkout_button");
if(cart_drawer_checkout_button){
  cart_drawer_checkout_button.addEventListener("click",()=>{
    window.location.href="/cart"
  })
}

var elem = document.querySelector('.carousel-main');
var flkty = new Flickity(elem);

// Initialize the navigation carousel
var navCarousel = document.querySelector('.carousel-nav');
var flickityNav = new Flickity(navCarousel, {
  asNavFor: '.carousel-main',
  prevNextButtons: true,
  contain: true,
  cellAlign: 'left',
  pageDots: false,
  wrapAround: true
});

// Accordion 
var accordionContainer = $("dl.accordion-list");
var duration = 300;
accordionContainer.on("click", "dt:not(.active)", function () {
  accordionContainer.find("dt.active").removeClass("active");
  accordionContainer.find("dd").slideUp(duration);
  $(this).addClass("active").next("dd").slideDown(duration);
});

accordionContainer.on("click", "dt.active", function () {
  $(this).removeClass("active").next("dd").slideUp(duration);
});