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
			defaultValue: 0,
		},
		inprogress: DataTypes.BOOLEAN,
		purchase_price: DataTypes.DECIMAL,
		bid_count: {
			type: DataTypes.INTEGER,
			// allowNull: 0,
			defaultValue: 0,
		},
		// previous_bid: DataTypes.INTEGER,
		lowest_bid: DataTypes.INTEGER,
		current_bid: DataTypes.INTEGER,
		starting_price: {
			type: DataTypes.INTEGER,
			allowNull: 0,
			defaultValue: 7,
		},
		last_updated: {
			type: DataTypes.DATE,
		},
	})

	Request.associate = models => {
		// a Request should belong to a User (as requestor_id)
		Request.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
			},
		})

		Request.belongsTo(models.Artwork, {
			foreignKey: {
				type: DataTypes.INTEGER,
			},
		})
	}

	return Request
}
