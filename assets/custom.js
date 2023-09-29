var elem = document.querySelector('.category__slider');
var flkty = new Flickity( elem, {
  prevNextButtons: false,
  pageDots: false,
  adaptiveHeight: false,
  contain: true
});

$(window).on("load resize orientationchange", function(){
  var windowsize = $(window).width();
  if(windowsize < 767 ) {
    var elem = document.querySelector('.mobile__swiper');
    var flkty = new Flickity( elem, {
      prevNextButtons: false,
      pageDots: false,
      adaptiveHeight: false,
      contain: true,
      wrapAround: true,
      groupCells: true
    });
  }
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
    if(myElement)myElement.classList.add("hide__slider_arrows");
    if(myElementnav)myElementnav.classList.add("hide__slider_arrows");
  }
  
  var flickityContainer = document.querySelector(".carousel-nav");
  var flickityItems = document.querySelectorAll(".product-images__slide");

  var elem = document.querySelector('.carousel-main');
  var getPosition = parseInt($('.media__gallery').attr('data-position')) - 1;
  if(getPosition){
    $('#Product-Slider .product-images__slide:eq('+getPosition+')').insertBefore("#Product-Slider .product-images__slide:eq(0)");
    $('#Product-Slider-Thumbanils .product-images__slide:eq('+getPosition+')').insertBefore("#Product-Slider-Thumbanils .product-images__slide:eq(0)");
    
  }
  
  var flkty2 = new Flickity(elem);
  
  var flkty1 = new Flickity(flickityContainer, {
      asNavFor: '.carousel-main',
      prevNextButtons: true,
      pageDots: false, 
      wrapAround: false,
      cellAlign: 'left',
      contain: true
  });

});

// Accordion 
var accordionContainer = document.querySelector("dl.accordion-list");
var duration = 300;
if(accordionContainer){
  accordionContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "DT" && !event.target.classList.contains("active")) {
      var activeDt = accordionContainer.querySelector("dt.active");
      
      if (activeDt) {
        activeDt.classList.remove("active");
        slideUp(activeDt.nextElementSibling)
      }
      event.target.classList.add("active");
      slideDown(event.target.nextElementSibling)
    } else if (event.target.tagName === "DT" && event.target.classList.contains("active")) {
      var activeDt = accordionContainer.querySelector("dt.active");
      
      if (activeDt) {
        activeDt.classList.remove("active");
        slideUp(activeDt.nextElementSibling)
      }
    
    }
  });
}

// Accordion 
var accordionContainer = document.querySelector("dl.meta__accordion--list");
var duration = 300;
if(accordionContainer){
  accordionContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "DT" && !event.target.classList.contains("active")) {
      var activeDt = accordionContainer.querySelector("dt.active");
      
      if (activeDt) {
        activeDt.classList.remove("active");
        slideUp(activeDt.nextElementSibling)
      }
      event.target.classList.add("active");
      slideDown(event.target.nextElementSibling)
    } else if (event.target.tagName === "DT" && event.target.classList.contains("active")) {
      var activeDt = accordionContainer.querySelector("dt.active");
      
      if (activeDt) {
        activeDt.classList.remove("active");
        slideUp(activeDt.nextElementSibling)
      }
    
    }
  });
}

let slideUp = (target, duration=400) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    //alert("!");
  }, duration);
}

let slideDown = (target, duration=400) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}

$(window).on("load resize orientationchange", function(){
  var t = $("body").width(),
    i = 1320,
    s = t - i,
    a = s / 2;
    if(a < 60){
      var f_a = 60;
    } else {
      var f_a = a;      
    }
  $(".image-with-text-overlay .image-with-text-overlay--content.content-middle-left").css("padding-left", f_a);
});


if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
  document.body.classList.add("safari__specific--css");
}

$(document).ready(function () {
  var url = window.location.href;
  console.log(url);
  let page = url.substring(url.lastIndexOf('#') + 1);
  console.log(page);
  
  let sectionScrolll = document.querySelector(`[id="${page}"]`);
  if(sectionScrolll){
    window.scroll({
      top: sectionScrolll.offsetTop - 50,
      behavior: "smooth",
    });
  }
});

