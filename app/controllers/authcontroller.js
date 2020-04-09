const utils = require(`../utils/utils`)
const db = require(`./..//models`)

exports.signup = function (req, res) {
	res.render("signup")
}

exports.signin = function (req, res) {
	res.render("signin")
}

exports.profile = function (req, res) {
	db.User.findOne({
		where: {
			id: req.user.id,
		},
		include: [db.Userdetail, db.Artwork, db.Request],
		raw: false,
	}).then(response => {
		console.log(utils.filterUserResponse(response).response)
		res.render(`profile`, utils.filterUserResponse(response).response)
	})
}

// exports.requestform = function (req, res) {

// 	db.User.findOne({
// 		where: {
// 			id: req.user.id,
// 		},
// 		include: [db.Userdetail, db.Artwork, db.Request],
// 		raw: false
// 	}).then(response => {
// 		res.render(`profile`, response.dataValues)
// 	})

// }

exports.grvTest = function (req, res) {
	console.log(req.user)
	res.render("grv-test", utils.filterUserResponse(req.user).user)
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
