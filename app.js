$(document).ready(function(){


	$("#owl-example").owlCarousel();
	
	$(window).on("orientationchange",function()
	{
	 if(window.orientation == 0)
	   {$('#portrait').removeClass("hidden");
		$('#landscape').addClass("hidden");
	   }
	 else 
	   {$('#landscape').removeClass("hidden");
		$('#portrait').addClass("hidden");} 
	});

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
		$('#error').text("Unable to find location")
	}
	
	// Received a Latitude/Longitude from the browser
	function success(position) {
			console.log(position);
			getWeatherWithPos(position.coords.latitude,position.coords.longitude);
	}
	
	//unable to find a lat/long
	function error(error) {
			console.log(error);
			getWeatherWithPos(defaultLat, defaultLng);
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
						$('#wrapper').removeClass("wrapper");
				},
				error: function (xhr, status) {
						//the Request failed
						console.log(status);
						$('#loader').remove();
						$('#error').removeClass("hidden");
						showError();
						}
						});
	}
	
	/* 3. insert weather data into app and style  */
	
		function parseWeather(data){
			
			var week = data.daily.data;
			for (var i = 0; i < week.length; i++){
				var image = parseIcon(week[i].icon);
				console.log(image);
				//  you can optionally add your images in a loop
			}
	
			
			$('#temp1').text((Math.round(data.currently.apparentTemperature)));
			$('#sum').text(data.currently.summary);
			$('#temp2').text(Math.round(week[1].temperatureMin));
			$('#sum2').text(week[1].summary);
			$('#temp3').text(Math.round(week[2].temperatureMin));
			$('#sum3').text(week[2].summary);
			//portrait
			$('#day1').text(Math.round(week[0].temperatureMin));
			$('#d1').text(week[0].summary);
			$('#day2').text(Math.round(week[1].temperatureMin));
			$('#d2').text(week[1].summary);
			$('#day3').text(Math.round(week[2].temperatureMin));
			$('#d3').text(week[2].summary);
			$('#day4').text(Math.round(week[3].temperatureMin));
			$('#d4').text(week[3].summary);
			$('#day5').text(Math.round(week[4].temperatureMin));
			$('#d5').text(week[4].summary);
			$('#day6').text(Math.round(week[5].temperatureMin));
			$('#d6').text(week[5].summary);
			$('#day7').text(Math.round(week[6].temperatureMin));
			$('#d7').text(week[6].summary);
			$('#day8').text(Math.round(week[7].temperatureMin));
			$('#d8').text(week[7].summary);
			
		
			
			// or add them one by one
			var image = parseIcon(week[0].icon);
			$('<img>').attr("src","images/" + image).appendTo('#day1');
			var image = parseIcon(week[1].icon);
			$('<img>').attr("src","images/" + image).appendTo('#day2');
			var image = parseIcon(week[2].icon);
			$('<img>').attr("src","images/" + image).appendTo('#day3');
			var image = parseIcon(week[3].icon);
			$('<img>').attr("src","images/" + image).appendTo('#day4');
			var image = parseIcon(week[4].icon);
			$('<img>').attr("src","images/" + image).appendTo('#day5');
			var image = parseIcon(week[5].icon);
			$('<img>').attr("src","images/" + image).appendTo('#day6');
			var image = parseIcon(week[6].icon);
			$('<img>').attr("src","images/" + image).appendTo('#day7');
			var image = parseIcon(week[7].icon);
			$('<img>').attr("src","images/" + image).appendTo('#day8');
			
			for ( var i = 0; i < data.daily.data.length; i++ ){
				var dayObject = data.daily.data[i];
			}
			console.log(week);
			var today = data.currently.apparentTemperature;
			var tomorrow = data.daily.data[1];
			var dayAfterTomorrow = data.daily.data[2];	
			console.log(tomorrow.temperatureMin);
			/*
			var img = $('<img>');
			img.attr("src","images/" + today.icon + ".png");
			img.appendTo('#icon');
			*/
			console.log(today);
			var imageFile = parseIcon(data.currently.icon);
			console.log(imageFile);
			
			// <img src="yourfilehere.png"/>
			var img = $('<img>');
			img.attr("src","images/" + imageFile);
			img.appendTo('#icon');
	console.log(data.currently.icon);
	}
	function parseIcon(icon){

    	switch(icon) {
    		case "clear-day":
    			var img = "sunny.png";
                break;
    		case "clear-night":	
                var img = "night.png";
                break;
    		case "rain":
    			var img = "rain.png";
    			break;
    		case "snow":
    			var img= "snow.png"
    		case "sleet":
                var img = "snow.png";
                break;
    		case "wind":
    			var img = "wind.png";
    			break;
    		case "fog":
    			var img = "fog.png";
    			break;
    		case "cloudy":
    			var img = "cloudy.png";
    			break;
    		case "partly-cloudy-day":
    			var img ="cloudyDay.png";
    			break;
    		case "partly-cloudy-night":
                var img = "cloudyNight.png";
                break;
    		default:
    			break;	
    	}
        return img;

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