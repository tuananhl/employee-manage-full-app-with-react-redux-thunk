require('dotenv').config();
const   express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        mongoose = require('mongoose');

// Define app 
const app = express();
const middlewares = [
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
];

app.use(...middlewares);
//db config
const dbConfig = require('./config/database.config');
mongoose.Promise = global.Promise;
// connect to database
const urlConnect = dbConfig.url(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_PORT);
mongoose.connect(urlConnect, { useNewUrlParser: true, useFindAndModify: false }).then(() => {
    // define a simple route
    app.get('/', (req, res) => {
        res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    });
    require('./app/routes/employee.route')(app);
    // listen for requests
    app.listen(process.env.API_PORT, () => {
        console.log(`Server is listening on port ${ process.env.API_PORT }`);
    });
})