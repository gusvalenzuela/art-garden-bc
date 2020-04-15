const authController = require("../controllers/authcontroller.js")
const utils = require("../utils/utils")

module.exports = function (app, passport) {
	app.get("/signup", authController.signup)

	app.get("/ant-test", utils.isLoggedIn, authController.antTest)

	app.get("/settings", utils.isLoggedIn, authController.settings)

	app.get("/grvtest", utils.isLoggedIn, authController.grvTest)

	app.get("/profile", utils.isLoggedIn, authController.profile)

	app.get("/homepage", authController.homepage)
	// app.get("/requestform", utils.isLoggedIn, authController.profile)

	app.get("/request", utils.isLoggedIn, authController.request)

	app.post(
		"/signup",
		passport.authenticate("local-signup", {
			successRedirect: "/homepage",
			failureRedirect: "/signup",
		}),
	)

	app.post(
		"/signin",
		passport.authenticate("local-signin", {
			successRedirect: "/homepage",
			failureRedirect: "/",
		}),
	)

	app.get("/logout", authController.logout)
}
