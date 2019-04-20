// カラーコード
var $color_code;

(function(window, undefined) {
	var $item_detail;
	var $buttons;

	function ItemDetail() {}

	ItemDetail.prototype.bind = function(button_class) {
		$item_detail = this;

		$buttons = $("." + button_class);

		$buttons.bind("click", this.clickAddCart);
	}

	/**
	 * カート登録ボタン押下イベント
	 */
	ItemDetail.prototype.clickAddCart = function() {
		var $target = $(this);

		// 要素に設定されているキーを取得
		var params = $item_detail.getGoodsKey($target);
		$item_detail.addCart(params, $target);

		return false;
	}

	/**
	 * 要素に設定されているキーを取得
	 */
	ItemDetail.prototype.getGoodsKey = function($target) {
		var $form   = $target.closest("form"),
			$fields = $form.serializeArray();

		var $targetSizes = $target.context.dataset["targetSizes"];
		var $sizeCombo = document.getElementById($targetSizes);
		
		var $activeSizeDataset;
		if (typeof $sizeCombo.selectedOptions != "undefined") {
			$activeSizeDataset = $sizeCombo.selectedOptions[0].dataset;
		} else {
			$activeSizeDataset = $sizeCombo.options[$sizeCombo.selectedIndex].dataset;
		}
		
		for(var $no in $fields) {
			if ($fields[$no].name == 'color_code') {
				$fields[$no].value = $activeSizeDataset['color_code'];
			} else if ($fields[$no].name == 'size_code') {
				$fields[$no].value = $activeSizeDataset['size_code'];
			}
		}
		
		return $fields;
	}

	/**
	 * カート登録処理
	 */
	ItemDetail.prototype.addCart = function(params, $target) {
		$.post(base_url_ssl + apis_url_base + "cart/add.json", params, function(data, textStatus) {
			if (data.status == "success") {
				// ポップアップ非表示
				$(".add_cart_pop"+$color_code).hide("nomal");
				// カラーコード保持
				$color_code = params[2].value;
				// カート追加ポップアップ表示
				$(".add_cart_pop"+$color_code).show("nomal");
				var count = Number($("#header_cart_count").text());
				var add_count = Number($("body > .itemDetailWrapper #amount_input").val());
				$("#header_cart_count").text(count + add_count);
				$("#header_cart_count_sp").text(count + add_count);

				(function(){

					dataLayer.push({
						'event': 'addToCart',
						'ecommerce': {
							'currencyCode': 'JPY',
							'add': {
								'products': [{                        //  adding a product to a shopping cart.
									'name': $target.data('ga_ec_goods_name'),
									'id': $target.data('ga_ec_goods_id'),
									'brand': $target.data('ga_ec_goods_brand'),
									'category': $target.data('ga_ec_goods_category'),
									'variant': '',
									'quantity': 1
								}]
							}
						}
					});
				}());
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

	window.ItemDetail = ItemDetail;
})(window);

$(function(){
	//color取得
	var $detailcolorlistbox = $('.color_list');
	
	//size取得
	var $detailsizelistbox = $('.size_list');
	var $detailsizetilebox = $('.size_table > ul');

	// カラーごとの在庫TOTAL
	var stock_color_size = 0;
	
	//price取得
	var $detailprice = $('.itemPrice');
	
	// カート追加ポップアップ生成用
	var $cartpopbox = $('.add_cart_pop_wrap');
	var $position = -70;
	
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
				item_stock.colors[i].sizes[j].size_name + ' / ' + (item_stock.colors[i].sizes[j].stock > 0 ? $const_in_stock_label : $const_no_stock_label)
			)));
		}
		
		// カラー毎情報生成
		if (item_stock.colors[i].image_url.length){
			$color_str = '<li class="color_detail" data-color_name="'+item_stock.colors[i].color_name+'" data-color_code="'+item_stock.colors[i].color_code+'" data-stock="'+item_stock.colors[i].stock+'" style=" background-image: url('+item_stock.colors[i].image_url+');" data-color_proper="'+item_stock.colors[i].color_proper_taxin+'" data-color_proper_usd="'+item_stock.colors[i].color_proper_taxin_usd+'" data-color_proper_cny="'+item_stock.colors[i].color_proper_taxin_cny+'" data-color_sale="'+item_stock.colors[i].color_sale_taxin+'" data-color_sale_usd="'+item_stock.colors[i].color_sale_taxin_usd+'" data-color_sale_cny="'+item_stock.colors[i].color_sale_taxin_cny+'" data-color_percent="'+item_stock.colors[i].color_percent+'">';
		}else{
			$color_str = '<li class="color_detail" data-color_name="'+item_stock.colors[i].color_name+'" data-color_code="'+item_stock.colors[i].color_code+'" data-stock="'+item_stock.colors[i].stock+'" style="background-color: '+item_stock.colors[i].html_color+';" data-color_proper="'+item_stock.colors[i].color_proper_taxin+'" data-color_proper_usd="'+item_stock.colors[i].color_proper_taxin_usd+'" data-color_proper_cny="'+item_stock.colors[i].color_proper_taxin_cny+'" data-color_sale="'+item_stock.colors[i].color_sale_taxin+'" data-color_sale_usd="'+item_stock.colors[i].color_sale_taxin_usd+'" data-color_sale_cny="'+item_stock.colors[i].color_sale_taxin_cny+'" data-color_percent="'+item_stock.colors[i].color_percent+'">';
		}

		// 在庫有無
		if (item_stock.colors[i].stock > 0){
			// $color_str = $color_str+'<span class="selected"></span>'+item_stock.colors[i].images+'<span>'+item_stock.colors[i].color_name+'</span></li>';
			$color_str = $color_str+'<span class="selected"></span>'+item_stock.colors[i].images;
		}else if (item_stock.colors[i].color_code == '013'){
			// $color_str = $color_str+'<span class="selected"></span><div class="soldout white">'+item_stock.colors[i].images+'</div><span>'+item_stock.colors[i].color_name+'</span></li>';
			$color_str = $color_str+'<span class="selected"></span><div class="soldout white">'+item_stock.colors[i].images;
		}else{
			// $color_str = $color_str+'<span class="selected"></span><div class="soldout">'+item_stock.colors[i].images+'</div><span>'+item_stock.colors[i].color_name+'</span></li>';
			$color_str = $color_str+'<span class="selected"></span><div class="soldout">'+item_stock.colors[i].images;
		}
		$color_str = $color_str+'</li>';
		
		// カラー名称
		$color_str = $color_str+'<div class="info_area">';
		$color_str = $color_str+'<div class="color_name">'+item_stock.colors[i].color_name+'</div>';
		
		// サイズ初期値
		$color_str = $color_str+'<div class="size_btn_area">';
		$color_str = $color_str+'<div class="size_area">';
		
		// サイズコンボ生成
		$color_str = $color_str+'<select id="combo_select'+item_stock.colors[i].color_code+'" class="combo_size_select" data-target-button-area="btn_area_'+item_stock.colors[i].color_code+'">';

		var $counter = 0;
		var $size_combo_str = '';
		var $btn_type = '';
		for(var j in item_stock.colors[i].sizes){
			if ($counter++ == 0) {
				var $stock = item_stock.colors[i].sizes[j].stock;
			    	$btn_type = 'add_cart';
				if (0 >= $stock ) {
					$btn_type = 'restock_request';
				}
			}
		
			$size_combo_str = $size_combo_str+'<option class="'+(item_stock.colors[i].sizes[j].stock > 0 ? '' : 'no_stock ')+item_stock.colors[i].sizes[j].size_code+' size_detail"';
			$size_combo_str = $size_combo_str+' data-color_code="'+item_stock.colors[i].color_code+'"';
			$size_combo_str = $size_combo_str+' data-size_code="'+item_stock.colors[i].sizes[j].size_code+'"';
			$size_combo_str = $size_combo_str+' data-size_name="'+item_stock.colors[i].sizes[j].size_name+'"';
			$size_combo_str = $size_combo_str+' data-size_stock="'+item_stock.colors[i].sizes[j].stock+'"';
			$size_combo_str = $size_combo_str+' data-size_proper="'+item_stock.colors[i].sizes[j].size_proper+'"';
			$size_combo_str = $size_combo_str+' data-size_sale="'+item_stock.colors[i].sizes[j].size_sale+'"';
			$size_combo_str = $size_combo_str+' data-size_percent="'+item_stock.colors[i].sizes[j].size_percent+'"';
			$size_combo_str = $size_combo_str+' data-size_restock_request_flag="'+item_stock.colors[i].sizes[j].restock_request_flag+'"';
			$size_combo_str = $size_combo_str+'>';

			$size_combo_str = $size_combo_str+'<span>'+item_stock.colors[i].sizes[j].size_name;
			$size_combo_str = $size_combo_str+'&nbsp;/&nbsp;'+(item_stock.colors[i].sizes[j].stock > 0 ? $const_in_stock_label : $const_no_stock_label)+'</span>';
			$size_combo_str = $size_combo_str+'</option>';
		}
		$color_str = $color_str+$size_combo_str;

		$color_str = $color_str+'</select>';
		$color_str = $color_str+'</div>';

		// ボタン表示
	    	var $display = '';
		$color_str = $color_str+'<div class="btn_area" id="btn_area_'+item_stock.colors[i].color_code+'">';
		// 1. add to cart
		$display = 'add_cart'==$btn_type ? 'block' : 'none';
		$color_str = $color_str+'<div class="button-table-area"><button type="submit" name="add_cart" class="add_cart_btn button-200-30" style="display:'+$display+';" data-target-sizes="combo_select'+item_stock.colors[i].color_code+'">ADD&nbsp;TO&nbsp;CART</button></div>';
		// 2. restock request
		$display = 'restock_request'==$btn_type ? 'block' : 'none';
		$color_str = $color_str+'<div class="button-table-area"><button type="button" name="restock_request" class="button buttonGray restock_request_btn button-200-30" style="display:'+$display+';" data-uri="/item/restock/request" data-target-sizes="combo_select'+item_stock.colors[i].color_code+'">'+$const_restock_request_label+'</button></div>';
		// 3. sold out
		// $display = 'sold_out'==$btn_type ? 'block' : 'none';
		// $color_str = $color_str+'<div class="button-table-area"><button type="button" name="sold_out" class="button buttonGray sold_out_btn button-200-30" style="display:'+$display+';" data-target-sizes="combo_select'+item_stock.colors[i].color_code+'">'+$const_sold_out_label+'</button></div>';

		$color_str = $color_str+'</div>';

		$color_str = $color_str+'</div>';
		$color_str = $color_str+'</div>';
		$color_str = $color_str+'<br class="both">';

		$detailcolorlistbox.append($color_str);
		
		// カート追加ポップアップ生成
		$add_cart_pop = '';
		
		// 言語取得
		var $current_lang_val = '';
		if (typeof $current_lang !== "undefined") {
			$current_lang_val = $current_lang;
		}
		
		// カート追加ポップアップ
		if ($current_lang_val != 'en') {
			$add_cart_pop = $add_cart_pop+'<div class="add_cart_pop'+item_stock.colors[i].color_code+'" style="top: '+$position+'px; background-color: #fff; border: 1px solid; display: none; margin: 0 auto; padding: 20px; position: absolute; width: 100%; z-index: 10000; max-width: 270px; font-family: "HelveticaLTPro", "Hiragino Kaku Gothic Pro","ヒラギノ角ゴ Pro W3","メイリオ",Meiryo,"ＭＳ Ｐゴシック",Arial,Verdana,sans-serif;">';
			$add_cart_pop = $add_cart_pop+'<p style=" font-size: 16px; margin-bottom: 30px; text-align: center;">商品が追加されました。</p>';
			$add_cart_pop = $add_cart_pop+'<div class="btn-area">';
			$add_cart_pop = $add_cart_pop+'<div class="button-table-area" style="margin: 10px auto;"><a style="font-size: 14px; height: auto; padding: 10px 0;" class="button button-200-30" href="../../../cart">カートに進む</a></div>';
			$add_cart_pop = $add_cart_pop+'<div class="button-table-area" style="margin: 10px auto;"><a style="font-size: 14px; height: auto; padding: 10px 0;" class="button buttonWhite continueBtn button-200-30" href="#">閉じる</a></div>';
			$add_cart_pop = $add_cart_pop+'</div>';
			$add_cart_pop = $add_cart_pop+'</div>';
		}else{
			$add_cart_pop = $add_cart_pop+'<div class="add_cart_pop'+item_stock.colors[i].color_code+'" style="top: '+$position+'px; background-color: #fff; border: 1px solid; display: none; margin: 0 auto; padding: 20px; position: absolute; width: 100%; z-index: 10000; max-width: 270px; font-family: "HelveticaLTPro", "Hiragino Kaku Gothic Pro","ヒラギノ角ゴ Pro W3","メイリオ",Meiryo,"ＭＳ Ｐゴシック",Arial,Verdana,sans-serif;">';
			$add_cart_pop = $add_cart_pop+'<p style=" font-size: 16px; margin-bottom: 30px; text-align: center;">ITEMS&nbsp;ADDED</p>';
			$add_cart_pop = $add_cart_pop+'<div class="btn-area">';
			$add_cart_pop = $add_cart_pop+'<div class="button-table-area" style="margin: 10px auto;"><a style="font-size: 14px; height: auto; padding: 10px 0;" class="button button-200-30" href="../../../cart">View cart</a></div>';
			$add_cart_pop = $add_cart_pop+'<div class="button-table-area" style="margin: 10px auto;"><a style="font-size: 14px; height: auto; padding: 10px 0;" class="button buttonWhite continueBtn button-200-30" href="#">Close</a></div>';
			$add_cart_pop = $add_cart_pop+'</div>';
			$add_cart_pop = $add_cart_pop+'</div>';
		}
		
		$cartpopbox.append($add_cart_pop);
		// 表示位置調整
		$position = parseInt($position) + 100;
	}

	//サイズ、カラーセレクト
	var $detailsizelist	   = $('.size_detail'),
		$detailcolorlist	  = $('.color_detail'),
		$detailcolortitlename = $('#color');
	
	//カラークリックで該当価格、サイズ表示
	var $detailsliderboxthum = $('.thumnailBox'),
		$onlysize,
		colorcode,
		sizelength;
	
	// メインビジュアルスライダー
	var mainSlider;
	
	$detailcolorlist.on('click',function(e){
		
		e.stopPropagation();
		
		$('#color_input').val($(this).attr('data-color_code'));

		$detailcolorlist.removeClass('active');
		$(this).toggleClass('active');
		
		// スライダーの切り替え
		var colorCode = $(this).data('color_code');
		
		// スライダー
		var detailinnerslider  = $('.imageArea');
		var mainSliderClass = '.mainImageSlider';
		var thumbnailListClass = '.thumnailBox';
		var imageListClass = '.image_detail_wrap';
		var thumbnailClass = '.thumnailBox > .thumnail';

		if (typeof mainSlider !== "undefined" && 0 < $(thumbnailListClass).children().length) {
			mainSlider.flexslider("destroy");
		}

		$(mainSliderClass).empty();
		var mainlength = _zzimg[colorCode]['img_list'].length;
		for (var i = 0; i < mainlength; ++i) {
			if (_zzimg[colorCode]['img_list'][i]) {
				$(mainSliderClass).append('<li class="slider_main"><a class="detail__slider_img cloud-zoom" href="'+ _zzimg[colorCode]['img_list'][i] +'" id="zoom1" rel="adjustX:0, adjustY:0 , softFocus:false, tint: \'#FFFFFF\', tintOpacity:0.4, zoomWidth:650, zoomHeight:650"><img src="'+ _zzimg[colorCode]['img_list'][i] +'" alt="'+ _zzimg[colorCode]['goods_name1'] +' 詳細画像 '+ _zzimg[colorCode]['color_name'] +'" width="100%" /></a></li>');
			};
		}
		
		$(imageListClass).empty();
		for (var i = 0; i < mainlength; ++i) {
			if (_zzimg[colorCode]['img_list'][i]) {
				// 最初のファイルはスルー
				if (i != 0) {
					$(imageListClass).append('<div class="image_detail"><a class="detail__slider_img cloud-zoom" href="'+ _zzimg[colorCode]['img_list'][i] +'" id="zoom1" rel="adjustX:0, adjustY:0 , softFocus:false, tint: \'#FFFFFF\', tintOpacity:0.4, zoomWidth:650, zoomHeight:650"><img src="'+ _zzimg[colorCode]['img_list'][i] +'" alt="'+ _zzimg[colorCode]['goods_name1'] +' 詳細画像" class="detail__slider_img '+ colorCode +'"></a></div>');
				}
			};
		}
		
		$(thumbnailListClass).empty();
		for (var i = 0; i < mainlength; ++i) {
			if (_zzimg[colorCode]['img_list'][i]) {
				$(thumbnailListClass).append('<li class="thumnail"><img src="'+ _zzimg[colorCode]['img_list'][i] +'" alt="'+ _zzimg[colorCode]['goods_name1'] +' 詳細画像" class="detail__slider_img '+ colorCode +'"></li>');
			};
		}

		var activelist,
			$detailsliderlist	 = $('.slider_main'),
			$detailsliderlistthum = $('.thumnail');
		var sliderOptions = {
			controlNav:true,
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
		};

		mainSlider = $(detailinnerslider).flexslider(sliderOptions);
		
		// 選択カラー名に表示変更
		$detailcolortitlename.text($(this).attr('data-color_name'));
		
		// カラーアイコン選択中解除
//		$detailcolorlist.each(function(){
//			$(this).children('span.selected').hide();
//		});
//		$(this).children('span.selected').show();
		
		colorcode = $(this).attr('data-color_code');
		
		//サイズ切り替え
//		$detailsizelist.removeClass('active').hide();
		//$('#size_input').val('');
		//$('#size').text('選択してください');
		//$('.size_text').text('　');
		
		sizelength = $detailsizetilebox.find('[data-color_code="' + colorcode + '"]').length;
		
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

			var color_price_usd = $(this).attr('data-color_sale_usd');
			var color_price_cny = $(this).attr('data-color_sale_cny');
			$('.reference_price_wrapper .price_usd').text(color_price_usd);
			$('.reference_price_wrapper .price_cny').text(color_price_cny);
		}else{
			// 通常
			$detailprice.children('.proper_wrapper').show();
			$detailprice.children('.sale_wrapper').hide();
			
			$detailprice.children('.proper_wrapper').children('.proper_price').text(color_proper);

			var color_price_usd = $(this).attr('data-color_proper_usd');
			var color_price_cny = $(this).attr('data-color_proper_cny');
			$('.reference_price_wrapper .price_usd').text(color_price_usd);
			$('.reference_price_wrapper .price_cny').text(color_price_cny);
		}
		
		$detailsliderboxthum.find('.thumnail.'+colorcode+':first').click();

		// CloudZoomリセット
		destroyCloudZoom();
		doCloudZoom();

		// SIZE内MODEL情報切り替え
		$('.miaModelSize').hide();
		$('.miaModelSize[data-color_code="'+colorcode+'"]').show();

	});
	
	$('.combo_size_select').on('change', function() {

		var $selectedOption;
		if (typeof $(this).context.selectedOptions != "undefined") {
			$selectedOption = $(this).context.selectedOptions[0];
		} else {
			$selectedOption = $(this).context.options[$(this).context.selectedIndex];
		}
		var $selectedStock = $selectedOption.dataset['size_stock'];
	    	var $buttonType = '';
		if (0 < $selectedStock) {
			$buttonType = 'add_cart';
		} else {
			$buttonType = 'restock_request';
    		}

		var $targetButtonName = $(this).context.dataset['targetButtonArea'];
		var $targetButtonArea = document.getElementById($targetButtonName);
		var $targetButtonAreaChildren = $targetButtonArea.children;

		for (var $i = 0; $i < $targetButtonAreaChildren.length; $i++) {
			var $element = $targetButtonAreaChildren[$i].firstChild;
			if ($element.name == $buttonType) {
				$element.style.display = "block";
			} else {
				$element.style.display = "none";
			}
		}

	});
	
	//サイズセレクト
	var $sizeinput		  = $('#size_input'),
		$detailsizeinner	= $('.size_text'),
		$detailsizelistwrap = $('.size_list'),
		$detailsizelist	 = $('.size_detail'),
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
		$('#size').text(text);
		
		if (size_sale){
			// セール
			$detailprice.children('.sale_wrapper').show();
			$detailprice.children('.proper_wrapper').hide();
			
			$detailprice.children('.sale_wrapper').children('.proper_price').text(size_proper);
			$detailprice.children('.sale_wrapper').children('.sale_price').text(size_sale);
			$detailprice.children('.sale_wrapper').children('.comment').text(size_percent);
			$('#sku_price_sale').children('.sku_proper_price').text(size_proper);
			$('#sku_price_sale').children('.sku_sale_price').text(size_sale);
			$('#sku_price_sale').children('.sku_comment').text(size_percent);
			$('#sku_price').hide();
			
		}else{
			// 通常
			$detailprice.children('.proper_wrapper').show();
			$detailprice.children('.sale_wrapper').hide();
			
			$detailprice.children('.proper_wrapper').children('.proper_price').text(size_proper);
			$('#sku_price').children('.sku_price').text(size_proper);
			$('#sku_price_sale').hide();
			
		}

