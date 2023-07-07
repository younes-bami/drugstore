require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const drugstoreRoutes = require('./routes/drugstoreRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swagger/swaggerDefinition');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api', drugstoreRoutes);
app.use(errorMiddleware);

// Swagger setup
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Export your app
module.exports = app;

// Start your server only if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}