
/**************************************************************************
* get the user name and password to determine if they are logged in
**************************************************************************/
function login(info, callback) {
	
	/****************************  Validate ************************/
	info.checkBody('username', 'Error logging in.').isAlpha().notEmpty();
	info.check('username', 'User name must contain only letters').matches(/^[A-Za-z]+$/, "i");

	info.checkBody('password', 'Error logging in.').notEmpty().len(8,2000);
	info.checkBody('confirmPassword', 'Error logging in.').notEmpty().len(8,2000);
	info.check('password', 'Passwords don\'t match.').equals(info.body.confirmPassword);
	//info.check('password', 'Passwords must contain uppercase, lowercase, and numbers').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");
	//info.check('password', 'Passwords must contain uppercase, lowercase, and numbers').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/,"i");


	var errors = info.validationErrors();

	console.log(errors);

	if (errors) {
		// info.session.errors = errors;
		callback(null, errors);
	}

	/********************* sanitize *************************
	* Prevent injection attacks
	*********************************************************/
	// remove HTML tags
	info.sanitize('username').escape();
	info.sanitize('password').escape();

	// trims spaces before and after
	info.sanitize('username').trim();
	info.sanitize('password').trim();
	// only allow letters

	//info.sanitize('username').whitelist(['a', 'b', 'c']);
	
	const u_name = info.body.username;
	const password = info.body.password;
	
	if (u_name == 'admin' && password == 'password') {

		console.log("You have logged in");
		//session.id = u_name;
	}


	// $.post("/login", params, function(result) {
		
	// 	if (result && result.success) {
	// 		$("#status").text("Successfully logged in.");
	// 	} else {
	// 		$("#status").text("Error logging in.");
	// 	}
	// });

	var results = { success: true };

	callback(null, results);
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
* send out the functions
**************************************************************************/
module.exports = {

	login: login,
	logout: logout
};