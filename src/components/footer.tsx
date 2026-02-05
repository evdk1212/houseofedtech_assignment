
import Link from "next/link"

export function Footer({ className }: { className?: string }) {
    return (
        <footer className={`py-6 text-center text-sm text-muted-foreground border-t ${className}`}>
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; 2026 House of Edtech. All rights reserved.</p>
                <div className="flex gap-4 items-center">
                    <span>Built by <span className="font-semibold underline decoration-indigo-500/30 hover:decoration-indigo-500 transition-all text-current">DEEPAKKUMAR E</span></span>
                    <Link href="https://github.com/evdk1212" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        GitHub
                    </Link>
                    <Link href="https://www.linkedin.com/in/evdk12" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer>
    )
}
