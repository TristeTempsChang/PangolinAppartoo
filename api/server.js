var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var authenticationController = require("./controllers/authentication");

mongoose.connect('mongodb+srv://admin:admin@cluster0.aw7iryy.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

var app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.route('/login')
    .post(authenticationController.login)

router.route('/user')
    .post(authenticationController.postUser)

app.use('/api', router);

app.listen(port);
console.log('ça tourne !!!')