import sequelize from '../db.js';
import Sequelize from 'sequelize';
// import Users from './userDb';
  //decided against keeping the info in the task, so to avoid a circular import
    //I have to remove it here, but keeping the notes
    //or, I could do all the definitions in one file and then have them cross-reference
    //but at the moment I would rather keep them modular and store the task info on the user

var Todo = sequelize.define('todo', 
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1
    },
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
    }
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    getterMethods   : {
      all: function()  { return this.getDataValue('title') }
    }
  });


//foreignKey thing makes sure every task comes with a userId
//normally if you deleted the user it would set the userId to NULL,
  //so you have to cascade the delete to also delete the users tasks
// Todo.belongsTo(Users, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Todo.sync().then(function () {
  console.log('synced')
});

export default Todo;