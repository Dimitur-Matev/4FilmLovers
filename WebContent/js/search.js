$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000";
	var filmsENDPOINT = ENDPOINT + "/films";

$('input[type=text]').on('keydown', function(e) {
	    if (e.which == 13) {
	    	console.log("I AM HERE");
	    	var film = document.getElementById('film-search').value;
	        $.ajax(filmsENDPOINT, { 
			    type: 'GET', 
			    data: { title: film }, 
			    dataType: 'json',
			    success: function (data) { 
	        		console.log(data);
	        		var id = data[0].id;
	        		console.log(id);

				    if (id != undefined && id != null) {
				        window.location = '../WebContent/film-details.html?id=' + id;
				    }
	        		
			    }
			});

	        e.preventDefault();
	    }
	});


});