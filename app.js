const express = require('express')
const app = express();
const routes = require('./routes')

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

app.use('/', routes);

const models = require('./models')

models.db.sync({force: true})
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));