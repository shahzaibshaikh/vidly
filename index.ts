import express from 'express';
import genresRouter from './routes/genres';

const app = express();

app.use(express.json());

app.use('/api/genres', genresRouter);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
