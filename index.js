const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
const router = new Router();
const port = 3000;

//requires
const query = require('./src/db') //db connection
const bodyParser = require('koa-bodyparser');

//logging / app use
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(bodyParser())

router.get('/', async (ctx, next) => {
    ctx.body = await query("SELECT * FROM messages"); 
});

router.post('/:message', async (ctx, next) => {
    let msg = await ctx.params.message
    await query(`INSERT INTO messages(message) VALUES("${msg}")`);
    ctx.response.status = 201;
})

router.put('/:id', async (ctx, next) => {
    let id = await ctx.params.id
    let message = await ctx.query.message
    await query(`UPDATE messages SET message = "${message}" WHERE id = "${id}"`);
    ctx.response.status = 200;
})

router.del('/:id', async (ctx, next) => {
    let id = await ctx.params.id
    await query(`DELETE FROM messages WHERE id='${id}'`);
    ctx.response.status = 200;
})

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening to port: ${port}`)
app.listen(port);