$(function(){
	//
	$('input[name=regist_customer_flag]').bind('click', changeCartRegistCustomer);
	
	changeCartRegistCustomer();
	
	function changeCartRegistCustomer() {
		var $inputRegCusFlag	= $("[name=regist_customer_flag]"),
			$inputPassword		= $("input[name=password]"),
			$inputPasswordConf	= $("input[name=password_confirm]"),
			$inputPreLoginFlag	= $("[name=preserve_login_flag]"),
			$parent				= $(".registcustomerForm");
	
			if ($inputRegCusFlag.prop("checked") == true) {
				$parent.stop().slideDown('fast', function () {
					$inputPassword.removeAttr('disabled');
					$inputPasswordConf.removeAttr('disabled');
					$inputPreLoginFlag.removeAttr('disabled');
				});
			} else {
				$parent.stop().slideUp('fast', function () {
					$inputPassword.attr('disabled', 'disabled');
					$inputPasswordConf.attr('disabled', 'disabled');
					$inputPreLoginFlag.attr('disabled', 'disabled');
				});
			}

	}
});
