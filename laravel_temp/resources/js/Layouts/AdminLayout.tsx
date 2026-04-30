import { ReactNode } from 'react';
import { Head, router } from '@inertiajs/react';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = 'Admin Dashboard' }: AdminLayoutProps) {
    return (
        <div className="min-h-screen animate-mesh flex flex-col bg-[#050505] selection:bg-primary/30 relative overflow-hidden">
            <Head title={title} />
            
            {/* Shared Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
            </div>

            <main className="flex-1 flex flex-col relative z-10 font-sans">
                {children}
            </main>
        </div>
    );
}
