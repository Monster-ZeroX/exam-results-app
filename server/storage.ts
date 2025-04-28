import { students, type Student } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, sql, desc, asc } from "drizzle-orm";
import { users, type User, type InsertUser } from "@shared/schema";

// Extend the storage interface with student-related methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Student methods
  getStudentByIndexNumber(indexNumber: string): Promise<Student | undefined>;
  searchStudentsByName(query: string, limit?: number): Promise<Student[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getStudentByIndexNumber(indexNumber: string): Promise<Student | undefined> {
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.index_number, indexNumber));
    return student;
  }

  async searchStudentsByName(query: string, limit: number = 20): Promise<Student[]> {
    // Create a search pattern for partial name matching (case-insensitive)
    const searchPattern = `%${query}%`;
    
    const results = await db
      .select()
      .from(students)
      .where(ilike(students.name, searchPattern))
      .orderBy(asc(students.name))
      .limit(limit);
    
    return results;
  }
}

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
