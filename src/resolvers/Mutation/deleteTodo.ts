export default async function deleteTodo(
  _: unknown,
  { input }: Schema.MutationDeleteTodoArgs,
  context: Context,
): Promise<Schema.DeleteTodoPayload> {
  const todo = await context.repository.remove(input.id)

  return { todo }
}
