import { Kind, GraphQLScalarType } from 'graphql'

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    if (value instanceof Date) return value.toISOString()
    return value
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value)
    }
    if (ast.kind === Kind.STRING && ast.value) {
      return new Date(ast.value)
    }
    return null
  },
})
