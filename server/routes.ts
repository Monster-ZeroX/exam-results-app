import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchStudentSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for searching students by name
  app.get("/api/students/search", async (req: Request, res: Response) => {
    try {
      const { query } = searchStudentSchema.parse({
        query: req.query.q,
      });

      const students = await storage.searchStudentsByName(query);
      return res.json(students);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error searching students:", error);
      return res.status(500).json({ message: "Failed to search students" });
    }
  });

  // API route for getting a student by index number
  app.get("/api/students/:indexNumber", async (req: Request, res: Response) => {
    try {
      const { indexNumber } = req.params;
      const student = await storage.getStudentByIndexNumber(indexNumber);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      return res.json(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      return res.status(500).json({ message: "Failed to fetch student" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
