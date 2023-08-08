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
  pageDots: false
});

// Accordion 
const accordionContainer = document.querySelector("dl.accordion-list");
const duration = 300;

accordionContainer.addEventListener("click", function (event) {
  if (!event.target.matches("dt")) return;

  const activeDt = accordionContainer.querySelector("dt.active");
  const clickedDt = event.target;
  const content = clickedDt.nextElementSibling;

  if (!clickedDt.classList.contains("active")) {
      if (activeDt) {
          activeDt.classList.remove("active");
          slideUp(activeDt.nextElementSibling);
      }

      clickedDt.classList.add("active");
      slideDown(content);
  } else {
      clickedDt.classList.remove("active");
      slideUp(content);
  }
});

function slideDown(element) {
  element.style.maxHeight = "0";
  element.style.transition = `max-height ${duration}ms ease-in-out`;

  element.style.display = "block";
  element.style.maxHeight = element.scrollHeight + "px";

  setTimeout(() => {
      element.style.removeProperty("max-height");
      element.style.removeProperty("transition");
  }, duration);
}

function slideUp(element) {
  element.style.maxHeight = element.scrollHeight + "px";
  element.style.transition = `max-height ${duration}ms ease-in-out`;

  setTimeout(() => {
      element.style.maxHeight = "0";
  }, 10);

  setTimeout(() => {
      element.style.removeProperty("max-height");
      element.style.removeProperty("transition");
      element.style.removeProperty("display");
  }, duration);
}