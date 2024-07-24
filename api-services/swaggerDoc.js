const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Event worktool api ',
      version: '1.0.0',
    },
    servers: [
        {
          url: 'http://localhost:3000',
          description: 'api server',
        },
    ],
  };
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./Routes/*.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);

  module.exports =  { swaggerUi , swaggerSpec } 