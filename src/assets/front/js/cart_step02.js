$(function(){

	$('.nextgo').bind({click: function() 
	{
		var params = $(this).data('action');

		$("#action_form").attr("action", params);
		
		var pay_op_obj = $("input:radio[name='payment_option_id']:checked");
		var pay_op_value = pay_op_obj.val();
		if (pay_op_value == AMAZON_PAYMENT) {
			if (!amazonOrderReferenceId) {
				alert('Amazon.co.jpにログインしてください。');
				return false;
			}
		} else {
			
			var $return = zeus_token_check(this.name);
			
			// hiddenのZEUSパラメータをpcspで同期。
			var $temp_value = "";
			
			$temp_value = $("#action_form_sp input[id=zeus_token_value]").val();
			$("#action_form_pc input[id=zeus_token_value]").val($temp_value);
			
			$temp_value = $("#action_form_sp input[id=zeus_token_masked_card_no]").val();
			$("#action_form_pc input[id=zeus_token_masked_card_no]").val($temp_value);
			
			$temp_value = $("#action_form_sp input[id=zeus_token_return_card_expires_month]").val();
			$("#action_form_pc input[id=zeus_token_return_card_expires_month]").val($temp_value);
			
			$temp_value = $("#action_form_sp input[id=zeus_token_return_card_expires_year]").val();
			$("#action_form_pc input[id=zeus_token_return_card_expires_year]").val($temp_value);
			
			$temp_value = $("#action_form_sp input[id=zeus_token_masked_cvv]").val();
			$("#action_form_pc input[id=zeus_token_masked_cvv]").val($temp_value);
			
			$temp_value = $("#action_form_sp input[id=zeus_token_return_card_name]").val();
			$("#action_form_pc input[id=zeus_token_return_card_name]").val($temp_value);
			
			$temp_value = $("#action_form_sp input[id=zeus_token_error_code]").val();
			$("#action_form_pc input[id=zeus_token_error_code]").val($temp_value);
			
			$temp_value = $("#action_form_sp input[id=zeus_current_card_area]").val();
			$("#action_form_pc input[id=zeus_current_card_area]").val($temp_value);
			
			// 国チェック用のパラメーターを設定。
			$temp_value = $("#action_form_pc input[name=customer_delivery_address_id]:checked").data('country');
			$("input[name=registed_country]").val($temp_value)
			
			return $return;
		}
    }
	});
	
	$('#form_recomputation').bind({click: function() 
	{
		document.getElementById('form_is_direct_payment').value = '';
		return zeus_token_check(this.name);
    }
	});
	
	$('#form_cancel_coupon').bind({click: function() 
	{
		document.getElementById('form_coupon_code').value = '';
		return zeus_token_check(this.name);
	}
	});
	$('.birth').bind({change: function() 
	{
		var birth = '';
		birth  = $('select[name="birth_year"]').val() + '-';
		birth += ('00' + $('select[name="birth_month"]').val()).slice(-2) + '-';
		birth += ('00' + $('select[name="birth_day"]').val()).slice(-2);
		birth += ' 00:00:00';
		
		$("#form_birth").val(birth);
	}
	});

	$('input[name="delivery_id"]:radio').bind({change: function()
	{
		if ($(this).context.value in overseas_delivery_time_id)
		{
			$('#action_form_pc #form_delivery_time_id').val(overseas_delivery_time_id[$(this).context.value]);
			$('#action_form_sp #form_delivery_time_id').val(overseas_delivery_time_id[$(this).context.value]);
		}
	}
	});
});
