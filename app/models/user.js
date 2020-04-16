"use strict"

const bcrypt = require("bcrypt-nodejs")

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.STRING,
		password: {
			type: DataTypes.STRING,
			allowNull: 0,
		},
	})

	User.prototype.isValidPassword = function (password) {
		return bcrypt.compareSync(password, this.password)
	}

	User.addHook("beforeCreate", user => {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
	})

	User.associate = models => {
		// Associating User with Requests
		// When a User is deleted, also deletes any associated Request(s)
		User.hasMany(models.Request, {
			onDelete: "cascade",
		})

		// Associating User with Artworks
		User.hasMany(models.Artwork, {
			onDelete: "cascade",
		})

		// Associating User with their Userdetails
		User.hasOne(models.Userdetail, {
			onDelete: "RESTRICT",
			onUpdate: "RESTRICT",
		})
	}

	return User
}
