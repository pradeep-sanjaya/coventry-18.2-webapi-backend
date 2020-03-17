import mongoose from 'mongoose';

import config from '../../config/config';
import logger from '../logger';

export default async function initializeDB() {
    const dbUrl = `${config.databaseUrl}/${config.databaseName}`;

    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        logger().info(`Connected to  ${dbUrl}`);

        console.log('Connected to %s', dbUrl);
        console.log('Backend is up and running... \n');
    }).catch((error) => {
        logger().info(`App starting error:  ${error.message}`);
        console.error('App starting error:', error.message);

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
