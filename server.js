import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import todos from './routes/todos.js';
import users from './routes/users.js';
import Router from 'koa-router';
import cors from 'koa-cors';

export const app = new Koa();
const router = new Router();

app.use(bodyparser());
app.use(cors());

app.use(async (ctx, next) => {
	try {
		await next();
	}
	catch (err) {
		ctx.status = 500;
		ctx.body = err.message;
	}
});

router.use(todos.routes(), todos.allowedMethods());
router.use(users.routes(), users.allowedMethods());

app.use(router.routes());
app.listen(3000);
