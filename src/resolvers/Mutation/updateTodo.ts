async function updateTodo(
  _: unknown,
  { input }: Schema.MutationUpdateTodoArgs,
  context: Context,
): Promise<Schema.UpdateTodoPayload> {
  const todo = await context.repository.update(
    input.id,
    input.text,
    input.completed,
  )

  return { todo }
}

export default updateTodo
