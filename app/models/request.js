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
        // purchase_price: DataTypes.DECIMAL,
		last_login: {
			type: DataTypes.DATE,
		},
	})

    // FOREIGN KEY (requestor_id) REFERENCES users(id)

	// Request.belongsTo("beforeCreate", user => {
	// 	user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
	// })

	return Request
}
