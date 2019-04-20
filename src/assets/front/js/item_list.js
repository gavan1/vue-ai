$(function(){
	var $form = $('form#filter');
	if ($form.length > 0) {

		// 絞り込みリンク
		var $searchLinksNarrowDown = $('.narrowDown a');

		// 絞りのリンクをクリック
		$searchLinksNarrowDown.bind('click', function(event) {
			var $target = $(this),
				href	= $target.attr("href");

			if (href == "") {
				event.preventDefault();
				return false;
			}

			var elm = $('<a>', { href:href } )[0];
			if (elm.pathname == '/item' || elm.pathname == 'item') {
				var key   = '';
				var value = '';
				if (elm.search != '') {
					var params = elm.search.replace('?', '').split('&');
					var param = params[0].split('=');
					key = param[0];
					value = param[1];
				}
				
				if ($target.parent().hasClass('checked') || $target.children().hasClass('checked')) {
					// 選択済み
					$form.find('input[name=' + key + ']').val('');

					if (key.indexOf('from') >= 0) {
						$form.find('input[name=' + key.replace('from', 'to') + ']').val('');
					}
					formSubmit();
				} else {
					// 未選択
					if (elm.search == '') {
						$form.find('input[name=goods_status_id]').val('');
						$form.find('input[name=new]').val('');
						$form.find('input[name=special]').val('');
					} else {
						if (key == 'goods_status_id') {
							$form.find('input[name=new]').val('');
							$form.find('input[name=special]').val('');
						} else if (key == 'special') {
							$form.find('input[name=new]').val('');
							$form.find('input[name=goods_status_id]').val('');
						} else if (key == 'new') {
							$form.find('input[name=goods_status_id]').val('');
							$form.find('input[name=special]').val('');
						}
						$form.find('input[name=' + key + ']').val(value);
						// 価格対応
						if (params[1]){
							var param = params[1].split('=');
							var key2 = param[0];
							var value2 = param[1];
							$form.find('input[name=' + key2 + ']').val(value2);
						}
					}
					formSubmit();
				}
			}

			return false;
		});

		function formSubmit() {
			$form.find('input[value=""]').remove();

			$form.find('input[type=hidden]').each(function() {
				$(this).val(decodeURIComponent($(this).val()));
			});
			$form.submit();
		}

		// categoryメニュー
		$('#category_pc').bind('click', function() {
			var $target = $("#category_pc");
			toggleMenu($target);
		});
		$('#category_sp').bind('click', function() {
			var $target = $("#category_sp");
			toggleMenu($target);
		});

		// sceneメニュー
		$('#scene_pc').bind('click', function() {
			var $target = $("#scene_pc");
			toggleMenu($target);
		});
		$('#scene_sp').bind('click', function() {
			var $target = $("#scene_sp");
			toggleMenu($target);
		});

		// colorメニュー
		$('#color_pc').bind('click', function() {
			var $target = $("#color_pc");
			toggleMenu($target);
		});
		$('#color_sp').bind('click', function() {
			var $target = $("#color_sp");
			toggleMenu($target);
		});

		// priceメニュー
		$('#price_pc').bind('click', function() {
			var $target = $("#price_pc");
			toggleMenu($target);
		});
		$('#price_sp').bind('click', function() {
			var $target = $("#price_sp");
			toggleMenu($target);
		});

		function toggleMenu($target) {
			$contents = $target.next("ul");
			if ($contents.css('display') == 'none'){
				$contents.stop().slideDown("normal", function() {
				});
				$target.addClass('down');
			}else{
				$contents.stop().slideUp("normal", function() {
				});
				$target.removeClass('down');
			}
		}

		// 絞り込み選択中の場合、メニューを開いておく
		if ($form.find('input[name=scene_id]').val()){
			$('#scene_pc').click();
			$('#scene_sp').click();
		}
		if ($form.find('input[name=color_search_group_id]').val()){
			$('#color_pc').click();
			$('#color_sp').click();
		}
		if ($form.find('input[name=price_from]').val() || $form.find('input[name=price_to]').val()){
			$('#price_pc').click();
			$('#price_sp').click();
		}
	}
	
	//カラーチップホバーアクション
	var $chip = $(".goodsList .chip"),
		changeurl,changeimg,$thischip;
	
	$chip.hover(function(){
		
		$thischip = $(this),
		changeurl = $thischip.data("url"),
		changeimg = $thischip.data("image");
		
		if (changeimg.length){
			$thischip.parent().parent().parent().children('.images').children('.itemImage').children('a').children('img').attr('src',changeimg);
			$thischip.parent().parent().parent().children('.images').children('.itemImage').children('a').attr('href',changeurl);
			$thischip.parent().parent().parent().children('.goodsNameWrapper').children('a').attr('href',changeurl);
		}
	});

	//カラーチップホバーアクション(recommend)
	var $reco_chip = $(".recommend-list .color-list > li"),
		changeurl,changeimg,$thischip;

	$reco_chip.hover(function(){

		$thischip = $(this),
			changeurl = $thischip.data("url"),
			changeimg = $thischip.data("image");

		if (changeimg.length){
			$thischip.parent().parent().children('.img').children('.item_checked__img').attr('src',changeimg);
			$thischip.parent().parent().children('.item-name').children('a').attr('href',changeurl);
		}
	});
	
	//サムネイルホバーアクション
	var $image = $(".image"),
		changeimg,beforeimg,thisimg;
	
	$image.hover(function(){
		
		$thisimg = $(this),
		changeimg = $thisimg.data("image");
		beforeimg = $thisimg.children('img').attr("src");
		if (changeimg.length){
			$thisimg.children('img').attr('src',changeimg);
			$thisimg.data('image',beforeimg);
		}
	});
	
	//フィルターカラーチップホバーアクション
	$(".color_select li a").hover(
		function () {
			$('.color_name').text('：'+$(this).text());
		},
		function () {
			$('.color_name').text('');
		}
	);

	var $checked_color_select = $(".color_select:first li.checked a");
	if ($checked_color_select.length > 0) {
		$('.color_name').text('：'+$checked_color_select.text());
	}
	
	// small
	var selector = '.open-submenu';
	var closeselector = '.close-reveal';
	var submenuselector = '.header-submenu';
	$(selector).bind('click', function() {
		var windowSize = (new WindowSize()).get();
		if (windowSize == "small") {
			var $target = $(this);
				id	  = $target.data('open_id');
			if (typeof id != 'undefined') {
				$('#' + id).foundation('reveal', 'open', {
					'animation' : 'fade'
				});
				return false;
			}
		}
	});

	$(closeselector).bind('click', function() {
		var $target = $(this);
			id	  = $target.parents('.reveal-modal').attr('id');

		$('#' + id).foundation('reveal', 'close');
	});

	$(window).bind('resize', function () {
		var windowSize = (new WindowSize()).get();
		if (windowSize != "small") {
			$(closeselector).trigger('click');
		}
	});
	
	//スライダー関連
	$('.imageArea').flexslider({
		controlNav:true,
		slideshow:false,
		animation:"slide",
		directionNav:true,
		prevText:'',
		nextText:'',
	});
	// スライダー画像表示
	$('.slider_main').show();
});

