import { todos } from "./schema";
import { db } from "./database";
import { CreateTodoDto, TodoResponse, UpdateTodoDto } from "./todo.interface";
import { asc, desc, eq } from "drizzle-orm";

const TodoService = {
  create: async (data: CreateTodoDto): Promise<TodoResponse> => {
    const [createdTodo] = await db.insert(todos).values(data).returning();
    return {
      success: true,
      result: createdTodo,
    };
  },

  read: async (): Promise<TodoResponse> => {
    const todoLists = await db
      .select()
      .from(todos)
      .where(eq(todos.isShow, true))
      .orderBy(asc(todos.dueAt));
    return {
      success: true,
      result: todoLists,
    };
  },

  readOne: async (id: number): Promise<TodoResponse> => {
    const [todo] = await db
      .selectDistinct()
      .from(todos)
      .where(eq(todos.id, id));
    if (!todo) {
      return {
        success: false,
        message: "Todo not found",
      };
    }
    return {
      success: true,
      result: todo,
    };
  },

  update: async (id: number, data: UpdateTodoDto): Promise<TodoResponse> => {
    const [updatedTodo] = await db
      .update(todos)
      .set(data)
      .where(eq(todos.id, id))
      .returning();
    if (!updatedTodo) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      result: updatedTodo,
    };
  },

  destroy: async (id: number): Promise<TodoResponse> => {
    const [deletedTodo] = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning();
    if (!deletedTodo) {
      return {
        success: false,
        message: "Todo not found",
      };
    }
    return {
      success: true,
      result: deletedTodo,
    };
  },
};

export default TodoService;
