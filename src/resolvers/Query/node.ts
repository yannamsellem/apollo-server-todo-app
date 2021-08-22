export default async function node(
  _: unknown,
  { id }: Schema.QueryNodeArgs,
  context: Context,
): Promise<Schema.Node> {
  return context.repository.get(id)
}
