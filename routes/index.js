var express = require('express');
var router = express.Router();
var devicecontroller = require('../controllers/devicecontroller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Choose Device' });
});

router.get('/laptop', function(req, res, next){
  res.render('layout_decision', {title : 'Laptop', title_top: 'Laptops', img_src: 'https://i.ibb.co/w4k1m3S/laptopupload.png'})
})
router.get('/phone', function(req, res, next){
  res.render('layout_decision', {title : 'Phone', title_top: 'Phones', img_src: 'https://mockuphone.com/static/images/devices/apple-iphone5c-blue-side1.png'})
})
router.get('/tablet', function(req, res, next){
  res.render('layout_decision', {title : 'Tablet', title_top: 'Tablets', img_src: 'https://images.vexels.com/media/users/3/127704/isolated/preview/5d943e8bfc31f753b94aee72cde379f1-flat-tab-device-icon-by-vexels.png'})
})
router.get('/laptop/add', function(req, res, next){
  res.render('form', {title: 'Add Laptop', device: 'Laptop'})
})
router.post('/laptop/add', devicecontroller.laptop_create_post)


router.get('/tablet/add', function(req, res, next){
  res.render('form', {title: 'Add Tablet', device: 'Tablet'})
})
router.post('/tablet/add', devicecontroller.tablet_create_post)


router.get('/phone/add', function(req, res, next){
  res.render('form', {title: 'Add Phone', device: 'Phone'})
})
router.post('/phone/add', devicecontroller.phone_create_post)


router.get('/laptop/view/all', devicecontroller.laptop_list)

router.get('/phone/view/all', devicecontroller.phone_list)

router.get('/tablet/view/all', devicecontroller.tablet_list)

router.get('/tablet/view/:id', devicecontroller.tablet_detail)

router.get('/phone/view/:id', devicecontroller.phone_detail)

router.get('/laptop/view/:id', devicecontroller.laptop_detail)

router.get('/phone/view/:id/delete', devicecontroller.delete_phone);
router.post('/phone/view/:id/delete', devicecontroller.phone_delete_post);

router.get('/tablet/view/:id/delete', devicecontroller.delete_tablet);
router.post('/tablet/view/:id/delete', devicecontroller.tablet_delete_post);

router.get('/laptop/view/:id/delete', devicecontroller.delete_laptop);
router.post('/laptop/view/:id/delete', devicecontroller.laptop_delete_post);
module.exports = router;

