import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { Users } from "../modules/User.js";
import { Comment } from "../modules/coment.js";
import { Post } from "../modules/post.js"

export const usertype = new GraphQLObjectType({
  name: "usertype",
  description: "user type",
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayname: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const posttype = new GraphQLObjectType({
  name: "posttype",
  description: "post type",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    autor: {
      type: usertype,
      resolve(parent) {
        return Users.findById(parent.autorID);
      },
    },
    comments: {
      type: new GraphQLList(commenttype),
      resolve(parent) {
        return Comment.find({postID: parent.id})
      }
    }
  }),
});

export const commenttype = new GraphQLObjectType({
  name: "commenttype",
  description: "comment type",
  fields: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: usertype,
      resolve(parent) {
        return Users.findById(parent.userID);
      },
    },
    post: {
      type: posttype,
      resolve(parent) {
        return Post.findById(parent.postID);
      },
    },
  },
});
