/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'

import typeDefs from './schema'
import resolvers from './resolvers'
import initRepository from './repositories'

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async () => ({
    repository: await initRepository(),
  }),
})

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))

process.on('SIGINT', () => process.exit(0))
