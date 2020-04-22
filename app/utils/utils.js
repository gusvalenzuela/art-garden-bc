module.exports = {
	isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) return next()

		res.redirect("/signin")
	},

	filterUserResponse(response) {
		if (response.length > 1) {
			for (i = 0; i < response.length; i++) {
				if (response[i].dataValues) {
					// response[i].dataValues.password = `hunter2`
					response[i].dataValues.password = `*`.repeat(7)
					response[i].firstName + ` ` + response[i].lastName
				} else if (response[i].password) {
					response[i].password = `*`.repeat(response[i].password.length)
				}
			}
		} else {
			if (response.dataValues) {
				// response.dataValues.password = `hunter2`
				response.dataValues.password = `*`.repeat(7)
				response.firstName + ` ` + response.lastName
			} else if (response.password) {
				response.password = `*`.repeat(response.password.length)
			}
		}

		// console.log(`\n\nFILTERED RESPONSE\n\n\n\n`, response)

		return {
			response: response,
			fullName: response.firstName + ` ` + response.lastName,
		}
	},
}
