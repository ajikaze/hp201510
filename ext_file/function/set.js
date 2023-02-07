var Set = {
	setClip : function(id_name, _top, _right, _bottom, _left){
		var clip_str = "rect(" + _top + "," + _right + "," + _bottom + "," + _left + ")";

		if(document.getElementById){														//N6,Moz,IE5,IE6用
			document.getElementById(id_name).style.clip = clip_str;
		}else if(document.all){																//IE4用
			document.all(id_name).style.clip = clip_str;
		}else if(document.layers){															//NN4用
			with(document.layers[id_name].clip){
				top    = _top;
				right  = _right;
				bottom = _bottom;
				left   = _left;
			}
		}
	},
	
	setBgColor : function(id_name, color){
		if(color == ""){
			color = "transparent";
		}
		
		if(document.getElementById){														//N6,Moz,IE5,IE6用
			document.getElementById(id_name).style.backgroundColor = color;
		}else if(document.all){																//IE4用
			document.all(id_name).style.backgroundColor = color;
		}else if(document.layers){															//NN4用
			if(color=="transparent"){
				color = null;
			}
			
			document.layers[id_name].bgColor = color;
		}
	},
	
	setFgColor : function(id_name, color){													//NN4不可
		if(document.getElementById){														//N6,Moz,IE5,IE6用
			document.getElementById(id_name).style.color = color;
		}else if(document.all){																//IE4用
			document.all(id_name).style.color = color;
		}
	},
	
	setOpacity : function(id_name, arg){													//arg は 0 ～ 1、0は透明、1は不透明。
		var ua = navigator.userAgent;
		
		if(document.layers){																//n4とMac版e4,e5は0の時hidden
			if(arg > 0){
				document.layers[id_name].visibility = "visible";
			}else if(arg == 0){
				document.layers[id_name].visibility = "hidden";
			}
		}else if(ua.indexOf("Mac_PowerPC") != -1 && document.all){
			if(arg > 0){
				document.all(id_name).style.visibility = "visible";
			}else if(arg == 0){
				document.all(id_name).style.visibility = "hidden";
			}
		}else if(document.all){																//Win版e5,e6
			document.getElementById(id_name).style.filter = "alpha(opacity = 0)";
			document.getElementById(id_name).filters.alpha.opacity = (arg * 100);
		}else if(ua.indexOf("Gecko") != -1){												//n6,m1
			document.getElementById(id_name).style.MozOpacity = arg;
		}
	}
}
