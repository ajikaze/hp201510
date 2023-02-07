var Dom = {
	addListener : function(element, event_type, callback){
		if(!element){
			return false;
		}
		
		if(element.addEventListener){									/* W3C準拠ブラウザ用 */
			element.addEventListener(event_type, callback, false);
		}else if(element.attachEvent){									/* Internet Explorer用 */
			element.attachEvent('on' + event_type, callback);
		}else{
			return false;
		}
		
		return true;
	},
	
	getScreenWidth : function(){
    	if(!!window.screen){
			return screen.width;
		}else{
			return null;
		}
	},
	
	getScreenAvailWidth : function(){
    	if(!!window.screen){
			return screen.availWidth;
		}else{
			return null;
		}
	},
	
	getScreenHeight : function(){
    	if(!!window.screen){
			return screen.height;
		}else{
			return null;
		}
	},
		
	getScreenAvailHeight : function(){
    	if(!!window.screen){
			return screen.availHeight;
		}else{
			return null;
		}
	}
}