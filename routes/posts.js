const express = require("express")
const router = express.Router()
const PostController = require("../controllers/PostController")
const { authentication } = require("../middlewares/authentications");

router.post('/', authentication, PostController.create)
router.put('/:_id', authentication, PostController.update)
router.delete('/:_id', authentication, PostController.delete)
router.get('/', PostController.getAll)
router.get('/username/:username', PostController.getPostByName)
router.get('/id/:_id', PostController.getById)
router.put('/comments/:_id', authentication, PostController.insertComment)


module.exports = router