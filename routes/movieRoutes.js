const { Router } = require('express');
const { Character, Movie } = require('../db');
const router = Router();

const getDbInfo = async () => {
    const dbInfo = await Movie.findAll()
    return dbInfo
  }
  
  router.get('/', async (req, res) => {
    const title = req.query.title
    const allMovies = await getDbInfo();
    if (title) {
      let moviesName = allMovies.filter(e => e.title.toLowerCase().includes(title.toLowerCase()));
      moviesName.length ?
        res.send(moviesName) :
        res.send("not found")
    }
    
     else {
      const nameImageCreatedDate = allMovies.map(e=>{
        return{        
          title: e.title,
          image: e.image,
          createdDate: e.createdDate
        }
        })   
        res.status(200).send(nameImageCreatedDate)
    }
  })
  
  router.post('/', async (req, res) => {
    const { title, createdDate, score, image } = req.body;
  
    let movieCreate = await Movie.create({
      title,
      createdDate,
      score,
      image
    });
  
    //let moviesDb = await Movie.findAll({
    //where: {
    //name: movie,
    // }
    // });
  
    //await characterCreate.addMovie(moviesDb);
    res.send('Pelicula cargada con exito');
  })
  
  router.get('/:idR', async (req, res) => {
    const { idR } = req.params;
    const allInfo = await getDbInfo();
    try {
      allInfo.forEach(el => {
        if (el.id == idR) {
          res.json({
            id: el.id,
            title: el.title,
            createdDate: el.createdDate,
            score: el.score,
            image: el.image
          });
        };
      });
    } catch (error) {
      console.log(error);
    }
  })
  
  router.put('/:id', async(req,res) =>{
    try{
      let id = req.params.id
      let { title, createdDate, score, image } = req.body
      await Movie.update(
        { title, createdDate, score, image},
        {
          where: {
            id
          }
        });
        res.status(200).send('Pelicula modificada exitosamente')
  
    } catch(error){
      res.status(404).send('No se pudo actualizar la pelicula')
    }
  })
  
  router.delete('/:id', async(req, res) =>{
    try{
      const {id} = req.params;
      await Movie.destroy({
        where: {
          id,
        }
      });
      res.status(200).send('Pelicula borrada exitosamente')
    } catch(error){
      return res.status(404).json({message: error.message})
    }
  })
  

module.exports = router;
