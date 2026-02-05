
import { getCourses } from "@/app/actions"
import { CourseList } from "@/components/course-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const courses = await getCourses()

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                    <p className="text-muted-foreground mt-2">Manage your course catalog and content.</p>
                </div>
                <Link href="/dashboard/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Course
                    </Button>
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-900/20">
                    <div className="h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No courses created yet</h3>
                    <p className="text-muted-foreground max-w-sm text-center mb-6">
                        Start building your curriculum by creating your first course. It will appear here.
                    </p>
                    <Link href="/dashboard/new">
                        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0">
                            Create First Course
                        </Button>
                    </Link>
                </div>
            ) : (
                <CourseList courses={courses} />
            )}
        </div>
    )
}
