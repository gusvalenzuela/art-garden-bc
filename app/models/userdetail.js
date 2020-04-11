"use strict"

// const bcrypt = require("bcrypt-nodejs")

module.exports = (sequelize, DataTypes) => {
	const Userdetail = sequelize.define("Userdetail", {
		is_artist: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		profileImg: {
			type: DataTypes.STRING,
		},
		is_verified: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		// bio_statement: {
		// 	type: DataTypes.STRING,
		// 	validate: {
		// 		len: [1, 128]
		// 	}
		// },
		// banned: {
		// 	type: DataTypes.BOOLEAN,
		// 	defaultValue: 0,
		// },
		last_login: {
			type: DataTypes.DATE,
		},
	})

	Userdetail.associate = models => {
		// Associating Userdetails with User
		Userdetail.belongsTo(models.User, {
			foreignKey: {
				type: DataTypes.INTEGER,
			},
		})
	}

	return Userdetail
}