document.querySelector('.Sub_Menu-Columns').querySelectorAll('li a').forEach((ele)=>{
  ele.addEventListener('click',function(el){
    let Id = el.currentTarget.getAttribute('data-col-Id'),
        sectionId = document.querySelector(`[id="${Id}"]`);
    window.scroll({
      top: sectionId.offsetTop - 90,
      behavior: "smooth",
    });
  });

  if(window.sessionStorage.getItem('scrolltosection')){
    console.log(ele.dataset.colId,window.sessionStorage.getItem('scrolltosection'))
    if(ele.dataset.colId == window.sessionStorage.getItem('scrolltosection')){
      ele.click();
      window.sessionStorage.removeItem("scrolltosection");
    }
  }
})

document.querySelectorAll('.child__menu--image a').forEach((ele)=>{
  ele.addEventListener('click',function(el){
    let Id = el.currentTarget.getAttribute('data-col-Id'),
        sectionId = document.querySelector(`[id="${Id}"]`);
    window.scroll({
      top: sectionId.offsetTop - 72,
      behavior: "smooth",
    });
  })

  if(window.sessionStorage.getItem('scrolltosection')){
    console.log(ele.dataset.colId,window.sessionStorage.getItem('scrolltosection'))
    if(ele.dataset.colId == window.sessionStorage.getItem('scrolltosection')){
      ele.click();
      window.sessionStorage.removeItem("scrolltosection");
    }
  }
})

$(document).ready(function() {
  var desc = $('.meta__product--description').html();
  
  var read_more = '<div class="rm_grad" style="">&nbsp;</div><div class="read_more" style="">Read more</div><div class="read_less" style="display: none;">Read less</div>';
  $('.meta__product--description .metafield-rich_text_field').html('<div class="short_description">' + desc + read_more + "</dl>");
  $('.read_less').hide();
  
  var og_height = $('.short_description').innerHeight();

  console.log(og_height);

  if( og_height > 300 ) {
    $('.short_description').css({"max-height": "300px"});
    $('.short_description .metafield-rich_text_field').css({"max-height": "300px"});
  } 
  else {
    $('.read_more').hide();
    $('.read_less').hide();
    $('.rm_grad').hide();
  }
  
  $('.read_more').on('click', function() {
    $('.short_description').animate({ "max-height": og_height});
    $('.short_description .metafield-rich_text_field').animate({ "max-height": og_height});
    $(this).hide();
    $('.short_description').addClass('expanded');
    $('.read_less').show();
    $('.rm_grad').hide();
  });
  
  $('.read_less').on('click', function() {
    $('.short_description').animate({ "max-height": "300px"});
    $('.short_description .metafield-rich_text_field').animate({ "max-height": "300px"});
    $(this).hide();
    $('.short_description').removeClass('expanded');
    $('.rm_grad').show(); 
    $('.read_more').show();
  });

   $('.product-information variant-selects select,.product-add-to-cart-sticky variant-selects select').each(function(){
      var $this = $(this), numberOfOptions = $(this).children('option').length;
    
      $this.addClass('select-hidden'); 
      $this.wrap('<div class="select"></div>');
      $('.product-variants').append('<div class="select-styled"></div>');
  
      var $styledSelect = $('.product-variants').find('div.select-styled');
      $styledSelect.text($this.children('option').eq(0).text());
    
      var $list = $('<ul />', {
          'class': 'select-options'
      }).insertAfter($styledSelect);
    
      for (var i = 0; i < numberOfOptions; i++) {
          $('<li />', {
              text: $this.children('option').eq(i).text(),
              rel: $this.children('option').eq(i).val()
          }).appendTo($list);
          if ($this.children('option').eq(i).is(':selected')){
            $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
          }
      }
    
      var $listItems = $list.children('li');
    
      $styledSelect.click(function(e) {
          e.stopPropagation();
          $('div.select-styled.active').not(this).each(function(){
              $(this).removeClass('active').next('ul.select-options').hide();
          });
          $(this).toggleClass('active').next('ul.select-options').toggle();
      });
    
     $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        var selectElement = $this[0];
    selectElement.querySelector('option[value="'+$(this).attr('rel')+'"]').selected = true;
    
    // Dispatch the 'change' event on the select element
    var changeEvent = new Event('change', { bubbles: true });
    selectElement.dispatchEvent(changeEvent);
  
       
        $list.find('li.is-selected').removeClass('is-selected');
        $list.find('li[rel="' + $(this).attr('rel') + '"]').addClass('is-selected');
        $list.hide();

       var addtoCart = $('.product-information button[type="submit"]').text();
       
       setTimeout(function(){
         console.log(addtoCart.trim())
         if (addtoCart.includes("Sold out")){
           $('.product-submit').text('SOLD OUT');
           $('.product-submit').attr('disabled','disabled');
         } else {
           $('.product-submit').text('RESERVE YOUR SPOT');
           $('.product-submit').removeAttr('disabled');
         }
       },3000)
      });
  
    
      $(document).click(function() {
          $styledSelect.removeClass('active');
          $list.hide();
      });
  
  });
  $('.product-variants').after('<div class="trip__cart-btn"><button class="product-submit custom__btn">RESERVE YOUR SPOT</button></div>')
  
});

