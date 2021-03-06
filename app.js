const express = require('express')
const app = express();
const routes = require('./routes')
const models = require('./models')

const morgan = require('morgan')
app.use(morgan('dev'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const nunjucks = require('nunjucks')
const env = nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);

models.db.sync({ force: false })
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));