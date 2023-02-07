
function initialize() {
	var makkouru = new google.maps.LatLng(34.342313, 134.05061)
	var mapOptions = {
	  center: makkouru,
	  zoom: 17,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
		mapOptions);
	
	setMarkers(map, makkouru);		
}

function setMarkers(map, location){
	var contentString = '<p>アジアごはん　まっこうる<br>Adress:香川県高松市古馬場町１４－２糸瀬ビル１階<br>Phone:087-851-3864</p>';
	
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	var iconImg = new google.maps.MarkerImage
		('../../image/emblem4.png',
		new google.maps.Size(32, 64),
		new google.maps.Point(0,0),
		new google.maps.Point(20, 63));
		
	var marker = new google.maps.Marker({
		position: location,
		map: map,
		title: contentString,
		icon: iconImg
	});
	 google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);