import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { StatusResolver } from "./resolvers/StatusResolver";
import { connect } from "mongoose";
import dotenv from "dotenv";

async function main() {
  dotenv.config()
  const app = express();

  const mongoUri = process.env.mongo_uri || 'mongodb://root:root@localhost:27017/oslash'
  await connect(mongoUri);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [StatusResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.info(`🚀 server started at http://localhost:${port}/graphql`);
  });
};

main().catch(console.error)
