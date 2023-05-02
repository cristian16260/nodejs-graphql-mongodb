import { GraphQLID, GraphQLString } from "graphql";
import { Users } from "../modules/User.js";
import { Post } from "../modules/post.js";
import { Comment } from "../modules/coment.js";
import { createjwt } from "../util/jwt.js";
import { posttype } from "./types.js";
import { commenttype } from "./types.js";

export const register = {
  type: GraphQLString,
  description: "register new user and returns a token",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayname: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { username, email, password, displayname } = args;

    const user = new Users({ username, email, password, displayname });
    await user.save();

    const accesstoken = createjwt({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    return accesstoken;
  },
};

export const login = {
  type: GraphQLString,
  description: "Login as a user and it returns a token",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const user = await Users.findOne({ email: args.email });
    const pass = await Users.findOne({ password: args.password });

    if (!user || !pass) throw new Error("user invalid");
    const accesstoken = createjwt({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    return accesstoken;
  },
};

export const createpost = {
  type: posttype,
  description: "create a new post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(_, args, { verifieluser }) {
    console.log(args);
    const newpost = new Post({
      title: args.title,
      body: args.body,
      autorID: verifieluser._id,
    });

    await newpost.save();
    return newpost;
  },
};

export const updatedpost = {
  type: posttype,
  description: "updated a post",
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(_, { id, title, body }, { verifieluser }) {
    if (!verifieluser) throw new error("no authorized");

    const updatedpost = await Post.findOneAndUpdate(
      { _id: id, autorID: verifieluser._id },
      {
        title,
        body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedpost;
  },
};

export const deletepost = {
  type: GraphQLString,
  description: "Delete a post",
  args: {
    postID: {
      type: GraphQLID,
    },
  },
  async resolve(_, { postID }, { verifieluser }) {
    if (!verifieluser) throw new Error("user no exits");

    const deletepost = await Post.findOneAndDelete({
      _id: postID,
      autorID: verifieluser._id,
    });
    if (!deletepost) throw new Error("post not found");
    return "post deleted";
  },
};

export const addcomemnt = {
  type: commenttype,
  description: "add comment to a post",
  args: {
    comment: { type: GraphQLString },
    postID: { type: GraphQLID },
  },
  async resolve(_, { comment, postID }, { verifieluser }) {
    const newcomment = new Comment({
      comment: comment,
      postID: postID,
      userID: verifieluser._id,
    });
    return newcomment.save();
  },
};

export const updatedcomment = {
  type: commenttype,
  description: "updated a comment",
  args: {
    comment: { type: GraphQLString },
    id: { type: GraphQLID },
  },
  async resolve(_, { id, comment }, { verifieluser }) {
    if (!verifieluser) throw new Error("no authorized");

    const updatedcomment = await Comment.findOneAndUpdate(
      {
        _id: id,
        userID: verifieluser._id,
      },
      {
        comment: comment,
      }
    );
    if (!updatedcomment) throw new Error("comment not found");
    return updatedcomment;
  },
};

export const deletecomment = {
  type: GraphQLString,
  description: "Delete a post",
  args: {
    commentID: {
      type: GraphQLID,
    },
  },
  async resolve(_, { commentID }, { verifieluser }) {
    if (!verifieluser) throw new Error("user no exits");

    const deletecomment = await Comment.findOneAndDelete({
      _id: commentID,
      userID: verifieluser._id,
    });
    if (!deletecomment) throw new Error("post not found");
    return "comment deleted";
  },
};