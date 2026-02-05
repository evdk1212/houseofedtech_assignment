
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { SignOutButton } from "@/components/sign-out-button"
import { MobileNav } from "@/components/mobile-nav"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/sign-in")
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans">
            {/* Background Grid & Gradient */}
            <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="container flex h-16 items-center justify-between mx-auto px-6">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="font-bold text-lg flex items-center gap-2">
                            <Logo size={28} />
                            <span>HoE LMS</span>
                        </Link>
                        <nav className="hidden md:flex gap-6 text-sm font-medium">
                            <Link href="/dashboard" className="transition-colors hover:text-indigo-400 text-neutral-200">
                                Courses
                            </Link>
                            <Link href="#" className="transition-colors hover:text-indigo-400 text-neutral-400">
                                Students
                            </Link>
                            <Link href="#" className="transition-colors hover:text-indigo-400 text-neutral-400">
                                Analytics
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end mr-2">
                            <span className="text-sm font-medium text-neutral-200">
                                {session.user.name}
                            </span>
                            <span className="text-xs text-neutral-500">
                                {session.user.email}
                            </span>
                        </div>
                        <SignOutButton />
                        <MobileNav />
                    </div>
                </div>
            </header>
            <main className="relative z-10 container mx-auto py-8 px-6 flex-grow">
                {children}
            </main>
            <Footer className="relative z-10 border-white/10 bg-black text-neutral-400 [&_span]:text-neutral-200" />
        </div>
    )
}
