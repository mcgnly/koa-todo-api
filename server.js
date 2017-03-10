import Koa from 'koa';
import todos from './routes/todos.js';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';

export const app = new Koa();
const router = new Router();

app.use(bodyparser());



router.use('/todos', todos.routes(), todos.allowedMethods());

app.use(router.routes());
app.listen(3000);
