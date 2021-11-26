const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', routes);


app.listen(3001, () => {
    console.log('Server listing on port 3001');
});