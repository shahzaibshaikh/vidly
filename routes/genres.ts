import express from 'express';
import Joi from 'joi';
const router = express.Router();

// interfaces
interface Genre {
  id: number;
  name: string;
}

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' }
];

// Test route
router.get('/', (req, res) => {
  res.status(200).send('Server is up and running.');
});

// Get all genres route
router.get('/api/genres', (req, res) => {
  res.status(200).send(genres);
});

// Get specific genre route
router.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) res.status(404).send('Genre not found.');
  return res.status(200).send(genre);
});

// Post genre route
router.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.status(200).send(genre);
});

// Updating existing genre
router.put('/api/genres/:id', (req, res) => {
  const genre: Genre | undefined = genres.find(
    genre => genre.id === parseInt(req.params.id)
  );
  if (!genre) res.status(404).send('Genre does not exist.');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (genre) {
    genre.name = req.body.name;
    res.status(200).send(genre);
  }
});

router.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) res.status(404).send('Genre not found.');

  if (genre) {
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.status(200).send('Genre deleted.');
  }
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(genre);
}

export default router;
