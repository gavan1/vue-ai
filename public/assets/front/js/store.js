$(function(){

	generatMap(35.663124, 139.702767, 0);

});

function generatMap($lat, $lng, $flg) {
	$("#shopMap").delay(1000).fadeTo(300,1);

	var map = new GMaps({
		div: "#map",
		lat: $lat,
		lng: $lng,
		zoom: 17,
		scrollwheel: false,
		streetViewControl: false,
		panControlOptions: { position: google.maps.ControlPosition.TOP_RIGHT },
		panControl: false,
		zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT, style: google.maps.ZoomControlStyle.SMALL },
		mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_CENTER },
		mapTypeControl: false,
		styles: [{
			stylers: [
				{ "saturation": -100 },
			]
		}],
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});
	
	map.addMarker({
	    lat: $lat,
	    lng: $lng,
	});
	
	


}

function fncShopInfo($shopname, $shopurl, $shopaddress, $shoptel){
	document.getElementById("shopInfo_name").textContent = $shopname;
	document.getElementById("shopInfo_url").textContent = $shopurl;
	document.getElementById("shopInfo_address").textContent = $shopaddress;
	document.getElementById("shopInfo_tel").textContent = $shoptel;
}

function Display(shopkbn){
	if(shopkbn == "japan"){
		document.getElementById("shopTitle-japan").style.display = "block";
		document.getElementById("shopTitle-international").style.display = "none";
		
		document.getElementById("japan").style.display = "block";
		document.getElementById("international").style.display = "none";
		
		document.getElementById("shop_item_list_japan").style.display = "block";
		document.getElementById("shop_item_list_international").style.display = "none";
		
		document.getElementById("scrollbar_none_japan").style.display = "block";
		document.getElementById("scrollbar_none_international").style.display = "none";
	}else if(shopkbn == "international"){
		document.getElementById("shopTitle-japan").style.display = "none";
		document.getElementById("shopTitle-international").style.display = "block";
		
		document.getElementById("japan").style.display = "none";
		document.getElementById("international").style.display = "block";
		
		document.getElementById("shop_item_list_japan").style.display = "none";
		document.getElementById("shop_item_list_international").style.display = "block";
		
		document.getElementById("scrollbar_none_japan").style.display = "none";
		document.getElementById("scrollbar_none_international").style.display = "block";
	}
}

$(function($) {
	WindowHeight = $(window).height();
	$('#shopArea').css('height', WindowHeight);
	$(document).ready(function() {
		if (window.matchMedia('screen and (max-width:750px)').matches) {
			$('.name, .address, .tel, .sp_shop_arrow').click(function(){
				$('#shopArea').animate({width:'toggle'});
				$('#map').css('cssText', 'display: block !important;');
				$('#shopInfo').css('display', 'block');
				$('#sp_shop_back_arrow').css('display', 'block');
			});
			$('#sp_shop_back_arrow').click(function(){
				$('#shopArea').animate({width:'toggle'});
				$('#map').css('display', 'none');
				$('#shopInfo').css('display', 'none');
				$('#sp_shop_back_arrow').css('display', 'none');
			});
		}
	});
});

