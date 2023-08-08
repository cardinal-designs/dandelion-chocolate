var elem = document.querySelector('.carousel__quotes--inner');
var flkty = new Flickity( elem, {
  prevNextButtons: true,
  pageDots: false,
  adaptiveHeight: true
});

document.addEventListener("DOMContentLoaded", function () {
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
  
  document.querySelector('.prop65_moreinfo')?.addEventListener('click', function(){
    document.querySelector('.modaloverlay').style.display = 'flex';
  });
  
  document.querySelector('.close')?.addEventListener('click', function(){
    document.querySelector('.modaloverlay').style.display = 'none';
  });
  
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
  
});

// Initialize the navigation carousel
document.addEventListener("DOMContentLoaded", function() {

  var flickityContainer_main = document.querySelector(".carousel-main");
  var flickityItems_main = document.querySelectorAll(".product-images__slide");

  var myElement = document.querySelector(".carousel-main");
  var myElementnav = document.querySelector(".carousel-nav");
  
  if (flickityItems_main.length <= 5) {
    myElement.classList.add("hide__slider_arrows");
    myElementnav.classList.add("hide__slider_arrows");
  }
  
  var flickityContainer = document.querySelector(".carousel-nav");
  var flickityItems = document.querySelectorAll(".product-images__slide");

  var elem = document.querySelector('.carousel-main');
  var flkty = new Flickity(elem);
  
  var flkty1 = new Flickity(flickityContainer, {
      asNavFor: '.carousel-main',
      prevNextButtons: true,
      pageDots: false,
      wrapAround: true,
      cellAlign: 'left'
  });

});

// Accordion 
jQuery(document).ready(function() {

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

});