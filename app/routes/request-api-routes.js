/* eslint-disable no-unused-vars */
// Requiring our models
const { Request, User } = require(`../../app/models`)
const utils = require("../utils/utils")

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

	// POST route for saving a new request
	app.post(`/api/requests`, function (req, res) {
		Request.create(req.body)
			.then(response => {
				res.json(response)
			})
			.catch(err => {
				// Whenever a validation or flag fails, an error is thrown
				// We can `catch` the error to prevent it from being `thrown`, which could crash our node app
				res.json(err)
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
