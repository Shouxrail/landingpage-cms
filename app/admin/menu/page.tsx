"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { logoutAction } from "../login/actions";

export default function MenuPage() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newSlug, setNewSlug] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState("");

    const fetchPages = async () => {
        try {
            const res = await fetch("/api/admin/pages");
            const data = await res.json();
            setPages(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch pages", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleLogout = async () => {
        await logoutAction();
        window.location.href = "/admin/login";
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        setError("");
        try {
            const res = await fetch("/api/admin/pages", {
                method: "POST",
                body: JSON.stringify({ title: newTitle, slug: newSlug }),
            });
            const data = await res.json();
            if (res.ok) {
                window.location.href = `/admin/editor/${newSlug}`;
            } else {
                setError(data.error || "Failed to create page");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="p-8 md:p-12 space-y-10 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3">Landing Page Management</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Dashboard</h1>
                </div>
                <div>
                    <div className="text-right mb-3">
                        <button
                            onClick={handleLogout}
                            className="btn btn-ghost text-white/40 hover:text-error transition-all font-black text-xs uppercase tracking-widest px-6"
                        >
                            Sign Out
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/admin/settings"
                            className="btn btn-ghost border-white/10 text-white/60 hover:text-white transition-all font-bold px-6"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Settings
                        </Link>
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-primary shadow-lg shadow-primary/20 h-10 px-4 font-bold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M12 4v16m8-8H4" /></svg>
                            Create Page
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stats glass border border-white/10 text-white">
                    <div className="stat">
                        <div className="stat-title text-white/50 text-xs font-bold uppercase tracking-widest">Total Pages</div>
                        <div className="stat-value">{pages.length}</div>
                        <div className="stat-desc text-white/30 text-xs mt-1">Landing pages created</div>
                    </div>
                </div>
                <div className="stats glass border border-white/10 text-white">
                    <div className="stat">
                        <div className="stat-title text-white/50 text-xs font-bold uppercase tracking-widest">Global Status</div>
                        <div className="stat-value text-secondary">Healthy</div>
                        <div className="stat-desc text-white/30 text-xs mt-1">Drizzle/MySQL Cluster</div>
                    </div>
                </div>
                <div className="stats glass border border-white/10 text-white">
                    <div className="stat">
                        <div className="stat-title text-white/50 text-xs font-bold uppercase tracking-widest">Latency</div>
                        <div className="stat-value text-accent">12ms</div>
                        <div className="stat-desc text-white/30 text-xs mt-1">Optimized Edge cached</div>
                    </div>
                </div>
            </div>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white/90">Your Landing Pages</h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-48 rounded-[3rem] bg-white/5 animate-pulse border border-white/5"></div>)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pages.map((page) => (
                            <div key={page.slug} className="card glass border border-white/10 transition-all duration-500 active:scale-95 group shadow-xl overflow-hidden rounded-[3rem]">
                                <div className="card-body p-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        </div>
                                    </div>
                                    <h3 className="card-title text-2xl font-black text-white transition-colors mb-2">{page.pageTitle}</h3>
                                    <p className="text-white/40 text-sm font-medium tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">slug: /{page.slug}</p>
                                    <Link
                                        target="_blank"
                                        href={`/${page.slug}`} className="card-actions justify-end mt-8">
                                        <div className="btn btn-sm btn-ghost text-white/60 hover:text-blue-400 group-hover:text-white group-hover:translate-x-1 transition-all flex items-center gap-2 font-bold px-0">
                                            View Live Page
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </div>
                                    </Link>
                                    <Link href={`/admin/editor/${page.slug}`} className="card-actions justify-end">
                                        <div className="btn btn-sm btn-ghost text-white/60 hover:text-blue-400 group-hover:text-white group-hover:translate-x-1 transition-all flex items-center gap-2 font-bold px-0">
                                            View Editor
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {pages.length === 0 && (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-[3rem]">
                                <div className="text-white/20 font-black text-2xl mb-4">No pages found</div>
                                <button onClick={() => setShowModal(true)} className="btn btn-primary btn-outline">Create your first page</button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="card glass w-full max-w-md border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="card-body p-8 space-y-6">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-2xl font-black text-white tracking-tight">Create New Page</h2>
                                <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-circle btn-sm text-white/40"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button>
                            </div>

                            {error && <div className="alert alert-error text-xs font-bold py-3"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{error}</div>}

                            <form onSubmit={handleCreate} className="space-y-5">
                                <div className="form-control">
                                    <label className="label py-1"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Page Title</span></label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Summer Sale 2026"
                                        className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white font-medium"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label py-1"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">URL Slug</span></label>
                                    <div className="join w-full">
                                        <span className="join-item bg-white/5 border border-white/10 px-4 flex items-center text-white/30 text-sm font-medium">/</span>
                                        <input
                                            required
                                            type="text"
                                            placeholder="summer-sale"
                                            className="join-item input input-bordered focus:input-primary bg-white/5 border-white/10 text-white font-medium flex-1 h-12"
                                            value={newSlug}
                                            onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost flex-1 text-white/40 h-14">Cancel</button>
                                    <button type="submit" disabled={isCreating} className="btn btn-primary flex-[2] h-14 shadow-lg shadow-primary/20">
                                        {isCreating ? <span className="loading loading-spinner"></span> : "Launch Page"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}