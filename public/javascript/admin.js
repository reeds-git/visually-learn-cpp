/**************************************************************************
* Get the input for the form for processing
**************************************************************************/
function addTopic() {

	var params = getParams();
	var results = params;//validateInput(params);

	if (results.success) {
		console.log("success resurld ");
		$.ajax({
		  	type: "POST",
		 	 url: "/add",
			data: results,
		success: function(data) {

		console.log("(data !== null)" + (data !== null));

				if (data !== null) {
		  			displayErrors(data);
		  		} else {

		console.log("555  no errors 55555 ");
}

		  }
		});
	}
}

/**************************************************************************
* ensure that the user name and description fields can do injection attacks
**************************************************************************/
function validateInput(obj) {
	
	$("#status").text("");

	var errorMessage = "";

	if (obj.topicName != "" && obj.topicName != null &&
		 obj.location != "" && obj.location != null && 
		 obj.description != "" && obj.description != null &&
		 obj.tip != "" && obj.tip != null ) {
			
	console.log("all filled out");

		document.getElementById("message").classList.add('hide');

	} else {

	console.log("error");

		// errorMessage = "Please enter Valid User Name and Passwords";
		// $("#status").text(errorMessage);
		// document.getElementById("message").classList.remove('hide');

		// if (obj.description.length < 8) {
		
		// 	errorMessage = "Passwords must be more than 8 characters";
		// 	$("#error").text(errorMessage);
		
		// } else {
		// 	$("#error").text("");
		// }

		// if (obj.description !== obj.tip) {
		
		// 	errorMessage = "Passwords don't match";
		// 	$("#error1").text(errorMessage);

		// } else {
		// 	$("#error1").text("");
		// }

		obj.success = false;
	}

	return obj;
}

/**************************************************************************
* Get the input for the form for processing
**************************************************************************/
function getParams() {

	var topicName = $("#topicName").val();                
	var description = $("#description").val();
	var tip = $("#tip").val();
	var location = $("#location").val();
		
	var result = {
			 success: true,
		  topicName: topicName,
			location: location,
		description: description,
				  tip: tip
	};

	return result;	
}

/**************************************************************************
* 
**************************************************************************/
function displayErrors(errors) {

	// Clear errors that have been fixed
	$("#message ul").empty();

	document.getElementById("message").classList.remove('hide');

	for (var i = 0; i < errors.length; i++) {
		
		$("#messageList").append("<li id='e"+ i + "'>" + errors[i] + "</li>");
	}
}