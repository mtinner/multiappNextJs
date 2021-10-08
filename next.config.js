/** @type {import('next').NextConfig} */

const nextConfig = require("./src/server/nextConfig");
const pageMap = require("./src/server/applicationPages");
module.exports = {...nextConfig, pageExtensions: Object.values(pageMap)}
