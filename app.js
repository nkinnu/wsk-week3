import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// mock data
const cats = [
  {cat_id: 1},
  {name: 'Misu'},
  {birthdate: '2020-01-01'},
  {weight: 4.5},
  {owner: 'John Doe'},
  {image: 'https://placecats.com/300/200'},
];

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/api/v1/cats', (req, res) => {
  res.json(cats);
});

app.use('/public', express.static('public'));
