import { describe, expect, expectTypeOf, test } from "vitest";
import { get, getAll, create, update, remove } from "./todo";

describe("todo", () => {
  test("create a todo", async () => {
    const text = "Example Todo Test";
    const createdTodo = await create({ text });

    expect(createdTodo.text).toBe(text);
  });

  test("get a todo with id after create it", async () => {
    const text = "Example Todo Test";
    const createdTodo = await create({ text });
    const todo = await get({ id: createdTodo.id });

    expect(todo.text).toBe(text);
  });

  test("get all todos", async () => {
    const todoList = await getAll();

    expectTypeOf(todoList).toBeArray;
  });

  test("update a todo after created it", async () => {
    const createdTodo = await create({ text: "Original Text" });
    const updatedText = "Updated Text";
    const updatedTodo = await update({ id: createdTodo.id, text: updatedText });

    expect(updatedTodo.text).toBe(updatedText);
  });

  test("delete a todo after created it", async () => {
    const createdTodo = await create({ text: "Original Text" });
    const deletedTodo = await remove({ id: createdTodo.id });

    expect(deletedTodo.id).toBe(createdTodo.id);

    await expect(get({ id: createdTodo.id })).rejects.toMatchObject({
      code: "not_found",
    });
  });
});
