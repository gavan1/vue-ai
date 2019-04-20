$(document).ready(function(){

	// AddressBook Widget
	new OffAmazonPayments.Widgets.AddressBook({
		sellerId: amazonPaymentSellerId,
		amazonOrderReferenceId: amazonOrderReferenceId,
		displayMode: "Read",
		design: {
			designMode: 'responsive'
		},
		onError: function(error) {
		}
	}).bind("addressBookWidgetDiv");

	// wallet Widget
	new OffAmazonPayments.Widgets.Wallet({
		sellerId: amazonPaymentSellerId,
		amazonOrderReferenceId: amazonOrderReferenceId,
		displayMode: "Read",
		design: {
			designMode: 'responsive'
		},
		onError: function(error) {
		}
	}).bind("walletWidgetDiv");

	$(window).bind('scroll', function() {
		$('#addressBookWidgetDiv').find('h1').css('z-index', '');
		$('#addressBookWidgetDiv').find('iframe').css('z-index', '');

		$('#walletWidgetDiv').find('h1').css('z-index', '');
		$('#walletWidgetDiv').find('iframe').css('z-index', '');
	});
});
