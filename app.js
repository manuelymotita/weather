$(document).ready(function(){

	//setup variables for forecast.io request
	var apiKey = '7fcd24394c2f24957329647a69e4c63f' ;
	var apiURL = 'https://api.forecast.io/forecast/' + apiKey;
	var defaultLat = '40.8494';
	var defaultLng = '-73.9218'
	
	/*
		1. Request the user's location via their browser
	*/
	
	// request the user's latitude/longitude
	if ( Modernizr.geolocation ) {
			navigator.geolocation.getCurrentPosition(success, error);
	}
	else {
		prompt("unable to access locatoin");
	}
	
	// Received a Latitude/Longitude from the browser
	function success(position) {
			console.log(position);
			getWeatherWithPos(position.coords.latitude,position.coords.longitude);
	}
	
	//unable to find a lat/long
	function error(error) {
			console.log(error);
			getWeatherWithoutPos (position.coords.latitude,position.coords.longitude);
	}
	
	/*
		2. Request weather data for a location
	*/
	
	//Request weather from forecast.io with a lat/long
	function getWeatherWithPos(Lat,Lng) {
			// construct the url to request
			apiURL += "/" + Lat + "," + Lng;
			console.log(apiURl);
			
			//make a request to forecast.io
			
		$.ajax({
				url: apiURL,
				type: "GET",
				crossDomain: true,
	dataType: 'jsonp',
				success: function (response) {
						//the request succeeded
						console.log(response);
						parseWeather(response);
						$('#loader').remove();
				},
				error: function (xhr, status) {
						//the Request failed
						console.log(status);
						$('#loader').remove();
						showError();
						}
						});
	}
	
	/* 3. insert weather data into app and style  */
	
	function parseWeather(data) {
			var weeklyForecast = daily.data.icon;
			for ( var i=0; i< weeklyForecast.length; i++ ) {
			var dailyWeather = weeklyForecast[i];
			var day = $('#icon').get(i);
			var icon = parseDay(dailyWeather);
			$(icon).add( <img src="", icon );
			}			
			
	function 
			
	};