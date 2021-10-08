/** @type {import('next').NextConfig} */

const pageMap = require("./applicationPages");
module.exports = (function() {
    const pageExtensions = Object.entries(pageMap)
        .map(([key, value]) => process.env[`BUILD_${key}`] ? value : undefined)
        .filter((value)=> value);

    return {
        basePath: '/play',
        reactStrictMode: true,
        distDir: 'build',
        pageExtensions: [pageMap.CorePages,pageMap.CoreApi, ...pageExtensions]
    }
})();

