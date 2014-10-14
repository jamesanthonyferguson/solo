'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  q: String,
  a: {
    1: String,
    2: String,
    3: String,
    4: String
  },
  correct: Number
});

module.exports = mongoose.model('Thing', ThingSchema);