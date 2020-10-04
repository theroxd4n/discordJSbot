'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const reminderSchema = new Schema({
    message: String,
    date : Date,
    user : { type: Schema.ObjectId, ref: "User" } 
 });

module.exports = mongoose.model('Reminder', reminderSchema);