//		$detailsizelist.removeClass('active');
//		if (stock > 0){
//			hideSoldOut();
//			$this.addClass('active');
//		}else{
//			hideCartBtn();
//		}
		
	});
	
	
	//数量セレクト
	var $amountinput		  = $('#amount_input'),
		$detailamountinner	= $('.quantity_text'),
		$detailamountlistwrap = $('.quantity_list'),
		$detailamountlist	 = $('.quantity_detail'),
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
		$('#quantity').text(amountnum);
		
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
	var $detailinnerdesc	= $('.detail__inner_desc'),
		$detailinnerslider  = $('.imageArea'),
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
		$detailsizelistwrap = $('.size_list'),
		$detailamountlistwrap = $('.quantity_list');
	
	$d.on('click',function(){
		if($detailsizelistwrap.css('display') !== 'none'){
			$detailsizelistwrap.fadeOut();
		}
		if($detailamountlistwrap.css('display') !== 'none'){
			$detailamountlistwrap.fadeOut();
		}
	});
	
	$(window).on('load',function(){
		
		//スライダー関連
		var activelist,
			$detailsliderlist	 = $('.slider_main'),
			$detailsliderlistthum = $('.thumnail');
		
		$detailinnerslider.flexslider({
			controlNav:false,
			slideshow:false,
			animation:"slide",
			directionNav:false,
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
	});
	
	// 再入荷リクエストボタンクリック
	$('.restock_request_btn').click(function() {
		var $target = $(this),
			uri = $target.data('uri'),
			$form = $target.closest('form');

		var $targetSizes = $target.context.dataset["targetSizes"];
		var $sizeCombo = document.getElementById($targetSizes);
		
		var $activeSizeDataset;
		if (typeof $sizeCombo.selectedOptions != "undefined") {
			$activeSizeDataset = $sizeCombo.selectedOptions[0].dataset;
		} else {
			$activeSizeDataset = $sizeCombo.options[$sizeCombo.selectedIndex].dataset;
		}
		
		document.getElementById('color_input').value = $activeSizeDataset['color_code'];
		document.getElementById('size_input').value = $activeSizeDataset['size_code'];

		// 遷移先を変更してsubmit
		$form.attr('action', $form.attr('action').replace('/cart/add', uri));
		$form.submit();
		
		return false;
	});
	
	// お気に入りボタンクリック
	$('.favolite_btn').click(function() {
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
		$('.add_cart_btn').prop("disabled", true);
		$('.add_cart_btn').hide();
		$('.restock_request_btn').prop("disabled", false);
		$('.restock_request_btn').show();
	}
	
	// 再入荷リクエスト非表示
	function hideSoldOut(){
		$('.add_cart_btn').prop("disabled", false);
		$('.add_cart_btn').show();
		$('.restock_request_btn').prop("disabled", true);
		$('.restock_request_btn').hide();
	}
	
	// 拡大画像表示
	var cloudZoom = null;

	doCloudZoom();

	// CloudZoom
	function doCloudZoom() {
		var windowSize = (new WindowSize()).get();
		if (windowSize != "small") {
			if (cloudZoom == null) {
				cloudZoom = $('.cloud-zoom').CloudZoom({position:'inside'});
			}
		}
	}

	function destroyCloudZoom() {
		if (cloudZoom != null) {
			$('.cloud-zoom').each(function() {
				if ($(this).data('zoom') != null) {
					$(this).data('zoom').destroy();
				}
			});
			cloudZoom = null;
		}
	}

	$(window).bind('resize', function () {
		var windowSize = (new WindowSize()).get();
		if (windowSize != "small") {
			doCloudZoom();
		} else {
			destroyCloudZoom();
		}
	});

	var item_detail = new ItemDetail();
	item_detail.bind("add_cart_btn");

	$(".continueBtn").on('click',function(e){
		$(".add_cart_pop"+$color_code).hide("nomal");
		return false;
	});
});



$(function(){
	var rwdTab = $('#tabAccordion'),
	switchPoint = 749,
	fadeSpeed = 500,
	slideSpeed = 500;
 
	var btnElm = rwdTab.children('.tab_area').children('.detail_title'),
	contentsArea = rwdTab.children('.tab_area').children('.detail');
 
	btnElm.on('click', function(){
		if(!$(this).hasClass('btnAcv')){
			btnElm.removeClass('btnAcv');
			$(this).addClass('btnAcv');
 
			if(window.innerWidth > switchPoint){
				contentsArea.fadeOut(fadeSpeed);
				$(this).next().fadeIn(fadeSpeed);
			} else {
				contentsArea.slideUp(slideSpeed);
				$(this).next().slideDown(slideSpeed);
			}
		}
	});
 
	btnElm.first().click();
});







// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>
(function ($) {
	$.fn.extend({
		easyResponsiveTabs: function (options) {
			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				type: 'default', //default, vertical, accordion;
				width: 'auto',
				fit: true
			}
			//Variables
			var options = $.extend(defaults, options);			
			var opt = options, jtype = opt.type, jfit = opt.fit, jwidth = opt.width, vtabs = 'vertical', accord = 'accordion';

			//Main function
			this.each(function () {
				var $respTabs = $(this);
				$respTabs.find('ul.resp-tabs-list li').addClass('resp-tab-item');
				$respTabs.css({
					'display': 'block',
					'width': jwidth
				});

				$respTabs.find('.resp-tabs-container > div').addClass('resp-tab-content');
				jtab_options();
				//Properties Function
				function jtab_options() {
					if (jtype == vtabs) {
						$respTabs.addClass('resp-vtabs');
					}
					if (jfit == true) {
						$respTabs.css({ width: '100%', margin: '0px' });
					}
					if (jtype == accord) {
						$respTabs.addClass('resp-easy-accordion');
						$respTabs.find('.resp-tabs-list').css('display', 'none');
					}
				}

				//Assigning the h2 markup
				var $tabItemh2;
				$respTabs.find('.resp-tab-content').before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");

				var itemCount = 0;
				$respTabs.find('.resp-accordion').each(function () {
					$tabItemh2 = $(this);
					var innertext = $respTabs.find('.resp-tab-item:eq(' + itemCount + ')').text();
					$respTabs.find('.resp-accordion:eq(' + itemCount + ')').append(innertext);
					$tabItemh2.attr('aria-controls', 'tab_item-' + (itemCount));
					itemCount++;
				});

				//Assigning the 'aria-controls' to Tab items
				var count = 0,
					$tabContent;
				$respTabs.find('.resp-tab-item').each(function () {
					$tabItem = $(this);
					$tabItem.attr('aria-controls', 'tab_item-' + (count));
					$tabItem.attr('role', 'tab');

					//First active tab				   
					$respTabs.find('.resp-tab-item').first().addClass('resp-tab-active');
					$respTabs.find('.resp-accordion').first().addClass('resp-tab-active');
					$respTabs.find('.resp-tab-content').first().addClass('resp-tab-content-active').attr('style', 'display:block');

					//Assigning the 'aria-labelledby' attr to tab-content
					var tabcount = 0;
					$respTabs.find('.resp-tab-content').each(function () {
						$tabContent = $(this);
						$tabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
						tabcount++;
					});
					count++;
				});

				//Tab Click action function
				$respTabs.find("[role=tab]").each(function () {
					var $currentTab = $(this);
					$currentTab.click(function () {

						var $tabAria = $currentTab.attr('aria-controls');

						if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
							$respTabs.find('.resp-tab-content-active').slideUp('', function () { $(this).addClass('resp-accordion-closed'); });
							$currentTab.removeClass('resp-tab-active');
							return false;
						}
						if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
							$respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
							$respTabs.find('.resp-tab-content-active').slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
							$respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');

							$respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').slideDown().addClass('resp-tab-content-active');
						} else {
							$respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
							$respTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');
							$respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
							$respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:block');
						}
					});
					//Window resize function				   
					$(window).resize(function () {
						$respTabs.find('.resp-accordion-closed').removeAttr('style');
					});
				});
			});
		}
	});
})(jQuery);
	$(document).ready(function () {
		$('#horizontalTab').easyResponsiveTabs({
			type: 'default', //Types: default, vertical, accordion		   
			width: 'auto', //auto or any width like 600px
			fit: true   // 100% fit in a container
		});

	});

