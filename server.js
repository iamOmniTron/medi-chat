const app = require("./app");
const Http = require("http");
const SERVER_PORT = 8080;

Http.createServer(app).listen(SERVER_PORT,()=> console.log(`SERVER UP AND RUNNING ON PORT ${SERVER_PORT}...`));
