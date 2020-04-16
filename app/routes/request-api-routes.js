/* eslint-disable no-unused-vars */
// Requiring our models
const { Request, User } = require(`../../app/models`)
// const utils = require("../utils/utils")

// Routes
// =============================================================
module.exports = function (app) {
	// GET route for getting all
	app.get(`/api/requests`, function (req, res) {
		// findAll returns all entries for a table when used with no options `{}`
		// res.send(`SUP WELCOME TO REQUESTS API`)
		Request.findAll({
			include: [User],
			order: [["createdAt","DESC"]],
		}).then(response => {
			// We have access to the todos as an argument inside of the callback function
			res.json(response)
		})
	})
	app.get(`/api/requests/:id`, function (req, res) {
		// findAll returns all entries for a table when used with no options `{}`
		// res.send(`SUP WELCOME TO REQUESTS API`)
		Request.findAll({
			where: {
				userId: req.params.id,
			},
			include: [User],
		}).then(response => {
			// We have access to the todos as an argument inside of the callback function
			res.json(response)
		})
	})


	// DELETE route for deleting requests. We can get the id of the request to be deleted from
	// req.params.id
	app.delete(`/api/requests/:id`, function (req, res) {
		// We just have to specify which request we want to destroy with `where`
		Request.destroy({
			where: {
				id: req.params.id,
			},
		}).then(response => {
			res.json(response)
		})
	})

}
