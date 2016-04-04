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

	function accountName(){
		var name = $("#account");
		name.text(document.cookie);
		console.log(name.text());
	}

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
		var callback = function(rating) { 
		//	alert(rating); 
		};
		var myRating = rating(el, currentRating, maxRating, callback);
		console.log(myRating);
	};

	var filmENDPOINT = ENDPOINT + "/films/" + QueryString["id"];
	accountName();

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

 			var editButton = $("<button> </button>");
 			editButton.attr("id","edit");
 			editButton.attr("type","button");
 			editButton.attr("class","btn btn-default");
 			editButton.text("Edit");

 			var deleteButton = $("<button> </button>");
 			deleteButton.attr("id","delete");
 			deleteButton.attr("type","button");
 			deleteButton.attr("class","btn btn-default");
 			deleteButton.text("Delete");

	 		var infoContent = $("<div />");
	 		infoContent.addClass("product-information");
	 		infoContent.append(parse("<h2> %s </h2>", film.title));
	 		infoContent.append(parse("<p><b>Date: </b> %s </p>", film.date));
	 		infoContent.append(parse("<p><b>Actors: </b> %s </p>", film.actors));
	 		infoContent.append(parse("<p><b>Genre: </b> %s </p>", film.type));
	 		infoContent.append(parse("<p><b>Rating: </b> %s </p>", film.rating));
	 		infoContent.append(rating(film));
	 		infoContent.append(parse("<p><b>Description: </b> %s </p>", film.description));
	 		infoContent.append(parse("<p><b> <a href=%s>Full movie </a></b></p>", film.watchHere));
	 		infoContent.append(editButton).html();
	 		infoContent.append(deleteButton).html();
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

	function deleteFilm() {
		$.ajax(filmENDPOINT, {
			method: "DELETE",
			dataType: "json"
		});
	}

	$("#edit").on('click', function() {
		console.log("ASDASDASD");
		var id = QueryString["id"];
		window.location = '../4FilmLovers/film-update.html?id=' + id;
	});

	$("#delete").on('click', function() {
		console.log("ASDASDASD");
		deleteFilm();
		window.location = '../4FilmLovers/index.html';
		
	});


});