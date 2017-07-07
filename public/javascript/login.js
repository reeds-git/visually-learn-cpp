/**************************************************************************
* get the user name and password to determine if they are logged in
**************************************************************************/
function login() {

	var params = getParams();
	var results = validateInput(params);

	if (results.success) {

		$.ajax({
		  type: "POST",
		  url: "/login",
		  data: results,
		  success: results.success
		});
	}
}

/**************************************************************************
* log out to the system
**************************************************************************/
function logout() {
	$.post("/logout", function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out.");
		}
	});
}

/**************************************************************************
* get the time that a request was made
**************************************************************************/
function getServerTime() {
	$.get("/time", function(result) {
		if (result && result.success) {
			$("#status").text("Server time: " + result.time);
		} else {
			$("#status").text("Got a result back, but it wasn't a success. Your response should have had a 401 status code.");
		}
	}).fail(function(result) {
		$("#status").text("Could not get server time.");
	});
}

/**************************************************************************
* ensure that the user name and password fields can do injection attacks
**************************************************************************/
function validateInput(obj) {
	
	$("#status").text("");

	var errorMessage = "";

	if ((obj.username != "" && obj.username != null && 
		 obj.password != "" && obj.password != null &&
		 obj.confirmPassword != "" && obj.confirmPassword != null )&& 
		 (obj.password.length >= 8) &&
		 obj.password === obj.confirmPassword) {
			
		document.getElementById("message").classList.add('hide');

	} else {

		errorMessage = "Please enter Valid User Name and Passwords";
		$("#status").text(errorMessage);
		document.getElementById("message").classList.remove('hide');

		if (obj.password.length < 8) {
		
			errorMessage = "Passwords must be more than 8 characters";
			$("#error").text(errorMessage);
		
		} else {
			$("#error").text("");
		}

		if (obj.password !== obj.confirmPassword) {
		
			errorMessage = "Passwords don't match";
			$("#error1").text(errorMessage);

		} else {
			$("#error1").text("");
		}

		obj.success = false;
	}

	return obj;
}

/**************************************************************************
* Get the input for the form for processing
**************************************************************************/
function getParams() {

	var username = $("#username").val();                
	var password = $("#password").val();
	var confirmPassword = $("#confirmPassword").val();
		
	var result = {
			 success: true,
			username: username,
			password: password,
			confirmPassword: confirmPassword
	};

	return result;	
}