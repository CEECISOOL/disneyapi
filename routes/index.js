const { Router } = require('express');
const characters = require('./characterRoutes');
const movies = require('./movieRoutes');
const router = Router();

router.use('/characters', characters);
router.use('/movies', movies);
/*router.use('/recipe', recipe);*/

module.exports = router;
