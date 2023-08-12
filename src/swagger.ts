import Express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Basic Meta information about API
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Banking App', version: '1.0.0' },
  },
  apis: ['./dist/src/routes/calculatorRoutes.js'],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup docs
export const swaggerDocs = (
  app: Express.Application,
  port: string | number
) => {
  // Route-Handler to visit docs
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make docs in JSON format available
  app.get('/api/docs.json', (req: Express.Request, res: Express.Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(
    `Banking App v1.0.0 API Docs are available at http://localhost:${port}/api/docs`
  );
};
