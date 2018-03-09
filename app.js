const express = require('express')
const app = express();

const morgan = require('morgan')
app.use(morgan('dev'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const nunjucks = require('nunjucks')
const env = nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

express.static('./public');

app.get('/', function (req, res, next){
    res.render('index')
})

app.listen(3000, console.log('Listening on Port 3000'))