import { ApolloServer } from 'apollo-server'
import graphql from 'graphql-tag'

import typeDefs from '../schema'
import resolvers from '../resolvers'
import initRepository from '../repositories'

import { db, create } from '../repositories/inMemory'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    repository: await initRepository(),
  }),
})

describe('Todo', () => {
  afterEach(() => db.clear())

  it('should create a todo', async () => {
    const mutation = graphql`
      mutation CreateTodoMutation($input: CreateTodoInput!) {
        createTodo(input: $input) {
          todo {
            id
            text
            completed
            createdAt
          }
        }
      }
    `

    const text = 'Create todo test'
    const result = await server.executeOperation({
      query: mutation,
      variables: { input: { text } },
    })

    expect(result.errors).toBeUndefined()

    expect(result.data?.createTodo.todo.id).toBeDefined()
    expect(result.data?.createTodo.todo.text).toBe(text)
    expect(result.data?.createTodo.todo.completed).toBe(false)
    expect(result.data?.createTodo.todo.createdAt).toBeDefined()
  })

  it('should get a todo', async () => {
    const query = graphql`
      query GetTodoQuery($id: ID!) {
        todo(id: $id) {
          id
          text
          completed
          createdAt
        }
      }
    `

    const expected = await create('Expected todo')
    const result = await server.executeOperation({
      query,
      variables: { id: expected.id },
    })

    expect(result.errors).toBeUndefined()

    expect(result.data.todo.id).toBe(expected.id)
    expect(result.data.todo.text).toBe(expected.text)
    expect(result.data.todo.completed).toBe(expected.completed)
    expect(result.data.todo.createdAt).toBe(expected.createdAt.toISOString())
  })

  it('should throw an error when request with a non existing ID', async () => {
    const query = graphql`
      query GetTodoQuery($id: ID!) {
        todo(id: $id) {
          id
          text
          completed
          createdAt
        }
      }
    `

    const result = await server.executeOperation({
      query,
      variables: { id: 'invalid' },
    })

    expect(result.errors).toBeDefined()
    expect(result.errors?.[0]?.message).toBe('Todo not found for id: invalid')

    expect(result.data?.todo).toBeNull()
  })
})
