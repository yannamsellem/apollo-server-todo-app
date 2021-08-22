export default async function todo(
  _: unknown,
  { id }: Schema.QueryNodeArgs,
  context: Context,
): Promise<Schema.Node> {
  const result = await context.repository.get(id)

  if (!result) throw new Error(`Todo not found for id: ${id}`)

  return result
}
