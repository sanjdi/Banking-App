import 'dotenv/config';
import { app } from './app.js';
import { swaggerDocs } from './swagger.js';

const port: string | number = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Banking App is listening on -> http://localhost:${port}`);

  swaggerDocs(app, port);
});
