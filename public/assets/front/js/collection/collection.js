$(function(){
	//---------------------------------
	// 動画を画面いっぱいにする
	//---------------------------------
	var win_width = $(window).width();
	var win_height = $(window).height();
	if (win_width > win_height){
		// 横を100％
		$('.heroimg_video').css('width', '100%');
		$('.heroimg_video').css('height', 'auto');
		$('.heroimg_video>video').css('width', '100%');
		$('.heroimg_video>video').css('height', 'auto');
	}
	else{
		// 高さを100％
		$('.heroimg_video').css('width', 'auto');
		$('.heroimg_video').css('height', '100%');
		$('.heroimg_video>video').css('width', 'auto');
		$('.heroimg_video>video').css('height', '100%');
	}
});
