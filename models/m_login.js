
/**************************************************************************
* get the user name and password to determine if they are logged in
**************************************************************************/
function login(info, callback) {

	var result = validateLoginForm(info);
	var errorList = [];
		
	if (result.data === null) {

		for (i in result.errors) {

			errorList[i] = result.errors[i].msg;
		}

		callback(null, errorList);

	} else {

		const u_name = result.data.username;
		const password = result.data.password;
		
		if (u_name == 'admin' && password == 'password') {

			console.log("You have logged in");
			
			info.session.active = "yes";
	
			errorList = ["You have logged in"];
			callback(null, errorList);

		}	else {
		
			errorList = ["Please enter a valid User Name and Password"];

			callback(null, errorList);
		}
	}
}

/**************************************************************************
* log out to the system
**************************************************************************/
function logout(req1, callback) {

	var result = { success: true };
	req1.session.active = "no";

	callback(null, result);
}

/**********************************************************************
* Validate the fields to prevent malicious attacks
**********************************************************************/
function validateLoginForm(req2) {
	
	var obj = {

		errors: null,
		data: null,
		success: false
	};

	/****************************  Validate ************************/
	req2.checkBody('username', 'Enter a user name').notEmpty();
	req2.checkBody('username', 'User name must contain only letters').isAlpha();
	//req2.check('username', 'User name must contain only letters').matches(/^[A-Za-z]+$/, "i");

	req2.checkBody('password', 'Enter a password').notEmpty()
	req2.checkBody('password', 'Passwords must contain at least 8 characters').len(8,2000);
	req2.checkBody('confirmPassword', 'Confirm the password').notEmpty()
	req2.checkBody('confirmPassword', 'Must be 8 characters').len(8,2000);
	req2.check('password', 'Passwords don\'t match.').equals(req2.body.confirmPassword);

	var error = req2.validationErrors();

	if (error) {

		obj.errors = error;

	} else {
		
		/********************* sanitize *************************
		* Prevent injection attacks
		*********************************************************/
		// remove HTML tags
		req2.sanitize('username').escape();
		req2.sanitize('password').escape();

		// trims spaces before and after
		req2.sanitize('username').trim();
		req2.sanitize('password').trim();

		var results = {

			username: req2.body.username,
			password: req2.body.password,
			confirmPassword: req2.body.confirmPassword
		};


		obj.data = results;
		obj.success = true;
	}

	return obj;
}
/**************************************************************************
* send out the functions
**************************************************************************/
module.exports = {

	login: login,
	logout: logout
};