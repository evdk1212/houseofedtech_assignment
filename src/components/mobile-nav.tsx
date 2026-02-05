"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const routes = [
        {
            href: "/dashboard",
            label: "Courses",
            active: pathname === "/dashboard",
        },
        {
            href: "#",
            label: "Students",
            active: false,
        },
        {
            href: "#",
            label: "Analytics",
            active: false,
        },
    ]

    return (
        <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
            </Button>

            {open && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
                    <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-black border-r border-white/10 p-6 shadow-xl transition-transform duration-300 ease-in-out">
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                                <Logo size={24} />
                                <span className="font-bold text-lg text-white">HoE LMS</span>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                <X className="h-5 w-5 text-neutral-400" />
                            </Button>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "text-base font-medium transition-colors hover:text-white hover:bg-white/10 p-3 rounded-lg",
                                        route.active ? "text-white bg-white/10" : "text-neutral-400"
                                    )}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}
