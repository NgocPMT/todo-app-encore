import { api, APIError } from "encore.dev/api";
import TodoService from "./todo.service";
import { CreateTodoDto, TodoResponse, UpdateTodoDto } from "./todo.interface";

export const create = api(
  { path: "/todos", method: "POST", expose: true },
  async (data: CreateTodoDto): Promise<TodoResponse> => {
    try {
      const result = await TodoService.create(data);
      return result;
    } catch (error) {
      throw APIError.aborted(
        error ? error.toString() : "Error creating the todo"
      );
    }
  }
);

export const read = api(
  { path: "/todos", method: "GET", expose: true },
  async (): Promise<TodoResponse> => {
    try {
      const result = await TodoService.read();
      return result;
    } catch (error) {
      throw APIError.aborted(
        error ? error.toString() : "Error reading the todos"
      );
    }
  }
);

export const readOne = api(
  { path: "/todos/:id", method: "GET", expose: true },
  async ({ id }: { id: number }): Promise<TodoResponse> => {
    try {
      const result = await TodoService.readOne(id);
      return result;
    } catch (error) {
      throw APIError.aborted(
        error ? error.toString() : "Error reading the todo"
      );
    }
  }
);

export const update = api(
  { path: "/todos/:id", method: "PUT", expose: true },
  async ({
    id,
    data,
  }: {
    id: number;
    data: UpdateTodoDto;
  }): Promise<TodoResponse> => {
    try {
      const result = await TodoService.update(id, data);
      return result;
    } catch (error) {
      throw APIError.aborted(
        error ? error.toString() : "Error updating the todo"
      );
    }
  }
);

export const destroy = api(
  { path: "/todos/:id", method: "DELETE", expose: true },
  async ({ id }: { id: number }): Promise<TodoResponse> => {
    try {
      const result = await TodoService.destroy(id);
      return result;
    } catch (error) {
      throw APIError.aborted(
        error ? error.toString() : "Error deleting the todo"
      );
    }
  }
);
