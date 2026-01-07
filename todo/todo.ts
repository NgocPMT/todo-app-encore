import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("todo", { migrations: "./migrations" });

export const create = api(
  { path: "/todos", method: "POST", expose: true },
  async (params: createParams): Promise<Todo> => {
    const { text } = params;
    for await (const row of db.query<Todo>`
      INSERT INTO todo(text)
      VALUES (${text})
      RETURNING
        id,
        text,
        is_done as "isDone",
        is_show as "isShow",
        created_at as "createdAt"
    `) {
      return row;
    }

    throw APIError.internal("Insert failed");
  }
);

export const get = api(
  { path: "/todos/:id", method: "GET", expose: true },
  async (params: getParams): Promise<Todo> => {
    const { id } = params;
    const row = await db.queryRow<Todo>`
      SELECT
        id,
        text,
        is_done as "isDone",
        is_show as "isShow",
        created_at as "createdAt"
      FROM todo
      WHERE id = ${id}
    `;
    if (!row) throw APIError.notFound("Todo not found");
    return row;
  }
);

export const getAll = api(
  { path: "/todos", method: "GET", expose: true },
  async (): Promise<TodoList> => {
    const rows = await db.queryAll<Todo>`
      SELECT
        id,
        text,
        is_done as "isDone",
        is_show as "isShow",
        created_at as "createdAt"
      FROM todo
      WHERE is_show = true
      ORDER BY created_at DESC
    `;
    return { todos: rows };
  }
);

export const update = api(
  { path: "/todos/:id", method: "PUT", expose: true },
  async (params: updateParams): Promise<Todo> => {
    const { id, text, isDone, isShow } = params;

    const todo = await db.queryRow<Todo>`
      SELECT
        id,
        text,
        is_done as "isDone",
        is_show as "isShow",
        created_at as "createdAt"
      FROM todo
      WHERE id = ${id}
    `;
    if (!todo) throw APIError.notFound("Todo not found");

    if (text === undefined && isDone === undefined && isShow === undefined) {
      return todo;
    }

    for await (const row of db.query<Todo>`
      UPDATE todo
      SET
        text = ${text ?? todo.text},
        is_done = ${isDone ?? todo.isDone},
        is_show = ${isShow ?? todo.isShow}
      WHERE id = ${id}
      RETURNING
        id,
        text,
        is_done as "isDone",
        is_show as "isShow",
        created_at as "createdAt"
    `) {
      return row;
    }

    throw APIError.internal("Update failed");
  }
);

export const remove = api(
  { path: "/todos/:id", method: "DELETE", expose: true },
  async (params: deleteParams): Promise<Todo> => {
    const { id } = params;

    const todo = await db.queryRow<Todo>`
      SELECT
        id,
        text,
        is_done as "isDone",
        is_show as "isShow",
        created_at as "createdAt"
      FROM todo
      WHERE id = ${id}
    `;
    if (!todo) throw APIError.notFound("Todo not found");

    for await (const row of db.query<Todo>`
      DELETE FROM todo
      WHERE id = ${id}
      RETURNING
        id,
        text,
        is_done as "isDone",
        is_show as "isShow",
        created_at as "createdAt"
    `) {
      return row;
    }

    throw APIError.internal("Delete failed");
  }
);

type createParams = {
  text: string;
};

type getParams = {
  id: number;
};

type deleteParams = {
  id: number;
};

type updateParams = {
  id: number;
  text?: string;
  isDone?: boolean;
  isShow?: boolean;
};

type Todo = {
  id: number;
  text: string;
  createdAt: Date;
  isDone: boolean;
  isShow: boolean;
};

type TodoList = {
  todos: Todo[];
};
