$(function(){
	var $popups = $('*[data-popup]');
	$popups.each(function() {
		var popup = $(this).popup();
	});
});

(function($) {
	var plugname = 'popup';

	var $screen = null;
	var opentime = 0;

	/**
	* コンストラクタ
	*/
	var Class = function(popupWindow, options) {
		this.popupWindow = popupWindow;
		this.options = $.extend({}, $.fn[plugname].defaults, options, this.popupWindow.data());
		this.popupWindow.data(plugname, this);

		this.popupWindow.hide().css({
			'z-index': (this.options['zindex'] + 1),
		}).addClass('popup-window');

		var object = this;
		$('*[data-popup_id=' + this.popupWindow.attr('id') + ']').bind('click', function (event) {
			event.preventDefault();
			object.open();
			return false;
		});

		// ロード時にウィンドウをオープンするか
		if (object.isOpenOnload()) {
			$(window).bind('load', function() {
				setTimeout(function() {
					object.open();
				}, 50 + object.options['open_onload_delay']);
			});
		}

		// 閉じる
		this.popupWindow.find(this.options['selector_close']).bind('click', function(event) {
			event.preventDefault();
			object.close();
			return false;
		});

		// 次回から表示しない
		this.popupWindow.find(this.options['selector_undisplay_checkbox']).bind('change', function(event) {
			event.preventDefault();
			object.changeUndisplay($(this));
			return false;
		});

		// リンク先が無いアンカーはリンクを無効にする
		if (object.options['remove_link_if_empty_href']) {
			this.popupWindow.find('a[href=""]').each(function() {
				var $target = $(this);
				$target.replaceWith($target.html());
			});
		}

		this.popupWindow.find('a[href!=""]').each(function() {
			var $target = $(this);
			if ($target.attr('href') != '#') {
				$target.bind('click', function() {
					object.sendGaEvent('click');
				});
			}
		});
	}

	Class.prototype.open = function() {
		this.openScreen();

		this.setPopupPosition();

		var object = this;
		this.popupWindow.fadeIn(this.options['speed'], function() {
			object.setPopupPosition();
		});

		object.sendGaEvent('open');
		opentime = (new Date()).getTime();

		return this;
	};

	Class.prototype.isOpenOnload = function() {
		if (this.options['open_onload']) {
			var cookieValue = this.getCookie();
			if (!('undisplay' in cookieValue) || !cookieValue['undisplay']) {
				if (this.options['expires_type'] == 'daily') {
					var now = getToday();
					if (!('last_display_date' in cookieValue) || cookieValue['last_display_date'] != now) {
						this.saveCookie($.extend(this.getCookie(), {'last_display_date': now}), this.options['cookie_expires']);
						return true;
					}
				} else {
					this.saveCookie($.extend(this.getCookie(), {'undisplay': true}), 0);
					return true;
				}
			}
		}

		return false;
	}

	Class.prototype.setPopupPosition = function() {
		var windowWidth  = $(window).width(),
			windowHeight = $(window).height(),
			scrollTop = $(window).scrollTop(),
			popupWindowWidth  = this.popupWindow.outerWidth(),
			popupWindowHeight = this.popupWindow.outerHeight(),
			left = Math.max(((windowWidth - popupWindowWidth) / 2), 10),
			top = Math.max(((windowHeight - popupWindowHeight) / 2), 10);

		this.popupWindow.css({
			top: (top + scrollTop), left: left,
		});
	}

	Class.prototype.openScreen = function() {
		if (!this.options['screen']) {
			return;
		}

		if ($screen == null) {
			$screen = $('<div/>');
			$screen.hide().css({
				position: 'fixed', top: 0, left: 0,
				'background-color': this.options['screen_bgcolor'],
				'z-index': this.options['zindex']
			});
			$screen.appendTo('body');
		}

		$(window).bind('resize', this.setScreenSize);

		var object = this;
		$screen.bind('click', function() {
			if (object.options['close_onclick_screen']) {
				object.close();
			}
		});

		this.setScreenSize();

		$screen.fadeTo(this.options['screen_speed'], this.options['screen_opacity']);

		return this;
	};

	Class.prototype.setScreenSize = function() {
		var windowWidth  = $(window).width(),
			windowHeight = $(window).height();
		
		$screen.css({
			width: windowWidth + 'px',
			height: windowHeight + 'px'
		});
	}

	Class.prototype.close = function() {
		this.popupWindow.fadeOut(this.options['speed']);

		this.closeScreen();

		this.sendGaEvent('close');

		opentime = 0;

		return this;
	}

	Class.prototype.closeScreen = function() {
		$(window).unbind('resize', this.setScreenSize);
		$screen.unbind('click');
		$screen.fadeOut(this.options['screen_speed'], function() {
			$screen.hide();
		});
	}

	Class.prototype.changeUndisplay = function($target) {
		var isChecked = $target.is(':checked');
		if (isChecked) {
			this.saveCookie($.extend(this.getCookie(), {'undisplay': true}), this.options['cookie_expires']);
		} else {
			this.saveCookie($.extend(this.getCookie(), {'undisplay': false}), this.options['cookie_expires']);
		}
		return this;
	}

	Class.prototype.getCookie = function() {
		$.cookie.json = true;

		var data = '';
		if (typeof $.cookie(this.options['cookie']) != 'undefined') {
			data = $.cookie(this.options['cookie']);
		}

		if (data != '' && 'last_cookie_id' in data && data['last_cookie_id'] != this.getEachCookieId()) {
			this.removeCookie();
			data = {};
		}

		return data != '' ? data : {};
	}

	Class.prototype.saveCookie = function(data, expires) {
		data['last_cookie_id'] = this.getEachCookieId();

		$.cookie.json = true;

		var params = {path: '/'};
		if (expires > 0) {
			params['expires'] = expires;
		}

		$.cookie(this.options['cookie'], data, params);
	}

	Class.prototype.removeCookie = function() {
		$.removeCookie(this.options['cookie']);
	}

	Class.prototype.getEachCookieId = function() {
		var id = this.popupWindow.attr('id');
		if (typeof id == 'undefined' || id == '') {
			id = 'default';
		}
		return id;
	}

	Class.prototype.sendGaEvent = function(label) {
		if (typeof ga != 'undefined' && this.options['send_ga']) {
			var category = this.options['send_ga_category'];
			var action   = this.options['send_ga_action'] == '' ? this.getEachCookieId() : this.options['send_ga_action'];
			var value = opentime > 0 ? (new Date()).getTime() - opentime : 0;

			if (value > 0) {
				ga('send', 'event', category, action, label, parseInt(value));
			} else {
				ga('send', 'event', category, action, label);
			}
		}
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
		speed          : 'normal',	// ポップアップウィンドウの開閉スピード
		zindex         : 1000,		// スクリーンのz-index、ポップアップウィンドウはこの値＋１
		screen         : true,		// スクリーンを表示するか？
		screen_opacity : 0.5,		// スクリーンの透過
		screen_speed   : 'normal',	// スクリーンの開閉スピード
		screen_bgcolor : '#000000',	// スクリーンの背景色
		close_onclick_screen : true,	// スクリーンクリックで閉じるか？

		expires_type   : '',		// 次回表示までの有効期限　daily：１日１回

		open_onload        : false,			// documentロード時にポップアップを開くか？
		open_onload_delay  : 500,			// documentロード時にポップアップを開くときの遅延時間
		cookie             : 'open_popup',	// documentロード時にポップアップを開くときの表示状態を保存するクッキー
		cookie_expires     : 365,			// documentロード時にポップアップを開くときの表示状態を保存するクッキーの有効期限

		selector_close     : '.close',							// 閉じるボタンのselector
		selector_undisplay : '.undisplay',	// 「次回から表示しない」boxのselector
		selector_undisplay_checkbox : '.undisplay input[type=checkbox]',	// 「次回から表示しない」checkboxのselector

		remove_link_if_empty_href : false,	// hrefが空の場合にアンカーを削除するか？

		send_ga          : true,		// Google Analyticsにイベントを送信するか？する場合、表示とクリックのイベントが通知されます。
		send_ga_category : 'popup',		// GAに送信するイベントのカテゴリ
		send_ga_action   : '',			// GAに送信するイベントのアクション：空の場合はBOXのIDが使われる（IDも空の場合はdefault）
	};

	function getToday() {
		var now = new Date();
		return now.getFullYear() +
			("0" + (now.getMonth() + 1)).slice(-2) +
			("0" + now.getDate()).slice(-2);
	}
})(jQuery);
