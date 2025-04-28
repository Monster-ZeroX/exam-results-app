import { pgTable, text, real, integer, jsonb, varchar, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  index_number: varchar("index_number").primaryKey(),
  name: text("name").notNull(),
  z_score: real("z_score"),
  district_rank: integer("district_rank"),
  island_rank: integer("island_rank"),
  nic_number: varchar("nic_number"),
  subjects: jsonb("subjects"),
});

export const insertStudentSchema = createInsertSchema(students);

export const searchStudentSchema = z.object({
  query: z.string().min(2, "Search query must be at least 2 characters"),
});

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type StudentSubjects = Record<string, string>;

// Old user schema - keeping for compatibility with existing code
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
