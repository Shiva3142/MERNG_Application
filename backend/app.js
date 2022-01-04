const express = require('express')
const dotenv = require('dotenv')

const {
    ApolloServer,
} = require('apollo-server-express')

const {
    typeDefs
} = require('./GraphQL/typeDefs.js')
const {
    resolvers
} = require('./GraphQL/resolvers.js')

let app = express()
app.use(express.urlencoded())
app.use(express.json())

dotenv.config({
    path: "./config.env"
})

let port = process.env.PORT || 80

async function StartServer() {
    let apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({
            req
        }) => {
            return {
                req
            }
        }
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app: app
    });
}
StartServer()

app.listen(port, () => {
    console.log(`SERVER is Running  at http://127.0.0.1:${port}`);
})