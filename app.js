const express = require('express')
const logger = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');

const postRoutes = require('./routes/post')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors())

app.use('/api/v1',postRoutes)

var serverPort = 1337
app.listen(serverPort, () => {
    console.log("server started at", serverPort)
});