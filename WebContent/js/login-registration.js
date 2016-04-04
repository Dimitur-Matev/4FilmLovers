$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000";
	var userENDPOINT = ENDPOINT + "/user/";

	$("#login").click(function() {
		var email = $("#login-email").val();
		var pass = $("#login-password").val();
		$.ajax(userENDPOINT, {
		 		method: "GET",
		 		data: { email: email },
		 		dataType: "json"
		 	}).then(function(response) {
		 		console.log(response);
		 		if(response[0].password == pass){
		 			document.cookie=response[0].username;
		 			redirect();
		 		}else{
		 			window.alert("Wrong Email or Password");
		 		}	
		 	console.log(document.cookie);
		});
	});

	$("#signup").click(function(){
		var name = $("#register-name").val();
		var email = $("#register-email").val();
		var pass = $("#register-password").val();
		var user = {
			username: name,
 			email: email,
 			password: pass,
 			type: {
 				name: "regular"
 			}
 		};
 		console.log(user);
		$.ajax(userENDPOINT, {
		 		method: "POST",
		 		dataType: "json",
		 		data: JSON.stringify(user),
				contentType: "application/json; charset=utf-8"	
		});
		document.cookie=name;
		redirect();
	});

	function redirect(){
		window.location = '/4FilmLovers/index.html';
	}

	function accountName(){
		var name = $("#account");
		name.text(document.cookie);
		console.log(name.text());
	}

	accountName();

});