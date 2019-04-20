amazon.Login.logout();

$(document).ready(function(){
	if(!amazonPaymentSellerId){
		return;
	}

	var authRequest;
	OffAmazonPayments.Button("AmazonPayButton", amazonPaymentSellerId, {
		type: "PwA",
		color: "Gold",
		size: "x-large",
		authorization: function() {
			loginOptions = {scope: "profile postal_code payments:widget payments:shipping_address", popup: true};
			authRequest = amazon.Login.authorize (loginOptions, base_url_ssl + device_base_url + "cart/step02?non_customer=" + non_customer);
		},
		onError: function(error) {
		// your error handling code
		}
	});
});