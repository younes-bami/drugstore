// swaggerDefinition.js
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Drugstore Finder API',
      version: '1.0.0',
      description: 'APIs Documentation for the Drugstore Finder Application',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Local server',
      },
    ],
  };
  
  module.exports = swaggerDefinition;
  