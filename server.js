import dotenv from "dotenv";
dotenv.config();
import express from "express";
import logger from "morgan"
import {ApolloServer} from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import {getUser} from "./User/users.utils"

const PORT = process.env.PORT;

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({req}) => {
        return {
            loggedInUser : await getUser(req.headers.token),
        }
    }
});

const startServer = async() => {
    const app = express();
    app.use(logger("tiny"));
    app.use("/static",express.static("uploads"));
    await server.start();
    server.applyMiddleware({app});
    app.listen({port:PORT}, () => {
        console.log(`server is running on http://localhost:${PORT}`)
     })
}
startServer();