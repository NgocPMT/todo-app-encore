import * as p from "drizzle-orm/pg-core";

export const todos = p.pgTable("todos", {
  id: p.integer().primaryKey().generatedAlwaysAsIdentity(),
  text: p.varchar({ length: 255 }).notNull(),
  isDone: p.boolean().default(false),
  isShow: p.boolean().default(true),
  createdAt: p.timestamp().defaultNow(),
});
