import mongoose from 'mongoose';

import config from '../../config/config';
import logger from '../logger';

export default async function initializeDB() {
    const dbUrl = `${config.databaseUrl}/${config.databaseName}?retryWrites=true&w=majority`;

    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        logger().info(`Connected to  ${dbUrl}`);
    }).catch((error) => {
        logger().info(`Database starting error:  ${error.message}`);

        process.exit(1);
    });

    let database = mongoose.connection;

    database.once('open', () => logger().info('Database connection is opened'));

    database.on('error', () => {
        logger().info('Database connection error');
    });

    return database;
}
