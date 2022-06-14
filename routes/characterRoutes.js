const { Router } = require('express');
const { Character, Movie } = require('../db');
const router = Router();

const getDbInfo = async () => {
  const dbInfo = await Character.findAll()
  return dbInfo
}

router.get('/', async (req, res) => {
  const name = req.query.name
  const age = req.query.age
  const allCharacters = await getDbInfo();
  if (name) {
    let charactersName = allCharacters.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    charactersName.length ?
      res.send(charactersName) :
      res.send("not found")
  }
  else if (age) {
    let charactersAge = allCharacters.filter(e => e.age.includes(age));
    charactersAge.length ?
      res.send(charactersAge) :
      res.send("not found")
  } else {
    res.status(200).send(allCharacters)
  }
})

router.post('/', async (req, res) => {
  const { name, age, weight, history, image } = req.body;

  let characterCreate = await Character.create({
    name,
    age,
    weight,
    history,
    image
  });

  //let moviesDb = await Movie.findAll({
  //where: {
  //name: movie,
  // }
  // });

  //await characterCreate.addMovie(moviesDb);
  res.send('Personaje cargado con exito');
})


router.get('/:idR', async (req, res) => {
  const { idR } = req.params;
  const allInfo = await getDbInfo();
  try {
    allInfo.forEach(el => {
      if (el.id == idR) {
        res.json({
          id: el.id,
          name: el.name,
          age: el.age,
          weight: el.weight,
          history: el.history,
          image: el.image
        });
      };
    });
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
