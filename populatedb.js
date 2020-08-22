#! /usr/bin/env node

console.log('This script populates some test devices to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Phone = require('./models/phone')
var Tablet = require('./models/tablet')
var Laptop = require('./models/laptop')



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var laptops = []
var phones = []
var tablets = []

function laptopCreate(model, brand, value, quantity, cb) {
  laptopdetail = {model: model, brand: brand, value: value, quantity: quantity}
  
  var laptop = new Laptop(laptopdetail);
       
  laptop.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Laptop: ' + laptop);
    laptops.push(laptop)
    cb(null, laptop)
  }  );
}
function phoneCreate(model, brand, value, quantity, cb) {
  phonedetail = {model: model, brand: brand, value: value, quantity: quantity}
  //if (d_birth != false) authordetail.date_of_birth = d_birth
  //if (d_death != false) authordetail.date_of_death = d_death
  
  var phone = new Phone(phonedetail);
       
  phone.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Phone: ' + phone);
    phones.push(phone)
    cb(null, phone)
  }  );
}
function tabletCreate(model, brand, value, quantity, cb) {
  tabletdetail = {model: model, brand: brand, value: value, quantity: quantity}
  //if (d_birth != false) authordetail.date_of_birth = d_birth
  //if (d_death != false) authordetail.date_of_death = d_death
  
  var tablet = new Tablet(tabletdetail);
       
  tablet.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Tablet: ' + tablet);
    tablets.push(tablet)
    cb(null, tablet)
  }  );
}

function createLaptops(cb) {
    async.series([
        function(callback) {
          laptopCreate('Macbook Pro', 'Apple', 1000, 1, callback)
        },
        function(callback) {
          laptopCreate('Notebook', 'Samsung', 3000, 3,callback);
        },
        function(callback) {
          laptopCreate('Macbook Air', 'Apple', 900, 1, callback);
        },
        function(callback) {
          laptopCreate('Pavillion', 'HP', 300, 1, callback);
        }],
        // optional callback
        cb);
}


function createPhones(cb) {
    async.parallel([
        function(callback) {
          phoneCreate('Iphone 11', 'Apple', 1000, 1, callback);
        },
        function(callback) {
          phoneCreate('S10', 'Samsung', 1000, 1, callback);
        }
        ],
        // optional callback
        cb);
}


function createTablets(cb) {
    async.parallel([
        function(callback) {
          tabletCreate('Ipad Pro','Apple', 1000, 1, callback)
        },
        function(callback) {
          tabletCreate('Ipad', 'Apple', 1000, 1, callback)
        },
        ],
        // Optional callback
        cb);
}



async.series([
    createLaptops,
    createPhones,
    createTablets
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Tablets: '+tablets);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

