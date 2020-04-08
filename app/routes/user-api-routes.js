// Requiring our models
const { User } = require(`../models`)

// Routes
// =============================================================
module.exports = function (app) {
	// GET route for getting all
	app.get(`/api/users`, function (req, res) {
		// findAll returns all entries for a table when used with no options `{}`
		User.findAll({}).then(response => {
			// We have access to the Users as an argument inside of the callback function
			res.json(response)
		})
	})

	// POST route for saving a new todo
	app.post(`/api/users`, function (req, res) {
		// create takes an argument of an object describing the item we want to
		// insert into our table. In this case we just we pass in an object with a text
		// and complete property (req.body)
		User.create({
			title: req.body.text,
			complete: req.body.complete,
		})
			.then(response => {
				// We have access to the new todo as an argument inside of the callback function
				res.json(response)
			})
			.catch(function (err) {
				// Whenever a validation or flag fails, an error is thrown
				// We can `catch` the error to prevent it from being `thrown`, which could crash our node app
				res.json(err)
			})
	})

	// DELETE route for deleting todos. We can get the id of the todo to be deleted from
	// req.params.id
	app.delete(`/api/Users/:id`, function (req, res) {
		// We just have to specify which todo we want to destroy with `where`
		User.destroy({
			where: {
				id: req.params.id,
			},
		}).then(response => {
			res.json(response)
		})
	})

	// PUT route for updating todos. We can get the updated todo data from req.body
	app.put(`/api/Users`, function (req, res) {
		// Update takes in an object describing the properties we want to update, and
		// we use where to describe which objects we want to update
		User.update(
			{
				text: req.body.text,
				complete: req.body.complete,
			},
			{
				where: {
					id: req.body.id,
				},
			},
		)
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