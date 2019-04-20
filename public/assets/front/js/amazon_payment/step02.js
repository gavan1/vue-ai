$(document).ready(function(){
	// AddressBook Widget
	var id;
	var a = new OffAmazonPayments.Widgets.AddressBook({
		sellerId: amazonPaymentSellerId,
		onOrderReferenceCreate: function(orderReference) {
			var $input = $('<input type="hidden" name="amazonOrderReferenceId" />');
			$input.val(orderReference.getAmazonOrderReferenceId());
			id = orderReference.getAmazonOrderReferenceId();
			amazonOrderReferenceId = id;
			//alert(amazonOrderReferenceId);
			$('form[id=action_form]').append($input);
		},
		onAddressSelect: function(orderReference) {
	//		console.log('success addressBookWidgetDiv');
	//		console.log(this.toSource());
			_check_address(id);
		},
		design: {
			designMode: 'responsive'
		},
		onError: function(error) {
	//		console.log('error addressBookWidgetDiv');
	//		console.log(error);
	//		console.log(error.getErrorCode());
	//		console.log(error.getErrorMessage());
			// your error handling code
		}

	}).bind("addressBookWidgetDiv");

	// wallet Widget
	new OffAmazonPayments.Widgets.Wallet({
		sellerId: amazonPaymentSellerId,
		design: {
			designMode: 'responsive'
		},
		onPaymentSelect: function(orderReference) {
	//		console.log('success walletWidgetDiv');
	//		console.log(orderReference);
		},
		onError: function(error) {
			// your error handling code
	//		console.log('error walletWidgetDiv');
	//		console.log(error);
	//		console.log(error.getErrorCode());
	//		console.log(error.getErrorMessage());
		}
	}).bind("walletWidgetDiv");

	$(window).bind('scroll', function() {
		$('#addressBookWidgetDiv').find('h1').css('z-index', '');
		$('#addressBookWidgetDiv').find('iframe').css('z-index', '');

		$('#walletWidgetDiv').find('h1').css('z-index', '');
		$('#walletWidgetDiv').find('iframe').css('z-index', '');
	});
});
