$(document).ready(function() {

	// Google Analyticsのクリックイベント
	$(window).bind("mousedown touchstart", function(event) {
		var target = $(event.target);

		var event = "";
		if (target.get(0).tagName == "A") {
			event = target.attr("data-ga_event");
		} else {
			var parent = target.parents("a[data-ga_event]");
			if (parent.length > 0) {
				event = parent.attr("data-ga_event");
			}
		}

		if (event != "" && typeof event !== "undefined" && typeof ga !== 'undefined') {
			var events   = event.split(",");
			var category = events[0] || '';
			var action   = events[1] || '';
			var label	= events[2] || '';
			var value	= events[3] || '';

			if (category != "" && action != "") {
				// カテゴリーにpc かSPの文字付与
				var windowSize = (new WindowSize()).get();
				if (windowSize != "small") {
					category = 'pc_'+category;
				} else {
					category = 'sp_'+category;
				}
				
				if (value != "") {
					ga('send', 'event', category, action, label, parseInt(value));
				} else {
					ga('send', 'event', category, action, label);
				}
			}
		}
	});
	
	// shopメニュー
	$('.shop').bind('click', function() {
		if ($('.shop_menu').css('display') == 'none'){
			allSlideUp();
			sleep(500, function (){ $('.shop_menu').stop().slideDown("normal", function() {}); } );
		}else{
			$('.shop_menu').stop().slideUp("normal", function() {
			});
		}
	});
	
	// newsメニュー
	$('.news').bind('click', function() {
		if ($('.news_menu').css('display') == 'none'){
			allSlideUp();
			sleep(500, function (){ $('.news_menu').stop().slideDown("normal", function() {}); } );
		}else{
			$('.news_menu').stop().slideUp("normal", function() {
			});
		}
	});
	
	// helpメニュー
	/*$('.help').bind('click', function() {
		if ($('.help_menu').css('display') == 'none'){
			allSlideUp();
			sleep(500, function (){ $('.help_menu').stop().slideDown("normal", function() {}); } );
		}else{
			$('.help_menu').stop().slideUp("normal", function() {
			});
		}
	});*/
	
	// small
	var closeselector2 = '.close-reveal2';
	var submenuselector = '.header-submenu';
	$(submenuselector).bind('click', function() {
			var $target = $(this);
				id	  = $target.data('open_id');
			if (typeof id != 'undefined') {
				$('#' + id).foundation('reveal', 'open', {
					'animation' : 'fade'
				});
				return false;
			}
	});

	$(closeselector2).bind('click', function() {
		var $target = $(this);
			id	  = $target.parents('.reveal-modal').attr('id');

		$('#' + id).foundation('reveal', 'close');
	});

	/*
	$(window).bind('resize', function () {
		var windowSize = (new WindowSize()).get();
		var parent = $('.main .row .medium-10');
		var item = $('.help');
		var itemRight = $('header').width() - ( item.position().left + parent.position().left + item.outerWidth() + 5);
		$('.help_menu ul').css('right', itemRight);
		var windowSize = (new WindowSize()).get();
		if (windowSize == "small") {
			$(closeselector2).trigger('click');
		}
	});
	
	// loginメニュー
	$('.login').bind('click', function() {
		if ($('.login_menu').css('display') == 'none'){
			allSlideUp();
			sleep(500, function (){ $('.login_menu').stop().slideDown("normal", function() {}); } );
		}else{
			$('.login_menu').stop().slideUp("normal", function() {
			});
		}
	});
	
	// memberメニュー
	$('.member').bind('click', function() {
		if ($('.member_menu').css('display') == 'none'){
			allSlideUp();
			sleep(500, function (){ $('.member_menu').stop().slideDown("normal", function() {}); } );
		}else{
			$('.member_menu').stop().slideUp("normal", function() {
			});
		}
	});
	
	// cartメニュー
	$('.cart').bind('click', function() {
		if ($('.cart_menu').css('display') == 'none'){
			allSlideUp();
			sleep(200, function (){ $('.cart_menu').stop().slideDown("normal", function() {}); } );
		}else{
			$('.cart_menu').stop().slideUp("normal", function() {
			});
		}
	});
	*/
	// 全て閉じる
	function allSlideUp(){
		$('.shop_menu').stop().slideUp("normal", function() {
		});
		$('.news_menu').stop().slideUp("normal", function() {
		});
		/*$('.help_menu').stop().slideUp("normal", function() {
		});*/
		$('.login_menu').stop().slideUp("normal", function() {
		});
		$('.member_menu').stop().slideUp("normal", function() {
		});
		$('.cart_menu').stop().slideUp("normal", function() {
		});
	}
	function sleep(time, callback){

		setTimeout(callback, time);

	}
	
	// ドロワーメニュー
	$('#pure-toggle-menu').change(function(){
		if ($(this).is(':checked')) {
			current_scrollY = $( window ).scrollTop(); 
			
			$( 'body' ).css( {
				position: 'fixed',
				width: '100%',
				top: -1 * current_scrollY
			} );
			$('.pure-drawer.menu').height($('body').height() - 130);
			
			$('.pure-toggle-label.search').addClass('bottun-hidden');
			$('.pure-overlay.menu').addClass('overlay-visible');
			$('.pure-drawer.menu').addClass('drawer-slide');
			$('.pure-overlay.menu').css('left', '16.6%');
			$('.menu_icon img').attr('src', '/assets/front/img/button/close.png');
		} else {
			$( 'body' ).attr( { style: '' } );
			$( 'html, body' ).prop( { scrollTop: current_scrollY } );
			
			$('.pure-toggle-label.search').removeClass('bottun-hidden');
			$('.pure-overlay.menu').removeClass('overlay-visible');
			$('.pure-drawer.menu').removeClass('drawer-slide');
			$('.pure-overlay.menu').css('left', 0);
			$('.menu_icon img').attr('src', '/assets/front/img/button/menu.png');
		}
	});
	$(window).on('resize',function(){
		if ($('#pure-toggle-menu').is(':checked')){
			$('.pure-drawer.menu').height($('body').height() - 130);
		}
	});
	
	$('#pure-toggle-search').change(function(){
		if ($(this).is(':checked')) {
			current_scrollY = $( window ).scrollTop(); 
			
			$( 'body' ).css( {
				position: 'fixed',
				width: '100%',
				top: -1 * current_scrollY
			} );
			
			$('.pure-toggle-label.menu').addClass('bottun-hidden');
			$('.pure-overlay.search').addClass('overlay-visible');
			$('.pure-drawer.search').addClass('drawer-slide');
			$('.pure-overlay.search').css('right', '16.6%');
			$('.search_icon img').attr('src', '/assets/front/img/button/close.png');
		} else {
			$( 'body' ).attr( { style: '' } );
			$( 'html, body' ).prop( { scrollTop: current_scrollY } );
			
			$('.pure-toggle-label.menu').removeClass('bottun-hidden');
			$('.pure-overlay.search').removeClass('overlay-visible');
			$('.pure-drawer.search').removeClass('drawer-slide');
			$('.pure-overlay.search').css('right', 0);
			$('.search_icon img').attr('src', '/assets/front/img/button/search.png');
		}
	});
	
	//// ヘッダ：カートの商品リスト取得処理
	var isGetCart = false;

	var $cartwrapper = $('.header_cart'),
		$listBox	 = $(".ul_cart");
		
		
	var getCartitem = function(){
		if (!isGetCart) {
			isGetCart = true;
			var params = {'store_id' : store_id};
			// ※「store_id」は、「include/layout.tpl」で定義

		$.ajax({
			type: "get",
			cache: false,
			data: params,
			url: apis_url_base + 'cart.json',
			success: function(data, textStatus){
				if (data.status == 'success') {
					for (var i = 0; i < data.list.length; i++) {
						var goods = data.list[i];

						/*
							goods['goods_name1']  ：商品名
							goods['color_name']   ：カラ―：
							goods['size_name']	：サイズ
							goods['stock']		：在庫
							goods['calc']['price']：単価
							goods['pod']		  ：個数
						*/

						// 親BOX
						var box   = $('<li class="clearfix" />'),
							inner = $('<div class="cart_inner" />');

						// LINK　　商品詳細へのURL：goods['url']
						var a = $('<a />').attr('href', goods['url']).append(inner);
						box.append(a);

						// 画像　　商品画像：goods['image']
						var spanLinkBox = $('<div class="colImage" />');
						if (!goods['image_path']['z']){
							var img = $('<img />').attr('src', '/photo/noimage.jpg');
						}else{
							var img = $('<img />').attr('src', goods['image_path']['z']);
						}
						a.find('.cart_inner').append(spanLinkBox.append(img));

						// テキスト情報のspan
						var spanTextBox = $('<div class="detail_wrapper" />');

						// 商品名
						var goods_name = goods['goods_name1'].substr(0, 20);
						var spanTextName = $('<div class="item_name" />').append(goods_name);

						// 単価、個数
						var price = goods['calc']['price_tax'];
						var pod = goods['pod'];
						var spanTextPriceresult = $('<div class="cart_price" />').append('&yen;' + separate(price * pod) + '(税込)');

						// カラ―、サイズ
						var color_name = goods['color_name'];
						var size_name = goods['size_name'];
						var spanTextDetail = $('<span class="cart_detail" />').append('color : ' + color_name).append('<br />size : ' + size_name).append('<br />数量 : ' + pod);

						a.find('.cart_inner').append(spanTextBox.append(spanTextName).append(spanTextPriceresult).append(spanTextDetail));

						$listBox.append(box);
					}
					
				} else {
				}
			}
		});
		}
	}

	// スマホメニュー
	$('#member').bind('click', function() {
		var $target = $("#member");
		toggleMenu($target);
	});
	$('#shop').bind('click', function() {
		var $target = $("#shop");
		toggleMenu($target);
	});
	$('#category').bind('click', function() {
		var $target = $("#category");
		toggleMenu($target);
	});
	$('#scene').bind('click', function() {
		var $target = $("#scene");
		toggleMenu($target);
	});
	$('#lookbook').bind('click', function() {
		var $target = $("#lookbook");
		toggleMenu($target);
	});
	$('#news').bind('click', function() {
		var $target = $("#news");
		toggleMenu($target);
	});
	$('#about_us').bind('click', function() {
		var $target = $("#about_us");
		toggleMenu($target);
	});
	$('#help').bind('click', function() {
		var $target = $("#help");
		toggleMenu($target);
	});

	function toggleMenu($target) {
		$contents = $target.next(".hide");
		if ($contents.css('display') == 'none'){
			$contents.stop().slideDown("normal", function() {
			});
			$target.addClass('up');
			$target.removeClass('down');
		}else{
			$contents.stop().slideUp("normal", function() {
			});
			$target.removeClass('up');
			$target.addClass('down');
		}
	}
	
	getCartitem();

	function separate(num) {
		return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	}


	// PC版：ヘッダメインメニュー
	(function(){
		var selector = '.header .main li.mainmenu';
		var selector_search = '.header .main li .open-search';
		var opensubmenuselector = '.open-submenu';
		var submenuselector = '.header-submenu-wrap';
		var header_center_selector = '.header-center';

		var overTargetClass = '';
		var isOpened = false;

		attachHeaderMenuEvent();

		/** メインメニューにイベントを設定 */
		function attachHeaderMenuEvent() {
			var windowSize = (new WindowSize()).get();

			$(selector).unbind('mouseover', openHeaderMenu);
			$(selector).unbind('mouseout', closeHeaderMenu);

			$(submenuselector).unbind('mouseover', mouseoverHeaderSubMenu);
			$(submenuselector).unbind('mouseout', closeHeaderMenu);

			$(selector).unbind('touchstart', openHeaderMenu);
			$(selector).unbind('touchend', closeHeaderMenu);

			$(submenuselector).unbind('touchstart', mouseoverHeaderSubMenu);
			$(submenuselector).unbind('touchend', closeHeaderMenu);

			$(selector).unbind('touchstart', touchStartHeaderMenuForTablet);
			$(selector).unbind('click', clickHeaderMenuForTablet);
			$("body").unbind('touchend', closeHeaderMenuForTablet);

			$(selector_search).unbind('touchstart', openHeaderSearch);
			$(selector_search).unbind('click', openHeaderSearch);

			if (windowSize != "small") {
				if (_ua.Tablet) {
					// タブレットの場合

					// タップしたときのイベントを設定
					$(selector).bind('touchstart', touchStartHeaderMenuForTablet);

					// クリックを無効にする
					$(selector).children('.open-submenu').bind('click', clickHeaderMenuForTablet);

					$("body").bind('touchend', closeHeaderMenuForTablet);

					$(selector_search).bind('touchstart', clickHeaderSearch);
				} else {
					// タブレット以外の場合

					$(selector).bind('mouseover', openHeaderMenu);
					$(selector).bind('mouseout', closeHeaderMenu);

					$(submenuselector).bind('mouseover', mouseoverHeaderSubMenu);
					$(submenuselector).bind('mouseout', closeHeaderMenu);

					$(selector_search).bind('click', clickHeaderSearch);
				}

				if ($(selector_search).closest('li').find('input.freeword').val() != "") {
					openHeaderSearch();
				}
			}
		}

		/** スライドメニューをオープン */
		function openHeaderMenu() {
			openHeaderMenuExecute($(this));
		}

		/** スライドメニューをオープン */
		function openHeaderMenuExecute($target) {
			var $opensubmenu = $target.find(opensubmenuselector);

			if ($opensubmenu.length > 0) {
				overTargetClass = $opensubmenu.data('open_id');

				var $submenu = $(submenuselector + '.' + overTargetClass);
				if ($submenu.css('display') == 'none') {
					if ($submenu.hasClass('header-submenu-wrap-just')) {
						var left = Math.round($target.offset().left + $target.outerWidth() - $submenu.outerWidth() + 20);
						$submenu.css('left', left + 'px');
					}
					if (isOpened) {
						$submenu.stop().fadeIn(200);
					} else {
						$submenu.stop().slideDown(200);
					}
					isOpened = true;
				} 

				$(opensubmenuselector).removeClass("opened");
				$opensubmenu.addClass("opened");
			}
		}

		/** オープンしたメニュー内をマウスオーバー */
		function mouseoverHeaderSubMenu() {
			overTargetClass = $(this).data('open_id');
		}

		/** スライドメニューをクローズ */
		function closeHeaderMenu() {
			if (overTargetClass == "") {
				return;
			}

			var currentOverTargetClass = overTargetClass;

			var timeout = (overTargetClass == "cart_menu" || overTargetClass == "member_menu" || overTargetClass == "help_menu") ? 200 : 300;

			overTargetClass = '';
			isOpened = true;
			setTimeout(function() {
				if (overTargetClass != currentOverTargetClass) {
					var $submenu = $(submenuselector + '.' + currentOverTargetClass);
					if ($submenu.css('display') != 'none') {

						if (overTargetClass == "" || overTargetClass == "open-search" || overTargetClass == "cart_menu" || overTargetClass == "member_menu" || overTargetClass == "help_menu") {
							$submenu.stop().slideUp(200);
						} else {
							$submenu.stop().fadeOut(200);
						}
					} 
					var $opensubmenu = $('.open-submenu.' + currentOverTargetClass);
					$opensubmenu.removeClass("opened");
				}
				isOpened = false;
			}, timeout);
		}

		function closeHeaderMenuForTablet(event) {
			if ($(event.target).parents('header').length == 0) {
				closeHeaderMenu();
			}
		}

		function touchStartHeaderMenuForTablet(event) {
			var $target  = $(this),
				$opensubmenu = $target.find(opensubmenuselector);

			if ($opensubmenu.length > 0) {
				var targetClass = $opensubmenu.data('open_id');
				if (overTargetClass != "") {
					var is_same = (targetClass == overTargetClass);

					closeHeaderMenu();

					// 開いているメニューの場合は閉じる
					if (!is_same) {
						openHeaderMenuExecute($target);
					}
				} else {
					openHeaderMenuExecute($target);
				}
			}
		}
		function clickHeaderMenuForTablet(event) {
			event.preventDefault();
		}

		function clickHeaderSearch() {
			var $target  = $(this),
				$parent  = $target.closest('li'),
				$wrapper = $parent.find('.search-wrapper'),
				$input   = $parent.find('input.freeword'),
				$form	= $parent.find('form');

			if ($input.val() != "") {
				$form.submit();

			} else if (parseInt($wrapper.css('width').replace('px', '')) == 0) {
				openHeaderSearch();
			} else {
				// 検索のクローズ
				$wrapper.stop().animate({'height':'toggle', 'opacity':'toggle'}, 100);
			}

			return false;
		}

		function openHeaderSearch() {
			var $target = $(selector_search),
				$parent  = $target.closest('li'),
				$wrapper = $parent.find('.search-wrapper'),
				$input   = $parent.find('input.freeword');

			if (_ua.Tablet) {
				// タブレットの場合
				$input.attr('placeholder', 'SEARCH');
				$input.width('60px');
				$wrapper.stop().animate({'width':'60px', 'right':'-60px'}, 100);
				$input.focus();

			} else {
				$wrapper.stop().animate({'height':'toggle', 'opacity':'toggle'}, 100);
			}
		}

		changeHeaderCenterWidth();
		function changeHeaderCenterWidth() {
			var windowSize = (new WindowSize()).get();
			if (windowSize != "small") {
				var headerLeftWidth = $(".header .main .member").length > 0 ? 143 : 167;
				var width = $(".header .main").innerWidth() - headerLeftWidth - 190;
				$(".header .main .header-center").css("width", width + "px");
			}
		}

		$(window).bind('resize', changeHeaderCenterWidth);
	})();
});

(function(window, undefined) {
	function WindowSize() {}

	WindowSize.prototype.get = function() {
		var $parent	   = $("#windowSize");

		
		$parent.show();

		var isSmall	   = $parent.find(".small").is(':visible'),
			isMedium	  = $parent.find(".medium").is(':visible'),
			isLarge	   = $parent.find(".large").is(':visible');

		$parent.hide();

		if (isSmall) {
			return "small";
		} else if (isMedium) {
			return "medium";
		} else if (isLarge) {
			return "large";
		}
	}

	window.WindowSize = WindowSize;
})(window);

var _ua = (function(u){
	return {
		Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
			|| u.indexOf("ipad") != -1
			|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
			|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
			|| u.indexOf("kindle") != -1
			|| u.indexOf("silk") != -1
			|| u.indexOf("playbook") != -1,
		Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
			|| u.indexOf("iphone") != -1
			|| u.indexOf("ipod") != -1
			|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
			|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
			|| u.indexOf("blackberry") != -1
	}
})(window.navigator.userAgent.toLowerCase());

