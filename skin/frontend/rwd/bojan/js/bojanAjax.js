function ajaxAddToCart(url, product, form_key){
    hideMinicartStubs();
    if (jQuery('body').hasClass('catalog-category-view')) {
      var qty = 1;
    }

    ajaxShowNotification(product);

    var cart = this;
    url += 'isAjax/1';
    console.log(cart);
    jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        url: url,
        success:function(data) {
          console.log('Sad je Ok');
        }

    }).done(function(result) {

        if (result.success) {
            console.log(response);
            ajaxShowNotification(product);
            cart.updateCartQty(result.qty);
            cart.updateContentOnRemove(result, el.closest('li'));
        } else {
            cart.showMessage(result);
        }
    }).error(function(xhr) {
        console.log('Error mesage');
    });


    truncateOptions();
    decorateList('cart-sidebar', 'none-recursive');

        var minicartOptions  = {
            formKey: form_key
        }
        var Mini = new Minicart(minicartOptions);
        var qty = jQuery(Mini.selectors.qty);
        var value = parseInt(qty.text(), 10) + 1;
        Mini.updateCartQty(value);

}

function hideMinicartStubs() {
    var skipContents = jQuery('.skip-content');
    var skipLinks = jQuery('.skip-link');
    skipLinks.removeClass('skip-active');
    skipContents.removeClass('skip-active');
}

function ajaxShowNotification(id) {
    var notificationMassage = jQuery('.ajax-ok-notification'+id);
    var buttonAddToCart = jQuery(event.target).closest('.btn-cart');

    notificationMassage.show();
    buttonAddToCart.hide();
    setTimeout(function() {
      notificationMassage.hide();
      buttonAddToCart.show();
    }, 1500);
    return false; // prevents default and stops propagation
}

jQuery( document ).ready(function($) {

    jQuery('.increment_qty').click(function() {
     var oldVal = Number(jQuery('#qty').val());
     if ( oldVal >= 0 ) {
       var newVal = oldVal + 1;
       jQuery('#qty').val(newVal);
     }
   });

   jQuery('.decrement_qty').click(function() {
     var oldVal = Number(jQuery('#qty').val());
     if ( oldVal >= 1 ) {
       var newVal = oldVal - 1;
       jQuery('#qty').val(newVal);
     }
   });

});
