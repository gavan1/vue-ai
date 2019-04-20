$(function(){
	// HoverInの処理
	var handleHoverIn = function() {
		if (!$('.user li.pop').hasClass('pop-hover-pop')) {
			$('.user li.pop').addClass("pop-hover-pop");
		}
		if (!$('.loginpop-outer-hover').hasClass('loginpop-hover-pop')) {
			$('.loginpop-outer-hover').addClass("loginpop-hover-pop");
		}
		if(!$('.loginpop-hover').hasClass('loginpop-hover-pop')){
			$('.loginpop-hover').addClass("loginpop-hover-pop");
		}
		if(!$('.loginpop-pop').hasClass('loginpop-pop')){
			$('.loginpop').addClass("loginpop-pop");
		}
	}

	// HoverOutの処理
	var handleHoverOut = function() {

		if ($('.user li.pop').hasClass('pop-hover-pop')) {
			$('.user li.pop').removeClass("pop-hover-pop");
		}
		if ($('.loginpop-hover').hasClass('loginpop-hover-pop')) {
			$('.loginpop-hover').removeClass("loginpop-hover-pop");
		}
		if ($('.loginpop-pop').hasClass('loginpop-pop')) {
			$('.loginpop').removeClass("loginpop-pop");
		}
		if ($(this).hasClass('loginpop-hover-pop')) {
			$(this).removeClass("loginpop-hover-pop");
		}
	}

	// Hoverイベント設定
	$('.pop,.loginpop-hover,.loginpop').hover(handleHoverIn);
	$('.loginpop-outer-hover').hover(handleHoverOut);
});