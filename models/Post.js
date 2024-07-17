const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId


const PostSchema = new mongoose.Schema(
 {
   title: String,
   body: String,
   username: String,
   comments: [
    {
      userId: { type: ObjectId, ref: 'User' },
      comment: String,
    },
  ],
},
 { timestamps: true }
)

PostSchema.index({
  username: 'text',
}) 

const Post = mongoose.model('Post', PostSchema)

module.exports = Post