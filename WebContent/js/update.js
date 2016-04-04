$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000";
	var filmsENDPOINT = "http://localhost:3000" + "/films/";
	var title;

	var QueryString = function () {
	 
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("?");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = decodeURIComponent(pair[1]);
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	      query_string[pair[0]] = arr;
	    } else {
	      query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  } 
	    return query_string;
	}();

	var filmENDPOINT = ENDPOINT + "/films/" + QueryString["id"];

	function showFilm(){
		$.ajax(filmENDPOINT, {
	 		method: "GET",
	 		dataType: "json"
	 	}).then(function(response) {
	 		console.log(response);
	 		title = $("#title").val(response.title);
			var date = $("#date").val(response.date);
			var actors = $("#actors").val(response.actors);
			var type = $("#type").val(response.type);
			var desc = $("#description").val(response.description);
			var trailer = $("#trailer").val(response.trailer);
			var watchHere = $("#watchHere").val(response.watchHere);

	 	});
 	}
 	showFilm();

 	function redirect(){
	    window.location = '../4FilmLovers/film-details.html?id=' + QueryString["id"];
	}

	$("#update").click(function(){
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

		$.ajax(filmENDPOINT, {
			method: "PUT",
			dataType: "json",
			data: JSON.stringify(film),
			contentType: "application/json; charset=utf-8"
		});
		setTimeout(redirect, 1000);
	});

});