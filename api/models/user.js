var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true }
});

module.exports = mongoose.model('Users', userSchema);