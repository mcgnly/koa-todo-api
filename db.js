import keys from './secret-keys.js';
import Sequelize from 'sequelize';

var sequelize = new Sequelize(keys.dbName, keys.dbUsername, keys.dbPw, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var Todo = sequelize.define('user', {
  task: {
    type: Sequelize.STRING
  },
  completed: {//note to self: postgres hates camelcase, put it in quotes when you query for it
    type: Sequelize.BOOLEAN
  },
  dateadded: {
  	type: Sequelize.DATE,
  	defaultValue: Sequelize.NOW
  }
  // deadline: {
  // 	type: sequelize.DATE
  // },
  // completed: {
  // 	type: sequelize.DATE
  // }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

export default Todo;