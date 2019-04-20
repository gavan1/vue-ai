$(function(){
	var favorite = new Favorite();
	favorite.bind("add_favorite");
});

(function(window, undefined) {
	var $favorite;
	var $buttons;
	var submitflag = true;
	
	function Favorite() {}

	Favorite.prototype.bind = function(button_class) {
		$buttons = $("." + button_class);

		// お気に入り登録ボタンにclickイベントをバインド
		$(document).on("click", "." + button_class, this.clickAddButton);

		$favorite = this;

		// お気に入り登録状態をチェック
		$favorite.checkStatus($buttons);
	}

	/**
	 * お気に入り登録状態をチェック
	 */
	Favorite.prototype.checkStatus = function($buttons) {
		if ($buttons.length == 0) {
			return;
		}
		
		// 現在登録済のお気に入りを全て取得
		$.post(base_url_ssl + apis_url_base + "favorite.json", {}, function(data, textStatus) {
			if (data.status == "success") {
				var list = data.list;
				$buttons.each(function() {
					var $target = $(this);
					
					var params = $favorite.getGoodsKey($target);
					
					var is_registed = false;
					
					// 各ボタンの要素が登録済であるかを判定
					for (index in list) {
						var goods = list[index];
						
						var detail_disp_manage_code = goods['detail_disp_manage_code'] || "";
						var color_code              = goods['color_code'] || "";
						var size_code               = goods['size_code'] || "";

						var params_detail_disp_manage_code = params['detail_disp_manage_code'] || "";
						var params_color_code              = params['color_code'] || "";
						var params_size_code               = params['size_code'] || "";
					
						if (detail_disp_manage_code == params_detail_disp_manage_code
							&& (color_code == "" || params_color_code == "" || color_code == params_color_code)
							&& (size_code == "" || params_size_code == "" || size_code == params_size_code)) {
							is_registed = true;
						}
					}
					if (is_registed) {
						$target.addClass("active");
					}
				});
			} else {
				// エラーは無視
			}
		}, "json");
	}
	
	/**
	 * お気に入りボタン押下イベント
	 */
	Favorite.prototype.clickAddButton = function() {
		var $target = $(this);
		
		if (submitflag) {
			// 要素に設定されているキーを取得
			var params = $favorite.getGoodsKey($target);
			
			submitflag = false;

			if ($target.hasClass("active")) {
				// 登録済なので削除
				$favorite.deleteFavorite(params, $target);

			} else {
				// 未登録なので登録
				$favorite.addFavorite(params, $target);
			}
		}
	}

	/**
	 * 要素に設定されているキーを取得
	 */
	Favorite.prototype.getGoodsKey = function($target) {
		// 要素に設定されているキーを取得
		var params = {};
		var data_list = $target.data();
		for (key in data_list) {
			if (key == "detail_disp_manage_code" || key == "color_code" || key == "size_code") {
				params[key] = data_list[key];
			}
		}
		return params;
	}
	
	/**
	 * お気に入り登録処理
	 */
	Favorite.prototype.addFavorite = function(params, $target) {
		$.post(base_url_ssl + apis_url_base + "favorite/add.json", params, function(data, textStatus) {
			if (data.status == "success") {
				$target.addClass("active");
				submitflag = true;
				var count = Number($("#header_favorites_count").text());
				$("#header_favorites_count").text(count + 1);
				$("#header_favorites_count_sp").text(count + 1);
			} else {
				// エラー表示
				var error_message = '';
				submitflag = true;
				for (key in data.errors) {
					error_message = data.errors[key];
					break;
				}

				// @TODO：エラーメッセージ表示処理
				error_message = '' + error_message.replace("<br />", "\n") + '';
				alert(error_message);
			}
		}, "json");
	}

	/**
	 * お気に入り削除処理
	 */
	Favorite.prototype.deleteFavorite = function(params, $target) {
		$.post(base_url_ssl + apis_url_base + "favorite/del.json", params, function(data, textStatus) {
			if (data.status == "success") {
				$target.removeClass("active");
				submitflag = true;
				var count = Number($("#header_favorites_count").text());
				$("#header_favorites_count").text(count - 1);
				$("#header_favorites_count_sp").text(count - 1);
			} else {
				// エラー表示
				var error_message = '';
				submitflag = true;
				for (key in data.errors) {
					error_message = data.errors[key];
					break;
				}

				// @TODO：エラーメッセージ表示処理
				alert(error_message);
			}
		}, "json");
	}

	window.Favorite = Favorite;
})(window);
