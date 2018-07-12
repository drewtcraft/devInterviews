const express = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;
const router = require('./routes/routes.js')
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.get('/', (req,res)=>res.send('fuyckoff'))


app.use('/express', router)



app.listen(port, () => console.log(`Listening on port ${port}`));
