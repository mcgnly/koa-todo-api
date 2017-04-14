import sequelize from '../db.js';
import Sequelize from 'sequelize';

var Todo = sequelize.define('task', 
  {
    // id: {
    //   primaryKey: true,
    //   type: Sequelize.UUIDV4,
    //   unique: true,
    //   defaultValue: Sequelize.UUIDV4
    // },
    title: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    completed: {//note to self: postgres hates camelcase, put it in quotes when you query for it
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    dateadded: {
    	type: Sequelize.DATE,
    	defaultValue: Sequelize.NOW
    },
    user: {
      type: Sequelize.UUID
    }
    // deadline: {
    // 	type: sequelize.DATE
    // },
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  getterMethods   : {
      all: function()  { return this.getDataValue('title') }
    }
  }
);

Todo.sync().then(function () {});

export default Todo;