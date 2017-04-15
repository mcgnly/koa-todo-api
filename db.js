import keys from './secret-keys.js';
import Sequelize from 'sequelize';

var sequelize = new Sequelize(keys.dbName, keys.dbUsername, keys.dbPw, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {//what does all this mean???
    max: 5,
    min: 0,
    idle: 10000
  }
});

export default sequelize;