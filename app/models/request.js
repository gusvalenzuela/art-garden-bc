"use strict"

module.exports = (sequelize, DataTypes) => {
	const Request = sequelize.define("Request", {
		title: {
			type: DataTypes.STRING,
			allowNull: 0,
			validate: {
				len: [3, 126],
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: 0,
			validate: {
				len: [3, 255],
			},
		},
		// requestor_id: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: 0,
		// 	validate: {
		// 		isNumeric: true,
		// 	},
		// },
		artist_id: {
			type: DataTypes.INTEGER,
			allowNull: 0,
			validate: {
				isNumeric: true,
			},
		},
		style: DataTypes.STRING,
		category: {
			type: DataTypes.STRING,
			allowNull: 0,
		},
		// deadline request is asked to be done by
		turnaround_time: {
			type: DataTypes.INTEGER,
			allowNull: 0,
			defaultValue: 1,
			validate: {
				isInt: true,
				min: 1,
			},
		},
		tags: DataTypes.STRING,
		complete: {
			type: DataTypes.BOOLEAN,
			allowNull: 0,
			defaultValue: 1,
			validate: {
				isInt: true,
				min: 1,
			},
		},
		inprogress: DataTypes.BOOLEAN,
		// purchase_price: DataTypes.DECIMAL,
		bid_count: DataTypes.INTEGER,
		lowest_bid: DataTypes.INTEGER,
		current_bid: DataTypes.INTEGER,
		starting_price: {
			type: DataTypes.INTEGER,
			// allowNull: 0,
			// defaultValue: 1000000,
		},
		artwork_id: DataTypes.INTEGER,
		last_updated: {
			type: DataTypes.DATE,
		},
	})

	// FOREIGN KEY (requestor_id) REFERENCES users(id)

	// Request.belongsTo("beforeCreate", hhhhhhhhh => {

	// })

	Request.associate = models => {
		// a Request should belong to a User (as requestor_id)
		// A Post can't be created without an Author due to the foreign key constraint
		Request.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
			},
		})
	}

	return Request
}
