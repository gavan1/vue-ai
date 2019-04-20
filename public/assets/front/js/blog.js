(function() {
	var maxPage  = "{$pagination->total_pages|default:1}";
	var currPage = 1;
	
	$(window).load(function(){

		var item = '.item',
			$item = $(item);

		var isIPad = false;
		var userAgent = window.navigator.userAgent.toLowerCase();
		var appVersion = window.navigator.appVersion.toLowerCase();
		if (userAgent.indexOf('ipad') != -1) {
			isIPad = true;
		} else if (userAgent.indexOf('msie') != -1) {
			if (appVersion.indexOf('msie 6.') != -1) {
				isIPad = true;
			} else if (appVersion.indexOf('msie 7.') != -1) {
				isIPad = true;
			} else if (appVersion.indexOf('msie 8.') != -1) {
				isIPad = true;
			}
		}

		var $container = $('.container');

		var $grid = null;
		if (!isIPad) {
			$grid = $container.masonry({
				itemSelector: item,
			});
		}

		$container.infinitescroll(
			{
				navSelector  : ".footerControlWrapper",
				nextSelector : ".footerControlWrapper a",
				itemSelector : item ,
				maxPage : maxPage,
			loading: {
				img: "/assets/front/img/loading.gif",
				finishedMsg: "",
				msgText: "",
			},
			},
			function(newElements) {
				$newElem = $( newElements );
				$newElem.css({opacity: 0});
	
				$newElem.imagesLoaded(function(){
					if (!isIPad) {
						$grid.append( $newElem).masonry( 'appended', $newElem, true );
					} else {
						if ($grid == null) {
							$container.append($newElem);
							
							$grid = $container.masonry({
								itemSelector: item,
							});
						} else {
							$grid.append( $newElem).masonry( 'appended', $newElem, true );
						}
					}
					$newElem.animate({ opacity: 1 });
				});

				currPage++;

				if (currPage == maxPage) {
					// 次が無いのにローディングが出るのを抑制
					$container.infinitescroll('update', {state : {isDone : true}});
				}
			}
		);
	})
})();