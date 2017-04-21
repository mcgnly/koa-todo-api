import Router from 'koa-router';
// import Todo from '../models/todoDb.js';
import { User, Todo } from '../models/userDb.js';

const router = new Router();

router.get('/todos', async ctx => {
	const todos = await Todo.findAll();
  	ctx.body = JSON.stringify(todos[0].all);
})

router.post('/todos', async ctx => {
	const {body} = ctx.request;
	console.log('the request is: ', body, 'asstd user is: ', body.userId);
	const createdTodo = await Todo.create(
		{
			title:body.title
			// userId:body.userId//smart enough to make the plural users into singular
		});

	//update the user with the new todo
	const asstdUser = await User.findOne({id: body.userId});
	console.log('asstdUser', asstdUser)
	console.log('------------------------')
	asstdUser.addTodo(createdTodo).then((todo) => {
		console.log('------- the user should have a todo now??', todo)

	});
	//the alternative method is to take the finished createdTodo with a .then or here with async
		//and then setUser with the whole specific User object 
		//by doing a where or a find to get it based on the id or sth
		//OR a completedTodo.find({where: {id: sth}, include: [SpcfcUser]})
		// user:'010e6e86-88f3-4aeb-8a97-150dae82f48a'
	ctx.status = 201;//means created
})

router.patch('/todos/toggle', async ctx => {
	const body = ctx.request.body;
	const todo = await Todo.findOne({id:body.id});
	console.log('toggling ', todo.name);
	const toggledTodo = await Todo.upsert({
		id:body.id,
		completed:!todo.completed
	});
	ctx.status = 200;//means OK
});

export default router