$(function(){
	// 表示順をオープン
	(function(){
		var $target = $(".orderArea .searchItem");

		$(window).bind('resize', attachSearchItemEvent);

		attachSearchItemEvent();

		function attachSearchItemEvent() {
			var windowSize = (new WindowSize()).get();
			if (windowSize != "small") {
				$target.unbind('mouseover', openSearchItem);
				$target.unbind('mouseout', closeSearchItem);

				$target.bind('mouseover', openSearchItem);
				$target.bind('mouseout', closeSearchItem);

				$target.find("a").unbind('click', clickSearchItem);
			} else {
				$target.unbind('mouseover', openSearchItem);
				$target.unbind('mouseout', closeSearchItem);

				$target.find("a").unbind('click', clickSearchItem);
				$target.find("a").bind('click', clickSearchItem);
			}
		}


		function clickSearchItem(event) {
			var $target   = $(event.currentTarget),
				$contents = $target.next("ul");

			if ($contents.css("display") == "none") {
				$(".searchItem ul").hide();
				openSearchItem(event);
			} else {
				closeSearchItem(event);
			}
		}

		function openSearchItem(event) {
			var $eventTarget = $(event.currentTarget);
			var $target = null;
			if ($eventTarget.hasClass("searchItem")) {
				$target = $eventTarget.find('a.open_select');
			} else {
				$target = $eventTarget;
			}

			$contents = $target.next("ul");
			$contents.stop().slideDown("fast", function() {
			});
		}

		function closeSearchItem(event) {
			var $eventTarget = $(event.currentTarget);
			var $target = null;
			if ($eventTarget.hasClass("searchItem")) {
				$target = $eventTarget.find('a.open_select');
			} else {
				$target = $eventTarget;
			}

			$contents = $target.next("ul");
			$contents.stop().slideUp("fast", function() {
			});
		}
	})();
});

