const User = require('../models/User')
const Token = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys.js')

const UserController = {
  //register
  create(req, res) {
    req.body.role = 'user'

    const passwordEncripted = bcrypt.hashSync(req.body.password, 10)

    User.create({ ...req.body, password: passwordEncripted })
      .then((user) =>
        res.status(201).send({ message: 'Usuario creado con éxito', user })
      )
      .catch((err) => console.error(err))
  },
 

  //login
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      })

      const token = jwt.sign({ _id: user._id }, jwt_secret)
      if (user.tokens.length > 4) user.tokens.shift()
      user.tokens.push(token)

      await user.save()
      res.send({ message: 'Bienvenid@ ' + user.name, token })
    } catch (error) {
      console.error(error)
    }
  },
 
  // //logout
  // async logout(req, res) {
  //   try {
  //     await User.findByIdAndUpdate(req.user._id, {
  //       $pull: { tokens: req.headers.authorization },
  //     })
  //     res.send({ message: 'Desconectado con éxito' })
  //   } catch (error) {
  //     console.error(error)
  //     res.status(500).send({
  //       message: 'Hubo un problema al intentar desconectar al usuario',
  //     })
  //   }
  // },

  //traer user info por id
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id)
      .populate({
        path: 'postIds',
        populate: {
          path: 'commentIds',
        },
      })

      res.send(user)
    } catch (error) {
      console.error(error)
    }
  },
 
 

}
module.exports = UserController