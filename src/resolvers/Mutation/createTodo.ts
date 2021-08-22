async function createTodo(
  _: unknown,
  { input }: Schema.MutationCreateTodoArgs,
  context: Context,
): Promise<Schema.CreateTodoPayload> {
  const todo = await context.repository.create(input.text)

  return { todo }
}

export default createTodo
