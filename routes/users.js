// import Users from '../models/userDb.js';
// import Router from 'koa-router';

// const router = new Router();

// router.post('/createUser', async ctx => {
// 	console.log('the request is: ', ctx.request.body)
// 	const body = ctx.request.body
// 	const createdUser = await Users.create({name:body.name});
// 	ctx.body = JSON.stringify(createdUser);
// 	ctx.status = 201;
// })

// router.get('/users', async ctx => {//really this is /todos/
// 	const users = await Users.findAll();
//   	ctx.body = JSON.stringify(users[0].all);
// })

// export default router