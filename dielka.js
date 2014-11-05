	function getPrecipColor(temp) {

		if ( temp > 90 ) 
			return	'hot.png';
		if ( temp > 80 ) 
			return	'mild.png';
		if ( temp > 70 ) 
			return	'semi-mild.png';
		return 'cold.png';
	}
	
	var temp = 74.94;
	temp = Math.round(temp); // 75 