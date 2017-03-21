import Router from 'koa-router';
import Todo from '../models/todoDb.js';
import Users from '../models/userDb.js';

const router = new Router();

router.get('/todos', async ctx => {//really this is /todos/
	const todos = await Todo.findAll();
  	ctx.body = JSON.stringify(todos[0].all);
})

router.post('/todos', async ctx => {
	console.log('the request is: ', ctx.request.body)
	const title = ctx.request.body
	const createdTodo = await Todo.create({title:title.title});
	// console.log('the name of the created todo is: ', createdTodo);
	ctx.status = 201;
})

// router.patch()

router.delete('/', async ctx => {
	const numRowsDeleted = await Todo.destroy({where: {title:{notEmpty: false}}})
	console.log('number of rows deleted: ', numRowsDeleted)
})

router.post('/users', async ctx => {
	console.log('the request is: ', ctx.request.body)
	const body = ctx.request.body
	const createdUser = await Users.create({name:body.name});
	ctx.body = JSON.stringify(createdUser);
	ctx.status = 201;
})

router.get('/users', async ctx => {//really this is /todos/
	const users = await Users.findAll();
  	ctx.body = users[0];
})


export default router