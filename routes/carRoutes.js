const express = require("express");
const routerCar = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const dbo = require('../utils/newConnection');

const { verifyUser } = require("../authenticate");

routerCar.post("/createnew", verifyUser, (req, res, next) => {

	const dbConnect = dbo.getDb();
	const matchDocument = {
		vin: req.body.vin,
		carNumber: req.body.carNumber,
		description: req.body.description,
		model: req.body.model,
		group: req.body.group,
		create_date: new Date()
	};

	dbConnect
		.collection('cars')
		.insertOne(matchDocument, function (err, result) {
			if (err) {
				res.status(400).send('Error inserting matches!');
			} else {
				console.log(`Added a new match with id ${result.insertedId}`);
				res.status(204).send();
			}
		});
	// console.log(req.body);
	// res.send(req.body);
});

routerCar.get("/getcarlist", verifyUser, (req, res, next) => {
	// console.log(`req ${req}`);
	const dbConnect = dbo.getDb();

	dbConnect
		.collection('cars')
		.find({})
		.limit(50)
		.toArray(function (err, result) {
			if (err) {
				res.status(400).send('Error fetching listings!');
			} else {
				res.json(result);
			}
		});
	// console.log(req.body);
	// res.send(req.body);
});

routerCar.get("/car/:vin", verifyUser, (req, res, next) => {
	console.log(`req ${req.params.vin}`);
	const dbConnect = dbo.getDb();

	dbConnect
		.collection('cars')
		.findOne({ vin: req.params.vin })
		.then((result, err) => {
			if (result) {
				console.log(`Found a listing in the collection with the vin '${req.params.vin}'`);
				console.log("result", result);
				res.json(result);
			} else {
				console.log("error", err);
			};
		})

});

module.exports = routerCar;