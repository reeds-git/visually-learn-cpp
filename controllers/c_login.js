
const loginModel = require('../models/m_login.js');

/**************************************************************************
* Display the login form to log the user in
**************************************************************************/
function handelLoginPage(req, res) {

  res.render('login');
}

/**************************************************************************
* login to the system
**************************************************************************/
function handelLogin(req,res) {

	loginModel.login(req, function (err, result) {
		res.json(result);
	});
}

/**************************************************************************
* log the out of the system
**************************************************************************/
function handelLogout(req,res) {

	loginModel.logout(req, function (err, result) {
		res.json(result);
	});
}

/**************************************************************************
* send out the functions
**************************************************************************/
module.exports = {

	handelLoginPage: handelLoginPage,
	handelLogin: handelLogin,
	handelLogout: handelLogout
};