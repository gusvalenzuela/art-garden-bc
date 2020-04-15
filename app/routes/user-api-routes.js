/* eslint-disable no-unused-vars */
// Requiring our models
var utils = require("../utils/utils")
const { User, Request, Artwork, Userdetail } = require(`../models`)

// Routes
// =============================================================
module.exports = function (app) {
	// GET route for getting all
	app.get(`/api/users/`, function (req, res) {
		// findAll returns all entries for a table when used with no options `{}`
		User.findAll({
			include: [Userdetail, Artwork, Request],
		}).then(response => {
			// We have access to the Users as an argument inside of the callback function
			res.json(response)
		})
	})

	app.get(`/api/user/current`, utils.isLoggedIn, function (req, res) {
		User.findAll({
			where: {
				id: req.user.id,
			},
			order: [
				[Request, 'createdAt', 'DESC'],
			],
			include: [Userdetail, Artwork, Request],
		}).then(response => {
			res.json(utils.filterUserResponse(response[0]).response)
		})
	})

	// GET route for getting one User
	app.get(`/api/users/:id`, function (req, res) {
		// could be used for rendering
		User.findOne(
			{ include: [Userdetail] },
			{
				where: {
					id: req.params.id,
				},
			},
		).then(response => {
			// We have access to the Users as an argument inside of the callback function
			// res.json(response)
			res.render(`grv-test`, utils.filterUserResponse(response).response)
		})
	})

	// DELETE route for deleting todos. We can get the id of the todo to be deleted from
	// req.params.id
	app.delete(`/api/users/:id`, function (req, res) {
		// We just have to specify which todo we want to destroy with `where`
		User.destroy({
			where: {
				id: req.params.id,
			},
		}).then(response => {
			res.json(response)
		})
	})

	app.put(`/api/userdetails/:id`, function (req, res) {
		// Update takes in an object describing the properties we want to update, and
		// we use where to describe which objects we want to update
		Userdetail.update(req.body, {
			where: {
				UserId: req.params.id,
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
