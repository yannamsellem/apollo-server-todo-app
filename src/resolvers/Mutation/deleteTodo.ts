export default async function deleteTodo(
  _: unknown,
  { input }: Schema.MutationDeleteTodoArgs,
  context: Context,
): Promise<Schema.DeleteTodoPayload> {
  const existing = await context.repository.get(input.id)

  if (!existing) throw new Error(`Todo not found for id: ${input.id}`)

  const todo = await context.repository.remove(input.id)

  return { todo }
}
