var Get = {
	getElement : function(id_name){
		if(document.getElementById){
			return document.getElementById(id_name);
		}else if(document.all){
			return document.all(id_name);
		}else if(document.layers){
			return document.layers[id_name];
		}
	},
	
	getStyle : function(id_name){
		if(document.getElementById){
			return document.getElementById(id_name).style;
		}else if(document.all){
			return document.all(id_name).style;
		}else if(document.layers){
			return document.layers[id_name];
		}
	},
	
	getElementPosition : function(id_name){
		var elm   = Get.getElement(id_name);
		var element_position = new Object();
		
		element_position.x = elm.offsetLeft;
		element_position.y = elm.offsetTop;
		
		while(elm.offsetParent){
			elm = elm.offsetParent;
			element_position.x += elm.offsetLeft;
			element_position.y += elm.offsetTop;
		}
		
		return element_position;
	},
	
	getScrollPosition : function() {
		var scroll_position = new Object();
		
		scroll_position.x = document.documentElement.scrollLeft || document.body.scrollLeft;
		scroll_position.y = document.documentElement.scrollTop  || document.body.scrollTop;
		
		return scroll_position;
	},
	
	getScreenSize : function(){
		var screen_size = new Object();
		var browzer     = Get.getBrowzer();
		
		if (!browzer.isSafari && !browzer.isOpera){
			screen_size.x = document.documentElement.clientWidth  || document.body.clientWidth  || document.body.scrollWidth;
			screen_size.y = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
		}else{
			screen_size.x = window.innerWidth;
			screen_size.y = window.innerHeight;
		}
		
		return screen_size;
	},
	
	getDocumentSize : function(){
		var document_size = new Object();
		
		document_size.width  = document.documentElement.scrollWidth  || document.body.scrollWidth;
		document_size.height = document.documentElement.scrollHeight || document.body.scrollHeight;
		
		return document_size;
	},
	
	getMaxScroll: function(){
		var max_scroll    = new Object;
		var document_size = Get.getDocumentSize();
		var screen_size   = Get.getScreenSize();
		
		max_scroll.x = document_size.width - screen_size.x;
		max_scroll.y = document_size.height - screen_size.y;
		
		return max_scroll;
	},
	
	getBrowzer : function(){
		var browzer = new Object();
		
		browzer.isWin9X  = navigator.appVersion.toLowerCase().indexOf('windows 98') + 1;
		browzer.isIE     = navigator.appName.toLowerCase().indexOf('internet explorer') + 1 ? 1 : 0;
		browzer.isOpera  = navigator.userAgent.toLowerCase().indexOf('opera') + 1 ? 1 : 0;
		browzer.isSafari = navigator.appVersion.toLowerCase().indexOf('safari') + 1 ? 1 :0;
		if(browzer.isOpera) browzer.isIE = false;
		
		return browzer;
	}

}