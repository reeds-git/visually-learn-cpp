$(document).ready(function() {

	$.get("/topics", function (data, status) {

		var name = displayMenu(data);

		$.get("/display/" + name, function (data1, status) {
	
			displayItem(data1);
		});

	});



  //displayMenu(data);

	// add onclick to display a topic
	// $("#menu li").click(function () {

		// the list item that was clicked will get that info
		//$(this).ajax(url, settings, settings)
		// change color of background
		// $(this).toggleClass("highlight");
		//var clickedName = $(this).val()
	// })


	// Initialize collapse button
	//$(".button-collapse").sideNav();
 	// Initialize collapsible (uncomment the line below if you use the drop-down variation)
 	 $('.collapsible').collapsible();
 	 
});

function displayItem(data) {

	if (data && data.length > 0) {

		var resultList = $("#result");
		resultList.empty();

		var name = data[0].name;
		var description = data[0].description;
		var help_tip = data[0].help_tip;
		var location = data[0].location;

		resultList.append("<h2>" + name + "</h2>");
		resultList.append("<h5>" + description + "</h5>");
		resultList.append("<h5>" + help_tip + "</h5>");
		resultList.append("<img class=\"responsive-img\" src=\"../images/" + location + "\" alt=\"" + location +"\">");
	}
}

function displayMenu(obj) {

	for (var i = obj.length - 1; i >= 0; i--) {

	var x = document.createElement("li")
	var z = obj[i].name;

	var tag = document.createElement("li");
	tag.innerText = z;

	document.getElementById("menu-item").appendChild(tag);
	}

	var name = $("#menu-item li:first").text();

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