"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Media {
    id: number;
    fileName: string;
    storagePath: string;
    mimeType: string;
    size: number;
    createdAt: string;
}

export default function MediaLibraryPage() {
    const [mediaItems, setMediaItems] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Media | null>(null);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/media");
            const data = await res.json();
            setMediaItems(data);
        } catch (err) {
            console.error("Failed to fetch media", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/media", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                fetchMedia();
            }
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this asset? This cannot be undone.")) return;

        try {
            const res = await fetch(`/api/admin/media/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setMediaItems(mediaItems.filter(item => item.id !== id));
                setSelectedItem(null);
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="flex h-screen bg-transparent overflow-hidden">
            {/* Left List */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-white/10">
                <header className="p-8 border-b border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/menu" className="btn btn-ghost btn-circle text-white/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                        </Link>
                        <div>
                            <div className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-1">Asset Manager</div>
                            <h1 className="text-3xl font-black text-white tracking-tight">Media Library</h1>
                        </div>
                    </div>
                    <label className={`btn btn-primary shadow-lg shadow-primary/20 h-12 px-8 font-bold ${isUploading ? 'loading' : ''}`}>
                        <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} accept="image/*" />
                        {isUploading ? "Processing..." : "Upload New Asset"}
                    </label>
                </header>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <span className="loading loading-spinner loading-lg text-primary opacity-20"></span>
                        </div>
                    ) : mediaItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-20 text-center space-y-6 opacity-20">
                            <div className="w-32 h-32 rounded-full border border-dashed border-white flex items-center justify-center text-6xl">✨</div>
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Library is empty</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {mediaItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`group relative aspect-square rounded-[2rem] overflow-hidden border transition-all duration-300 cursor-pointer shadow-xl ${selectedItem?.id === item.id
                                            ? "bg-primary/10 border-primary shadow-primary/20"
                                            : "bg-white/5 border-white/5 hover:border-white/20"
                                        }`}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <img src={item.storagePath} alt={item.fileName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                                        <p className="text-[10px] font-bold text-white truncate">{item.fileName}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Sidebar */}
            <aside className={`w-[400px] bg-white/5 backdrop-blur-3xl p-8 flex flex-col gap-8 transition-all duration-500 overflow-y-auto ${selectedItem ? 'translate-x-0' : 'translate-x-full'}`}>
                {!selectedItem ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20 gap-4">
                        <div className="w-16 h-16 rounded-3xl border border-white flex items-center justify-center text-2xl">👁️</div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white">Select an item to view details</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.2em]">Asset Preview</h3>
                                <button onClick={() => setSelectedItem(null)} className="btn btn-ghost btn-circle btn-xs text-white/40">✕</button>
                            </div>
                            <div className="aspect-square rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
                                <img src={selectedItem.storagePath} alt={selectedItem.fileName} className="w-full h-full object-contain p-4" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.2em]">Metadata</h3>
                            <div className="grid gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">File Name</p>
                                    <p className="text-xs text-white break-all font-medium">{selectedItem.fileName}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Direct URL</p>
                                    <input
                                        readOnly
                                        value={window.location.origin + selectedItem.storagePath}
                                        className="text-[10px] text-white/60 bg-transparent border-none w-full p-0 font-mono outline-none cursor-copy"
                                        onClick={(e) => {
                                            (e.target as HTMLInputElement).select();
                                            navigator.clipboard.writeText(window.location.origin + selectedItem.storagePath);
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Dimensions</p>
                                        <p className="text-xs text-white font-medium">Auto</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">File Size</p>
                                        <p className="text-xs text-white font-medium">{(selectedItem.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto space-y-4 pt-8">
                            <button
                                onClick={() => handleDelete(selectedItem.id)}
                                className="btn btn-error btn-outline w-full rounded-2xl h-14 font-black tracking-widest text-[10px] uppercase border-error/30 hover:bg-error hover:border-error group shadow-xl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Destroy Asset
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}
