module.exports = {
	isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) return next()

		res.redirect("/")
	},

	filterUserResponse(response) {
		if (response.dataValues) {
			response.dataValues.password = `hunter2`
			// response.dataValues.password = `*`.repeat(
			// 	response.dataValues.password.length,
			// )
			response.dataValues.fullName =
				response.firstName + ` ` + response.lastName
		}

		// if (response.password) {
		// 	response.password = `*`.repeat(response.password.length)
		// }

		return {
			response: response.dataValues,

			user: response,

			fullName: response.firstName + ` ` + response.lastName,
		}
	},
}
