import { GraphQLID, GraphQLList } from "graphql";
import { posttype, usertype, commenttype } from "./types.js";
import { Users } from "../modules/User.js";
import { Post } from '../modules/post.js'
import { Comment } from '../modules/coment.js'


export const users = {
  type: new GraphQLList(usertype),
  async resolve() {
    const users = await Users.find();
    return users;
  },
};


export const userone = {
  type: usertype,
  description:"unique user by id" ,
  args: {
    id:{type: GraphQLID},
  },
  async resolve(_,args) {
    return Users.findById(args.id);
  },
}


export const posts = {
  type: new GraphQLList(posttype),
  description: "all posts",
  resolve: async () =>{
    const posts = await Post.find()
    return posts
  } 
} 

export const onepost = {
  type: posttype,
  description: "post by ID ",
  args: {
    id: {type: GraphQLID},
  },
  resolve: (_,{ id }) => Post.findById(id)
} 

export const comments = {
  type: new GraphQLList(commenttype),
  description: "get all comments",
  resolve: () => Comment.find()
}

export const onecomment = {
  type: commenttype,
  description: "comment by ID",
  args: {
    id: {type: GraphQLID},
  },
  resolve: (_,{ id }) => Comment.findById(id)
} 