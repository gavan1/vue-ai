$(function(){

	// pcspラジオ選択連動
	$("input[name=continued]").bind('click', checkedLinkage);

	//クレジット項目で使用するカードを変更した場合に、必要な項目を出し分ける
	$('input[name=continued]').bind('click', changePaymentContinued);
	
	// pcspラジオ選択連動
	$("input[name=payment_option_id]:radio").bind('change', checkedLinkage);
	
	//$('#form_payment_option_id').bind('change', changePaymentOptuion);
	$("input[name=payment_option_id]:radio").bind('change', changePaymentOption);
	
	// カード入力項目を連動。
	$("input[name=cardno]").bind('change', checkedLinkage);
	$("select[name=expmm]").bind('change', checkedLinkage);
	$("select[name=expyy]").bind('change', checkedLinkage);
	$("input[name=seccode]").bind('change', checkedLinkage);
	$("select[name=div]").bind('change', checkedLinkage);
	$("input[name=credit_card_add_flag]").bind('change', checkedLinkage);

	// PayPal選択時のState 表示/非表示
	$('#action_form_pc #form_order_country').bind('change', checkedState);
	$('#action_form_pc input[name=order_shipping_flag_radio]').bind('change', checkedState);
	$('#action_form_pc select[name=customer_delivery_address_id]').bind('change', checkedState);
	$('#action_form_pc #form_shipping_country').bind('change', checkedState);
	$('#action_form_pc input[name=payment_option_id]').bind('change', checkedState);

	$('#action_form_sp #form_order_country').bind('change', checkedState);
	$('#action_form_sp input[name=order_shipping_flag_radio]').bind('change', checkedState);
	$('#action_form_sp select[name=customer_delivery_address_id]').bind('change', checkedState);
	$('#action_form_sp #form_shipping_country').bind('change', checkedState);
	$('#action_form_sp input[name=payment_option_id]').bind('change', checkedState);

	// Stripe Cardの項目連動。
	$("input[name=reuse_stripe_source_id]:radio").bind('change', checkedLinkage);
	$("input[name=stripe_reuse_flag]").bind('change', checkedLinkage);

	// 初期読み込み時
	checkedLinkage();
	changePaymentContinued();
	changePaymentOption();
	checkedState();

	function changePaymentContinued() {
		var $inputContinued = $("input[name=continued]:checked"),
			$inputCardno    = $("input[name=cardno]"),
			$inputExpyy     = $("select[name=expyy]"),
			$inputExpmm     = $("select[name=expmm]"),
			$inputAddFlag   = $("checkbox[name=credit_card_add_flag]"),
			$parent1         = $(".creditcardForm1");
			$parent2         = $(".creditcardForm2");

		if ($inputContinued.length > 0) {
			if ($inputContinued.val() == 1) {
				$parent1.stop().slideUp('fast', function () {
					$inputCardno.attr('disabled', 'disabled');
					$inputExpyy.attr('disabled', 'disabled');
					$inputExpmm.attr('disabled', 'disabled');
				});
				$parent2.stop().slideUp('fast', function () {
					$inputAddFlag.attr('disabled', 'disabled');
				});
			} else if ($inputContinued.val() == 2){
				$parent1.stop().slideUp('fast', function () {
					$inputCardno.attr('disabled', 'disabled');
					$inputExpyy.attr('disabled', 'disabled');
					$inputExpmm.attr('disabled', 'disabled');
				});
				$parent2.stop().slideDown('fast', function () {
					$inputAddFlag.removeAttr('disabled');
				});
			} else {
				$parent1.stop().slideDown('fast', function () {
					$inputCardno.removeAttr('disabled');
					$inputExpyy.removeAttr('disabled');
					$inputExpmm.removeAttr('disabled');
				});
				$parent2.stop().slideDown('fast', function () {
					$inputAddFlag.removeAttr('disabled');
				});
			}
		}
	}

	// pcspのチェックを連動させる
	function checkedLinkage() {
		
		var $temp_value = 0;
		
		if ($(".pc-only").css("display") != 'none') {
			$temp_value = $("#action_form_pc input[name=payment_option_id]:checked").val();
			$("#action_form_sp input[name=payment_option_id][value=" + $temp_value + "]").prop('checked', true);
		} else {
			$temp_value = $("#action_form_sp input[name=payment_option_id]:checked").val();
			$("#action_form_pc input[name=payment_option_id][value=" + $temp_value + "]").prop('checked', true);
		}
		
		if ($(".pc-only").css("display") != 'none') {
			$temp_value = $("#action_form_pc input[name=continued]:checked").val();
			$("#action_form_sp input[name=continued][value=" + $temp_value + "]").prop('checked', true);
		} else {
			$temp_value = $("#action_form_sp input[name=continued]:checked").val();
			$("#action_form_pc input[name=continued][value=" + $temp_value + "]").prop('checked', true);
		}
		
		// カード情報入力値。
		if ($(".pc-only").css("display") != 'none') {
			
			// カード番号。
			$temp_value = $("#action_form_pc input[name=cardno]").val();
			$("#action_form_sp input[name=cardno]").val($temp_value);
			
			// 有効期限 月。
			$temp_value = $("#action_form_pc select[name=expmm]").val();
			$("#action_form_sp select[name=expmm]").val($temp_value);
			
			// 有効期限 年。
			$temp_value = $("#action_form_pc select[name=expyy]").val();
			$("#action_form_sp select[name=expyy]").val($temp_value);
			
			// セキュリティコード。
			$temp_value = $("#action_form_pc input[name=seccode]").val();
			$("#action_form_sp input[name=seccode]").val($temp_value);
			
			// 支払回数。
			$temp_value = $("#action_form_pc select[name=div]").val();
			$("#action_form_sp select[name=div]").val($temp_value);
			
			// カード登録チェックボックス。
			$temp_value = $("#action_form_pc input[name=credit_card_add_flag]").prop("checked");
			$("#action_form_sp input[name=credit_card_add_flag]").prop("checked", $temp_value);
			
		} else {
			
			// カード番号。
			$temp_value = $("#action_form_sp input[name=cardno]").val();
			$("#action_form_pc input[name=cardno]").val($temp_value);
			
			// 有効期限 月。
			$temp_value = $("#action_form_sp select[name=expmm]").val();
			$("#action_form_pc select[name=expmm]").val($temp_value);
			
			// 有効期限 年。
			$temp_value = $("#action_form_sp select[name=expyy]").val();
			$("#action_form_pc select[name=expyy]").val($temp_value);
			
			// セキュリティコード。
			$temp_value = $("#action_form_sp input[name=seccode]").val();
			$("#action_form_pc input[name=seccode]").val($temp_value);
			
			// 支払回数。
			$temp_value = $("#action_form_sp select[name=div]").val();
			$("#action_form_pc select[name=div]").val($temp_value);
			
			// カード登録チェックボックス。
			$temp_value = $("#action_form_sp input[name=credit_card_add_flag]").prop("checked");
			$("#action_form_pc input[name=credit_card_add_flag]").prop("checked", $temp_value);
		}
		
		// Stripe Card用のチェックボックス・ラジオ連動
		if ($(".pc-only").css("display") != 'none') {
			
			// 新規カード or 保存情報 ラジオ。
			$temp_value = $("#action_form_pc input[name=reuse_stripe_source_id]:checked").val();
			$("#action_form_sp input[name=reuse_stripe_source_id][value='" + $temp_value + "']").prop('checked', true);
			
			// カード保存チェックボックス。
			$temp_value = $("#action_form_pc input[name=stripe_reuse_flag]").prop("checked");
			$("#action_form_sp input[name=stripe_reuse_flag]").prop("checked", $temp_value);
			
		} else {
			
			// 新規カード or 保存情報 ラジオ。
			$temp_value = $("#action_form_sp input[name=reuse_stripe_source_id]:checked").val();
			$("#action_form_pc input[name=reuse_stripe_source_id][value='" + $temp_value + "']").prop('checked', true);
			
			// カート保存チェックボックス。
			$temp_value = $("#action_form_sp input[name=stripe_reuse_flag]").prop("checked");
			$("#action_form_pc input[name=stripe_reuse_flag]").prop("checked", $temp_value);
			
		}
	}

	//お支払い方法項目を変更した場合に、必要な項目を出し分ける 20170206 add step2 input_cart_payment_params.tpl
	function changePaymentOption() {
		var $inputPaymentOptionId = $("input[name=payment_option_id]:checked").val(),
			$inputContinued = $("input[name=continued]"),
			$inputCardno    = $("input[name=cardno]"),
			$inputExpyy     = $("select[name=expyy]"),
			$inputExpmm     = $("select[name=expmm]"),
			$inputAddFlag   = $("checkbox[name=credit_card_add_flag]"),
			$inputDiv       = $("select[name=div]"),
			$parent			= $(".creditoptionForm");
			$amazonForm     = $(".amazonForm");
			$rakutenparent	= $(".rakutenoptionForm");
			$delivery_box = $(".delivery_box");
			$delivery_input = $(".input_delivery_box");

		if ($inputPaymentOptionId != null){
			if ($inputPaymentOptionId.length > 0) {
				if ($inputPaymentOptionId == 1) {
					$parent.stop().slideDown('fast', function () {
						$inputContinued.removeAttr('disabled');
						$inputCardno.removeAttr('disabled');
						$inputExpyy.removeAttr('disabled');
						$inputExpmm.removeAttr('disabled');
						$inputDiv.removeAttr('disabled');
						$inputAddFlag.removeAttr('disabled');
					});
					$amazonForm.stop().slideUp('fast');
				} else if ($inputPaymentOptionId == 9) {
					$parent.stop().slideUp('fast', function () {
						$inputContinued.attr('disabled', 'disabled');
						$inputCardno.attr('disabled', 'disabled');
						$inputExpyy.attr('disabled', 'disabled');
						$inputExpmm.attr('disabled', 'disabled');
						$inputDiv.attr('disabled', 'disabled');
						$inputAddFlag.attr('disabled', 'disabled');
					});
					$amazonForm.stop().slideDown('fast');
				} else {
					$parent.stop().slideUp('fast', function () {
						$inputContinued.attr('disabled', 'disabled');
						$inputCardno.attr('disabled', 'disabled');
						$inputExpyy.attr('disabled', 'disabled');
						$inputExpmm.attr('disabled', 'disabled');
						$inputDiv.attr('disabled', 'disabled');
						$inputAddFlag.attr('disabled', 'disabled');
					});
					$amazonForm.stop().slideUp('fast');
				}
				
				if ($inputPaymentOptionId == 10) {
					$(".form_next_step04").css('display', 'none');
					$(".form_next_rakuten").css('display', '');
					$(".form_next_stripe").css('display', 'none');
					$(".buttonArea ul li.last").addClass('rakutenLast');
					$rakutenparent.stop().slideDown('fast');
				} else if($inputPaymentOptionId == 12) {
					$(".form_next_step04").css('display', 'none');
					$(".form_next_rakuten").css('display', "none");
					$(".form_next_stripe").css('display', '');
					$(".buttonArea ul li.last").removeClass('rakutenLast');
					$rakutenparent.stop().slideUp('fast');
				} else {
					$(".form_next_step04").css('display', '');
					$(".form_next_rakuten").css('display', "none");
					$(".form_next_stripe").css('display', 'none');
					$(".buttonArea ul li.last").removeClass('rakutenLast');
					$rakutenparent.stop().slideUp('fast');
				}

				if ($inputPaymentOptionId == 2) {
					$delivery_box.stop().slideUp('fast');
					$delivery_input.prop('checked', false);
				} else {
					$delivery_box.stop().slideDown('fast');
				}
			}
		}
	}

	function checkedState() {
		// PC/SP チェック
		var $switching = "";
		
		if ($('.pc-only').css('display') == "none") {
			$switching = "action_form_sp";
		} else {
			$switching = "action_form_pc";
		}
		
		var $inputPaymentOptionId = $("#" + $switching + " input[name='payment_option_id']:checked").val();
		var $inputOrderShippingFlag = $("#" + $switching + " input[name='order_shipping_flag_radio']:checked").val();
		var $selectCountry = "";
		
		// PayPal選択時のみ制御
		if ($inputPaymentOptionId == 14) {
			if ($inputOrderShippingFlag == 1) {
				// ご依頼主の住所に配送する
				$selectCountry = $("#" + $switching + " [name=order_country]").val();
				
			} else if($inputOrderShippingFlag == 2) {

				var $delivery = "";

				if ($(".pc-only").css("display") != 'none') {
					$delivery = $("#customer_delivery_address_id_select option:selected").data('delivery');
				} else {
					$delivery = $("#customer_delivery_address_id_select_sp option:selected").data('delivery');
				}
				
				if ($delivery == 0) {

					// ご依頼主の住所に配送する
					$selectCountry = $("#" + $switching + " [name=order_country]").val();
				} else {

					// 登録されている住所に配送する
					var $inputCustomerDeliveryAddressId = $("#" + $switching + " select[name='customer_delivery_address_id'] option:selected").val();
					$selectCountry = $("#form_customer_delivery_address_id" + $inputCustomerDeliveryAddressId + "_pc").data('country');
				}
				
			} else if($inputOrderShippingFlag == 0) {

				// 別の住所に配送する
				$selectCountry = $("#" + $switching + " [name=shipping_country]").val();
			}
		}
		
		// State 表示/非表示 制御
		if ($selectCountry == "United States") {
			$('.paypaloptionForm').show();
		} else {
			$('.paypaloptionForm').hide();
		}
	}
});
