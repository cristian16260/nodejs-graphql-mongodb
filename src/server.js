import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema.js";
import mongodb from "./db/conection.js";
import { authenticate } from "./middlewares/auth.js";

mongodb();
const app = express();
const port = 3000;

app.use(authenticate);

app.get("/", (req, res) => {
  res.send("welcome ");
});

app.use(
  "/graph",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
