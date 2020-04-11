"use strict"

module.exports = (sequelize, DataTypes) => {
	const Artwork = sequelize.define("Artwork", {
		title: DataTypes.STRING,
		description: DataTypes.STRING,
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

		// Associating Artwork with its Request
		Artwork.hasOne(models.Request, {
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		})
	}

	return Artwork
}
