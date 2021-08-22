import { nanoid } from 'nanoid'

export const db = new Map<string, Schema.Todo>()

export async function create(text: string): Promise<Schema.Todo> {
  const todo = {
    id: nanoid(),
    text,
    createdAt: new Date(),
    completed: false,
  }

  db.set(todo.id, todo)

  return todo
}

export async function get(id: string) {
  return db.get(id)
}

export async function update(
  id: string,
  text: string,
  completed: boolean,
): Promise<Schema.Todo> {
  const todo = await get(id)

  todo.completed = completed
  todo.text = text

  return todo
}

export async function remove(id: string) {
  const todo = get(id)

  db.delete(id)

  return todo
}

export async function list(first: number, after?: string) {
  const todos = Array.from(db.values())

  const startIndex = Math.min(
    db.size - 1,
    todos.findIndex(t => t.id === after) + 1,
  )

  const hasNext = !!todos[startIndex + first]
  const hasPrev = !!todos.slice(0, startIndex - 1).length

  return {
    hasNext,
    hasPrev,
    todos: todos.slice(startIndex, first),
  }
}
