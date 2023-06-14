const express = require("express");
const routerCarts = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const dbo = require('../utils/newConnection');

const { verifyUser } = require("../authenticate");

routerCarts.post("/createnew", verifyUser, (req, res, next) => {

	const dbConnect = dbo.getDb();
	const matchDocument = {
		vin: req.body.vin,
		cartsItems: req.body.cartsItems,
		author: req.body.author,
		create_date: new Date()
	};
	//id, name, checked, count, description, group, positionInIllustration
	dbConnect
		.collection('carts')
		.insertOne(matchDocument, function (err, result) {
			if (err) {
				res.status(400).send('Error inserting matches!');
			} else {
				console.log(`Added a new diagnostic with id ${result.insertedId}`);
				res.status(204).send();
			}
		});
	// console.log(req.body);
	// res.send(req.body);
});

// routerCarts.get("/get", verifyUser, (req, res, next) => {
// 	// console.log(`req ${req}`);
// 	const dbConnect = dbo.getDb();

// 	dbConnect
// 		.collection('cars')
// 		.find({})
// 		.limit(50)
// 		.toArray(function (err, result) {
// 			if (err) {
// 				res.status(400).send('Error fetching list!');
// 			} else {
// 				res.json(result);
// 			}
// 		});
// 	// console.log(req.body);
// 	// res.send(req.body);
// });

routerCarts.get("/:vin", verifyUser, (req, res, next) => {
	console.log(`req ${req.params.vin}`);
	const dbConnect = dbo.getDb();

	dbConnect
		.collection('carts')
		.find({ vin: req.params.vin })
		.limit(50)
		.toArray(function (err, result) {
			if (err) {
				res.status(400).send('Error fetching list with diagnostics!');
			} else {
				res.json(result);
			}
		});
	// console.log(req.body);
	// res.send(req.body);

});

// routerCarts.get("/car/diagnostic/:group", verifyUser, (req, res, next) => {
// 	console.log(`req catalogue ${req.params.group}`);
// 	const dbConnect = dbo.getDb();

// 	dbConnect
// 		.collection('catalogue')
// 		.findOne({ groupOfVehicles: req.params.group })
// 		.then((result, err) => {
// 			if (result) {
// 				console.log(`Found a listing in the collection with the group '${req.params.group}'`);
// 				console.log("result", result);
// 				res.json(result);
// 			} else {
// 				console.log("error", err);
// 			};
// 		})

// });

module.exports = routerCarts;