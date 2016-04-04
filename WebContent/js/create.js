$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000";
	var filmsENDPOINT = "http://localhost:3000" + "/films/";
	var title;

	$("#create").click(function(){
		title = $("#title").val();
		var date = $("#date").val();
		var actors = $("#actors").val();
		var type = $("#type").val();
		var desc = $("#description").val();
		var trailer = $("#trailer").val();
		var watchHere = $("#watchHere").val();
		
		var film = {
			title: title,
			date: date,
			actors: actors,
			type: type,
			rating: 5.0,
 			description: desc,
 			trailer: trailer,
 			watchHere: watchHere,
 			imagePath: "../4FilmLovers/images/home/Anonymous.png",
 		};
 		console.log(film);
		$.ajax(filmsENDPOINT, {
		 		method: "POST",
		 		dataType: "json",
		 		data: JSON.stringify(film),
				contentType: "application/json; charset=utf-8"	
		});
		setTimeout(redirect, 1000);
	});



	function redirect(){

		$.ajax(filmsENDPOINT, { 
			    type: 'GET', 
			    data: { title: title }, 
			    dataType: 'json',
			    success: function (data) { 
	        		console.log(data);
	        		var id = data[0].id;
	        		console.log(id);

				    if (id != undefined && id != null) {
				        window.location = '../4FilmLovers/film-details.html?id=' + id;
				    }
	        		
			    }
		});
	}

});