// server.js
import next from "next";
import serve from "koa-static";
import Koa from 'koa';
import Router from "@koa/router";
/** @type {import('next').NextConfig} */
import * as nextConfig from './nextConfig';
import path from "path";

const publicFolder = path.join(__dirname + '../../../public')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev,customServer:true, conf:nextConfig,quiet: false});
const port = process.env.PORT?parseInt(process.env.PORT, 10) : 3000
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    router.all('(.*)', async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    console.log(publicFolder)
    server.use(serve( publicFolder));

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})