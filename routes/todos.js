import Router from 'koa-router';
import Todo from '../models/todoDb.js';
// import Users from '../models/userDb.js';

const router = new Router();

router.get('/todos', async ctx => {
	const todos = await Todo.findAll();
  	ctx.body = JSON.stringify(todos[0].all);
})

router.post('/todos', async ctx => {
	console.log('the request is: ', ctx.request.body)
	const body = ctx.request.body
	const createdTodo = await Todo.create({
		title:body.title,
		user:body.user
		// user:'010e6e86-88f3-4aeb-8a97-150dae82f48a'
	});
	ctx.status = 201;//means created
})

router.patch('/todos/toggle', async ctx => {
	const body = ctx.request.body;
	const task = await Todo.findOne({id:body.id});
	console.log('toggling ', task.name);
	const toggledTodo = await Todo.upsert({
		id:body.id,
		completed:!task.completed
	});
	ctx.status = 200;//means OK
});

export default router