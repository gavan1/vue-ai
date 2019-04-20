$(function(){
	// お届け日指定フラグ
	$('input[name=shipping_date_flag]').bind('click', changeShippingDateFlag);
	changeShippingDateFlag();

	// ポイントの表示/非表示
	$('input[name=use_point_flag]').bind('click', changeUsePointFlag);
	changeUsePointFlag();

	// お届け先の表示/非表示
	$('input[name=order_shipping_flag_radio]').bind('click', checkedLinkage);
	$('input[name=order_shipping_flag_radio]').bind('click', changeOrderShippingFlag);
	
	// お届け先の登録
	$('input[name=shipping_add_flag]').bind('click', checkedLinkage);
	
	// 宅配ボックスの変更
	$('input[name=order_customer_shipping\\[order_customer_shipping_attribute\\]\\[delivery_box_flag\\]]').bind('click', checkedLinkage);
	
	// 登録済み配送先の変更
	$('input[name=customer_delivery_address_id]').bind('click', checkedLinkage);
	
	$('#customer_delivery_address_id_select').bind('change', checkedOrderShipping);
	$('#customer_delivery_address_id_select').bind('change', checkedLinkage);
	$('#customer_delivery_address_id_select_sp').bind('change', checkedOrderShipping);
	$('#customer_delivery_address_id_select_sp').bind('change', checkedLinkage);
	
	// 配送業者
	$('input[name=delivery_id]').bind('click', checkedLinkage);
	
	checkedLinkage()
	changeOrderShippingFlag();
	
	function changeShippingDateFlag() {
		var $inputShippingDateFlag = $("input[name=shipping_date_flag]:checked"),
			$inputShippingDate     = $("select[name=shipping_date]");

		if ($inputShippingDateFlag.val() == 0) {
			$inputShippingDate.attr('disabled', 'disabled');
		} else {
			$inputShippingDate.removeAttr('disabled');
		}
	}
	
	function changeUsePointFlag() {
		var $inputUsePointFlag = $("input[name=use_point_flag]:checked"),
			$inputUsePoint     = $("input[name=use_point]"),
			$target            = $('.usePointForm');

		if ($inputUsePointFlag.val() == 0) {
			$inputUsePoint.attr('disabled', 'disabled');

			$target.addClass('disabled');
		} else {
			$inputUsePoint.removeAttr('disabled');

			$target.removeClass('disabled');
		}
	}
	
	// pcspのチェックを連動させる
	function checkedLinkage() {
		
		var $temp_value = "";
		
		if ($(".pc-only").css("display") != 'none') {
			$temp_value = $("#action_form_pc input[name=order_shipping_flag_radio]:checked").val();
			$("#action_form_sp input[name=order_shipping_flag_radio][value=" + $temp_value + "]").prop('checked', true);
			
			$temp_value = $("#action_form_pc input[name=shipping_add_flag]").prop("checked");
			$("#action_form_sp input[name=shipping_add_flag]").prop("checked", $temp_value);
			
			$temp_value = $("#action_form_pc input[name=order_customer_shipping\\[order_customer_shipping_attribute\\]\\[delivery_box_flag\\]]").prop("checked");
			$("#action_form_sp input[name=order_customer_shipping\\[order_customer_shipping_attribute\\]\\[delivery_box_flag\\]]").prop("checked", $temp_value);
			
			$temp_value = $("#customer_delivery_address_id_select").val();
			$("#customer_delivery_address_id_select_sp").val($temp_value);
			
			$temp_value = $("#action_form_pc input[name=delivery_id]:checked").val();
			$("#action_form_sp input[name=delivery_id][value=" + $temp_value + "]").prop('checked', true);
			
		} else {
			$temp_value = $("#action_form_sp input[name=order_shipping_flag_radio]:checked").val();
			$("#action_form_pc input[name=order_shipping_flag_radio][value=" + $temp_value + "]").prop('checked', true);
			
			$temp_value = $("#action_form_sp input[name=shipping_add_flag]").prop("checked");
			$("#action_form_pc input[name=shipping_add_flag]").prop("checked", $temp_value);
			
			$temp_value = $("#action_form_sp input[name=order_customer_shipping\\[order_customer_shipping_attribute\\]\\[delivery_box_flag\\]]").prop("checked");
			$("#action_form_pc input[name=order_customer_shipping\\[order_customer_shipping_attribute\\]\\[delivery_box_flag\\]]").prop("checked", $temp_value);
			
			$temp_value = $("#customer_delivery_address_id_select_sp").val();
			$("#customer_delivery_address_id_select").val($temp_value);
			
			$temp_value = $("#action_form_sp input[name=delivery_id]:checked").val();
			$("#action_form_pc input[name=delivery_id][value=" + $temp_value + "]").prop('checked', true);
			
		}
	}
	
	function changeOrderShippingFlag() {
		var $inputOrderShippingFlag = $("input[name=order_shipping_flag_radio]:checked"),
			$selectOrderShipping    = $('.deliveryAddressList'),
			$inputOrderShipping     = $(".shippingForm");

		if ($inputOrderShippingFlag.val() == 1) {
			$selectOrderShipping.stop().slideUp('fast', function () {
				$selectOrderShipping.find('input').attr('disabled', 'disabled');
			});
			$inputOrderShipping.stop().slideUp('fast', function () {
				$inputOrderShipping.find('input').attr('disabled', 'disabled');
			});

			// ご依頼主の住所に配送する
			$("#form_order_shipping_flag_pc").val("1");
			$("#form_order_shipping_flag_sp").val("1");
			
		} else if($inputOrderShippingFlag.val() == 2) {
			$inputOrderShipping.stop().slideUp('fast', function () {
				$inputOrderShipping.find('input').attr('disabled', 'disabled');
			});

			$selectOrderShipping.find('input').removeAttr('disabled');
			$selectOrderShipping.stop().slideDown('fast', function () {
			});

			// 登録されている住所に配送する
			$("#form_order_shipping_flag_pc").val("2");
			$("#form_order_shipping_flag_sp").val("2");

			checkedOrderShipping();
		} else {
			$selectOrderShipping.stop().slideUp('fast', function () {
				$selectOrderShipping.find('input').attr('disabled', 'disabled');
			});

			$inputOrderShipping.find('input').removeAttr('disabled');
			$inputOrderShipping.stop().slideDown('fast', function () {
			});

			// 別の住所に配送する
			$("#form_order_shipping_flag_pc").val("0");
			$("#form_order_shipping_flag_sp").val("0");
		}
	}
	
	function checkedOrderShipping() {
		var $delivery = "";
		
		if ($(".pc-only").css("display") != 'none') {
			$delivery = $("#customer_delivery_address_id_select option:selected").data('delivery');
		} else {
			$delivery = $("#customer_delivery_address_id_select_sp option:selected").data('delivery');
		}
		
		if ($delivery == 0) {
			// ご依頼主の住所に配送する
			$("#form_order_shipping_flag_pc").val("1");
			$("#form_order_shipping_flag_sp").val("1");
			
			$("#deliveryAddressDetailName").text("");
			$("#deliveryAddressDetailAddress1").text("");
			$("#deliveryAddressDetailAddress2").text("");
			$("#deliveryAddressDetail").hide;
			
			$("#deliveryAddressDetailName_sp").text("");
			$("#deliveryAddressDetailAddress1_sp").text("");
			$("#deliveryAddressDetailAddress2_sp").text("");
			$("#deliveryAddressDetail_sp").hide;
		} else {
			// 登録されている住所に配送する
			$("#form_order_shipping_flag_pc").val("2");
			$("#form_order_shipping_flag_sp").val("2");
			
			if ($(".pc-only").css("display") != 'none') {
				$deliveryname1 = $("#customer_delivery_address_id_select option:selected").data('deliveryname1') || "";
				$deliveryname2 = $("#customer_delivery_address_id_select option:selected").data('deliveryname2') || "";
				$deliverypref = $("#customer_delivery_address_id_select option:selected").data('deliverypref') || "";
				$deliverycountry = $("#customer_delivery_address_id_select option:selected").data('deliverycountry') || "";
				$deliverystate = $("#customer_delivery_address_id_select option:selected").data('deliverystate') || "";
				$deliverycity = $("#customer_delivery_address_id_select option:selected").data('deliverycity') || "";
				$deliverytown = $("#customer_delivery_address_id_select option:selected").data('deliverytown') || "";
				$deliveryaddress = $("#customer_delivery_address_id_select option:selected").data('deliveryaddress') || "";
			} else {
				$deliveryname1 = $("#customer_delivery_address_id_select_sp option:selected").data('deliveryname1') || "";
				$deliveryname2 = $("#customer_delivery_address_id_select_sp option:selected").data('deliveryname2') || "";
				$deliverypref = $("#customer_delivery_address_id_select_sp option:selected").data('deliverypref') || "";
				$deliverycountry = $("#customer_delivery_address_id_select_sp option:selected").data('deliverycountry') || "";
				$deliverystate = $("#customer_delivery_address_id_select_sp option:selected").data('deliverystate') || "";
				$deliverycity = $("#customer_delivery_address_id_select_sp option:selected").data('deliverycity') || "";
				$deliverytown = $("#customer_delivery_address_id_select_sp option:selected").data('deliverytown') || "";
				$deliveryaddress = $("#customer_delivery_address_id_select_sp option:selected").data('deliveryaddress') || "";
			}
			
			$("#deliveryAddressDetailName").text($deliveryname1 + " " + $deliveryname2);
			$("#deliveryAddressDetailAddress1").text($deliverypref + $deliverycountry + " " + $deliverystate);
			$("#deliveryAddressDetailAddress2").text("" + $deliverycity + $deliverytown + $deliveryaddress);
			
			$("#deliveryAddressDetailName_sp").text($deliveryname1 + " " + $deliveryname2);
			$("#deliveryAddressDetailAddress1_sp").text($deliverypref + $deliverycountry + " " + $deliverystate);
			$("#deliveryAddressDetailAddress2_sp").text("" + $deliverycity + $deliverytown + $deliveryaddress);
		}
	}

	if (typeof $ignore_saved_address_flag !== 'undefined'
		&& true==$ignore_saved_address_flag) {
		// 会員登録時に日本住所で、ENサイト表示中で、配送先住所未登録の場合
		// 配送先住所選択欄を表示しない

		// 配送先住所入力部をクリックして表示
		$('#form_order_shipping_flag0_pc').click();
		$('#form_order_shipping_flag0_sp').click();
		checkedLinkage();
		changeOrderShippingFlag();
		// 住所入力欄の灰色背景を取り消し
		$('.shippingForm').removeClass('gray-form');
	    	
		// 会員登録時の日本住所をクリック不可にする
		$('#form_order_shipping_flag2_pc').prop('disabled', true);
		$('#form_order_shipping_flag2_sp').prop('disabled', true);
		// 住所選択ラジオボタン欄を非表示にする
		$('#form_order_shipping_flag2_pc').closest('.inputRow').hide();
		$('#form_order_shipping_flag2_sp').closest('.inputRow').hide();
		
	} else if (typeof $ignore_deliver_buyer_address_flag !== 'undefined'
			   && true==$ignore_deliver_buyer_address_flag) {
		// 会員登録時に日本住所で、ENサイト表示中で、配送先住所登録ありの場合
		// 配送先住所選択欄に日本住所を表示しない
		$('#customer_delivery_address_id_select option:first-child').remove();
		changeOrderShippingFlag();
	}
		
});
