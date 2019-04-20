$(function(){
	if ($('.orderTable .soldout').length > 0) {
		var $button = $('.mainContentsInner .buttonArea .next');
		$button.addClass('disable').addClass('nofade').bind('click', function(event) {
			event.preventDefault();
			return false;
		});
	}
	
	
	//数量セレクト
	var amountnum;
		
	$('div.open_select').on('click',function(e){
		
		e.stopPropagation();
		$(this).parent().children('ul.open_select').fadeToggle();
	});
	
	$('.quantity_list').on('click',function(e){
	
		e.stopPropagation();
		
		$(this).parent().fadeOut();
	
		amountnum = $(this).attr('data-amount_num');
		$(this).parent().parent().find('input[name^=pod]').val(amountnum);
		$(this).parent().parent().submit();
	});
});

// カウントアップ
// pForm : フォーム名(form name)
// pField : 更新フィールド名(input name)
// pValue : 値(input value)
function countUp(pForm, pField, pValue, pMaxOrderLot, pValueTotalByCommodityNumber, pMaxOrderLotByCommodityNumber){
	var $current_lang_val = '';
	var $max_order_lot = $cart_add_max_num;
	
	if (typeof $current_lang !== "undefined"){
		$current_lang_val = $current_lang;
	}
	
	if (typeof pMaxOrderLot !== "undefined" && pMaxOrderLot > 0 && pMaxOrderLot < $cart_add_max_num){
		$max_order_lot = pMaxOrderLot;
	}

	// 品番単位の購入上限チェック
	if (typeof pMaxOrderLotByCommodityNumber !== "undefined" && pMaxOrderLotByCommodityNumber > 0 && pValueTotalByCommodityNumber >= pMaxOrderLotByCommodityNumber){
		pValue = pValue - (pValueTotalByCommodityNumber - pMaxOrderLotByCommodityNumber);
		if ($current_lang_val != 'en') {
			alert("申し訳ございません\n\n同一商品のご購入は、お一人様" + pMaxOrderLotByCommodityNumber + "点までとさせていただいております。\nご不便をおかけしますがご了承下さい。");
		}else{
			alert("Sorry...\n\nThe purchase of the same item is limited to " + pMaxOrderLotByCommodityNumber + " per person.\nWe apologize for any inconvenience.");
		}
	}else{
		// sku単位の購入上限チェック
		if (pValue >= $max_order_lot) {
			pValue = $max_order_lot;
			if ($current_lang_val != 'en') {
				alert("申し訳ございません\n\n同一商品のご購入は、お一人様" + $max_order_lot + "点までとさせていただいております。\nご不便をおかけしますがご了承下さい。");
			} else {
				alert("Sorry...\n\nThe purchase of the same item is limited to " + $max_order_lot + " per person.\nWe apologize for any inconvenience.");
			}
		}else{
			pValue++;
		}
	}
	document.forms[pForm].elements[pField].value = pValue;
}

// カウントダウン
// pForm : フォーム名(form name)
// pField : 更新フィールド名(input name)
// pValue : 値(input value)
function countDown(pForm, pField, pValue, pDelForm){
	pValue--;
	// マイナス制御
	if (pValue > 0) {
		document.forms[pForm].elements[pField].value = pValue;
		document.forms[pForm].submit();
	}
	else
	{
		// 削除に変更。
		document.forms[pDelForm].submit();
	}
}

// カート商品削除
// pDelForm : フォーム名(form name)
function cartDelete(pDelForm){
	// 削除
	document.forms[pDelForm].submit();
}
