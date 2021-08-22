async function updateTodo(
  _: unknown,
  { input }: Schema.MutationUpdateTodoArgs,
  context: Context,
): Promise<Schema.UpdateTodoPayload> {
  const prev = await context.repository.get(input.id)

  if (!prev) throw new Error(`Todo not found for id: ${input.id}`)

  const todo = await context.repository.update(
    input.id,
    input.text,
    input.completed,
  )

  return { todo }
}

export default updateTodo
