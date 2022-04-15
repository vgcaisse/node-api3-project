const express = require('express');

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const User = require('./users-model')
const Post = require('../posts/posts-model')

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      res.json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert({ name: req.name }) 
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, { name: req.name })
    .then(() => {
      return User.getById(req.params.id)
    })
    .then(user => {
      res.json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
    .then(() => {
      res.json(req.user)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
    .then(() => {
      return User.getUserPosts(req.params.id)
    })
    .then(posts => {
      res.json(posts)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // Post.insert({ name: req.text, user_id: req.params.id }) 
  //   .then(newPost => {
  //     res.status(201).json(newPost)
  //   })
  //   .catch(next)
  try {
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text,
    })
    res.status(201).json(result)
  }
  catch (err) { next(err) }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    CustomMessage: `le monkes are on it!!`,         // epicn gaben helpin outin
    stack: err.stack
  })
})

// do not forget to export the router
module.exports = router