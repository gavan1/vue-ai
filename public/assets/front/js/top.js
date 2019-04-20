$(document).ready(function() {
	if ($(".flexslider .slides li").length > 1) {
		$('.flexslider').flexslider({
			controlNav:true,
			slideshow:false,
			animation:"slide",
			directionNav:true,
			prevText:'',
			nextText:'',
		});
	} else {
		$(".flexslider .slides li").show();
	}

	$('.owl-carousel').owlCarousel({
		stagePadding: 180,
		loop:true,
		margin:17,
		nav:true,
		items:6,
		responsive:{
			0:{
				items:5,
				loop:false,
				stagePadding: 15,
				margin:5,
			},
			750:{
				items:4,
				stagePadding: 30,
			},
			990:{
				items:5,
				stagePadding: 60,
			},
			1200:{
				items:6,
				stagePadding: 80,
			},
			1400:{
				stagePadding: 100,
			},
		}
	})
});
