var express = require('express')
var router = express.Router()
var db = require('monk')('localhost/post-demo')
var postCollection = db.get('post')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/post', function(req, res, next) {
  res.render('post/index')
});

router.get('/post/new', function(req, res, next) {
  res.render('post/new')
})

router.post('/post', function(req, res, next) {
  postCollection.insert({name: req.body.post_name})
  res.redirect('/post')
})

router.get('/post/:id', function (req, res, next) {
  postCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('post/show', {thePost: record, id: req.params.id})
  })
})

router.get('/post/:id/update', function (req, res, next) {
  postCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('post/update', {thePost: record, id: req.params.id})
  })
})

router.post('/post/:id/update', function (req, res, next) {
  postCollection.update({_id: req.params.id})
  res.redirect('/post')
})

router.post('/post/:id/delete', function (req, res, next) {
  postCollection.remove({_id: req.params.id}, function (err, record) {
    res.redirect('/post')
  })
})



module.exports = router;