document.querySelectorAll('.child__menu--image a').forEach((ele)=>{
  ele.addEventListener('click',function(el){
    let Id = el.currentTarget.getAttribute('data-col-Id'),
        sectionId = document.querySelector(`[id="${Id}"]`);
    window.scroll({
      top: sectionId.offsetTop - 72,
      behavior: "smooth",
    });
  })

  if(window.sessionStorage.getItem('scrolltosection')){
    console.log(ele.dataset.colId,window.sessionStorage.getItem('scrolltosection'))
    if(ele.dataset.colId == window.sessionStorage.getItem('scrolltosection')){
      ele.click();
      window.sessionStorage.removeItem("scrolltosection");
    }
  }
});

$(document).ready(function () {

    function updateDigitalGiftCardForm() {
      function handleUpdate(digitalGiftCardInput, digitalGiftCardForm) {
          var val = digitalGiftCardInput.val();
          if (val == "Email") {
              digitalGiftCardForm.addClass("Email").removeClass("Shipped");
          } else {
              digitalGiftCardForm.removeClass("Email").addClass("Shipped");
          }
  
          var formElements = digitalGiftCardForm.find("input, textarea");
          formElements.prop("required", val == "Email");
          formElements.prop("disabled", val != "Email");
      }
  
      function initializeListener(selector) {
          var digitalGiftCardInput = $(selector + " .variations select");
          var digitalGiftCardForm = $(selector + " .product-digitalgiftcard-form");
  
          if (digitalGiftCardInput.length && digitalGiftCardForm.length) {
              digitalGiftCardInput.change(function () {
                  handleUpdate(digitalGiftCardInput, digitalGiftCardForm);
              });
          }
      }
  
      initializeListener(".product-information");
      initializeListener(".product-add-to-cart-sticky");
  }
  
  const checkDiv = setInterval(() => {
      if ($('.product-information .variations select').length > 0 || $('.product-add-to-cart-sticky .variations select').length > 0) {
          clearInterval(checkDiv);
          updateDigitalGiftCardForm();
      }
  }, 100);

  /*
  Reference: http://jsfiddle.net/BB3JK/47/
  */
  
 $('.product-information--inner .product-form__input select,.product-add-to-cart-sticky .product-form__input select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
      if ($this.children('option').eq(i).is(':selected')){
        $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
      }
    }
    
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
      e.stopPropagation();
      $('div.select-styled.active').not(this).each(function(){
          $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
    });
    
    $listItems.click(function(e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      var selectElement = $this[0];
      selectElement.querySelector('option[value="'+$(this).attr('rel')+'"]').selected = true;

      // Dispatch the 'change' event on the select element
      var changeEvent = new Event('change', { bubbles: true });
      selectElement.dispatchEvent(changeEvent);
  
      $list.find('li.is-selected').removeClass('is-selected');
      $list.find('li[rel="' + $(this).attr('rel') + '"]').addClass('is-selected');
      $list.hide();
      console.log($this.find('option[value="'+$(this).attr('rel')+'"]'));
    });

    $(document).click(function() {
      $styledSelect.removeClass('active');
      $list.hide();
    });
  
  });

  var productsLength = $('.template-search #product-grid .column:visible').length;
  var hiddenProducts = $('.hide-search').length;
  if(productsLength && hiddenProducts){
    $('.facets__label').text(productsLength+ " Results")
  }

  $('.product-digitalgiftcard-form input').on('keypress', function () {
      const newValue = $(this).val();
      const inputField = $(this).attr('name');
      // Update the value of the second input with the same class
      $(inputField).val(newValue);
  });

})

 