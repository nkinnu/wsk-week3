// mock data
const cats = [
  {
    cat_id: 1,
    name: 'Misu',
    birthdate: '2020-01-01',
    weight: 4.5,
    owner: 'John Doe',
    image: 'https://placecats.com/300/200',
  },
  {
    cat_id: 2,
    name: 'Luna',
    birthdate: '2019-05-15',
    weight: 3.2,
    owner: 'Jane Smith',
    image: 'https://placecats.com/300/200',
  },
  {
    cat_id: 3,
    name: 'Simba',
    birthdate: '2021-03-10',
    weight: 5.0,
    owner: 'Alice Johnson',
    image: 'https://placecats.com/300/200',
  },
];

function listAllCats() {
  return cats;
}

function findCatById(id) {
  return cats.find((item) => item.cat_id === id);
}

function addCat(cat) {
  const {name, birthdate, weight, owner, image} = cat;
  const newId = cats[cats.length - 1].cat_id + 1;

  cats.push({
    cat_id: newId,
    name,
    birthdate,
    weight,
    owner,
    image,
  });

  return newId;
}

export {listAllCats, findCatById, addCat};
