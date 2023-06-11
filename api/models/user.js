var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
  status: {type: String},
  email: {type: String, required: true},
  prenom: {type: String},
  nom: {type: String},
  adresse: {type: String},
  ville: {type: String},
  pays: {type: String},
  codePostal: {type: String},
  bio: {type: String}
});

module.exports = mongoose.model('Users', userSchema);