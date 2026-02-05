
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createCourse, updateCourse } from "@/app/actions"
import type { CourseInput, Course } from "@/lib/types"

interface CourseFormProps {
    course?: Course
    mode: "create" | "edit"
}

export function CourseForm({ course, mode }: CourseFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<CourseInput>({
        title: course?.title || "",
        description: course?.description || "",
        price: course?.price || 0,
        status: (course?.status as "draft" | "published") || "draft"
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (mode === "create") {
                await createCourse(formData)
            } else if (mode === "edit" && course) {
                await updateCourse(course._id, formData)
            }
            router.push("/dashboard")
            router.refresh()
        } catch (err: any) {
            let errorMessage = err.message || "Something went wrong";
            try {
                const zodErrors = JSON.parse(errorMessage);
                if (Array.isArray(zodErrors) && zodErrors.length > 0) {
                    errorMessage = zodErrors.map((e: any) => e.message).join(", ");
                }
            } catch (e) {
                // Not a JSON string, use original message
            }
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle>Course Details</CardTitle>
                        <CardDescription>
                            Basic information about your course.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Advanced Next.js Patterns"
                                required
                                className="h-11 text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Detailed description of the course..."
                                required
                                className="min-h-[300px] text-base leading-relaxed p-4"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
                {/* Publishing Card */}
                <Card className="border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle>Publishing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value: "draft" | "published") => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-border pt-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : (mode === "create" ? "Create Course" : "Save Changes")}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pricing Card */}
                <Card className="border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle>Pricing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                {error && (
                    <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm">
                        {error}
                    </div>
                )}
            </div>
        </form>
    )
}
