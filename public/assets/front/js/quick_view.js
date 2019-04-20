(function(window, undefined) {
	/**
	 * QuickView
	 */
	var $quick_view;
	var $buttons;

	function QuickView() {}

	QuickView.prototype.bind = function(button_class) {
		$quick_view = this;

		$buttons = $("#goods_quick_view ." + button_class);

		// お気に入り登録ボタンにclickイベントをバインド
		$buttons.bind("click", this.clickAddCart);
	}

	/**
	 * カート登録ボタン押下イベント
	 */
	QuickView.prototype.clickAddCart = function() {
		var $target = $(this);

		// 要素に設定されているキーを取得
		var params = $quick_view.getGoodsKey($target);
		$quick_view.addCart(params, $target);

		return false;
	}

	/**
	 * 要素に設定されているキーを取得
	 */
	QuickView.prototype.getGoodsKey = function($target) {
		var $form   = $target.closest("form"),
			$fields = $form.serializeArray();
		return $fields;
	}
	
	/**
	 * カート登録処理
	 */
	QuickView.prototype.addCart = function(params, $target) {
		$.post(base_url_ssl + apis_url_base + "cart/add.json", params, function(data, textStatus) {
			if (data.status == "success") {
				$("#goods_quick_view .add_cart_pop").show("nomal");
				var count = Number($("#header_cart_count").text());
				var add_count = Number($("#goods_quick_view #amount_input").val());
				$("#header_cart_count").text(count + add_count);
				$("#header_cart_count_sp").text(count + add_count);
			} else {
				// エラー表示
				var error_message = '';
				for (key in data.errors) {
					error_message = data.errors[key];
					break;
				}

				// @TODO：エラーメッセージ表示処理
				var error_message = error_message.replace( /<br \/>/g , "\n" ) ;
				alert(error_message);
			}
		}, "json");
	}

	window.QuickView = QuickView;


	/**
	 * Reveal
	 */
	function Reveal() {}

	Reveal.prototype.closeReveal = function() {
		var parent		= $(this).parents(".reveal-modal");
		parent.foundation('reveal', 'close');
		return false;
	}

	window.Reveal = Reveal;
})(window);


