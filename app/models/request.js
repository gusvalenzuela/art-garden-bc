"use strict"

module.exports = (sequelize, DataTypes) => {
	const Request = sequelize.define("Request", {
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		requestor_id: DataTypes.INTEGER,
		style: DataTypes.STRING,
		category: DataTypes.STRING,
		// deadline request is asked to be done by
		turnaround_time: DataTypes.INTEGER,
		tags: DataTypes.STRING,
		complete: DataTypes.BOOLEAN,
		inprogress: DataTypes.BOOLEAN,
		// purchase_price: DataTypes.DECIMAL,
		last_updated: {
			type: DataTypes.DATE,
		},
	})

	// FOREIGN KEY (requestor_id) REFERENCES users(id)

	// Request.belongsTo("beforeCreate", hhhhhhhhh => {

	// })

	return Request
}
