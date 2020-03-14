import swaggerJsdoc from 'swagger-jsdoc';

const options = {
	apis: ['./routes/*.js'],
	basePath: '/',
	swaggerDefinition: {
		info: {
			description: 'Automated API Documentation for Clothes store',
			swagger: '2.0',
			title: 'Backend API Documentation',
			version: '1.0.0',
		}
	}
};
const specs = swaggerJsdoc(options);

export default specs;
