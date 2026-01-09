import * as p from "drizzle-orm/pg-core";

export const todos = p.pgTable("todos", {
  id: p.integer().primaryKey().generatedAlwaysAsIdentity(),
  text: p.varchar({ length: 255 }).notNull(),
  isDone: p.boolean("is_done").default(false).notNull(),
  isShow: p.boolean("is_show").default(true).notNull(),
  dueAt: p.timestamp("due_at", { withTimezone: true }).notNull(),
  createdAt: p
    .timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
