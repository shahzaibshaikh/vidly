const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

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
app.get('/', (req, res) => {
  res.status(200).send('Server is up and running.');
});

// Get all genres route
app.get('/api/genres', (req, res) => {
  res.status(200).send(genres);
});

// Get specific genre route
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  return res.status(200).send(genre);
});

// Post genre route
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.status(200).send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(genre);
}

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
