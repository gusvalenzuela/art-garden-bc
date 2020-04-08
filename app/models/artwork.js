"use strict"

module.exports = (sequelize, DataTypes) => {
	const Artwork = sequelize.define("Artwork", {
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		artist_id: DataTypes.INTEGER,
		style: DataTypes.STRING,
		category: DataTypes.STRING,
		tags: DataTypes.STRING,
		for_request: DataTypes.BOOLEAN,
		// purchase_price: DataTypes.DECIMAL,
		last_bid: {
			type: DataTypes.DATE,
		},
	})

	Artwork.associate = models => {
		// a Artwork should belong to a User (as userID)
		Artwork.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
			},
		})
	}

	return Artwork
}
