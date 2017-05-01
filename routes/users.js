import { User } from '../models/userDb.js';
import Router from 'koa-router';

const router = new Router();

router.post('/createUser', async ctx => {
	console.log('the request is: ', ctx.request.body)
	const body = ctx.request.body
	const createdUser = await User.create({
		name:body.name,
		password:body.password
	});
	ctx.body = JSON.stringify(createdUser);
	ctx.status = 201;
})

router.get('/users', async ctx => {//really this is /todos/
	const users = await User.findAll();
  	ctx.body = JSON.stringify(users[0].all);
})

router.get('/user/:id/todos', async ctx => {//really this is /todos/
	const userId = ctx.params.id;
	const asstdUser = await User.findOne({id: userId});
	console.log('------------------------')
	let todoArray = [];
	let todos = await asstdUser.getTodos()
	todos.forEach((item)=>{
		let singleTodo = {
			'id':item.dataValues.id,
			'title':item.dataValues.title,
			'date':item.dataValues.dateadded,
			'completed':item.dataValues.completed
		};
		todoArray.push(singleTodo);
	})
	ctx.body = {
		"user":ctx.params.id,
		"todos":todoArray
	};

		// ctx.status = 200;
})


export default router