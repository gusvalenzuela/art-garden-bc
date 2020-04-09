const express = require("express")
const passport = require("passport")
const session = require("express-session")
const db = require("./app/models")
const authRoute = require("./app/routes/auth.js")

const app = express()

var PORT = process.env.PORT || 8080

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("src"))

// Parse application body
app.use(
	express.urlencoded({
		extended: true,
	}),
)
app.use(express.json())

app.use(
	session({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: true,
	}),
) // session secret

app.use(passport.initialize())

app.use(passport.session())

var exphbs = require("express-handlebars")

app.engine(
	"handlebars",
	exphbs({
		defaultLayout: "main",
	}),
)
app.set("view engine", "handlebars")
app.set("views", __dirname + "/app/views")

app.get("/", (req, res) => {
	// console.log(`test`)
	res.render("index")
})

app.get("/testprofile", (req, res) => {
	// console.log(`test`)
	res.render("profile")
})

require(`./app/routes/artwork-api-routes`)(app)
require(`./app/routes/request-api-routes`)(app)
require(`./app/routes/user-api-routes`)(app)

authRoute(app, passport)

require("./app/config/passport.js")(passport, db.User)

db.sequelize.sync().then(
	app.listen(PORT, function () {
		console.log("App listening on PORT " + PORT)
	}),
)
