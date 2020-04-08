module.exports = {
	filterUserResponse(response) {
		if (response.dataValues) {
			response.dataValues.password = `*`.repeat(
				response.dataValues.password.length,
			)
			response.dataValues.fullName =
				response.firstName + ` ` + response.lastName
		}

		return {
			response: response.dataValues,

			fullName: response.firstName + ` ` + response.lastName,
		}
	},
}
