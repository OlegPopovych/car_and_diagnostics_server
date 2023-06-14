const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

if (process.env.NODE_ENV !== "production") {
	// Load environment variables from .env file in non prod environments
	require("dotenv").config();
}
require("./utils/connectdb");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");

//add new connection
const dbo = require("./utils/newConnection");

const userRouter = require("./routes/userRoutes");
const carRouter = require("./routes/carRoutes");
const cartsRouter = require("./routes/cartsRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
	? process.env.WHITELISTED_DOMAINS.split(",")
	: [];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},

	credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use(express.static('public'));
app.use('/images', express.static('images'));  //http://localhost:8081/images/615050.png

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/diagnostic", cartsRouter);

app.get("/", function (req, res) {
	res.send({ status: "success" });
});

//Start the server in port 8081

// const server = app.listen(process.env.PORT || 8081, function () {
// 	const port = server.address().port;

// 	console.log("App started at port:", port);
// });
dbo.connectToServer(function (err) {
	if (err) {
		console.error(err);
		process.exit();
	}

	// start the Express server
	const server = app.listen(process.env.PORT || 8081, function () {
		const port = server.address().port;

		console.log("App started at port:", port);
	});
});