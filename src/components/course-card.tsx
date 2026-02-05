
"use client"

import { Course } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { deleteCourse } from "@/app/actions"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function CourseCard({ course }: { course: Course }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this course?")) return;
        setIsDeleting(true)
        try {
            await deleteCourse(course._id)
            router.refresh()
        } catch (error) {
            alert("Failed to delete")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1 text-xl">{course.title}</CardTitle>
                    <span className={`px-2 py-1 text-xs rounded-full ${course.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'}`}>
                        {course.status}
                    </span>
                </div>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="font-bold text-lg">${course.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">Last updated: {new Date(course.updatedAt).toLocaleDateString()}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link href={`/dashboard/${course._id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full">
                        Edit
                    </Button>
                </Link>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "..." : "Delete"}
                </Button>
            </CardFooter>
        </Card>
    )
}
