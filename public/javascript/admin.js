/**************************************************************************
* Get the input for the form for processing
**************************************************************************/
function addTopic() {

	var params = getParams();
	var results = validateInput(params);

	if (results.success) {

		$.ajax({
		  	type: "POST",
		 	 url: "/add",
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
* ensure that the user name and description fields can do injection attacks
**************************************************************************/
function validateInput(obj) {
	
	var errorMessage = [];

	if (obj.topicName != "" && obj.topicName != null &&
		 obj.location != "" && obj.location != null && 
		 obj.description != "" && obj.description != null) {
			
		console.log("all filled out");

		document.getElementById("message").classList.add('hide');

	} else {

		if (obj.topicName == "" || obj.topicName == obj.topicName.toLowerCase()) {

			errorMessage.push("*Enter a topic name that includes spaces and lowercase letters");
		}
		
		if (obj.description == "") {
		
			errorMessage.push("*Please enter a description");
		}

		if (obj.location == "" || !(/^[A-Za-z0-9-]+\.[A-Za-z]{3}$/.test(obj.location))) {
		
			errorMessage.push('*Enter a file name that includes letters and "." (file.gif)');
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

	var topicName = $("#topicName").val();                
	var description = $("#description").val();
	var tip = $("#tip").val();
	var location = $("#location").val();
		
	topicName = topicName.toLowerCase();

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