import Router from 'koa-router';
import Todo from '../db.js';

const router = new Router()

// const todos = []

router.get('/', async ctx => {//really this is /todos/
  await Todo.findAll().then((todos)=>{
  	ctx.body = JSON.stringify(todos[0].all);
  })
})


router.post('/', async ctx => {
    console.log('the request is: ', ctx.request.body)
  const title = ctx.request.body.title
  // todos.push({title: title, completed: false})
  Todo.create({title:title})
  	.then((createdTodo)=>{
  		console.log('the name of the created todo is: ', createdTodo);
  	});
  ctx.status = 201
})


export default router