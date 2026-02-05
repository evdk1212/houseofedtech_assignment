"use client"

import { useState } from "react"
import { Course } from "@/lib/types"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List, MoreHorizontal, Pencil, Trash } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { deleteCourse } from "@/app/actions"
import { useRouter } from "next/navigation"

interface CourseListProps {
    courses: Course[]
}

export function CourseList({ courses }: CourseListProps) {
    const [view, setView] = useState<"grid" | "table">("grid")
    const router = useRouter()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDelete = async (courseId: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;
        setDeletingId(courseId)
        try {
            await deleteCourse(courseId)
            router.refresh()
        } catch (error) {
            alert("Failed to delete")
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <div className="flex items-center bg-muted/50 p-1 rounded-lg border border-border">
                    <Button
                        variant={view === "grid" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setView("grid")}
                        className="h-8 w-8 p-0"
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={view === "table" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setView("table")}
                        className="h-8 w-8 p-0"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {view === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="rounded-md border border-white/10 overflow-hidden overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="text-neutral-400">Title</TableHead>
                                <TableHead className="text-neutral-400">Status</TableHead>
                                <TableHead className="text-neutral-400">Price</TableHead>
                                <TableHead className="text-neutral-400">Created</TableHead>
                                <TableHead className="text-right text-neutral-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course._id} className="border-white/5 hover:bg-white/5 data-[state=selected]:bg-muted">
                                    <TableCell className="font-medium text-neutral-200">{course.title}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${course.status === 'published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                            {course.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-neutral-200">${course.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-neutral-400">{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4 text-neutral-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-black/90 border-white/10 text-neutral-200 backdrop-blur-xl">
                                                <Link href={`/dashboard/${course._id}/edit`}>
                                                    <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(course._id)}
                                                    className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
                                                    disabled={deletingId === course._id}
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}
