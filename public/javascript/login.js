/**************************************************************************
* get the user name and password to determine if they are logged in
**************************************************************************/
function login() {

	$("#status").text("");

	var params = getParams();
	var results = validateInput(params);

	if (results.success) {

		$.ajax({
		  type: "POST",
		  url: "/login",
		  data: results,
		  success: function(data) {

				if (data !== null) {
		  			displayErrors(data);
		  		}
			}
		});
	}
}

/**************************************************************************
* log out to the system
**************************************************************************/
function logout() {

	$("#message ul").empty();

	$.ajax({
	  type: "POST",
	  url: "/logout",
	  success: function(data) {

			if (data && data.success) {

				displayErrors(["Successfully logged out."]);

			} else {

				displayErrors(["Error logging out."]);
			}
		}
	});
}

/**************************************************************************
* ensure that the user name and password fields can do injection attacks
**************************************************************************/
function validateInput(obj) {
	
	var errorMessage = [];
	
	if ((obj.username != "" && obj.username != null && 
		 obj.password != "" && obj.password != null &&
		 obj.confirmPassword != "" && obj.confirmPassword != null )&& 
		 (obj.password.length >= 8) &&
		 obj.password === obj.confirmPassword) {
			
		document.getElementById("message").classList.add('hide');

	} else {

		if (obj.username == "" || !(/^[A-Za-z]+$/.test(obj.username))) {
			errorMessage.push("*Please enter Valid User Name");
		}

		if (obj.password.length < 8) {
		
			errorMessage.push("*Passwords must be more than 8 characters");
		}

		if (obj.password !== obj.confirmPassword) {
		
			errorMessage.push("*Passwords don't match");
		}

		displayErrors(errorMessage);
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

/**************************************************************************
* Print the list of errors to help the user correctly fill out the form
**************************************************************************/
function displayErrors(errors) {

	// Clear errors that have been fixed
	$("#message ul").empty();

	document.getElementById("message").classList.remove('hide');

	for (var i = 0; i < errors.length; i++) {
		
		$("#messageList").append("<li id='e"+ i + "'>" + errors[i] + "</li>");
	}
}