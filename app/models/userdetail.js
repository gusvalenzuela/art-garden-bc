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
			defaultValue: `profile-avatar.jpg`,
		},
		is_verified: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		location: {
			type: DataTypes.STRING,
			validate: {
				len: [1, 55],
			},
			defaultValue: `Sacramento, CA`,
		},
		bio_statement: {
			type: DataTypes.STRING,
			validate: {
				len: [1, 128],
			},
			defaultValue: `Enter a brief bio statement here`,
		},
		banned: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
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
