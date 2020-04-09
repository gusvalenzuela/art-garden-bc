const { filterUserResponse } = require(`../../src/_js/adhoc`)

exports.signup = function (req, res) {
	res.render("signup")
}

exports.signin = function (req, res) {
	res.render("signin")
}

exports.profile = function (req, res) {
	console.log(req.user)
	res.render("profile", req.user)
}

exports.grvTest = function (req, res) {
	console.log(req.user)
	res.render("grv-test", filterUserResponse(req.user).user)
}

exports.antTest = function (req, res) {
	console.log(req.user)
	res.render("ant-test", req.user)
}

exports.logout = function (req, res) {
	req.session.destroy(function (err) {
		if (err) {
			throw err
		}
		res.redirect("/")
	})
}
