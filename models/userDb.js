import sequelize from '../db.js';
import Sequelize from 'sequelize';
// import Todo from './todoDb';


var User = sequelize.define('userx', 
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true,
      allowNull:false
    },
    password: {
      type: Sequelize.STRING,
      notEmpty: true,
      allowNull:false
    }    
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  getterMethods   : {
      // all: function()  { return this.getDataValue('title') }
    }
  }
);


//----------------------------------------

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


//-----------------------------------------

User.hasMany(Todo);

User.sync().then(function () {});

Todo.belongsTo(User);

Todo.sync().then(function () {
  console.log('synced')
});

export { User, Todo };