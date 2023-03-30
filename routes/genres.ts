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


// Get all genres route
router.get('/', (req, res) => {
  res.status(200).send(genres);
});

// Get specific genre route
router.get('/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) res.status(404).send('Genre not found.');
  return res.status(200).send(genre);
});

// Post genre route
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
