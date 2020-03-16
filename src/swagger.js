import swaggerJsdoc from 'swagger-jsdoc';
import config from './config/config';

const options = {
    apis: ['src/routes/*.js'],
    basePath: '/',
    host: `localhost:${config.apiPort}`,
    swaggerDefinition: {
        info: {
            description: 'Automated API Documentation for Clothes store',
            title: 'Backend API Documentation',
            version: '1.0.0',
        }
    }
};
const specs = swaggerJsdoc(options);

export default specs;
