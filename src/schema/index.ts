import Query from './_Query.graphql'
import Mutation from './_Mutation.graphql'
import Commons from './_Commons.graphql'
import Todo from './Todo.graphql'

const typeDefs = [Query, Mutation, Commons, Todo].join('\n')

export default typeDefs
