const utils = require(`../utils/utils`)
const db = require(`./..//models`)

exports.signup = function (req, res) {
	res.render("signup")
}

exports.homepage = function (req, res) {
	db.User.findAll({
		include: [db.Userdetail, db.Artwork, db.Request],
		raw: false,
	}).then(response => {
		// console.log(utils.filterUserResponse(response).response)
		res.render(`homepage`, utils.filterUserResponse(response).response)
	})
}
exports.signin = function (req, res) {
	res.render("signin")
}

exports.profile = function (req, res) {
	db.User.findOne({
		include: [db.Userdetail, db.Artwork, db.Request],
		where: {
			id: req.user.id,
		},
		raw: false,
	}).then(response => {
<<<<<<< HEAD
		res.render(`profile-mark`, utils.filterUserResponse(response).response)
	})
}

=======
		console.log(utils.filterUserResponse(response).response)
		// console.log(response.dataValues.Requests[0].dataValues)
		res.render(`profile`, utils.filterUserResponse(response).response)
	})
}

exports.request = function (req, res) {
	console.log(req.user)
	res.render("request", req.user)
}

>>>>>>> 8b82ca3d0ddc67a95d8398bdc332ae81ed1f8e98
exports.grvTest = function (req, res) {
	// console.log(req.user)
	res.render("grv-test", utils.filterUserResponse(req.user).user)
}

exports.antTest = function (req, res) {
	// console.log(req.user)
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
