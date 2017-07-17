/****************************************************************************
* set everything up
****************************************************************************/
$(document).ready(function() {

	$.get("/topics", function (data, status) {

		var name = displayMenu(data);

		$.get("/display/" + name, function (data1, status) {
	
			displayItem(data1);
		});
	});


	$('.tooltipped').tooltip({delay: 50});

	// Initialize collapse button
	//$(".button-collapse").sideNav();
 	// Initialize collapsible (uncomment the line below if you use the drop-down variation)
 	 $('.collapsible').collapsible();
 	 
});

/****************************************************************************
* display a topic and it's information to the user
****************************************************************************/
function displayItem(data) {

	if (data && data.length > 0) {

		var resultList = $("#topic");
		resultList.empty();

		function toTitleCase(str) {
   		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}

		var name = data[0].name;
		name = toTitleCase(name);

		var description = data[0].description;
		var help_tip = data[0].help_tip;
		var location = data[0].location;

		$("#topic").append("<li class=\"collection-header blue lighten-3\"><h4>" + name + "</h4></li>");
		$("#topic").append("<li class=\"collection-item\"><h5>Description:</h5><h6>" + description + "</h6></li>");

		if (help_tip) {
			$("#topic").append("<li class=\"collection-item\"><h5 id=\"help\">Tip:</h5><h6>" + help_tip + "</h6></li>");
		}

		$("#topic").append("<li class=\"collection-item responsive-img\"><img src=\"../images/"+location+"\" alt=\""+location+"\"></li>");

		// show only the topic
		$("#result").addClass("hide");
		$("#topic").removeClass("hide");
	}
}

/****************************************************************************
* create the menu of topics
****************************************************************************/
function displayMenu(obj) {

	for (var i = obj.length - 1; i >= 0; i--) {

		var topic = obj[i].name;
		var id = obj[i].cid;

		$("#menu").append("<li><a id=\""+ id +"\" onclick=\"getTopic(this)\" class=\"btn teal lighten-3 black-text\">"+topic+"</a></li>");
	}

	var name = $("#menu li:first").text();

	return name;
}	

/****************************************************************************
* send the search topic to to server
****************************************************************************/
function search(topic) {

	$.get("/search/" + topic, function (data1, status) {
	
 		document.getElementById("search").select();

		displaySeach(data1);
	});
}

/****************************************************************************
* lowercase and remove everything but letters and spaces
****************************************************************************/
function searchTopic() {

	// sanitize the data to reduce injection attacks
	var text = document.getElementById("search").value;
	clean = text.toLowerCase();

	clean = clean.replace(/[^a-z ]/g,'');

	if (text == clean) {

		document.getElementById("error").innerHTML = "";
		$("#result li").remove();
		$("#topic li").remove();
		
		search(text);

	} else {
		
		document.getElementById("error").innerHTML = "*Please enter only letters and spaces";
	}
}

/****************************************************************************
* create the list of topics found from the search
****************************************************************************/
function displaySeach(obj) {

	$("#result").append("<li class=\"collection-header blue lighten-3\"><h4>Topics Found: (Click to view)</h4></li>");

	for (var i = obj.length - 1; i >= 0; i--) {

		var topic = obj[i].name;
		var id = obj[i].cid;

		$("#result").append("<li><a id=\""+ id +"\" onclick=\"getTopic(this)\" class=\"btn-flat\">"+topic+"</a></li>");

		$("#topic").addClass("hide");
		$("#result").removeClass("hide");
	}
}

/***************************************************************************
* send the topic to the server to get the information
***************************************************************************/
function getTopic(event) {

	var topic = document.getElementById(event.id).text;

	$.get("/display/" + topic, function (data1, status) {
	
		displayItem(data1);
	});
}