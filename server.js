import dotenv from "dotenv";
dotenv.config();
import {ApolloServer} from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
    schema
})

const PORT = process.env.PORT

server.listen(PORT).then(() => console.log("🚀 Server ready at http://localhost:4000/"))