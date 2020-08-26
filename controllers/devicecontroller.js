var Laptop = require('../models/laptop')
var Phone = require('../models/phone')
var Tablet = require('../models/tablet')
var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        laptop_count: function(callback) {
            Laptop.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        phone_count: function(callback) {
            Phone.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        tablet_count: function(callback) {
            Tablet.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    }, function(err, results) {
        res.render('data', { title: 'Data', error: err, data: results });
    });
};

// Display list of all Phones
exports.phone_list = function(req, res, next) {

    Phone.find()
    .then((list) => {
        res.render('device_list', {
            title: 'Smartphones',
            device_list: list,
        });
    });
      
  };

// Display detail page for a specific Phone.
exports.phone_detail = function (req, res, next) {
    Phone.findById(req.params.id).then((item) => {
        res.render('device_detail', { title:'Phone',id: req.params.id, url: '/phone/view/'+req.params.id, model: item.model, brand:item.brand, value: item.value, item });
    });
};

// Display list of all Books.
exports.tablet_list = function(req, res, next) {

    Tablet.find()
    .then((list) => {
        res.render('device_list', {
            title: 'Tablets',
            device_list: list,
        });
    });
    
};

// Display detail page for a specific book.
exports.tablet_detail = function (req, res, next) {
    Tablet.findById(req.params.id).then((item) => {
        res.render('device_detail', { title:'Tablet', id: req.params.id, url: '/tablet/view/'+req.params.id, model: item.model, brand:item.brand, value: item.value, item });
    });
};



// Display list of all Books.
exports.laptop_list = function(req, res, next) {

    Laptop.find()
    .then((list) => {
        res.render('device_list', {
            title: 'Laptops',
            device_list: list,
        });
    });
    
};

exports.laptop_detail = function (req, res, next) {
    Laptop.findById(req.params.id).then((item) => {
        res.render('device_detail', { title:'Laptop',id: req.params.id, model: item.model, brand:item.brand,url: '/laptop/view/'+req.params.id, value: item.value, item});
    });
};


exports.phone_create_post = function(req, res, next) {
    var phone = new Phone({
        model : req.body.model,
        brand : req.body.brand,
        value : req.body.value,
        quantity : req.body.value
        });
        phone.save(function (err) {
            if (err) { return next(err); }
                res.redirect(phone.url);
            })
        };

exports.tablet_create_post = function(req, res, next) {
    var tablet = new Tablet({
        model : req.body.model,
        brand : req.body.brand,
        value : req.body.value,
        quantity : req.body.value
        });
        tablet.save(function (err) {
            if (err) { return next(err); }
            // Successful - redirect to new author record.
            res.redirect(tablet.url);
        })
};
exports.laptop_create_post = function(req, res, next) {
    var laptop = new Laptop({
        model : req.body.model,
        brand : req.body.brand,
        value : req.body.value,
        quantity : req.body.value
    });
    laptop.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.redirect(laptop.url);
    })
};
exports.delete_phone = function(req, res){
    res.render('device_delete', { title: 'Delete Phone'});
}


exports.delete_tablet = function(req, res){
    res.render('device_delete', { title: 'Delete Tablet'});
}
exports.delete_laptop = function(req, res){
    res.render('device_delete', { title: 'Delete Laptop'});
}
exports.phone_delete_post = function(req,res){
Phone.findByIdAndRemove(req.params.id).then((deleted) => {
    res.redirect('/phone/view/all');
})
}
exports.tablet_delete_post = function(req,res){
Tablet.findByIdAndRemove(req.params.id).then((deleted) => {
    res.redirect('/tablet/view/all');
})
}
exports.laptop_delete_post = function(req,res){
    Laptop.findByIdAndRemove(req.params.id).then((deleted) => {
        res.redirect('/laptop/view/all');
    })
}

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};