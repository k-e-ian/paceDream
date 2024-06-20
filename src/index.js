import express, { json } from 'express';
import cors from "cors"
const app = express();
const port = 3000;

import reviewRoutes from './routes/reviews.js';

app.use(json());
app.use(cors());

app.get('/', (_req, res) => {
    res.send('Hello PaceDreamers!');
  });
// Use the review routes
app.use('/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

  