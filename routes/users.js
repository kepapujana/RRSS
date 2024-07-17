const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { authentication } = require("../middlewares/authentications");

router.post('/', UserController.create)
router.post('/login', UserController.login)
// router.delete("/logout", authentication, UserController.logout);
router.get('/info/:_id', authentication, UserController.getInfo)

module.exports = router