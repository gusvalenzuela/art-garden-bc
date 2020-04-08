// Requiring our models
const { Request, User } = require(`../../app/models`)

// Routes
// =============================================================
module.exports = function (app) {
	// GET route for getting all
	app.get(`/api/requests`, function (req, res) {
		// findAll returns all entries for a table when used with no options `{}`
		// res.send(`SUP WELCOME TO REQUESTS API`)
		Request.findAll({ include: [User] }).then(response => {
			// We have access to the todos as an argument inside of the callback function
			res.json(response)
		})
	})

	// POST route for saving a new request
	app.post(`/api/requests`, function (req, res) {
		// create takes an argument of an object describing the item we want to
		// insert into our table. In this case we just we pass in an object with a text
		// and complete property (req.body)
		Request.create({
			title: req.body.title,
			description: req.body.description,
			requestor_id: req.body.requestorID,
			// style: req.body.style,
			category: req.body.category,
			turnaround_time: req.body.turnaround_time,
			tags: req.body.tags,
		})
			.then(response => {
				// We have access to the new request as an argument inside of the callback function
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
	app.put(`/api/requests`, function (req, res) {
		// Update takes in an object describing the properties we want to update, and
		// we use where to describe which objects we want to update
		Request.update(
			{
				title: req.body.title,
				description: req.body.description,
				// requestor_id: req.body.requestorID,
				// style: req.body.style,
				category: req.body.category,
				turnaround_time: req.body.turnaround_time,
				tags: req.body.tags,
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