$(function(){
	// 検索条件をオープン
	(function(){
		var $target = $(".searchArea .searchItem");

		$(window).bind('resize', attachSearchItemEvent);

		attachSearchItemEvent();

		function attachSearchItemEvent() {
			var windowSize = (new WindowSize()).get();
			if (windowSize != "small") {
				$target.unbind('mouseover', openSearchItem);
				$target.unbind('mouseout', closeSearchItem);

				$target.bind('mouseover', openSearchItem);
				$target.bind('mouseout', closeSearchItem);

				$target.find("a").unbind('click', clickSearchItem);
			} else {
				$target.unbind('mouseover', openSearchItem);
				$target.unbind('mouseout', closeSearchItem);

				$target.find("a").unbind('click', clickSearchItem);
				$target.find("a").bind('click', clickSearchItem);
			}
		}


		function clickSearchItem(event) {
			var $target   = $(event.currentTarget),
				$contents = $target.next("ul");

			if ($contents.css("display") == "none") {
				$(".searchItem ul").hide();
				openSearchItem(event);
			} else {
				closeSearchItem(event);
			}
		}

		function openSearchItem(event) {
			var $eventTarget = $(event.currentTarget);
			var $target = null;
			if ($eventTarget.hasClass("searchItem")) {
				$target = $eventTarget.find('a.open_select');
			} else {
				$target = $eventTarget;
			}

			$contents = $target.next("ul");
			$contents.stop().slideDown("fast", function() {
			});
		}

		function closeSearchItem(event) {
			var $eventTarget = $(event.currentTarget);
			var $target = null;
			if ($eventTarget.hasClass("searchItem")) {
				$target = $eventTarget.find('a.open_select');
			} else {
				$target = $eventTarget;
			}

			$contents = $target.next("ul");
			$contents.stop().slideUp("fast", function() {
			});
		}
	})();
});