$(function(){
	var quick_view = new QuickView();
	quick_view.bind("add_cart_btn");

	var reveal = new Reveal();
	$(".reveal-modal .close-reveal").bind("click", reveal.closeReveal);

	var $target_quick_view = $('#goods_quick_view');

	//color取得
	var $detailcolorlistbox = $target_quick_view.find('.color_list');

	//size取得
	var $detailsizelistbox = $target_quick_view.find('.size_list');
	var $detailsizetilebox = $target_quick_view.find('.size_table > ul');

	// カラーごとの在庫TOTAL
	var stock_color_size = 0;

	//price取得
	var $detailprice = $target_quick_view.find('.itemPrice');

	for(var i in item_stock.colors){
		for(var j in item_stock.colors[i].sizes){
			$detailsizelistbox.append('<li class="size_detail '+item_stock.colors[i].color_code+'" data-size_code="'+item_stock.colors[i].sizes[j].size_code+'" data-size_stock="'+item_stock.colors[i].sizes[j].stock+'" data-size_proper="'+item_stock.colors[i].sizes[j].size_proper+'" data-size_sale="'+item_stock.colors[i].sizes[j].size_sale+'" data-size_percent="'+item_stock.colors[i].sizes[j].size_percent+'">'+item_stock.colors[i].sizes[j].size_name+'</li>');
			stock_color_size = stock_color_size + item_stock.colors[i].sizes[j].stock;
			$detailsizetilebox.append($('<li/>').attr({
				'class': (item_stock.colors[i].sizes[j].stock > 0 ? '' : 'no_stock ') + item_stock.colors[i].color_code,
				'data-color_code': item_stock.colors[i].color_code,
				'data-size_code': item_stock.colors[i].sizes[j].size_code,
				'data-size_name': item_stock.colors[i].sizes[j].size_name,
				'data-size_stock': item_stock.colors[i].sizes[j].stock,
				'data-size_proper': item_stock.colors[i].sizes[j].size_proper,
				'data-size_sale': item_stock.colors[i].sizes[j].size_sale,
				'data-size_percent': item_stock.colors[i].sizes[j].size_percent
			}).addClass('size_detail').append($('<span/>').text(
				item_stock.colors[i].sizes[j].size_name + ' / ' + (item_stock.colors[i].sizes[j].stock > 0 ? '在庫あり' : '在庫なし ')
			)));
		}
		if (item_stock.colors[i].image_url.length){
			$color_str = '<li class="color_detail" data-color_name="'+item_stock.colors[i].color_name+'" data-color_code="'+item_stock.colors[i].color_code+'" data-stock="'+item_stock.colors[i].stock+'" style=" background-image: url('+item_stock.colors[i].image_url+');" data-color_proper="'+item_stock.colors[i].color_proper+'" data-color_sale="'+item_stock.colors[i].color_sale+'" data-color_percent="'+item_stock.colors[i].color_percent+'">';
		}else{
			$color_str = '<li class="color_detail" data-color_name="'+item_stock.colors[i].color_name+'" data-color_code="'+item_stock.colors[i].color_code+'" data-stock="'+item_stock.colors[i].stock+'" style="background-color: '+item_stock.colors[i].html_color+';" data-color_proper="'+item_stock.colors[i].color_proper+'" data-color_sale="'+item_stock.colors[i].color_sale+'" data-color_percent="'+item_stock.colors[i].color_percent+'">';
		}
		// 在庫あり
		if (item_stock.colors[i].stock > 0){
			$color_str = $color_str+'<span class="selected"></span>'+item_stock.colors[i].images+'<span>'+item_stock.colors[i].color_name+'</span></li>';
		}else if (item_stock.colors[i].color_code == '013'){
			$color_str = $color_str+'<span class="selected"></span><div class="soldout white">'+item_stock.colors[i].images+'</div><span>'+item_stock.colors[i].color_name+'</span></li>';
		}else{
			$color_str = $color_str+'<span class="selected"></span><div class="soldout">'+item_stock.colors[i].images+'</div><span>'+item_stock.colors[i].color_name+'</span></li>';
		}
		$detailcolorlistbox.append($color_str);
	}

	//サイズ、カラーセレクト
	var $detailsizelist	   = $target_quick_view.find('.size_detail'),
		$detailcolorlist	  = $target_quick_view.find('.color_detail'),
		$detailcolortitlename = $target_quick_view.find('#color');

	//カラークリックで該当価格、サイズ表示
	var $detailsliderboxthum = $target_quick_view.find('.thumnailBox'),
		$onlysize,
		colorcode,
		sizelength;

	$detailcolorlist.on('click',function(e){

		e.stopPropagation();

		$target_quick_view.find('#color_input').val($(this).attr('data-color_code'));

		$detailcolorlist.removeClass('active');
		$(this).toggleClass('active');

		// 選択カラー名に表示変更
		$detailcolortitlename.text($(this).attr('data-color_name'));

		// カラーアイコン選択中解除
//		$detailcolorlist.each(function(){
//			$(this).children('span.selected').hide();
//		});
//		$(this).children('span.selected').show();

		colorcode = $(this).attr('data-color_code');

		//サイズ切り替え
		$detailsizelist.removeClass('active').hide();
		//$('#size_input').val('');
		//$('#size').text('選択してください');
		//$('.size_text').text('　');

		sizelength = $detailsizetilebox.find('[data-color_code="' + colorcode + '"]').length;

		if(sizelength == 1){//該当サイズが一つ/soldoutじゃなければ選択
			color_percent = $(this).attr('data-color_percent');
			color_sale = $(this).attr('data-color_sale');
			color_proper = $(this).attr('data-color_proper');

			if (color_sale){
				// セール
				$detailprice.children('.sale_wrapper').show();
				$detailprice.children('.proper_wrapper').hide();

				$detailprice.children('.sale_wrapper').children('.proper_price').text(color_proper);
				$detailprice.children('.sale_wrapper').children('.sale_price').text(color_sale);
				$detailprice.children('.sale_wrapper').children('.comment').text(color_percent);
			}else{
				// 通常
				$detailprice.children('.proper_wrapper').show();
				$detailprice.children('.sale_wrapper').hide();

				$detailprice.children('.proper_wrapper').children('.proper_price').text(color_proper);
			}

			$onlysize = $detailsizetilebox.find('[data-color_code="' + colorcode + '"]');

			$onlysize.click();

			$onlysize.show();

		}else{
			// 現在のサイズコード取得
			now_size_code = $target_quick_view.find('#size_input').val();
			// サイズ選択済みフラグ
			size_fig = 0;
			$detailsizetilebox.find('[data-color_code="' + colorcode + '"]').each(function(){
				$(this).show();
				stock = $(this).attr('data-size_stock');
				size_code = $(this).attr('data-size_code');
				if (now_size_code == size_code || (now_size_code == 0 && !size_fig && stock > 0)){
					size_fig = 1;
					$(this).click();
				}
			});
			// もし全て売り切れの場合、最初のサイズを選択状態にする
			if (!size_fig){
				$detailsizetilebox.find('[data-color_code="' + colorcode + '"]:first').click();
			}
		}

		$detailsliderboxthum.find('.thumnail.'+colorcode+':first').click();
	});


	//サイズセレクト
	var $sizeinput		  = $target_quick_view.find('#size_input'),
		$detailsizeinner	= $target_quick_view.find('.size_text'),
		$detailsizelistwrap = $target_quick_view.find('.size_list'),
		$detailsizelist	 = $target_quick_view.find('.size_detail'),
		size_code;

	$detailsizeinner.on('click',function(e){

		e.stopPropagation();

		$detailsizelistwrap.fadeToggle();
	});

	$detailsizelist.on('click',function(e){

		e.stopPropagation();

		$detailsizelistwrap.fadeOut();
		var $this = $(this);
		text = $this.attr('data-size_name');
		stock = $this.attr('data-size_stock');
		size_code = $this.attr('data-size_code');
		size_percent = $this.attr('data-size_percent');
		size_sale = $this.attr('data-size_sale');
		size_proper = $this.attr('data-size_proper');
		$sizeinput.val(size_code);
		$detailsizeinner.text(text);
		$target_quick_view.find('#size').text(text);

		if (size_sale){
			// セール
			$detailprice.children('.sale_wrapper').show();
			$detailprice.children('.proper_wrapper').hide();

			$detailprice.children('.sale_wrapper').children('.proper_price').text(size_proper);
			$detailprice.children('.sale_wrapper').children('.sale_price').text(size_sale);
			$detailprice.children('.sale_wrapper').children('.comment').text(size_percent);
		}else{
			// 通常
			$detailprice.children('.proper_wrapper').show();
			$detailprice.children('.sale_wrapper').hide();

			$detailprice.children('.proper_wrapper').children('.proper_price').text(size_proper);
		}

		$detailsizelist.removeClass('active');
		if (stock > 0){
			hideSoldOut();
			$this.addClass('active');
		}else{
			hideCartBtn();
		}

	});


	//数量セレクト
	var $amountinput		  = $target_quick_view.find('#amount_input'),
		$detailamountinner	= $target_quick_view.find('.quantity_text'),
		$detailamountlistwrap = $target_quick_view.find('.quantity_list'),
		$detailamountlist	 = $target_quick_view.find('.quantity_detail'),
		amountnum;

	$detailamountinner.on('click',function(e){

		e.stopPropagation();

		$detailamountlistwrap.fadeToggle();
	});

	$detailamountlist.on('click',function(e){

		e.stopPropagation();

		$detailamountlistwrap.fadeOut();

		amountnum = $(this).attr('data-amount_num');
		$amountinput.val(amountnum);
		$detailamountinner.text(amountnum);
		$target_quick_view.find('#quantity').text(amountnum);

	});

	// 初期表示
	if (!default_color_code){
		// カラーコードが無い場合、最初のカラーを使用する
		default_color_code = item_stock.colors[0].color_code;
	}
	$detailcolorlist.each(function(){
		if($(this).attr('data-color_code') == default_color_code){
			$(this).click();
		}
	});

	//ボックス高さ固定
	var $detailinnerdesc	= $target_quick_view.find('.detail__inner_desc'),
		$detailinnerslider  = $target_quick_view.find('.imageArea'),
		detailinnersliderH  = $detailinnerslider.height();

	function detailHeight(heightTarget){/*
	 detailinnersliderH  = $detailinnerslider.height();

	 if(xs_break_point > window_size){
	 heightTarget.css({
	 'min-height':'auto'
	 });
	 }else{
	 heightTarget.css({
	 'min-height':detailinnersliderH+'px'
	 });
	 }*/

	}

	$(window).on('resize',function(){
		detailHeight($detailinnerdesc);
	});

	//プルダウンクリックイベント
	var $d = $(document),
		$detailsizelistwrap = $target_quick_view.find('.size_list'),
		$detailamountlistwrap = $target_quick_view.find('.quantity_list');

	$d.on('click',function(){
		if($detailsizelistwrap.css('display') !== 'none'){
			$detailsizelistwrap.fadeOut();
		}
		if($detailamountlistwrap.css('display') !== 'none'){
			$detailamountlistwrap.fadeOut();
		}
	});

	//アコーディオンメニュー
//	var $detaildisctitle = $('.detail_title'),
//		$detaildiscpara  = $('.detail');
//
//	$detaildisctitle.on('click',function(e){
//
//		e.stopPropagation();
//
//		$(this).toggleClass('active');
//		$(this).next($detaildiscpara).stop().slideToggle();
//	});

	$(document).one('opened.fndtn.reveal', '[data-reveal]', function () {
		var imgcount = 0;
		$target_quick_view.find('.mainImageSlider > li > img').one('load', function() {
			imgcount++;
			if (imgcount == $target_quick_view.find('.mainImageSlider > li > img').length) {
				//スライダー関連
				var activelist,
					$detailsliderlist	 = $target_quick_view.find('.slider_main'),
					$detailsliderlistthum = $target_quick_view.find('.thumnail');

				$detailinnerslider.flexslider({
					controlNav:false,
					slideshow:false,
					animation:"slide",
					directionNav:true,
					prevText:'',
					nextText:'',
					after:function(){

						//アクティブサムネイルを取得
						$detailsliderlist.each(function(){
							if($(this).hasClass('flex-active-slide')){
								activelist = $detailsliderlist.index(this);
								$detailsliderlistthum.removeClass('active');
								$detailsliderlistthum.eq(activelist).addClass('active');
							}
						});
					},
					start:function(){
						//最初のサムネイルをアクティブに
						//$detailsliderlistthum.first().addClass('active');

						//サムネイルクリックでスライド表示
						$detailsliderlistthum.on('click',function(e){

							e.stopPropagation();

							$detailsliderlistthum.removeClass('active');
							$(this).toggleClass('active');

							activelist = $detailsliderlistthum.index(this);
							$detailinnerslider.flexslider(activelist);

						});

						$detailsliderboxthum.find('.'+default_color_code).first().click();
					}
				});

				// アコーディオンを初期状態で開く
//		$('.detail_title').click();

				//コンテンツ高さ調整
				detailHeight($detailinnerdesc);


			}
		}).each(function(){
			if (this.complete) {
				$(this).trigger('load');
			}
		});
	});


	// 再入荷リクエストボタンクリック
	$target_quick_view.find('.restock_request_btn').click(function() {
		var $target = $(this),
			uri = $target.data('uri'),
			$form = $target.closest('form');

		// 遷移先を変更してsubmit
		$form.attr('action', $form.attr('action').replace('/cart/add', uri));
		$form.submit();

		return false;
	});

	// お気に入りボタンクリック
	$target_quick_view.find('.favolite_btn').click(function() {
		var $target = $(this),
			uri = $target.data('uri'),
			$form = $target.closest('form');

		// 遷移先を変更してsubmit
		$form.attr('action', $form.attr('action').replace('/cart/add', uri));
		$form.submit();

		return false;
	});

	// カートボタン非表示
	function hideCartBtn(){
		$target_quick_view.find('.add_cart_btn').prop("disabled", true);
		$target_quick_view.find('.add_cart_btn').hide();
		$target_quick_view.find('.restock_request_btn').prop("disabled", false);
		$target_quick_view.find('.restock_request_btn').show();
	}

	// 再入荷リクエスト非表示
	function hideSoldOut(){
		$target_quick_view.find('.add_cart_btn').prop("disabled", false);
		$target_quick_view.find('.add_cart_btn').show();
		$target_quick_view.find('.restock_request_btn').prop("disabled", true);
		$target_quick_view.find('.restock_request_btn').hide();
	}

	$(".add_cart_pop .continueBtn").on('click',function(e){
		$('.close-reveal').trigger('click');
		return false;
	});
});
