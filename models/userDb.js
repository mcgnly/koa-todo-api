import sequelize from '../db.js';
import Sequelize from 'sequelize';

var Users = sequelize.define('users', 
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    password: {
      type: Sequelize.STRING,
      notEmpty: true
    }    
  }, 
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  getterMethods   : {
      // all: function()  { return this.getDataValue('title') }
    }
  }
);

Users.sync().then(function () {});

export default Users;