import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.static('public'));

// mock data
const cats = [
  {cat_id: 1},
  {name: 'Misu'},
  {birthdate: '2027-01-01'},
  {weight: 3.5},
  {owner: 'John Doe'},
  {image: 'https://placecats.com/300/200'},
];

app.get = (req, res) => {
  res.json(cats);
};
