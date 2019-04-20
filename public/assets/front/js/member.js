$(function(){
	var member = new Member();

	var $current_lang_val = '';
	if (typeof $current_lang !== "undefined")
	{
		$current_lang_val = $current_lang;
	}

	// 郵便番号チェック
	if ($current_lang_val != 'en') {
		$(".zipchk").bind("click", member.searchPost);
		$(".zip").bind("change", member.searchPost);
	}
	$(".zip").bind("keyup", function() {
		var $target = $(this);
		if ($target.val().length == 7) {
			$target.trigger('change');
		}
	});
	
	// ログインID重複チェック
	$(".login_id_chk").bind("click", member.checkLoginId);
	$(".login_id").bind("change", member.checkLoginId);
});

(function(window, undefined) {
	function Member() {}

	Member.prototype.searchPost = function() {
		var parent        = $(this).parents(".search_post_form"),
		    inputPostCode = parent.find("input.zip"),
		    selectPrefId  = parent.find("select.pref_id"),
		    inputCity     = parent.find("input.city"),
		    inputTown     = parent.find("input.town"),
		    inputAddress  = parent.find("input.address"),
		    errorZip      = parent.find(".errmsg_zip");

		var prefOptions   = selectPrefId.find("option");

		errorZip.hide();

		var postCode = inputPostCode.val();
		if (postCode == "") return;

		var params = {"post_code" : postCode};
		$.get(base_url_ssl + apis_url_base + "post_code/search.json", params, function(data, textStatus) {
			if (data.status == "success") {
				prefOptions.each(function() {
					var prefOption = $(this);
					if (prefOption.text() == data.pref_name) {
						selectPrefId.val(prefOption.val());
					}
				});
				if (inputAddress.length == 0) {
					inputCity.val(data.city_name + data.block_name);
				} else {
					inputCity.val(data.city_name);
					inputTown.val(data.block_name);
				}
			} else {
				errorZip.text("該当の住所がみつかりません。").show();
			}
		}, "json");
	}

	Member.prototype.checkLoginId = function() {
		var parent        = $(this).parents(".check_login_id_form"),
		    inputLoginId  = parent.find("input.login_id"),
		    customer_id   = login_cust_id,
		    errorLoginId  = parent.find(".errmsg_login_id");

		errorLoginId.hide();

		var loginId = inputLoginId.val();
		if (loginId == "") return;

		var params = {"store_id" : store_id, "customer_attribute_class_id" : "login_id", "customer_attribute_value" : loginId, "customer_id" : customer_id};
		$.get(base_url_ssl + apis_url_base + "customer_attribute/check_duplicate.json", params, function(data, textStatus) {
			if (data.status == "success") {
				errorLoginId.html("<font class='blue'>このログインIDは使用できます。</font>").show();
			} else {
				errorLoginId.html("<font class='red'>" + data.errors['customer_attributes.1.login_id.customer_attribute_value'] + "</font>").show();
			}
		}, "json");
	}

	window.Member = Member;
})(window);
