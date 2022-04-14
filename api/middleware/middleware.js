const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl

  console.log(`logger middleware, ${timestamp}, ${method}, ${url}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  User.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: `user not found`
        })
      } else {
        req.user = user
        next()
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: `our top monkeys are on it!!`
      })
    })

}

// async function validateUserId(req, res, next) {
//   // DO YOUR MAGIC
//   try {
//     const user = await User.getById(req.params.id)
//     if(!user) {
//       res.status(404).json({
//         message: `user not found`
//       })
//     } else {
//       req.user = user
//       next()
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: `our top monkeys are on it!!`
//     })
//   }
// }

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log(`validateUser middleware`)
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log(`validatePost middleware`)
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}