const mMokuji = {
	before_elm : null,
	
	set : function(){
		var btn = new Array();
		var target = new Array();
		
		for(var i = 0; i < mokuji.contents.cells_length; i++){
			var cells = Get.getElement("menu" + i);
			if(cells){
				btn[i] = cells;
			}
		}
		for(var i = 0; i < mokuji.contents.cells_length; i++){
			var elm = Get.getElement("target" + i);
			if(elm){
				target[i] = elm;
			}
		}
		this.scroll(btn);
		this.color(btn);
		this.target_color(btn, target);
	},
	
	scroll : function(btn){
		for(var i = 0; i < mokuji.contents.cells_length; i++){
			if(btn[i]){
				Dom.addListener(btn[i], "click", myScroll(i));
			}
		}
		
		function myScroll(no){ return function(){ Scroll.leap("target" + no); }; }
	},
	
	color : function(btn){
		for(var i = 0; i < mokuji.contents.cells_length; i++){
			if(btn[i]){
				Dom.addListener(btn[i], "mouseover", myStyle(btn[i]));
				Dom.addListener(btn[i], "mouseout", myStyle2(btn[i]));
			}
		}
		
		function myStyle(elm) { return function(){ elm.className ="link2"; }; }
		function myStyle2(elm){ return function(){ elm.className ="link";  }; }	
	},
	
	target_color : function(btn, target){
		for(var i = 0; i < mokuji.contents.cells_length; i++){
			if(btn[i]){
				Dom.addListener(btn[i], "click", myFgColor(target[i]));
			}
		}
		
		function myFgColor(elm){
			return function(){
				if(mMokuji.before_elm){
					mMokuji.before_elm.style.color = "#990000";
				}
				elm.style.color = "#ff0000";
				mMokuji.before_elm = elm;
			}
		}
	}
}
const mHead = {
	set : function(){
		var heading = new Array();
		
		for(var i = 0; i < mokuji.states.length; i++){
			heading[i] = Get.getElement("head" + i);
		}
		this.clicked(heading);
	},
	
	clicked : function(elm){
		for(var i = 0; i < elm.length; i++){
			Dom.addListener(elm[i], "click", onClick(i));
		}
		
		function onClick(no){
			return function(){
				mokuji.contents.changeStates(no);
				mokuji.print();
				mMokuji.set();
				mHead.set();
			}
		}
	}
}
var mokuji = null;
/********** onload時に実行する関数登録 **********/
Dom.addListener(window, "load", function(){
	var contents = new Contents();
	mokuji = new MenuStyleMokuji(contents);
	
	mMokuji.set();
	mHead.set();
	/*ToTop.set();
	Scroll.cancel();*/
});

/*************************************************/
