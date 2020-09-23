'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    dsId: String,
    username: String
 });


module.exports = mongoose.model('User', userSchema);