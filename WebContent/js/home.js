$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000/tasks";

	
	function setRating(curRating){
		
		var el = document.querySelector('#rating');
		var currentRating = curRating;
		var maxRating= 10;
		var callback = function(rating) { alert(rating); };
		var myRating = rating(el, currentRating, maxRating, callback);
	};
	
	setRating(2);

});