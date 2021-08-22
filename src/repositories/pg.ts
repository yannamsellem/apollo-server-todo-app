import { Pool } from 'pg'

let connection: Pool
function getConnection() {
  if (connection) return connection

  connection = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE_NAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  })

  return connection
}

function rawToTodo(row: {
  id: string
  text: string
  // eslint-disable-next-line camelcase
  created_at: Date
  completed: boolean
}): Schema.Todo {
  return {
    id: row.id,
    text: row.text,
    createdAt: new Date(row.created_at),
    completed: row.completed,
  }
}

export async function init() {
  const pool = getConnection()

  const client = await pool.connect().catch(e => {
    console.error(e)
    process.exit(1)
  })

  let err: Error
  try {
    await client.query('BEGIN')

    await client.query(`
    CREATE TABLE IF NOT EXISTS "todos" (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      text TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT FALSE
    );

    CREATE INDEX IF NOT EXISTS idx_id_pagination ON todos USING btree(id);
    `)
    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    err = error
    throw error
  } finally {
    client.release(err)
  }
}

export async function create(text: string) {
  const client = await getConnection().connect()

  const {
    rows: [row],
  } = await client.query(
    'INSERT INTO todos(text, created_at, completed) values ($1,$2, $3) RETURNING *',
    [text, new Date(), false],
  )

  client.release()

  return rawToTodo(row)
}

export async function get(id: string) {
  const client = await getConnection().connect()

  const {
    rows: [row],
  } = await client.query('SELECT * FROM todos WHERE id = $1 LIMIT 1', [id])

  client.release()

  return rawToTodo(row)
}

export async function update(id: string, text: string, completed: boolean) {
  const client = await getConnection().connect()

  const {
    rows: [row],
  } = await client.query(
    'UPDATE todos SET text = $2, completed = $3 WHERE id = $1 RETURNING *',
    [id, text, completed],
  )

  client.release()

  return rawToTodo(row)
}

export async function list(first: number, after?: string) {
  const client = await getConnection().connect()

  const query = after
    ? 'SELECT * FROM todos WHERE id > $2 ORDER BY id ASC LIMIT $1'
    : 'SELECT * FROM todos ORDER BY id ASC LIMIT $1'

  const { rows } = await client.query(query, [first, after].filter(Boolean))

  let hasNext = rows.length !== 0
  if (rows.length) {
    const { rowCount } = await client.query(
      'SELECT id FROM todos WHERE id > $1 ORDER BY id ASC LIMIT 1',
      [rows[rows.length - 1].id],
    )

    hasNext = rowCount === 1
  }

  client.release()

  return {
    hasPrev: !!after,
    hasNext,
    todos: rows.map(rawToTodo),
  }
}

export async function remove(id: string) {
  const client = await getConnection().connect()

  const {
    rows: [row],
  } = await client.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id])

  client.release()

  return rawToTodo(row)
}
