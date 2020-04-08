var authController = require("../controllers/authcontroller.js")
var utils = require("../utils/utils")
module.exports = function (app, passport) {
	app.get("/signup", authController.signup)

	app.get("/ant-test", utils.isLoggedIn, authController.antTest)

	app.get("/grvtest", utils.isLoggedIn, authController.grvTest)
	app.get("/profile", utils.isLoggedIn, authController.profile)

	app.post(
		"/signup",
		passport.authenticate("local-signup", {
			successRedirect: "/profile",
			failureRedirect: "/signup",
		}),
	)

	app.post(
		"/signin",
		passport.authenticate("local-signin", {
			successRedirect: "/profile",
			failureRedirect: "/",
		}),
	)

	app.get("/logout", authController.logout)
}
