(function($) {
	var plugname = 'google_analytics_ec';

	var $screen = null;
	var opentime = 0;

	/**
	* コンストラクタ
	*/
	var Class = function(instance, options) {
		if (typeof ga == 'undefined') {
			// Google Analyticsが読み込まれていない場合は、何もしない
			return;
		}
		
		this.instance = instance;
		this.options = $.extend({}, $.fn[plugname].defaults, options, this.instance.data());
		this.instance.data(plugname, this);

		var object = this;

		// e コマース プラグインの読み込み
		object.load_ec_plugin();

		// 商品リストのimplessionを送信し、クリックイベントを設定する
		var $ga_ec_lists = $('[data-' + object.key('list') + ']');
		if ($ga_ec_lists.length > 0) {
			$ga_ec_lists.each(function() {
				var $target = $(this);
				// 商品リストのimplessionを送信
				object.implession($target);

				// クリックイベントを設定
				object.bind_goods_click_event($target);
			});
		}

		// プロモーションリンクのimplessionを送信し、クリックイベントを設定する
		var $ga_ec_promos = $('[data-' + object.key('promo') + ']');
		if ($ga_ec_promos.length > 0) {
			$ga_ec_promos.each(function() {
				var $target = $(this);
				// プロモーションのimplessionを送信
				object.promo_implession($target);

				// クリックイベントを設定
				object.bind_promo_click_event($target);
			});
		}

		// 商品詳細の表示アクションを送信
		var $ga_ec_detail = $('[data-' + object.key('detail') + ']');
		if ($ga_ec_detail.length > 0) {
			object.detail_action($ga_ec_detail);
		}

		// カートへの追加アクションを送信
		var $ga_ec_add = $('[data-' + object.key('add') + ']');
		if ($ga_ec_add.length > 0) {
			object.add_action($ga_ec_add);
		}

		// カートへの削除アクションを送信
		var $ga_ec_remove = $('[data-' + object.key('remove') + ']');
		if ($ga_ec_remove.length > 0) {
			object.remove_action($ga_ec_remove);
		}

		// 決済プロセス：Checkoutアクションを送信
		var $ga_ec_checkout = $('[data-' + object.key('checkout') + ']');
		if ($ga_ec_checkout.length > 0) {
			object.checkout_action($ga_ec_checkout);
		}

		// トランザクション：Purchaseアクションを送信
		var $ga_ec_purchase = $('[data-' + object.key('purchase') + ']');
		if ($ga_ec_purchase.length > 0) {
			object.purchase_action($ga_ec_purchase);
		}
	}

	/**
	 * GAにImplessionを送信
	 */
	Class.prototype.implession = function($target) {
		var object = this,
			post_data_list = [];

		var list = $target.data(object.key('list'));

		// 商品情報を取得
		var $goods_list = $target.find('[data-' + object.key('goods') + ']');
		$goods_list.each(function() {
			var $goods = $(this);
			var goods_data = object.get_goods_data($goods);
			post_data_list.push(goods_data);
		});

		// implessionを送信
		var i = 0;
		for (i in post_data_list) {
			var post_data = post_data_list[i]
			post_data['list'] = list;
			post_data = object.set_dimension(post_data);

			ga('ec:addImpression', post_data);

			if (i % 10 == 9) {
				object.send_event('Impression');
			}
		}

		if (i % 10 != 9) {
			object.send_event('Impression');
		}
		return this;
	};

	/**
	 * 商品リストのクリックイベントを設定
	 */
	Class.prototype.bind_goods_click_event = function($target) {
		var object = this;

		var list = $target.data(object.key('list'));

		// 商品情報を取得
		var $goods_list = $target.find('[data-' + object.key('goods') + ']');
		$goods_list.each(function() {
			var $goods = $(this);
			var goods_data = object.get_goods_data($goods);

			// 商品詳細へのリンク全てについて
			$goods.filter('a[data-' + object.key('goods_link') + ']').each(function() {
				bind_click($(this))
			});
			$goods.find('a[data-' + object.key('goods_link') + ']').each(function() {
				bind_click($(this))
			});

			function bind_click($target) {
				var $link = $target,
					href  = $link.attr('href');

				var link_goods_data = $.extend({}, goods_data, object.get_goods_data($link));

				// クリックイベントを設定
				$link.bind('click', function() {
					return object.click_goods(link_goods_data, list, href);
				});
			}
		});

		return this;
	}

	/**
	 * GAに商品クリックアクションを送信
	 */
	Class.prototype.click_goods = function(link_goods_data, list, href) {
		var object = this;

		// 商品追加
		ga('ec:addProduct', link_goods_data);

		// クリックアクションを追加
		object.set_action('click', {list: list});

		// イベントを送信
		object.send_event('ClickGoods', function() {
			document.location = href;
		});
		return !ga.loaded;;
	}

	/**
	 * GAにプロモーションのImplessionを送信
	 */
	Class.prototype.promo_implession = function($target) {
		var object = this;

		var promo_data = object.get_promo_data($target);

		// プロモーション追加
		ga('ec:addPromo', promo_data);

		// イベントを送信
		object.send_event('ImplessionPromo');
		return this;
	};

	/**
	 * プロモーションのクリックイベントを設定
	 */
	Class.prototype.bind_promo_click_event = function($target) {
		var object = this;

		var promo_data = object.get_promo_data($target);

		// 商品詳細へのリンク全てについて
		$target.filter('a').each(function() {
			bind_click($(this))
		});
		$target.find('a').each(function() {
			bind_click($(this))
		});

		function bind_click($target) {
			var $link = $target,
				href  = $link.attr('href');

			// クリックイベントを設定
			$link.bind('click', function() {
				return object.click_promo(promo_data, href);
			});
		}

		return this;
	}

	/**
	 * GAにプロモーションクリックアクションを送信
	 */
	Class.prototype.click_promo = function(promo_data, href) {
		var object = this;

		// プロモーション追加
		ga('ec:addPromo', promo_data);

		// クリックアクションを追加
		object.set_action('promo_click');

		// イベントを送信
		object.send_event('ClickPromo', function() {
			document.location = href;
		});
		return !ga.loaded;;
	}

	/**
	 * GAに商品情報の表示を送信
	 */
	Class.prototype.detail_action = function($target) {
		var object = this;
		var $goods = $target.find('[data-' + object.key('goods') + ']');
		if ($goods.length > 0) {
			var goods_data = object.get_goods_data($goods);

			// 商品追加
			ga('ec:addProduct', goods_data);

			object.set_action('detail');

			object.send_event('Detail');
		}
	}

	/**
	 * カートへの追加アクションを送信
	 */
	Class.prototype.add_action = function($target) {
		var object = this;
		var $goods = $target.find('[data-' + object.key('goods') + ']');
		if ($goods.length > 0) {
			var goods_data = object.get_goods_data($goods);

			// 商品追加
			ga('ec:addProduct', goods_data);

			object.set_action('add');
			object.send_event('Add');
		}
	}

	/**
	 * カートへの削除アクションを送信
	 */
	Class.prototype.remove_action = function($target) {
		var object = this;
		var $goods = $target.find('[data-' + object.key('goods') + ']');
		if ($goods.length > 0) {
			var goods_data = object.get_goods_data($goods);

			// 商品追加
			ga('ec:addProduct', goods_data);

			object.set_action('remove');
			object.send_event('Remove');
		}
	}

	/**
	 * 決済プロセス：Checkoutアクションを送信
	 */
	Class.prototype.checkout_action = function($target) {
		var object = this;

		var step   = $target.data(object.key('step'));
		var option = $target.data(object.key('option'));

		var $goods_list = $target.find('[data-' + object.key('goods') + ']');
		$goods_list.each(function() {
			var $goods = $(this);
			var goods_data = object.get_goods_data($goods);

			// 商品追加
			ga('ec:addProduct', goods_data);
		});

		var params = {step : step};
		if (typeof option != 'undefined' && option != '') {
			params['option'] = option;
		}
		object.set_action('checkout', params);
		object.send_event('Checkout');
	}

	/**
	 * トランザクション：Purchaseアクションを送信
	 */
	Class.prototype.purchase_action = function($target) {
		var object = this;

		var purchase_data = object.get_purchase_data($target);

		var $goods_list = $target.find('[data-' + object.key('goods') + ']');
		$goods_list.each(function() {
			var $goods = $(this);

			var goods_data = object.get_goods_data($goods);

			// 商品追加
			ga('ec:addProduct', goods_data);
		});

		object.set_action('purchase', purchase_data);
		object.send_event('Purchase');
	}

	/**
	 * GAに送信する商品情報をタグの属性から取得
	 */
	Class.prototype.get_goods_data = function($goods) {
		var object = this,
			params = {};
		
		var keys = ['id', 'name', 'brand', 'category', 'variant', 'price', 'quantity', 'coupon', 'position'];
		for (var index in keys) {
			var key = keys[index];
			var value = $goods.data(object.key('goods_' + key));
			if (typeof value != 'undefined') {
				params[key] = value;
			}
		}
		
		return params;
	}

	/**
	 * GAに送信するトランザクション情報をタグの属性から取得
	 */
	Class.prototype.get_purchase_data = function($purchase) {
		var object = this,
			params = {};
		
		var keys = ['id', 'affiliation', 'revenue', 'tax', 'shipping', 'coupon', 'option'];
		for (var index in keys) {
			var key = keys[index];
			var value = $purchase.data(object.key('' + key));
			if (typeof value != 'undefined') {
				params[key] = value;
			}
		}
		
		return params;
	}

	/**
	 * GAに送信するプロモーション情報をタグの属性から取得
	 */
	Class.prototype.get_promo_data = function($promo) {
		var object = this,
			params = {};
		
		var keys = ['id', 'name', 'creative', 'position'];
		for (var index in keys) {
			var key = keys[index];
			var value = $promo.data(object.key('promo_' + key));
			if (typeof value != 'undefined') {
				params[key] = value;
			}
		}
		
		return params;
	}

	/**
	 * GAのecプラグインをロード
	 */
	Class.prototype.load_ec_plugin = function(label) {
		// e コマース プラグインの読み込み
		ga('require', 'ec');
	}

	/**
	 * GAにActionを送信
	 */
	Class.prototype.set_action = function(action, options) {
		if (typeof options == 'undefined') {
			options = {};
		}
		ga('ec:setAction', action, options);
		return this;
	};

	/**
	 * GAにeventを送信
	 */
	Class.prototype.send_event = function(label, hitCallback) {
		if (typeof hitCallback == 'undefined') {
			hitCallback = function() {};
		}
		ga('send', 'event', 'Ecommerce', label, {
			nonInteraction: 1,
			hitCallback: hitCallback
		});
	}

	/**
	 * GAに送信するdimensionを設定
	 */
	Class.prototype.set_dimension = function(post_data) {
		for (key in this.options['dimensions']) {
			post_data[key] = this.options['dimensions'][key];
		}
		return post_data;
	}

	/**
	 * タグに設定されている属性のプレフィックスをつけてキーを取得
	 */
	Class.prototype.key = function(key) {
		return this.options['prefix'] + key;
	}

	/**
	* 全プラグイン共通
	*/
	$.fn[plugname] = function(options) {
		return new Class(this, options);
	}

	/**
	* デフォルトパラメータ
	*/
	$.fn[plugname].defaults = {
		prefix          : 'ga_ec_',	// data属性で指定する際のキーのプレフィックス
		dimensions      : {},		// Googleへのデータ送信の際のdimension
	};
})(jQuery);
