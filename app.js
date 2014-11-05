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
			console.log(apiURL);
			
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
	
	
	
	
	function parseWeather(data){
			$('#temp1').text((Math.round(data.currently.apparentTemperature)));
			$('#sum').text(data.currently.summary);
			$('#temp2').text(Math.round(data.daily.data[1].temperatureMin));
			$('#sum2').text(data.daily.data[1].summary);
			$('#temp3').text(Math.round(data.daily.data[2].temperatureMin));
			$('#sum3').text(data.daily.data[2].summary);
			
			for ( var i = 0; i < data.daily.data.length; i++ ){
				var dayObject = data.daily.data[i];
			}
			
			var today = data.daily.data[0];
			var tomorrow = data.daily.data[1];
			var dayAfterTomorrow = data.daily.data[2];	
			console.log(tomorrow.temperatureMin);
			/*
			var img = $('<img>');
			img.attr("src","images/" + today.icon + ".png");
			img.appendTo('#icon');
			*/
			console.log(today);
			var imageFile = parseIcon(today.icon);
			console.log(imageFile);
			
			// <img src="yourfilehere.png"/>
			var img = $('<img>');
			img.attr("src","images/" + imageFile);
			img.appendTo('#icon');
	}
	
	function parseIcon(icon){

    	switch(icon) {
    		case "clear-day":
    		case "clear-night":	
                var color = "sunny.png";
                break;
    		case "rain":
    		case "snow":
    		case "sleet":
                var color = "snow.png";
                break;
    		case "wind":
    		case "fog":
    		case "cloudy":
    		case "partly-cloudy-day":
    		case "partly-cloudy-night":
                var color = "night.png";
                break;
    		default:
    			break;	
    	}
        return color;

    }
	
	/*function parseWeather(data) {
			for ( var i=0; i< weeklyForecast.length; i++ ) {
			var dailyWeather = weeklyForecast[i];
			var tempColor    = data.currently.apparentTemperature;
			//var day = $('#icon').get(i);
			var icon = parseDay(dailyWeather);
			var img= $('<img>');
			img.attr("src","images/" + data.currently.icon + ".png");
			img.appendTo('#today');
			$('#temp').text("Currently: " + data.currently.apparentTemperature);
			}	
			
		}		
			console.log(tempColor)
	function parseDay(condition) {
			
			switch(condition) {
			case "clear-day":
			var icon = '<img src="'+images/sunny.png+'" />';
			case "clear-night":
			var icon = '<img src="'+images/night.png+'" />';
			case "rain":
			var icon= '<img src="'+images/rain.png+'"/>';
			}
			
	}
	*/
	});