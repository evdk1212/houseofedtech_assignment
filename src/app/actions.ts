
"use server";

import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { courseSchema, CourseInput } from "@/lib/types";
import { headers } from "next/headers";
import { ObjectId, WithId, Document } from "mongodb";
import { revalidatePath } from "next/cache";

interface MongoCourse extends Omit<CourseInput, "id"> {
    _id: ObjectId;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface MongoCourse extends Omit<CourseInput, "id"> {
    _id: ObjectId;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

async function getSession() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
}

export async function createCourse(data: CourseInput) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const validation = courseSchema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error.message);
    }

    const client = await clientPromise;
    const db = client.db();

    const newCourse = {
        ...validation.data,
        userId: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await db.collection("courses").insertOne(newCourse);
    revalidatePath("/dashboard");
    return { success: true };
}

export async function getCourses() {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const client = await clientPromise;
    const db = client.db();

    const courses = await db.collection<MongoCourse>("courses")
        .find({ userId: session.user.id })
        .sort({ createdAt: -1 })
        .toArray();

    return courses.map(course => ({
        ...course,
        _id: course._id.toString(),
    }));
}

export async function getCourse(id: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const client = await clientPromise;
    const db = client.db();

    const course = await db.collection<MongoCourse>("courses").findOne({
        _id: new ObjectId(id),
        userId: session.user.id
    });

    if (!course) return null;

    return {
        ...course,
        _id: course._id.toString(),
    };
}

export async function updateCourse(id: string, data: CourseInput) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const validation = courseSchema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error.message);
    }

    const client = await clientPromise;
    const db = client.db();

    // Verify ownership
    const course = await db.collection("courses").findOne({
        _id: new ObjectId(id),
        userId: session.user.id
    });

    if (!course) {
        throw new Error("Course not found or unauthorized");
    }

    await db.collection("courses").updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...validation.data,
                updatedAt: new Date()
            }
        }
    );
    revalidatePath("/dashboard");
    return { success: true };
}

export async function deleteCourse(id: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("courses").deleteOne({
        _id: new ObjectId(id),
        userId: session.user.id
    });

    if (result.deletedCount === 0) {
        throw new Error("Course not found or unauthorized");
    }

    revalidatePath("/dashboard");
    return { success: true };
}
