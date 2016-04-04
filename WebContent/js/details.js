$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000";

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


	function parse(str) {
	    var args = [].slice.call(arguments, 1),
	        i = 0;

	    return str.replace(/%s/g, function() {
	        return args[i++];
	    });
	}
	
	function setRating(curRating){
		
		var el = document.querySelector('.c-rating');
		var currentRating = curRating;
		var maxRating= 10;
		var callback = function(rating) { alert(rating); };
		var myRating = rating(el, currentRating, maxRating, callback);
	};

	var filmENDPOINT = ENDPOINT + "/films/" + QueryString["id"];

	$.ajax(filmENDPOINT, {
 		method: "GET",
 		dataType: "json"
 	}).then(function(response) {

 		function addContentToDIV(content, classOfDiv){
 			var newContent = $("<div />");
 			newContent.append(content);
 			newContent.addClass(classOfDiv);
 			return newContent.prop('outerHTML');
 		}
 		function image(film){
 			var image = $("<img />");
 			image.attr("src",film.imagePath);
 			image.attr("width",270);
 			image.attr("height",350);
 			image.attr("alt","");
 			return image.prop('outerHTML');
 		}
 		function rating(film){

 			var newRating = $("<ul />");
 			newRating.addClass("c-rating");
 			return newRating.prop('outerHTML');
 		}
 		function showFilm(film){
 			var imageContent = $("<div />");
 			imageContent.append(image(film));
 			imageContent.addClass("view-product");
 			imageContent = addContentToDIV(imageContent.prop('outerHTML'),
 			 "col-sm-5");

	 		var infoContent = $("<div />");
	 		infoContent.addClass("product-information");
	 		infoContent.append(parse("<h2> %s </h2>", film.title));
	 		infoContent.append(parse("<p><b>Date: </b> %s </p>", film.date));
	 		infoContent.append(parse("<p><b>Actors: </b> %s </p>", film.actors));
	 		infoContent.append(parse("<p><b>Rating: </b> %s </p>", film.rating));
	 		infoContent.append(rating(film));
	 		infoContent.append(parse("<p><b>Description: </b> %s </p>", film.description));
	 		infoContent = addContentToDIV(infoContent.prop('outerHTML'),
	 			 "col-sm-7");

	 		var content = $("<div />");
	 		content.append(imageContent);
	 		content.append(infoContent);
	 		content = content.prop('outerHTML');

	 		$(".film-details").append(content);
 			setRating(film.rating);
 		}
 		showFilm(response);
 	});




	


});