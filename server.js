import Koa from 'koa';
import todos from './routes/todos.js';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import keys from './secret-keys.js';
import Sequelize from 'sequelize';
 

export const app = new Koa();
const router = new Router();
var sequelize = new Sequelize(keys.dbName, keys.dbUsername, keys.dbPw, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
app.use(bodyparser());

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {//note to self: postgres hates camelcase, put it in quotes when you query for it
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});


router.use('/todos', todos.routes(), todos.allowedMethods());

app.use(router.routes());
app.listen(3000);
