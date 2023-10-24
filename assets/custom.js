var elem = document.querySelector('.category__slider');
var flkty = new Flickity( elem, {
  prevNextButtons: false,
	@@ -13,8 +28,7 @@ $(window).on("load resize orientationchange", function(){
    var flkty = new Flickity( elem, {
      prevNextButtons: false,
      pageDots: false,
      adaptiveHeight: false,
      contain: true,
      wrapAround: true,
      groupCells: true
    });
	@@ -162,9 +176,7 @@ document.addEventListener("DOMContentLoaded", function() {
  var flickityItems = document.querySelectorAll(".product-images__slide");

  var elem = document.querySelector('.carousel-main');
  var getOffset = $('.media__gallery').attr('data-offset') ? parseInt($('.media__gallery').attr('data-offset')): 0;
  var getPosition = parseInt($('.media__gallery').attr('data-position')) - 1 - getOffset;

  if(getPosition){
    $('#Product-Slider .product-images__slide:eq('+getPosition+')').insertBefore("#Product-Slider .product-images__slide:eq(0)");
    $('#Product-Slider-Thumbanils .product-images__slide:eq('+getPosition+')').insertBefore("#Product-Slider-Thumbanils .product-images__slide:eq(0)");
	@@ -174,12 +186,12 @@ document.addEventListener("DOMContentLoaded", function() {
  var flkty2 = new Flickity(elem);

  var flkty1 = new Flickity(flickityContainer, {
    asNavFor: '.carousel-main',
    prevNextButtons: true,
    pageDots: false, 
    wrapAround: false,
    cellAlign: 'center',
    contain: true
  });

});
	@@ -312,65 +324,72 @@ if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('
  document.body.classList.add("safari__specific--css");
}

// let anchorSelector = 'a[href^="#"]';

// Collect all such anchor links
// let anchorList = document.querySelectorAll(anchorSelector);
// anchorList.forEach(link => {
//   link.onclick = function (e) {
//   e.preventDefault();
//     let destination = 
//       document.querySelector(this.hash);
//       destination.scrollIntoView({
//       behavior: 'smooth'
//     });
//   }
// });

var $root = $('html, body');
$('.mega-menu-container a[href^="#"]').click(function () {
  $('.mega-menu-container').addClass('hidden');
  setTimeout(function() { 
    $('.mega-menu-container').removeClass('hidden');
  }, 500);

  $root.animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top - 85
  }, 500);
  return false;
});

$('.sub__menu--navigation a[href^="#"]').click(function () {
  $('.mobile-toggle-wrapper').removeClass('active');
  $('.mobile-toggle-wrapper').removeAttr('open');
  $('body').removeClass('overflow-hidden');
  $root.animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top - 85
  }, 500);
  return false;
});

$('.sub__menu--navigation a').click(function () {
  $('.mobile-toggle-wrapper').removeClass('active');
  $('.mobile-toggle-wrapper').removeAttr('open');
  $('body').removeClass('overflow-hidden');
});

$(function(){
  var hash = window.location.hash;
  $('html, body').animate({ 
    scrollTop: $(hash).offset().top - 85
  });
});

$(document).ready(function() {
  var desc = $('.meta__product--description').html();

  var read_more = '<div class="rm_grad" style="">&nbsp;</div><div class="read_more" style="">Read more</div><div class="read_less" style="display: none;">Read less</div>';
  $('.meta__product--description .metafield-rich_text_field').html('<div class="short_description">' + desc + read_more + "</dl>");
  $('.read_less').hide();
  var og_height = $('.short_description').innerHeight();

  if( og_height > 300 ) {
    $('.short_description').css({"max-height": "300px"});
    $('.short_description .metafield-rich_text_field').css({"max-height": "300px"});
	@@ -399,16 +418,15 @@ $(document).ready(function() {
    $('.read_more').show();
  });

  $('.product-information variant-selects select').each(function(){
      var $this = $(this), numberOfOptions = $(this).children('option').length;

      $this.addClass('select-hidden'); 
      $this.wrap('<div class="select"></div>');
      $('.product-variants').append('<div class="select-styled"></div>');

      var $styledSelect = $('.product-variants').find('div.select-styled');
      $styledSelect.text($this.children('option').eq(0).text());

      var $list = $('<ul />', {
          'class': 'select-options'
      }).insertAfter($styledSelect);
	@@ -419,6 +437,7 @@ $(document).ready(function() {
              rel: $this.children('option').eq(i).val()
          }).appendTo($list);
          if ($this.children('option').eq(i).is(':selected')){
            $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
          }
      }
	@@ -472,57 +491,269 @@ $(document).ready(function() {
  $('.product-variants').after('<div class="trip__cart-btn"><button class="product-submit custom__btn">RESERVE YOUR SPOT</button></div>')

});
$(document).ready(function () {

  /* Gift Card */

function updateDigitalGiftCardForm() {
    var digitalGiftCardInput = $(".product-information .variations select");
    var digitalGiftCardForm = $(".product-information .product-digitalgiftcard-form");
    if (digitalGiftCardInput.length && digitalGiftCardForm.length) {
      var val = $(digitalGiftCardInput).val();
      if (val == "Email") {
        digitalGiftCardForm.addClass("Email");
        digitalGiftCardForm.removeClass("Shipped");
        $(
          ".product-information .product-digitalgiftcard-form input,.product-information .product-digitalgiftcard-form textarea"
        ).prop("required", true);
        $(
          ".product-information .product-digitalgiftcard-form input,.product-information .product-digitalgiftcard-form textarea"
        ).prop("disabled", false);
      } else {
        digitalGiftCardForm.removeClass("Email");
        digitalGiftCardForm.addClass("Shipped");
        $(
          ".product-information .product-digitalgiftcard-form input,.product-information .product-digitalgiftcard-form textarea"
        ).prop("required", false);
        $(
          ".product-information .product-digitalgiftcard-form input,.product-information .product-digitalgiftcard-form textarea"
        ).prop("disabled", true);
      }
    }
  }

  const checkDiv = setInterval(() => {
    if($('.product-information .variations select').length > 0) {
      clearInterval(checkDiv);
      $(".product-information .variations select").change(updateDigitalGiftCardForm);      
    } 
  }, 100); 


  /*  Reference: http://jsfiddle.net/BB3JK/47/  */

  $('.product-information--inner .product-form__input select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
	@@ -533,6 +764,7 @@ function updateDigitalGiftCardForm() {
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
      if ($this.children('option').eq(i).is(':selected')){
        $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
      }
    }
	@@ -549,6 +781,7 @@ function updateDigitalGiftCardForm() {

    $listItems.click(function(e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      var selectElement = $this[0];
      selectElement.querySelector('option[value="'+$(this).attr('rel')+'"]').selected = true;
	@@ -576,4 +809,62 @@ function updateDigitalGiftCardForm() {
    $('.facets__label').text(productsLength+ " Results")
  }
})

    // Code For Gifiting Image Change
document.addEventListener("DOMContentLoaded", function() {
  const gift__input = document.querySelector("#gift__input");
  var GiftSelected = false;

  if($('.gifting-select').val() == 'Yes') {
    $( "#gift__input" ).prop( "checked", true );
    GiftSelected = true;
  }

  if(gift__input) {
    gift__input.addEventListener("change", function() {
      var GiftingSelect = document.querySelector("select.gifting-select"); 
      var position_gift_image = document.getElementById('position_gift_image').value;
      var carousel_main = document.querySelector('.carousel-main');
      var flickityContainer = document.querySelector(".carousel-nav");

      if (gift__input.checked) {
        GiftingSelect.value = "Yes"; 
        GiftingSelect.dispatchEvent(new Event("change"));
        var flkty2 = new Flickity(carousel_main);
        if(GiftSelected) {
          flkty2.select( 0 );
        } else {
          flkty2.select( position_gift_image - 1 );
        }

      } else {
        GiftingSelect.value = "No";
        GiftingSelect.dispatchEvent(new Event("change"));
        var flkty2 = new Flickity(carousel_main);
        if(GiftSelected) {
          flkty2.select( 1 );
        } else {
          flkty2.select( 0 );
        }
      }
    });
  }
});