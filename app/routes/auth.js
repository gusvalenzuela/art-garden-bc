var authController = require("../controllers/authcontroller.js")

module.exports = function (app, passport) {
	app.get("/signup", authController.signup)

	app.get("/ant-test", isLoggedIn, authController.antTest)

	app.get("/grvtest", isLoggedIn, authController.grvTest)
	app.get("/profile", isLoggedIn, authController.profile)

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

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) return next()

		res.redirect("/")
	}
}
