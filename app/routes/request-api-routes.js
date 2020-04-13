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

	// PUT route for updating requests. We can get the updated request data from req.body
	app.put(`/api/requests/:id`, function (req, res) {
		// increments our bid_count with each bid if current_bid is updating
		if (req.body.current_bid) {
			Request.increment({ bid_count: 1 }, { where: { id: req.params.id } })
		}

		// expects Obj in req.body (ex. {artist_id: `5`})
		// Update takes in an object describing the properties we want to update, and
		// we use where to describe which objects we want to update (in this case the request id via url param)
		Request.update(req.body, {
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
	})
}
