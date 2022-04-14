const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl

  console.log(`logger middleware, ${timestamp}, ${method}, ${url}`)
  next()
  // console.log('hitting it')
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
        // console.log('hitting it')
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
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({
      message: `missing required name field`
    })
  } else {
    req.name = name.trim()
    next()
    // console.log('hitting it')
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({
      message: `missing required text field`
    })
  } else {
    req.text = text.trim()
    next()
    // console.log('hitting it')
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}