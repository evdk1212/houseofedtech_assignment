
import { z } from "zod";

export const courseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().min(0, "Price must be non-negative"),
    status: z.enum(["draft", "published"]).default("draft"),
});

export type CourseInput = z.infer<typeof courseSchema>;

export interface Course extends CourseInput {
    _id: string; // Transformed from ObjectId
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
