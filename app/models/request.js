"use strict"

module.exports = (sequelize, DataTypes) => {
	const Request = sequelize.define("Request", {
		title: {
			type: DataTypes.STRING,
			allowNull: 0,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: 0,
		},
		requestor_id: {
			type: DataTypes.INTEGER,
			allowNull: 0,
		},
		artist_id: DataTypes.INTEGER,
		style: DataTypes.STRING,
		category: {
			type: DataTypes.STRING,
			allowNull: 0,
		},
		// deadline request is asked to be done by
		turnaround_time: {
			type: DataTypes.INTEGER,
			allowNull: 0,
			// defaultValue: 1,
		},
		tags: DataTypes.STRING,
		complete: DataTypes.BOOLEAN,
		inprogress: DataTypes.BOOLEAN,
		// purchase_price: DataTypes.DECIMAL,
		lowest_bid: DataTypes.INTEGER,
		current_bid: DataTypes.INTEGER,
		starting_price: DataTypes.INTEGER,
		artwork_id: DataTypes.INTEGER,
		last_updated: {
			type: DataTypes.DATE,
		},
	})

	// FOREIGN KEY (requestor_id) REFERENCES users(id)

	// Request.belongsTo("beforeCreate", hhhhhhhhh => {

	// })

	return Request
}
