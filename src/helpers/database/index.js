import mongoose from 'mongoose';

import config from '../../config/config';
import logger from '../logger';

export default async function makeDb() {
	mongoose.connect(config.databaseUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(() => {
		logger().info(`Connected to  ${config.databaseUrl}`);

		console.log('Connected to %s', config.databaseUrl);
		console.log('Backend is up and running... \n');
	}).catch(err => {
		logger().info(`App starting error:  ${err.message}`);
		console.error('App starting error:', err.message);

		process.exit(1);
	});
	let database = mongoose.connection;

	database.once('open', () => console.log('Connected to the database'));

	// checks if connection with the database is successful
	database.on('error', () => {
		logger().info('Connection error');
		console.log('Mongo db connection error');
	});

	return database;
}
