$(function(){
	$("#paging").pagination({
		items: 5, //ページングの数
		displayedPages: 2, //表示したいページング要素数
		prevText: '前', //前へのリンクテキスト
		nextText: '次', //次へのリンクテキスト
		cssStyle: 'light-theme', //テーマ"dark-theme"、"compact-theme"があります
		onPageClick: function(pageNumber){show(pageNumber);}
	})
});
function show(pageNumber){
	var page="#page-"+pageNumber;
	$('.selection').hide();
	$(page).show();
} 