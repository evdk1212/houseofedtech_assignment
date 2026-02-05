
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans">
      {/* Background Grid & Gradient */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <header className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center border-b border-white/10 backdrop-blur-md bg-black/50 sticky top-0">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-3">
          <Logo size={32} />
          <span>House of Edtech</span>
        </div>
        <nav className="flex gap-4 items-center">
          <span className="hidden md:inline-block text-xs text-neutral-500 uppercase tracking-widest mr-2">
            Assignment 1
          </span>
          <Link href="/sign-in">
            <Button variant="ghost" className="text-neutral-300 hover:text-white hover:bg-white/10 transition-colors">Log in</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-white text-black hover:bg-gray-200 transition-colors font-medium">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">

        <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-8 backdrop-blur-xl animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
          Fullstack Developer Assignment Submission
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-600 animate-fade-in-up delay-100">
          Building the Future of <br className="hidden md:block" /> Education Technology.
        </h1>

        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed animate-fade-in-up delay-200">
          A demonstration of sophisticated problem-solving and innovative solutions.
          Built with Next.js 16, Better Auth, and MongoDB to showcase technical proficiency and strategic design.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-fade-in-up delay-300">
          <Link href="/sign-up">
            <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all transform hover:scale-105">
              Explore the Project
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white bg-transparent transition-all">
              View Dashboard
            </Button>
          </Link>
        </div>

        {/* Abstract decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      </main>

      <section className="relative z-10 border-t border-neutral-900 bg-black/50 backdrop-blur-sm py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Technical Excellence</h2>
            <p className="text-neutral-500">Meeting and exceeding the key requirements of the assignment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group">
              <div className="h-12 w-12 rounded-lg bg-neutral-900 flex items-center justify-center border border-neutral-800 mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Next.js 16 Core</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Leveraging the latest features including Server Actions, Server Components, and optimized routing for a lightning-fast experience.</p>
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group">
              <div className="h-12 w-12 rounded-lg bg-neutral-900 flex items-center justify-center border border-neutral-800 mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Implemented with Better Auth & MongoDB adapter. Secure password handling, session management, and protected routes.</p>
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all group">
              <div className="h-12 w-12 rounded-lg bg-neutral-900 flex items-center justify-center border border-neutral-800 mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium UI/UX</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Designed with Tailwind CSS and Shadcn UI. Featuring glassmorphism, responsive grids, and smooth interactions as per requirement.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer className="border-neutral-900 bg-transparent text-neutral-400 [&_span]:text-neutral-200" />
    </div>
  );
}
