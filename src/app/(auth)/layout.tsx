
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans relative">
            {/* Background Grid & Gradient */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
            <div className="none md:block absolute top-0 left-0 w-full h-[500px] bg-indigo-500/10 blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center p-4">
                <div className="mb-8 text-center flex flex-col items-center">
                    <div className="mb-4 shadow-lg shadow-indigo-500/20 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <Logo size={48} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">House of Edtech</h1>
                    <p className="text-sm text-neutral-400">Fullstack Developer Assignment</p>
                </div>
                {children}
            </div>

            <div className="relative z-10">
                <Footer className="border-white/10 bg-transparent text-neutral-400 [&_span]:text-neutral-200" />
            </div>
        </div>
    )
}
