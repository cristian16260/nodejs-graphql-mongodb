import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  users,
  userone,
  posts,
  onepost,
  comments,
  onecomment,
} from "./querys.js";
import {
  register,
  login,
  createpost,
  updatedpost,
  deletepost,
  addcomemnt,
  updatedcomment,
  deletecomment,
} from "./mutation.js";

const querytype = new GraphQLObjectType({
  name: "Querytype",
  description: "the root query type",
  fields: {
    users: users,
    userone: userone,
    posts: posts,
    onepost: onepost,
    comments: comments,
    onecomment: onecomment,
  },
});

const mutaciontype = new GraphQLObjectType({
  name: "MutacionType",
  description: "the root mutacion type",
  fields: {
    register: register,
    login: login,
    createpost: createpost,
    updatedpost: updatedpost,
    deletepost: deletepost,
    addcomemnt: addcomemnt,
    updatedcomment: updatedcomment,
    deletecomment: deletecomment,
  },
});

const schema = new GraphQLSchema({
  query: querytype,
  mutation: mutaciontype,
});

// Otra forma
// export default new GraphQLSchema({
//    query:querytype
// });

export default schema;
