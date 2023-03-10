var ToTop = {
	set : function(){
		var list = document.getElementsByTagName("H5");
		
		this.scroll(list);
		this.color(list);
	},
	
	scroll : function(list){
		var myToTop = new Array();
		var myToMokuji = new Array();
		var j = 0; k = 0;
		
		for(var i = 0; i < list.length; i++){
			if(list.item(i).className == "to_top"){
				myToTop[j] = list.item(i);
				j++;
			}else if(list.item(i).className == "to_mokuji"){
				myToMokuji[k] = list.item(i);
				k++;
			}
		}
		
		for(var i = 0; i < myToTop.length; i++){
			Dom.addListener(myToTop[i], "click", function(){ Scroll.leap("top"); });
		}
		
		for(var i = 0; i < myToMokuji.length; i++){
			Dom.addListener(myToMokuji[i], "click", function(){ Scroll.leap("mokuji"); });
		}
	},
	
	color : function(list){
		var myButton = new Array();
	
		for(var i = 0; i < list.length; i++){
			Dom.addListener(list.item(i), "mouseover", myFgColor(list.item(i)));
			Dom.addListener(list.item(i), "mouseout",  myFgColor2(list.item(i)));
		}
		
		function myFgColor(elm){
			return function(){
				elm.style.color = "#ff6600";
			};
		}
		function myFgColor2(elm){
			return function(){
				elm.style.color = "#aa0000";
			};
		}
	}
}
Dom.addListener(window, "load", function(){
	ToTop.set();
	Scroll.cancel();
});
