(function($) {
	var plugname = 'gtm_google_analytics_ec';

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

		dataLayer = dataLayer || [];

		// 商品リストのimpressionを送信し、クリックイベントを設定する
		var $ga_ec_lists = $('[data-' + object.key('list') + ']');
		if ($ga_ec_lists.length > 0) {
			$ga_ec_lists.each(function() {
				var $target = $(this);
				// 商品リストのimpressionを送信
				object.impression($target);
			});
		}
	}

	/**
	 * GAにImpressionを送信
	 */
	Class.prototype.impression = function($target) {
		var object = this,
			post_data_list = [];

		var list = $target.data(object.key('list'));

		// 商品情報を取得
		var $goods_list = $target.find('[data-' + object.key('goods') + ']');
		$goods_list.each(function() {
			var $goods = $(this);
			var goods_data = object.get_goods_data($goods);
			goods_data['list'] = list;
			goods_data = object.set_dimension(goods_data);

			post_data_list.push(goods_data);
		});

		dataLayer.push({
			'ecommerce': {
				'currencyCode': 'JPY',
				'impressions': post_data_list
			}
		});

		return this;
	};

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
