/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');


Thing.find({}).remove(function() {
  Thing.create(
    {q: "Which is the oldest framework?", a: {1: "Backbone", 2: "Ember", 3: "Angular", 4: "React"}, correct: 2}, 
    {q: "Who designed Javascript?", a: {1: "Substack", 2: "John Stoppard", 3: "Brendan Eich", 4: "Henry Front"}, correct: 3}, 
    {q: "Which is not a Promise Library?", a: {1: "Q", 2: "Bluebird", 3: "JQuery", 4: "Deferred"}, correct: 4},  
    {q: "How many hours of coding is Hack Reactor?", a: {1: "540", 2: "650", 3: "760", 4: "820"}, correct: 2},
    {q: "What is 2 + true?", a: {1: "2", 2: "3", 3: "NaN", 4: "2true"}, correct: 2}, 
    {q: "What is the most popular language taught at Colleges?", a: {1: "Javascript", 2: "Java", 3: "MATLAB", 4: "Python"}, correct: 4}, 
    {q: "What is the solution of N Queens for 8?", a: {1: "92", 2: "64", 3: "352", 4: "724"}, correct: 1},  
    {q: "What data structure quickly says whether an instance is in a collection?", a: {1: "Hash Table", 2: "Graph", 3: "Bloom Filter", 4: "Hyper Log Log"}, correct: 3});
});

