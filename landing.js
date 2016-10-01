// function yesNo () {
// 	var options = {
// 	  enableHighAccuracy: true,
// 	  timeout: 5000,
// 	  maximumAge: 0
// 	};

// 	if (navigator.geolocation)  {
// 		console.log("yeah")
// 		navigator.geolocation.getCurrentPosition(success, error, options);
// 	}
// }
var hemiSeason = {}
var constellations =
        {
            "NA" : ["Andromeda", "Aquarius", "Aries", "Cetus", "Grus", "Lacerta", "Pegasus", "Perseus", "Phoenix", "Piscis Austrinus", "Pisces", "Sculptor", "Triangulum"],
            "SS" : ["Andromeda", "Aquarius", "Aries", "Cetus", "Grus", "Lacerta", "Pegasus", "Perseus", "Phoenix", "Piscis Austrinus", "Pisces", "Sculptor", "Triangulum"],
            "NW" : ["Auriga", "Calum", "Canis Major", "Canis Minor", "Carina", "Columba", "Eridanus", "Fornax", "Gemini", "Horologium", "Lepus", "Monoceros", "Orion", "Pictor", "Puppis", "Reticulum", "Taurus", "Vela"],
            "SU" : ["Auriga", "Calum", "Canis Major", "Canis Minor", "Carina", "Columba", "Eridanus", "Fornax", "Gemini", "Horologium", "Lepus", "Monoceros", "Orion", "Pictor", "Puppis", "Reticulum", "Taurus", "Vela"],
            "NS" : ["Antlia", "Boötes", "Cancer", "Canes Venatici", "Centaurus", "Coma Berenices", "Corvus", "Crater", "Hydra", "Leo", "Leo Minor", "Lupus", "Lynx", "Pyxis", "Sextans", "Virgo"],
            "SA": ["Antlia", "Boötes", "Cancer", "Canes Venatici", "Centaurus", "Coma Berenices", "Corvus", "Crater", "Hydra", "Leo", "Leo Minor", "Lupus", "Lynx", "Pyxis", "Sextans", "Virgo"],
            "NU" : ["Aquila", "Ara", "Capricornus", "Corona Australis", "Corona Borealis", "Cygnus", "Hercules", "Delphinus", "Equuleus", "Indus", "Libra", "Lyra", "Microscopium", "Ophiuchus", "Scorpius", "Scutum", "Serpens", "Sagitta", "Sagittarius", "Telescopium", "Vulpecula"],
            "SW" : ["Aquila", "Ara", "Capricornus", "Corona Australis", "Corona Borealis", "Cygnus", "Hercules", "Delphinus", "Equuleus", "Indus", "Libra", "Lyra", "Microscopium", "Ophiuchus", "Scorpius", "Scutum", "Serpens", "Sagitta", "Sagittarius", "Telescopium", "Vulpecula"],
            "NP" : ["Camelopardus", "Cassiopeia", "Cepheus", "Draco", "Ursa Major", "Ursa Minor"],
            "SP" : ["Apus", "Chamaeleon", "Circinus", "Crux", "Dorado", "Hydrus", "Mensa", "Musca", "Norma", "Octans", "Pavo", "Triangulum Australe", "Tucana", "Volans"]
    };
var date = new Date();
var year = date.getFullYear()
var month = date.getMonth() + 1;
var date = date.getDate()

function yesNo () {
	console.log("1")
	$.ajax({
		url: "https://api.ipify.org?format=json",
		dataType: "json",
		async: false,
		success: function(jsonIP) {
			$.ajax({
				// DEMO PURPOSES
				// HARDCODED IPS, BECAUSE MINE POINTS TO KANSAS :/
				url: "https://freegeoip.net/json/" + "128.177.113.106", //jsonIP.ip works
				dataType: "json",
				async: false,
				success: function(jsonPos){
					var lat = jsonPos.latitude;
					var long = jsonPos.longitude;
					var urlStr = "https://api.forecast.io/forecast/"
					var API = "e2ad790be5adaf179731d2d6cf04ee5f/"
					if (month < 10) {
						apiMonth = "0" + month.toString()
					} else {
						apiMonth = month.toString()
					} 

					if (date < 10) {
						apiDate = "0" + date.toString()
					} else {
						apiDate = date.toString()
					}
					var time = year.toString() + "-" + apiMonth + "-" + apiDate + "T21:00:00";
					var url = urlStr + API + lat.toString() + "," + long.toString() + "," + time + "/";
					// var urlStr = "api.openweathermap.org/data/2.5/forecast?"
					// var coord = "lat=" + lat.toString() + "&lon=" + long.toString();
					// console.log(coord)
					// var API = "&APPID=d4eb7347018f72013868f80a6b93f3fa"
					// var url = "http://" + urlStr + coord + API
					console.log(url)
					$.ajax({
					  url: url,
					  dataType: 'jsonp',
					  async: false,
					  success: function(json) {
					  	  try {
					  	  	var dayData = json["currently"];

					  	  	if (dayData["summary"] == "Clear") {
					  	  		console.log("Clear skies")
					  	  		var roundTemp = Math.round(dayData["temperature"]);
					  	  		hemiSeason = region(long, lat);
					  			replaceBody(hemiSeason, roundTemp, true);
					  	  	} else {
					  	  		var roundTemp = Math.round(dayData["temperature"]);
					  	  		console.log("Fog")
					  	  		hemiSeason = region(long, lat);
					  			replaceBody(hemiSeason, roundTemp, false);
					  	  	}
					  	  } catch (e) {
					  	  	 console.log("error")
					  	  }
					  }
					});
				}
			});
		}
	});
}

