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

var Todo = sequelize.define('task', 
  {
    title: {
      type: Sequelize.STRING
    },
    completed: {//note to self: postgres hates camelcase, put it in quotes when you query for it
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  getterMethods   : {
      all: function()  { return this.title + ' ' + this.id + ' ' + this.completed }
    }
  }
);

Todo.sync().then(function () {
  // Table created
  // return User.create({
  //   firstName: 'John',
  //   lastName: 'Hancock'
  // });
});

export default Todo;