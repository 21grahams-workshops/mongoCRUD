const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required!']
  },
  posts: [PostSchema], // subdocument reference
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
}); // virtual fields

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');

  BlogPost.deleteMany({ _id: { $in: this.blogPosts } })
    .then(() => next());
}) // middleware

const User = mongoose.model('user', UserSchema);

module.exports = User;