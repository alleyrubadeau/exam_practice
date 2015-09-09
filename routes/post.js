var express = require('express')
var router = express.Router()
var db = require('monk')('localhost/post-demo')
var post = db.get('post')
var mustache = require('mustache')

router.get('/', function(req, res, next) {
  post.find({}, function (err, docs) {
    res.render('post/home', {post: docs})
  })
});

router.post('/', function (req, res, next) {
  post.insert(req.body)
  post.find({}, function (err, docs) {
    res.render('post/home', {post: docs})
  })
})

router.get('/post/new', function(req, res, next) {
  res.render('post/new')
})

router.get('/:id', function (req, res, next) {
  post.find({_id: req.params.id}, function (err, doc) {
    res.render('post/show', {post: doc})
  })
})

router.get('/:id/update', function (req, res, next) {
  post.findOne({_id: req.params.id}, function (err, doc) {
    res.render('post/update', {post: doc})
  })
})

router.post('/:id/update', function (req, res, next) {
  post.update({_id: req.params.id})
  res.redirect('/post')
})

router.post('/:id/delete', function (req, res, next) {
  post.remove({_id: req.params.id}, function (err, record) {
    res.redirect('/post')
  })
})

//if form is submitted and stuff is not entered right throw error. minimal positioning
//a few colors, associations and nested resources. comments on posts storing to a database. comments will be nested resource.
//create a todo list with nested resources.  Create lists and add items to lists as nested resources and without. Items belong to list so in mongo they would be nested resources.  

module.exports = router;
