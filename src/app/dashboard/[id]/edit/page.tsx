
import { CourseForm } from "@/components/course-form"
import { getCourse } from "@/app/actions"
import { notFound } from "next/navigation"

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const course = await getCourse(resolvedParams.id)

    if (!course) {
        notFound()
    }

    return (
        <div className="max-w-6xl mx-auto py-8">
            <CourseForm mode="edit" course={course as any} />
        </div>
    )
}
