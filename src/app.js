const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
require("./config/connection");

class App {
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(morgan(":method :url :response-time"));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

            this.app.use(cors());
            next();
        })
    }

    routes(){
        this.app.use(routes);
    }

}

module.exports = new App().app;
