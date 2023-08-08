var phone_field = 'div[data-address-field="phone"]';
var phone_selector = "#checkout_shipping_address_phone";
var express_checkout_selector = "div[data-alternative-payments]";
var shopify_pay_modal = "#shopify-pay-modal";
var shipping_country_field = "#checkout_shipping_address_country";

function isInternationalOrder() {
  var val = $("#checkout_shipping_address_country").val();
  return val != "United States";
}
function isPhoneFieldRequired() {
  return isInternationalOrder() || window.is_delivery_or_pickup_order;
}

function checkPhoneFieldRequired() {
  if (isPhoneFieldRequired()) {
    console.log("set phone field req");
    setPhoneFieldRequired();
  } else {
    console.log("set phone field opt");
    setPhoneFieldOptional();
  }
}

function setPhoneFieldRequired() {
  if ($(phone_field).length) {
    $(phone_field).removeClass("field--optional");
    $(phone_field).addClass("field--required");
  }
  if ($(phone_selector).length) {
    $(phone_selector).prop("required", true);
    if (isInternationalOrder()) {
      setTimeout(function () {
        $(phone_selector).attr(
          "placeholder",
          "Phone (required for international orders)"
        );
      }, 10);
    }
  }
}

function setPhoneFieldOptional() {
  if ($(phone_field).length) {
    $(phone_field).addClass("field--optional");
    $(phone_field).removeClass("field--required");
  }
  if ($(phone_selector).length) {
    $(phone_selector).prop("required", false);
    setTimeout(function () {
      $(phone_selector).attr("placeholder", "Phone (optional)");
    }, 10);
  }
}

$(document).on("page:load", function () {
  $(shipping_country_field).change(checkPhoneFieldRequired);
});

$(document).on("page:load page:change", function () {
  $("#continue_button").click(function () {
    logCheckoutStep("continue");
  });

  if (Shopify.Checkout.step == "contact_information") {
    $("#continue_button").click(onContactInfoContinueButtonClick);
    checkPhoneFieldRequired();
  }

  if (window.is_delivery_or_pickup_order) {
    $(express_checkout_selector).hide();
    $(shopify_pay_modal).hide();
  }

  if (window.is_pickup_order) {
    hidePickupAddressFields();
    if (Shopify.Checkout.step == "payment_method") {
      $("[data-different-billing-address] input").click();
    }
  } else {
    hideContactFields(); // test hiding co. field
  }

  if (Shopify.Checkout.step == "shipping_method") {
    try {
      checkShippingMethods();
    } catch (ex) {
      console.log("problem checking shipping methods, ", ex);
    }
  }
  testCheckoutUpsell();

  logCheckoutStep("view");
});

function testCheckoutUpsell() {
  if (statsig) {
    let showUpsell = statsig
      .getExperiment("checkout_upsell_widget")
      .get("show_checkout_upsell", true);

    let upsellSelector = "[data-rebuy-id='56663']";

    $(upsellSelector).toggle(showUpsell);
  }
}

/**
 * Log statsig event when rebuy item added to cart
 */
document.addEventListener("rebuy.add", function (event) {
  if (window.statsig) {
    window.statsig.logEvent(
      "add_to_cart",
      event.detail.product.selected_variant.price,
      {
        sku: event.detail.product.selected_variant.sku,
        source: "rebuy",
      }
    );
    // console.log(
    //   "rebuy.add event",
    //   event,
    //   event.detail.product.selected_variant.price,
    //   event.detail.product.selected_variant.sku
    // );
  }
});

function testNewsletterMessage() {
  if (statsig) {
    // remember to adjust checkout css after deploying the experiment.
    let message = statsig
      .getLayer("checkout-contact")
      .get("newsletter_message");

    let fieldSetSelector = "[data-buyer-accepts-marketing]";
    let selector = `${fieldSetSelector} label`;
    if (message) {
      $(selector).text(message);
    }
    $(fieldSetSelector).css("visibility", "visible");
  }
}

