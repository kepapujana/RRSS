const Post = require('../models/Post')

const PostController = {

 //crear post   
 async create(req, res) {
   try {
     const post = await Post.create(req.body)
     res.status(201).send(post)
   } catch (error) {
     console.error(error)
     res
       .status(500)
       .send({ message: 'Ha habido un problema al crear el post' })
   }
 },

 //actualizar post
 async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      )
      res.send({ message: 'post successfully updated', post })
    } catch (error) {
      console.error(error)
    }
  }, 

  //eliminar post
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id)
      res.send({ post, message: 'Post deleted' })
    } catch (error) {
      console.error(error)
      res.status(500).send({
          message: 'there was a problem trying to remove the post',
        })
    }
  },

  //traer posts + usuario
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query
      const posts = await Post.find()
        .populate('comments.userId')
        .limit(limit)
        .skip((page - 1) * limit)
      res.send(posts)
    } catch (error) {
      console.error(error)
    } 
  },

  //traer por nombre
  async getPostByName(req, res) {
    try { 
      if (req.params.username.length > 20) {
        return res.status(400).send('Búsqueda demasiado larga')
      }  

      const username = new RegExp(req.params.username, 'i')
      const posts = await Post.find({ 
         username
       })
        res.send(posts)
    } catch (error) {
      console.log(error)
    }
   },

    //traer por id
   async getById(req, res) {
    try {
      const posts = await Post.findById(req.params._id)
      res.send(posts)
    } catch (error) {
      console.error(error)
    }
  }, 

  //insertar comment
  async insertComment(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        {
          $push: { 
            comments: { comment: req.body.comment, userId: req.user._id }
          },
        }, 
        { new: true }
      )
      res.send(post)

    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'There was a problem with your comment' })
    }
  },
 
}

module.exports = PostController