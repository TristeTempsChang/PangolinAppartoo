var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var authenticationController = require("./controllers/authentication");
var auth = require("./middleware/token")

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
    .get(authenticationController.getUser)

router.route('/userById/:user_id')
    .get(authenticationController.getUserById)
    .post(authenticationController.updateUser)
    .delete(authenticationController.deleteUser)

router.route('/addFriend/:user_id')
    .post(authenticationController.addFriend);

router.route('/removeFriend/:user_id/:friend_id')
    .delete(authenticationController.removeFriend);

app.use('/api', router);

app.listen(port);
console.log('ça tourne !!!')