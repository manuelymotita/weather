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
			
			var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
			console.log(days);
			
			/*
			for ( var i = 0; i < data.hourly.data; i++){
 				 var timeStamp = data.hourly.data[i].time;
 				 var d = new Date();
 				 d.setTime(timeStamp*1000);
 				 var time = $('#hourly').get(i);
 				 console.log(time);
 				 $(time).text(d.getUTCHours());
				};
			*/
			//hourly
			var timeStamp = data.hourly.data[0].time;
			console.log(timeStamp);
			var d = new Date();
			console.log(d);
			d.setTime(timeStamp*1000);
			console.log(d.setTime);
			
			var times = [ d.getHours(), d.getMinutes() ];
			console.log(times);
			var suffix = ( times[0] < 12 ) ? "AM" : "PM";
			times[0] = ( times[0] < 12 ) ? times[0] : times[0] - 12;
			times[0] = times[0] || 12;
			
			$('#t1').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[1].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t2').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[2].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t3').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[3].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t4').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[4].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t5').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[5].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t6').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[6].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t7').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[7].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t8').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[8].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t9').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[9].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t10').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[10].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t11').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[11].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t12').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[12].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t13').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[13].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t14').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[14].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t15').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[15].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t16').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[16].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t17').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[17].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t18').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[18].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t19').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[19].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t20').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[20].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t21').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[21].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t22').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[22].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t23').text(d.getUTCHours() + suffix);
			timeStamp = data.hourly.data[23].time;
			d = new Date();
			d.setTime(timeStamp*1000);
			$('#t24').text(d.getUTCHours() + suffix);
			
			$('#hour1').text(Math.round(data.hourly.data[0].temperature));
			$('#hour2').text(Math.round(data.hourly.data[1].temperature));
			$('#hour3').text(Math.round(data.hourly.data[2].temperature));
			$('#hour4').text(Math.round(data.hourly.data[3].temperature));
			$('#hour5').text(Math.round(data.hourly.data[4].temperature));
			$('#hour6').text(Math.round(data.hourly.data[5].temperature));
			$('#hour7').text(Math.round(data.hourly.data[6].temperature));
			$('#hour8').text(Math.round(data.hourly.data[7].temperature));
			$('#hour9').text(Math.round(data.hourly.data[8].temperature));
			$('#hour10').text(Math.round(data.hourly.data[9].temperature));
			$('#hour11').text(Math.round(data.hourly.data[10].temperature));
			$('#hour12').text(Math.round(data.hourly.data[11].temperature));
			$('#hour13').text(Math.round(data.hourly.data[12].temperature));
			$('#hour14').text(Math.round(data.hourly.data[13].temperature));
			$('#hour15').text(Math.round(data.hourly.data[14].temperature));
			$('#hour16').text(Math.round(data.hourly.data[15].temperature));
			$('#hour17').text(Math.round(data.hourly.data[16].temperature));
			$('#hour18').text(Math.round(data.hourly.data[17].temperature));
			$('#hour19').text(Math.round(data.hourly.data[18].temperature));
			$('#hour20').text(Math.round(data.hourly.data[19].temperature));
			$('#hour21').text(Math.round(data.hourly.data[20].temperature));
			$('#hour22').text(Math.round(data.hourly.data[21].temperature));
			$('#hour23').text(Math.round(data.hourly.data[22].temperature));
			$('#hour24').text(Math.round(data.hourly.data[23].temperature));
			
			//main
			$('#temp1').text((Math.round(data.currently.apparentTemperature)));
			$('#sum').text(data.currently.summary);
			$('#temp2').text(Math.round(week[1].temperatureMin));
			$('#sum2').text(week[1].summary);
			$('#temp3').text(Math.round(week[2].temperatureMin));
			$('#sum3').text(week[2].summary);
			//portrait
			$('#d1').text(Math.round(week[0].temperatureMin));
			$('#s1').text(week[0].summary);
			$('#d2').text(Math.round(week[1].temperatureMin));
			$('#s2').text(week[1].summary);
			$('#d3').text(Math.round(week[2].temperatureMin));
			$('#s3').text(week[2].summary);
			$('#d4').text(Math.round(week[3].temperatureMin));
			$('#s4').text(week[3].summary);
			$('#d5').text(Math.round(week[4].temperatureMin));
			$('#s5').text(week[4].summary);
			$('#d6').text(Math.round(week[5].temperatureMin));
			$('#s6').text(week[5].summary);
			$('#d7').text(Math.round(week[6].temperatureMin));
			$('#s7').text(week[6].summary);
			$('#d8').text(Math.round(week[7].temperatureMin));
			$('#s8').text(week[7].summary);
			
			// or add them one by one
			var image = parseIcon(week[0].icon);
			$('<img>').attr("src","images/" + image).appendTo('#icon1');
			var image = parseIcon(week[1].icon);
			$('<img>').attr("src","images/" + image).appendTo('#icon2');
			var image = parseIcon(week[2].icon);
			$('<img>').attr("src","images/" + image).appendTo('#icon3');
			var image = parseIcon(week[3].icon);
			$('<img>').attr("src","images/" + image).appendTo('#icon4');
			var image = parseIcon(week[4].icon);
			$('<img>').attr("src","images/" + image).appendTo('#icon5');
			var image = parseIcon(week[5].icon);
			$('<img>').attr("src","images/" + image).appendTo('#icon6');
			var image = parseIcon(week[6].icon);
			$('<img>').attr("src","images/" + image).appendTo('#icon7');
			var image = parseIcon(week[7].icon);
			$('<img>').attr("src","images/" + image).appendTo('#icon8');
			
			
			
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
	
	
	});