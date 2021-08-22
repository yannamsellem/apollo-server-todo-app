declare namespace Schema {
  type Maybe<T> = T | null
  type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
  type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]?: Maybe<T[SubKey]> }
  type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]: Maybe<T[SubKey]> }
  /** All built-in and custom scalars, mapped to their actual values */
  interface Scalars {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    Date: Date
  }

  interface CreateTodoInput {
    text?: Maybe<Scalars['String']>
  }

  interface CreateTodoPayload {
    todo?: Maybe<Todo>
  }

  interface DeleteTodoInput {
    id: Scalars['ID']
  }

  interface DeleteTodoPayload {
    todo?: Maybe<Todo>
  }

  interface Mutation {
    createTodo?: Maybe<CreateTodoPayload>
    updateTodo?: Maybe<UpdateTodoPayload>
    deleteTodo?: Maybe<DeleteTodoPayload>
  }

  interface MutationCreateTodoArgs {
    input: CreateTodoInput
  }

  interface MutationUpdateTodoArgs {
    input: UpdateTodoInput
  }

  interface MutationDeleteTodoArgs {
    input: DeleteTodoInput
  }

  interface Node {
    id: Scalars['ID']
  }

  interface PageInfo {
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
    startCursor?: Maybe<Scalars['String']>
    endCursor?: Maybe<Scalars['String']>
  }

  interface Query {
    node?: Maybe<Node>
    todo?: Maybe<Todo>
    todos?: Maybe<TodoConnection>
  }

  interface QueryNodeArgs {
    id: Scalars['ID']
  }

  interface QueryTodoArgs {
    id: Scalars['ID']
  }

  interface QueryTodosArgs {
    first: Scalars['Int']
    after?: Maybe<Scalars['String']>
  }

  interface Todo extends Node {
    id: Scalars['ID']
    text: Scalars['String']
    completed?: Maybe<Scalars['Boolean']>
    createdAt: Scalars['Date']
  }

  interface TodoConnection {
    pageInfo: PageInfo
    edges?: Maybe<Array<TodoEdge>>
  }

  interface TodoEdge {
    cursor: Scalars['String']
    node: Todo
  }

  interface UpdateTodoInput {
    id: Scalars['ID']
    text: Scalars['String']
    completed: Scalars['Boolean']
  }

  interface UpdateTodoPayload {
    todo?: Maybe<Todo>
  }
}
