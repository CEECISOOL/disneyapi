const { Router } = require('express');
const characters = require('./characterRoutes');
const router = Router();

router.use('/characters', characters);
/*router.use('/types', diets);
router.use('/recipe', recipe);*/

module.exports = router;
