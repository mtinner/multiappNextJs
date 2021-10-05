// server.js
import {createServer} from "http";
import next from "next";
import {parse} from "url";


const dev = process.env.NODE_ENV !== 'production'
const appOne = next({dev, dir: "./packages/a", conf: {basePath: '/a'}, quiet: false});
const oneHandle = appOne.getRequestHandler();

const appTwo = next({dev, dir: "./packages/b", conf: {basePath: '/b'}, quiet: false});
const twoHandle = appTwo.getRequestHandler();

// setup the next apps
// commenting one out will allow the server
// to start
const nextAppPromises = Promise.all([
    appOne.prepare(),
    appTwo.prepare()
]);


nextAppPromises.then((started) => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url??'', true);
        const {pathname, query} = parsedUrl;
        if (pathname?.includes('/a')) {
            console.log('a')
            oneHandle(req, res, parsedUrl)
        } else if (pathname?.includes('/b')) {
            console.log('b')
            twoHandle(req, res, parsedUrl)
        } else {
            console.log('alll')
            oneHandle(req, res, parsedUrl)
        }
    }).listen(3000, () => {
        console.log('> Ready on http://localhost:3000')
    })
})