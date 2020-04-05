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

    // FOREIGN KEY (artist_id) REFERENCES users(id)

	// Artwork.belongsTo("beforeCreate", user => {
	// 	user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
	// })

	return Artwork
}
