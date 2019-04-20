$(document).ready(function() {
	// STOCKISTのセル高さ調節
	$(window).on('load',function(){
		detailHeight();
	});
	$(window).on('resize',function(){
		detailHeight();
	});
	
	function detailHeight(){
		var windowSize = (new WindowSize()).get();
		if (windowSize != "small") {
			$('.stockistContents ul').each(function() {
				height = 0;
				for (i = 0; i <= $(this).children().length; i++) {
					if (i % 2){
						if (height < $(this).children().eq(i).height()){
							j = i -1;
							$(this).children().eq(j).height($(this).children().eq(i).height());
						}
					}else{
						$(this).children().eq(i).css('height', '');
						height = $(this).children().eq(i).height();
					}
				}
				
			});
		}else{
			$('.stockistContents ul li').css('height', '');
		}
	}
});