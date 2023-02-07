/************************/
/*     地図の初期化     */
/************************/
var map = null;
var geocoder = null;
var makkouru = null;
var polyline = null;
var button = [];

function load(){
	if(GBrowserIsCompatible()){
		makkouru = new GLatLng(34.342313, 134.05061);
		map = new GMap2(document.getElementById("map"));
		map.setCenter(makkouru, 17);
		map.savePosition();														// マッコウルの緯度、経度を記憶
		geocoder = new GClientGeocoder();
		initButtonColor();
		addMakkouruMarker();		
		addMarkerFromData();
		printLatLng();
		printZoomLevel();
		watchZoomLevel();
	} 
}

/************************/
/*     マッコウルの     */
/*      Marker配置      */
/************************/
function addMakkouruMarker(){
	var myMarker = new GMarker(makkouru);
	
	GEvent.addListener(myMarker, "click", function() {
		 myMarker.openInfoWindowHtml("<center><img src='image/makkouru_logo.png' vspace=5 hspace=5 />"
		 								+ "<br />味の街マッコウル</center>");
	});
	map.addOverlay(myMarker);
}

/************************/
/*  周辺駐車場の位置に  */
/*     Markerを配置     */
/************************/
function addMarkerFromData(){
	for(var i = 0; i < loaddata.data.length; i++){ 
		var myMarker = makeMarker(loaddata.data[i].lat, loaddata.data[i].lng, loaddata.data[i].name);
		map.addOverlay(myMarker);
	} 
}

function makeMarker(lat, lng, name){
	var myPoint = new GLatLng(lat,lng);
	var myMarker = new GMarker(myPoint); 

	GEvent.addListener(myMarker, "click", function(){		// クリックしたマーカーに該当する情報を表示 
		myMarker.openInfoWindowHtml(						// マーカーにデータを保持させる方法
			"<b>" + name + "</b><br>" +
			"lat:" + lat + "<br>" +
			"lng:" + lng
		);
	}); 
	
    return myMarker;
}

/************************/
/*   経度、緯度の表示   */
/************************/
function printLatLng(){
	GEvent.addListener(map, 'mousemove', function(point){
		if (point) {
			document.getElementById("latitude").innerHTML = point.y;
			document.getElementById("longitude").innerHTML = point.x;
		}
	});
}

/************************/
/*    ズームレヴェル    */
/*         表示         */
/************************/
function printZoomLevel(){
	document.getElementById("zoom_level").innerHTML = map.getZoom();
}

/************************/
/*   ズームイン、アウト */
/************************/
function zoom(zoom_in_out){
	if(zoom_in_out){
		map.zoomOut();
	}else{
		map.zoomIn();
	}
}

/************************/
/*マッコウルを中央へ戻す*/
/************************/
function returnToMakkouru(){
	if(polyline){
		map.removeOverlay(polyline);
	}
	setMyMapType(0);
	map.returnToSavedPosition();
}

/************************/
/*  地図スタイルの変更  */
/*   ボタンの色の変更   */
/************************/
function setMyMapType(arg){
	switch(arg){
		case 0 : map.setMapType(G_NORMAL_MAP); break;
		case 1 : map.setMapType(G_SATELLITE_MAP); break;
		case 2 : map.setMapType(G_HYBRID_MAP); break;
		case 3 : if(map.getZoom() > 15){
					alert("このズームレベルでの地形図は利用できません。");
					return;
				}else{
					map.setMapType(G_PHYSICAL_MAP); 
					break;
				}				
		default : break;
	}
	
	changeButtonColor(arg);
}

function initButtonColor(){
	var myId = document.getElementById("operate2");
	var myList = myId.getElementsByTagName("TD");
	
	for(i = 0 ; i < Math.ceil(myList.length / 2); i++){
		button[i] = myList.item(i * 2 + 1);
	}
	
	button[0].style.color = "#ffff00";
	if(map.getZoom() > 15){
		button[3].style.color = "#330000";
	}
}

function changeButtonColor(arg){
	for(i = 0; i < button.length; i++){
		if(i == 3 && map.getZoom() > 15){
				button[i].style.color = "#330000";
		}else{
			if(i == arg){
				button[i].style.color = "#ffcc00";
			}else{
				button[i].style.color = "#cc0000";
			}
		}
	}
}

/************************/
/*     入力に応じて     */
/*  Map View範囲を変更  */
/*    マッコウルとの    */
/*     距離を求める     */
/************************/
function showAddress(){
	var myAddress = document.getElementById("add").value;
	
	if(myAddress == "香川県高松市古馬場町１４－２"){
		alert("あなたの居所の住所を入力して下さい。");
		return;
	}
	
	if(geocoder){
		geocoder.getLatLng(
			myAddress,
			function(point){
				if(!point){
					alert(myAddress + "not found");
				}else{
					zoomMyBounds(point);
					addMyMarker(myAddress, point);
					drawMyPoliLine(point);
				}
			}
		);
	}
}

function zoomMyBounds(point){
	var myBounds, myCenter, myZoomLevel;
	
	myBounds = getMyBounds(point);
	myCenter = myBounds.getCenter();
	myZoomLevel = map.getBoundsZoomLevel(myBounds);
	
	map.setZoom(myZoomLevel);
	map.setCenter(myCenter, myZoomLevel);
}

/* ----- マッコウルと求める地点を含む地理範囲を求める ----- */
function getMyBounds(point){
	var myBounds;
	var myLngWest, myLngEast;
	var mySouthWest, myNorthEast;
	
	if(makkouru.lat() > point.lat()){
		myLatSouth = point.lat();
		myLatNorth = makkouru.lat();
	}else{
		myLatSouth = makkouru.lat();
		myLatNorth = point.lat();
	}
	
	if(makkouru.lng() > point.lng()){
		myLngWest = point.lng();
		myLngEast = makkouru.lng();
	}else{
		myLngWest = makkouru.lng();
		myLngEast = point.lng();
	}
	
	mySouthWest = new GLatLng(myLatSouth, myLngWest);
	myNorthEast = new GLatLng(myLatNorth, myLngEast);
	
	myBounds = new GLatLngBounds(mySouthWest, myNorthEast);
	
	return myBounds;
}

/* ----- 求める地点にマーカーを追加 ----- */
function addMyMarker(address, point){
	var myDistance = point.distanceFrom(makkouru);
	var myDistance_K = Math.round(myDistance / 100) / 10;
	var myMarker = new GMarker(point);
	
	GEvent.addListener(myMarker, "click", function(){
		myMarker.openInfoWindowHtml(
			"あなたの現在位置：" + address + 
			"<br />lat：" + point.lat() + "lng：" + point.lng() + 
			"<br />マッコウルとの距離：" + myDistance + "メートル"
		);
	});
	map.addOverlay(myMarker);
	
	document.getElementById("result").innerHTML = "約 " + myDistance_K + " km / (" + myDistance + " m)";
}

/* ----- マッコウルと求める地点の間に線を引く ----- */
function drawMyPoliLine(point){
	var myPoints = [];
	myPoints[0] = makkouru;
	myPoints[1] = point;
	
	if(polyline){
		map.removeOverlay(polyline);
	}
	
	polyline = new GPolyline(myPoints, "#ff0000", 10);
	map.addOverlay(polyline);
}

/* ----- ズームレヴェルの管理 ----- */
function watchZoomLevel(){
	GEvent.addListener(map, "move", function(){
		printZoomLevel();
		
		if(map.getZoom() > 15){
			button[3].style.color = "#330000";
		}else{
			button[3].style.color = "#cc0000";
		}
	});
}