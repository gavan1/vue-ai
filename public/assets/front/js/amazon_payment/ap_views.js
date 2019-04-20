// JavaScript Document
var process_flag = 0;

function _check_address(id){
	$('.order_bottom__btn_forward--link').addClass('disabled');

	if($('#process_msg').length){
		$('#process_msg').text('ご利用可能なお届け先か確認中です。');
	}else{
		$('#addressBookWidgetDiv').before('<div id="process_msg">ご利用可能なお届け先か確認中です。</div>');
	}
	process_flag = 1;

	$.ajax({
		type: 'POST',
		url: '/amazonpayment/apis/checkaddress.json',
		dataType: 'json',
		data: {
			'id': id
		},
		success: function(j_data){
			if ($('.order_bottom__btn_forward--link').hasClass('disabled')) {
				if(j_data.res == 1){
					var Process = $.when(
							$('#process_msg').text('ご利用可能なお届け先です。').fadeOut(3000),
							$('.order_bottom__btn_forward--link').removeClass('disabled')
						);
					Process.done(function() {
						$('#process_msg').remove();
					});
				}else if(j_data.res == 10){
					$('#process_msg').text('日本国内で選択してください。')
				}
			}
			process_flag = 0;
		}
	});
}

$('.order_bottom__btn_forward--link').click(function () {
	if (!$('.order_bottom__btn_forward--link').hasClass('disabled')) {
		document.charset='UTF-8';
	}else if(process_flag){
		alert('ご利用可能なお届け先か確認中です。');
		return false;
	}else{
		alert('日本国内で選択してください。');
		return false;
	}
});

$(window).load(function () {
	if($('#AmazonPayButton').length){
		var userAgent = window.navigator.userAgent.toLowerCase();
		if( userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/) ) {
			var isIE = true;
			var ieVersion = userAgent.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
			ieVersion = parseInt(ieVersion);
			if(ieVersion < 9){
				$('#AmazonPayButton').remove();
				$('#widget_area').append('<span><p id="process_msg">お客様がお使いのブラウザは<br>Amazonペイメントの機能がお使いいただけません。<br>ブラウザの最新バージョンに更新をお願いします。</p></span>');
			}else{
				$('#AmazonPayButton').show();
			}
		}else{
			$('#AmazonPayButton').show();
		}
	}
});