function logCheckoutStep(stage) {
  try {
    let eventContext = {};
    let eventName = "";
    if (Shopify.Checkout.isOrderStatusPage) {
      eventName = "viewed_order_status";
    } else {
      eventName = "checkout_" + Shopify.Checkout.step;

      if (stage == "continue") {
        eventName += "_continue";
      }

      switch (Shopify.Checkout.step) {
        case "contact_information":
          // log whether accepts marketing was checked when continue was clicked
          if (stage == "continue") {
            eventContext["accepts_marketing"] =
              $("#checkout_buyer_accepts_marketing:checked").length > 0;
          }
          break;

        case "payment_method":
          // log payment method errors when the form is viewed
          if (stage == "view") {
            let paymentErrorSelector =
              "[data-payment-method] .notice--error:visible";
            let hasPaymentError = $(paymentErrorSelector).length > 0;
            if (hasPaymentError) {
              eventContext["payment_error"] = hasPaymentError;
              eventContext["payment_error_message"] = $(paymentErrorSelector)
                .text()
                .trim();
            }
          }
          break;

        default:
          break;
      }

      let eventValue =
        parseInt(
          $("[data-checkout-payment-due-target]").attr(
            "data-checkout-payment-due-target"
          ),
          10
        ) / 100.0;

      if (window.statsig) {
        window.statsig.logEvent(eventName, eventValue, eventContext);
      } else {
        //TODO build a proxy
        window._statsig = window._statsig || [];
        window._statsig.push(eventName, eventValue, eventContext);
      }
      console.log(eventName, eventValue, eventContext);
    }
  } catch (ex) {
    console.log("problem logging checkout, ", ex);
  }
}

function checkShippingMethods() {
  if ($("[data-shipping-methods]").length == 0) {
    var message = $(".section--shipping-method .content-box p").text();
    var ap = $(".address.address--tight")
      .text()
      .trim()
      .split(",")
      .map(function (t) {
        return t.trim();
      });
    var country = "",
      zip = "",
      state = "";
    if (ap.length) {
      country = ap[ap.length - 1];
      geo = ap[ap.length - 2].split(" ");
      if (geo.length >= 2) {
        zip = geo[geo.length - 1];
        state = geo[geo.length - 2];
      }
    }

    Sentry.captureException(new Error("no shipping methods returned"), {
      tags: {
        section: "shipping",
        country: country,
        zip: zip,
        state: state,
        message: message,
      },
    });

    if (window.statsig) {
      window.statsig.logEvent(
        "checkout_error_no_shipping_methods",
        {},
        {
          country: country,
          zip: zip,
          state: state,
          message: message,
        }
      );
    }
  }
}

function hideContactFields() {
  if (window.statsig) {
    let exp = window.statsig.getExperiment("checkout_hide_company");
    if (exp && exp.value && exp.value.hide == true) {
      $(`.section--shipping-address [data-address-field="company"]`).remove();
    }
  }
}

function hidePickupAddressFields() {
  fields = [
    "address1",
    "address2",
    "city",
    "country",
    "zip",
    "province",
    "company",
  ];
  fields.map(function (f) {
    var field_selector = `.section--shipping-address [data-address-field="${f}"]`;
    $(field_selector).addClass("visually-hidden");
  });
  $("#checkout_shipping_address_id").parent().addClass("visually-hidden");
}

function onContactInfoContinueButtonClick(e) {
  if (!$("#checkout_shipping_address_phone")[0].checkValidity()) {
    showRequiredPhoneError();
    return false;
  } else {
    // swallow
  }
}

function showRequiredPhoneError() {
  if (!$(".error-for-phone").length) {
    var phoneRequiredHtml =
      '<p class="field__message field__message--error error-for-phone" id="error-for-phone">Enter a phone number</p>';
    $(phone_field).append(phoneRequiredHtml);
  }
  $(phone_field).addClass("field--error");
}

LUX = window.LUX || {};
LUX.label = "checkout";