function region (long, lat) {
	var hemisphere = "";
	var season = "";
	var reg = "";

	// North Hem
	if (lat >= 0) {
		hemisphere = "N";
		hemiFull = "northern";

		if (month >=3 && month <=5) {
			season = "S";
			seasonFull = "spring";
		} else if (month >=6 && month <= 8) {
			season = "U";
			seasonFull = "summer";
		} else if (month >=9 && month <= 11) {
			season = "A";
			seasonFull = "autumn";
		} else {
			season = "W";
			seasonnFull = "winter";
		}
	} else {
		hemisphere = "S";
		hemiFull = "southern";

		if (month >=3 && month <=5) {
			season = "A";
			seasonFull = "autumn";
		} else if (month >=6 && month <= 8) {
			season = "W";
			seasonFull = "winter";
		} else if (month >=9 && month <= 11) {
			season = "S";
			seasonFull = "spring";
		} else {
			season = "U";
			seasonFull = "summer";
		}
	}

	//CAN DEMO HARDCODE
	hemiSeason = {hemi: hemisphere, seas: season, hemiFull: hemiFull, seasonFull: seasonFull};
	return {hemi: hemisphere, seas: season, hemiFull: hemiFull, seasonFull: seasonFull};
}

function replaceBody (hemiSeason, temp, binary) {
	// DEMO PURPOSES
	// binary = true
	tempC = Math.round(((temp-32)*5)/9);

	if (binary) {
		var yesStr = document.getElementById("yesPg").innerHTML;
		var res = yesStr.slice(5,-4)
		document.body.innerHTML = res
		document.getElementById("hemisphereSeason").innerHTML = hemiSeason.hemiFull + " hemisphere/" + hemiSeason.seasonFull
		document.getElementById("temperature").innerHTML = temp + " F/" + tempC + " C"
		console.log(res)
	} else {
		var noStr = document.getElementById("noPg").innerHTML;
		var res = noStr.slice(5,-4)
		document.body.innerHTML = res
		document.getElementById("hemisphereSeason").innerHTML = hemiSeason.hemiFull + " hemisphere/" + hemiSeason.seasonFull
		document.getElementById("temperature").innerHTML = temp + " F/" + tempC + " C"
		console.log(res)
	}
}

function constBut() {
	//console.log(hemiSeason)
	var key = hemiSeason.hemi + hemiSeason.seas;
	var hemisp = hemiSeason.hemiFull[0].toUpperCase() + hemiSeason.hemiFull.slice(1)
	var seas = hemiSeason.seasonFull[0].toUpperCase() + hemiSeason.seasonFull.slice(1)
	var mainStr = "<h2>" + hemisp + " Hemisphere " + seas + " Constellations </h2> <div id = \"consts\" > <ul>";
	var yearStr = "<h2>" + hemisp + " Hemisphere Year Round Constellations </h2> <div id = \"consts\"> <ul>";
	var key2 = hemiSeason.hemi + "P";

	for (var i = 0; i < constellations[key].length; i++) {
		mainStr = mainStr + "<li> " + constellations[key][i] + "</li>";
	}

	mainStr = mainStr + "</ul> </div>"
	for (var i = 0; i < constellations[key2].length; i++) {
		yearStr = yearStr + "<li> " + constellations[key2][i] + "</li>";
	}

	yearStr = yearStr + "</ul></div>"

	totalStr = mainStr + yearStr
	document.getElementById("bodMain").innerHTML = totalStr
}
//d4eb7347018f72013868f80a6b93f3fa
