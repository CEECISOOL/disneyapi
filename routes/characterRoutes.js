const { Router } = require('express');
const { Character, Movie } = require('../db');
const router = Router();

const getDbInfo = async () => {
 const db = await Character.findAll({
  include: {
      model: Movie,
      attributes: ['title'],
      through: {
          attributes: [],
      }
  }
});
console.log (db)

return db

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
    const nameImage = allCharacters.map(e => {
      return {
        name: e.name,
        image: e.image
      }
    })
    res.status(200).send(nameImage)

  }
})

router.post('/', async (req, res) => {
  const { name, age, weight, history, image, movie } = req.body;

  let characterCreate = await Character.create({
    name,
    age,
    weight,
    history,
    image
  });

  let moviesDb = await Movie.findAll({
    where: {
      title: movie,
    }
  });

  const final = await characterCreate.addMovie(moviesDb);
  res.send(final);
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

router.put('/:id', async (req, res) => {
  try {
    let id = req.params.id
    let { name, age, weight, history, image } = req.body
    await Character.update(
      { name, age, weight, history, image },
      {
        where: {
          id
        }
      });
    res.status(200).send('Personaje modificado exitosamente')

  } catch (error) {
    res.status(404).send('No se pudo actualizar el personaje')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Character.destroy({
      where: {
        id,
      }
    });
    res.status(200).send('Personaje borrado exitosamente')
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
})

module.exports = router;
