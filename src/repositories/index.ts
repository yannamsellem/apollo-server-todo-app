import * as inMemory from './inMemory'
import * as pg from './pg'

export interface Repository {
  create(text: string): Promise<Schema.Todo>
  get(id: string): Promise<Schema.Todo>
  update(id: string, text: string, completed: boolean): Promise<Schema.Todo>
  list(
    first: number,
    after: string,
  ): Promise<{ hasPrev: boolean; hasNext: boolean; todos: Schema.Todo[] }>
  remove(id: string): Promise<Schema.Todo>
}

export default async function initRepository(): Promise<Repository> {
  const impl = process.env.REPOSITORY_IMPL

  if (impl === 'pg') {
    await pg.init()

    return pg
  }

  return inMemory
}
