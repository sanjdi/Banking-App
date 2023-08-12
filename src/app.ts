import express from 'express';
import bodyParser from 'body-parser';
import { router as calculatorRoutes } from './routes/calculatorRoutes.js';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Deposit Calculator API!');
});

app.use('/api/calculators', calculatorRoutes);

export { app };
