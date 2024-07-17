const Post = require('../models/Post')
const User = require("../models/User")


const PostController = {

 //crear post   
 async create(req, res, next) {
   try {
     const post = await Post.create(req.body)
     res.status(201).send(post)
   } catch (error) {
    error.origin = 'post'
    next(error)
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
 
  //like post
  async like(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
      req.params._id, 
      { $push: { likes: req.user._id } },
      { new: true })

      await User.findByIdAndUpdate(req.user._id,
        { $push: { wishList: req.params._id } 
      })
   
      res.send(post)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "There was a problem with your request" })
      }
  },

  // Endpoint para borrar un like de un post
  async dislike(req, res) {
  const { postId, userId } = req.params;

  try {
    // Encuentra el post y elimina el like del array
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true } // Devuelve el documento actualizado
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Like removed successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
  }
}

module.exports = PostController