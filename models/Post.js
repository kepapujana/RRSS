const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId


const PostSchema = new mongoose.Schema(
 {
   title: {
     type: String,
     required: [true, 'Por favor rellena el titulo'],
    },
   body: {
    type: String,
    required: [true, 'Por favor rellena la casilla'],
    },
   username: {
      type: String,
      required: [true, 'Por favor pon un nombre de usuario'],
      },
   comments: [
    {
      userId: { type: ObjectId, ref: 'User' },
      comment: String,
    },
    ],
   likes: [{ type: ObjectId }],
},
 { timestamps: true }
)

PostSchema.index({
  username: 'text',
}) 

const Post = mongoose.model('Post', PostSchema)

module.exports = Post