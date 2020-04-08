module.exports = {
	filterUserResponse(response) {
		if (response.dataValues) {
			response.dataValues.password = `*`.repeat(
				response.dataValues.password.length,
			)
		}

		return response.dataValues
	},
}
