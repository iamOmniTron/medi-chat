const {config} = require("dotenv");
if(process.env.NODE_ENV !== "production"){
    config({ path: __dirname + "/.env" });
}
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const {sequelize} = require("./models");
const router = require("./routes");

const app = express();
(async function(){
    try {
      await sequelize.authenticate()
      console.log("Connection to database established");
      // await sequelize.sync({force:true});
      await sequelize.sync();
      console.log("database synchronized");
    } catch (error) {
      console.log(error.message)
    }
  })();

app.set("views", path.join(__dirname, "views"));

app.use(express.static("./public"));

// app.use(favicon(__dirname + "/public/favicon/favicon.ico"));
app.engine(
  "handlebars",
  exphbs({
    defaulLayout: "main",
    partialsDir: __dirname + '/views/partials/'
  })
);
app.set("view engine", "handlebars");

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new SequelizeStore({
      db:sequelize
    }),
    cookie: { httpOnly: true, maxAge: 43200000, secure: false },
}))

app.use("/",router);

app.use((err,req,res,next)=>{
    if(err){
        console.log(err);
        res.status(500).json({
            error:err.message
        })
    }
})


module.exports = app;