import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface Submission {
    id: number;
    form_id: string;
    data: any;
    user_ip: string;
    created_at: string;
    page: {
        slug: string;
        page_title: string;
    } | null;
}

interface SubmissionsProps {
    submissions: {
        data: Submission[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function SubmissionsPage({ submissions }: SubmissionsProps) {
    const [filter, setFilter] = useState("");

    const submissionData = submissions.data || [];

    const filteredSubmissions = submissionData.filter(s => 
        s.form_id?.toLowerCase().includes(filter.toLowerCase()) ||
        s.page?.page_title?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <AdminLayout title="Form Submissions">
            <div className="p-8 md:p-12 space-y-10 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3">Data Collection</div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Form Submissions</h1>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/admin"
                            className="btn btn-ghost border-white/10 text-white/60 hover:text-white transition-all font-bold px-6"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to Dashboard
                        </Link>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input 
                            type="text" 
                            placeholder="Filter by form or page..." 
                            className="input input-bordered w-full pl-12 bg-white/5 border-white/10 text-white focus:input-primary h-12 rounded-2xl"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <div className="text-white/40 font-bold text-sm">
                        Showing {filteredSubmissions.length} submissions
                    </div>
                </div>

                <div className="space-y-6">
                    {filteredSubmissions.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredSubmissions.map((sub) => (
                                <div key={sub.id} className="card glass border border-white/10 overflow-hidden rounded-3xl transition-all hover:bg-white/[0.02]">
                                    <div className="card-body p-6 md:p-8">
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="badge badge-primary font-black uppercase text-[10px] tracking-widest px-2">{sub.form_id}</span>
                                                    <span className="text-white/30 font-bold text-xs">on</span>
                                                    <a href={`/${sub.page?.slug || ''}`} target="_blank" className="text-white font-black hover:text-primary transition-colors">
                                                        {sub.page?.page_title || "Unknown Page"}
                                                    </a>
                                                </div>
                                                <div className="text-white/30 text-[10px] uppercase font-bold tracking-widest">
                                                    {new Date(sub.created_at).toLocaleString()} • IP: {sub.user_ip || "N/A"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {Object.entries(sub.data).map(([key, value]: [string, any]) => (
                                                <div key={key} className="bg-black/20 p-4 rounded-2xl border border-white/5">
                                                    <div className="text-primary font-black uppercase text-[8px] tracking-[0.2em] mb-1">{key}</div>
                                                    <div className="text-white font-medium break-words leading-relaxed">
                                                        {typeof value === 'string' ? value : JSON.stringify(value)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-[3rem]">
                            <div className="text-white/20 font-black text-2xl">No submissions found</div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
