$(document).ready(function() {

	$.get("/topics", function (data, status) {

		var name = displayMenu(data);

		$.get("/display/" + name, function (data1, status) {
	
			displayItem(data1);
		});
	});

	// Initialize collapse button
	//$(".button-collapse").sideNav();
 	// Initialize collapsible (uncomment the line below if you use the drop-down variation)
 	 $('.collapsible').collapsible();
 	 
});

/****************************************************************************
* 
****************************************************************************/
function displayItem(data) {

	if (data && data.length > 0) {

		var resultList = $("#result");
		resultList.empty();

		var name = data[0].name;
		var resultList = document.createElement("h2");
		resultList.innerText = name;
		document.getElementById("result").appendChild(resultList);

		var description = data[0].description;
		var resultList = document.createElement("h5");
		resultList.innerText = description;
		document.getElementById("result").appendChild(resultList);

		var help_tip = data[0].help_tip;
		var resultList = document.createElement("h5");
		resultList.innerText = help_tip;
		document.getElementById("result").appendChild(resultList);

		var location = data[0].location;
		var resultList = document.createElement("img");
		resultList.src = "../images/" + location;
		resultList.alt = location;
		document.getElementById("result").appendChild(resultList);

		$("#result img").addClass("responsive-img");
	}
}

/****************************************************************************
* 
****************************************************************************/
function displayMenu(obj) {

	for (var i = obj.length - 1; i >= 0; i--) {

		var topic = obj[i].name;
		var id = obj[i].cid;

		$("#menu").append("<li><a id=\""+ id +"\" onclick=\"getTopic(this)\" class=\"btn\">"+topic+"</a></li>");

	}

	var name = $("#menu li:first").text();

	return name;
}	

/****************************************************************************
* 
****************************************************************************/
function search() {

	document.getElementById("result").innerHTML = "";

	var temp = document.getElementById("search").value;
	console.log(temp);

	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	var obj = JSON.parse(this.responseText);
	    	display(obj);
	    }
	  };

	  xhttp.open("GET", "/topics", true);
	  xhttp.send();
}

/****************************************************************************
* 
****************************************************************************/
function display(obj) {

	console.log(obj);
	for (var i = obj.Search.length - 1; i >= 0; i--) {

		console.log(obj.Search[i].Poster + " " + 
						 obj.Search[i].Title + " " + 
						 obj.Search[i].Year  + " " +
						 obj.Search[i].imdbID);

//<img src=\""+ obj.Search[i].Poster + "\" alt=\"pic" + i + "\" style=\"width:100px;height:100px;\">
		var x = document.createElement("img")

		x.src = obj.Search[i].Poster;
		x.alt = "pic" + i;
		x.style = "width:100px;height:100px";
		document.getElementById("result").appendChild(x);

		var z = " Title: " + obj.Search[i].Title + 
				  " Year: "  + obj.Search[i].Year  + 
				  " IMDB: "  + obj.Search[i].imdbID;
		var tag = document.createElement("h4");
		tag.innerText = z;
		document.getElementById("result").appendChild(tag);
	}
}

/***************************************************************************
* 
***************************************************************************/
function getTopic(event) {

	console.log("The cur Tag '" + event.id + "'");
	var topic = document.getElementById(event.id).text;
	console.log("topic " + topic);
	$.get("/display/" + topic, function (data1, status) {
	
		displayItem(data1);
	});
}