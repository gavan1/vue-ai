$(function(){
	var $renderingTarget = $('#checkedItemsWrapper .jsAjaxRenderingTarget');
	$.ajax({
		url: base_url_ssl + '/component/checkeditems',
		cache: false,
		timeout: 10000,
	}).done(function(data, textStatus, jqXHR){
		$renderingTarget.html(data);
	}).fail(function(){
		$renderingTarget.addClass('failed');
	}).always(function(){
		$renderingTarget.addClass('done');
	});
});
