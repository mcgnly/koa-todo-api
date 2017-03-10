import Router from 'koa-router';
import Todo from './db.js';

const router = new Router()

// const todos = []

router.get('/', async ctx => {
  ctx.body = todos
})


router.post('/', async ctx => {
    console.log(ctx.request)
  const title = ctx.request.body.title
  todos.push({title: title, completed: false})
  ctx.status = 201
})


export default router