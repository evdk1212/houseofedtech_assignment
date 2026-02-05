
import { CourseForm } from "@/components/course-form"

export default function NewCoursePage() {
    return (
        <div className="max-w-6xl mx-auto py-8">
            <CourseForm mode="create" />
        </div>
    )
}
