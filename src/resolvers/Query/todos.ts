export default async function todos(
  _: unknown,
  { first = 100, after }: Schema.QueryTodosArgs,
  context: Context,
): Promise<Schema.TodoConnection> {
  // eslint-disable-next-line no-shadow
  const { todos, hasNext, hasPrev } = await context.repository.list(
    first,
    after,
  )

  return {
    pageInfo: {
      hasNextPage: hasNext,
      hasPreviousPage: hasPrev,
      startCursor: todos[0]?.id ?? null,
      endCursor: todos[todos.length - 1]?.id ?? null,
    },
    edges: todos.map(node => ({
      cursor: node.id,
      node,
    })),
  }
}