// TAG CATEGORY ACMENU
$(function(){
	$(".tag-ttl").on("click", function() {
		$(this).next().slideToggle();
		$(this).toggleClass("down");
	});
	$(".category-ttl").on("click", function() {
		$(this).next().slideToggle();
		$(this).toggleClass("down");
	});
	$(".acmenu").on("click", function() {
		$(this).siblings(".submenu").slideToggle();
		$(this).toggleClass("active");
	});
	$(".search-acmenu dt").on("click", function() {
		$(this).next().fadeToggle();
		$(this).toggleClass("active");
	});

	// 左メニューSEARCH配下汎用
	$(document).on('click', '.jsSearchSubMenu', function(){
		var $this = $(this);
		var $contents = $this.next("ul");
		if ($contents.css('display') == 'none'){
			$contents.stop().slideDown("normal", function() {
			});
			$this.addClass('down');
		}else{
			$contents.stop().slideUp("normal", function() {
			});
			$this.removeClass('down');
		}
	});

	// フィルタリングメニュー
	(function() {

		// formキャッシュ
		var $form = $('#filteringForm');

		// フィルタリングメニューclick
		$(document).on('click', '.jsFiltering', function(e){

			e.preventDefault();

			// cache
			var $this = $(this);
			var targetName = $this.data('filteringTargetName');
			var targetValue = $this.data('filteringTargetValue');
			var otherTargetNames = $this.data('otherTargetNames') || [];
			var otherTargetValues = $this.data('otherTargetValues') || [];
			var isClearAll = $this.data('filteringClearAll') || false;
			var isSubmit = $this.data('isSubmit') || false;
			var isChecked = $this.data('isChecked') || false;

			if (targetName == "col_cnt" && isChecked) {
				return false;
			}

			// formデフォルト値クリア
			if (isClearAll) {
				$form.find('input:not(.jsFixedValue)').val('');
			}

			// 該当の値を変更
			$form.find('[name="' + targetName + '"]').val(isChecked ? '' : targetValue);

			// 同ターゲットの項目をクリア
			if (!isChecked) {
				$('[data-filtering-target-name="' + targetName + '"]').data('isChecked', false)
					.parent('li').removeClass('checked');
			}

			var length = otherTargetNames.length;
			for (var i = 0; i < length; ++i) {
				// 該当の値を変更
				$form.find('[name="' + otherTargetNames[i] + '"]').val(isChecked ? '' : otherTargetValues[i]);
			}

			// よきにはからう
			$this.data('isChecked', !isChecked);
			$this.parent('li').toggleClass('checked');

			// submit
			if (isSubmit) {
				$form.submit();
			}
		});

		// 金額範囲だけベタ
		$(document).on('click', '.jsFilteringPrice', function(e){

			e.preventDefault();

			var $this = $(this);
			var isChecked = $this.data('isChecked') || false;

			// 該当の値を変更
			$form.find('[name="price_from"]').val(isChecked ? '' : $this.data('price_from'));
			$form.find('[name="price_to"]').val(isChecked ? '' : $this.data('price_to'));

			// 同ターゲットの項目をクリア
			if (!isChecked) {
				$('.jsFilteringPrice').data('isChecked', false)
					.parent('li').removeClass('checked');
			}

			// よきにはからう
			$this.data('isChecked', !isChecked);
			$this.parent('li').toggleClass('checked');
		});

		// フィルタリングクリア
		$(document).on('click', '.jsResetFiltering', function(){

			$('.jsFiltering[data-is-submit="false"], .jsFilteringPrice').each(function(){
				var _$this = $(this);
				if (_$this.data('isChecked')) {
					_$this.trigger('click');
				}
			});
		});

		// フィルタリングsubmit
		$(document).on('click', '.jsSubmitFiltering', function(){

			var $originalForm = $($(this).data('targetForm'));
			$originalForm.submit();
		});

		// ダミーformの変更はメインformへ転送
		$(document).on('change', '.dummyForm', function(e){

			e.preventDefault();

			var $this = $(this);
			var $originalForm = $($this.data('targetForm'));
			var $target = $(e.target);
			var targetValue;
			if ($target.attr('type') === 'checkbox') {
				targetValue = $target.prop('checked') === true ? $target.val() : null;
			} else {
				targetValue = $target.val();
			}

			$originalForm.find('[name="' + $target.attr('name') + '"]').val(targetValue).trigger('change');

			if ($target.data('isSubmitOnChange')) {
				$this.submit();
			}
		});

		// ダミーformのsubmitはメインformへ転送
		$(document).on('submit', '.dummyForm', function(e){

			e.preventDefault();

			var $this = $(this);
			var $originalForm = $($this.data('targetForm'));
			$this.find('[name]').each(function(){
				var _$this = $(this);
				var value;
				if (_$this.attr('type') === 'checkbox') {
					value = _$this.prop('checked') === true ? _$this.val() : null;
				} else {
					value = _$this.val();
				}
				$originalForm.find('[name="' + _$this.attr('name') + '"]').val(value);
			});

			$originalForm.submit();
		});

		// メインformのsubmit時に不要な値を除去
		$form.on('submit', function(){
			$(this).find('input').each(function(){
				var $this = $(this);
				if ($this.val() == '') {
					$this.remove();
				}
			});
		});

	}());

});

var timer = false;
$(window).on('load resize', function(){
	if (timer !== false) {
		clearTimeout(timer);
	}
	timer = setTimeout(function() {
		if (window.matchMedia('screen and (max-width:750px)').matches) {
			// SP
			$('.pc.item-condition .item_list_select1').prop('disabled', true);
			$('.search-area .item_list_select2').prop('disabled', true);
			
			$('.sp.item-condition .item_list_select1').prop('disabled', false);
			$('.sp.item-condition .item_list_select2').prop('disabled', false);
		}else{
			// PC
			$('.pc.item-condition .item_list_select1').prop('disabled', false);
			$('.search-area .item_list_select2').prop('disabled', false);
			
			$('.sp.item-condition .item_list_select1').prop('disabled', true);
			$('.sp.item-condition .item_list_select2').prop('disabled', true);
		}
	}, 200);
});
