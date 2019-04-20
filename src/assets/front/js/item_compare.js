$(function(){
	// 比較する
	var cookieKey = 'compare';
	var $compares		 = $('.compare'),
		$compareList	  = $('.compareList'),
		$compareListItems = $compareList.find('.items'),
		$compareButton	= $compareList.find('.compareButton');
		$clearButton	  = $compareList.find('.clearButton');

	// 初期化
	if ($.cookie(cookieKey) != undefined) {
		// CookieからIDを取得して商品リストに追加
		var compareItemIds = $.cookie(cookieKey);
		appendCompareItem(compareItemIds);
	}

	// フッタの「商品を比較する」ボタン押下処理
	$compareButton.bind('click', function() {
		var compareItemIds = $.cookie(cookieKey);
		location.href = base_url + device_base_url + 'item/compare?' + $.param({'list_disp_manage_codes' : compareItemIds});
		return false;
	});

	// フッタの「すべてクリア」ボタン押下処理
	$clearButton.bind('click', function() {
		$.removeCookie(cookieKey);
		$compareListItems.html('');
		$compareList.hide();
		return false;
	});

	// 各商品の「比較する」ボタン押下処理
	$compares.show();
	$compares.find('a').bind('click', function() {
		var $target = $(this),
			itemId  = $target.data('item_id');
		
		var compareItemIds = [];
		if ($.cookie(cookieKey) != undefined) {
			// Cookieに保存されているID一覧を取得
			compareItemIds = $.cookie(cookieKey).split(',');
		}

		// 商品リストに追加
		appendCompareItem(itemId);

		// IDを追加してCookieに保存
		compareItemIds.push(itemId);
		$.cookie(cookieKey, compareItemIds.join(','), { path: '/' });
		return false;
	});

	function appendCompareItem(compareItemIds) {
		var params = {'list_disp_manage_codes' : compareItemIds, 'store_id' : store_id};
		// ※「store_id」は、「include/layout.tpl」で定義

		$.get(apis_url_base + 'goods.json', params, function(data, textStatus) {
			if (data.status == 'success') {
				for (var i = 0; i < data.total_rows; i++) {
					var goods = data.list[i];

					// 画像　　商品画像：goods['image']
					var img = $('<img />').attr('src', goods['image']).attr('width', 100);

					// LINK　　商品詳細へのURL：goods['url']
					var a = $('<a />').attr('href', goods['url']).append(img);

					$compareListItems.append(a);
				}
				
				$compareList.show();
			} else {
			}
		}, 'json');
	}
});
