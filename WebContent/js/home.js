$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000";
	var filmsENDPOINT = ENDPOINT + "/films";
	var selectedCategory = "New Films";

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
 		function moreInfo(film){
 			var moreInfo = $("<a />");
 			moreInfo.attr("href","#");
 			moreInfo.attr("class","btn btn-default add-to-cart");
 			return moreInfo.prop('outerHTML');
 		}
 		function trailerButton(film){
 			var button = $("<a />");
 			button.addClass("youtube");
 			button.attr("href", film.trailer);
 			button.addClass("btn btn-default add-to-cart");
 			button.append("Trailer");
  			return button.prop('outerHTML');
 		}
 		function moreInfoButton(film){
 			var button = $("<button />");
 			button.attr("type","button");
 			button.addClass("more-info");
 			button.addClass("btn btn-default add-to-cart");
 			button.append("More info");
 			button.attr("data-task-id", film.id);
 			return button.prop('outerHTML');
 		}
 		function addFilmToList(film) {

 			var filmContent = $("<div />");
 			filmContent.append(image(film));
 			filmContent.append("<p />");
 			filmContent.append(rating(film));
 			filmContent.append(parse("<p> %s </p>",film.title));
 			filmContent.append(moreInfoButton(film));
 			filmContent.addClass("productinfo text-center");
 			filmContent.attr("data-task-id", film.id);
 			

 			var contentOverlay = $("<div />");
 			contentOverlay.append(parse("<p> %s </p>",film.title));
 			contentOverlay.append(trailerButton(film));
 			contentOverlay.append(moreInfoButton(film));
 			contentOverlay.addClass("overlay-content");

 			var filmOverlay = $("<div />");
 			filmOverlay.addClass("product-overlay");
 			filmOverlay.append(contentOverlay.prop('outerHTML'));

 			var content = $("<div />");
 			content.append(filmContent.prop('outerHTML'));
 			content.append(filmOverlay.prop('outerHTML'));
 			content.addClass("single-products");
 			content = addContentToDIV(content.prop('outerHTML'), "product-image-wrapper");
 			content = addContentToDIV(content, "col-sm-4");
 
 			$(".Films-List").append(content);
 			setRating(film.rating);
 		}

 	

	$(document).on('click', '.more-info', function() {

	    var id = $(this).attr('data-task-id');

	    if (id != undefined && id != null) {
	        window.location = '../WebContent/film-details.html?id=' + id;
	    }
	});


	
   
	$(document).on('click', '.category', function() {
		var id = $(this).attr('id');
		selectedCategory = id;

		if(selectedCategory == "New Films"){
			$.ajax(filmsENDPOINT, {
		 		method: "GET",
		 		dataType: "json"
		 	}).then(function(response) {
		 		
		 		$(".Films-List").html("");
		 		_.forEach(response, addFilmToList);
		 		$(".youtube").YouTubeModal({autoplay:0, width:640, height:480});

		 	});
	 	} else {
	 		$.ajax(filmsENDPOINT, {
		 		method: "GET",
		 		data: { type: selectedCategory },
		 		dataType: "json"
		 	}).then(function(response) {
		 		
		 		$(".Films-List").html("");
		 		_.forEach(response, addFilmToList);
		 		$("#category-title").val("");
		 		$(".youtube").YouTubeModal({autoplay:0, width:640, height:480});

		 	});
	 	}

	});
	



});