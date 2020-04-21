const utils = require(`../utils/utils`)
const db = require(`./..//models`)

exports.signup = function (req, res) {
	res.render("signup")
}

exports.settings = function (req, res) {
	res.render("settings", req.user)
}

exports.homepage = function (req, res) {
	//checking to see if there's a logged in user detected in the html request
	if(req.session.passport){
		var activeUser = req.session.passport.user
		var loggedIn = true
	} else {
		var activeUser = `none`
		var loggedIn = false
	}

	db.User.findAll({
		include: [db.Userdetail, db.Artwork, db.Request],
		raw: false,
	}).then(response => {
		const filteredResponse = utils.filterUserResponse(response).response
		res.render(`homepage`, {
			activeUser: activeUser,
			data: filteredResponse,
			user: filteredResponse,
			requests: filteredResponse,
			loggedIn: loggedIn,
		})
	})
}
exports.homepageBidding = function (req, res) {
	// increments our bid_count with each bid if current_bid is updating
	if (req.body.current_bid) {
		db.Request.increment(`bid_count`, { where: { id: req.params.id } })
	}

	// expects Obj in req.body (ex. {artist_id: `5`})
	// Update takes in an object describing the properties we want to update, and
	// we use where to describe which objects we want to update (in this case the request id via url param)
	db.Request.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then(response => {
			res.json(response)
		})
		.catch(function (err) {
			// Whenever a validation or flag fails, an error is thrown
			// We can `catch` the error to prevent it from being `thrown`, which could crash our node app
			res.json(err)
		})
}
exports.homepageContracting = function (req, res) {
	// POST route for saving a new request
	req.body.UserId = `${req.user.id}`
	console.log(req.body)
	db.Request.create(req.body)
		.then(response => {
			res.json(response)
		})
		.catch(err => {
			// Whenever a validation or flag fails, an error is thrown
			// We can `catch` the error to prevent it from being `thrown`, which could crash our node app
			res.json(err)
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
		res.render(`profile`, utils.filterUserResponse(response).response)
	})
}

exports.request = function (req, res) {
	console.log(req.user)
	res.render("request", req.user)
}

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
