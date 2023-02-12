const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
const client = new MongoClient(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
	connectToServer: function (callback) {
		client.connect(function (err, db) {
			if (err || !db) {
				return callback(err);
			}

			dbConnection = db.db('pass_test');
			console.log('Successfully connected to MongoDB.');

			return callback();
		});
	},

	getDb: function () {
		return dbConnection;
	},
};







// const { MongoClient } = require('mongodb');

// export default async function postNewCar(data) {
// 	/**
// 	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
// 	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
// 	 */
// 	const uri = process.env.MONGO_DB_CONNECTION_STRING;


// 	const client = new MongoClient(uri);

// 	async function listDatabases(client) {
// 		databasesList = await client.db().admin().listDatabases();

// 		console.log("Databases:");
// 		databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// 	};

// 	try {
// 		// Connect to the MongoDB cluster
// 		await client.connect();
// 		createListing(client, data);
// 		// database and collection code goes here
// 		// insert code goes here
// 		// display the results of your operation
// 		// Make the appropriate DB calls
// 		await listDatabases(client);

// 	} catch (e) {
// 		console.error(e);
// 	} finally {
// 		await client.close();
// 	}
// }

// // main().catch(console.error);

// async function createListing(client, newListing) {
// 	// See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
// 	const result = await client.db("pass_test").collection("cars").insertOne(newListing);
// 	console.log(`New listing created with the following id: ${result.insertedId}`);
// }