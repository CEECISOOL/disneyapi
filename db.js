require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/disneyapi`, {
  logging: false, 
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Character, Genre, Movie } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Character.belongsToMany(Movie, {through: 'character_movie'})
Movie.belongsToMany(Character, {through: 'character_movie'})

Movie.belongsToMany(Genre, {through: 'movie_genre'})
Genre.belongsToMany(Movie, {through: 'movie_genre'})

module.exports = {
  ...sequelize.models,
  conn: sequelize,  
};

