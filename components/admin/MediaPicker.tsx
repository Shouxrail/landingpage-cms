"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Media {
    id: number;
    fileName: string;
    storagePath: string;
    mimeType: string;
    size: number;
}

interface MediaPickerProps {
    onSelect: (url: string) => void;
    onClose: () => void;
    title?: string;
}

export default function MediaPicker({ onSelect, onClose, title = "Select Media" }: MediaPickerProps) {
    const [mediaItems, setMediaItems] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
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

    const component = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative w-full max-w-5xl h-full max-h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <header className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-3xl sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
                        <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Manage your premium assets</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className={`btn btn-primary btn-sm h-11 px-6 font-bold shadow-lg shadow-primary/20 ${isUploading ? 'loading' : ''}`}>
                            <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} accept="image/*" />
                            {isUploading ? "Uploading..." : "Upload New"}
                        </label>
                        <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm text-white/40 hover:bg-white/20 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l18 18" /></svg>
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : mediaItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-30 select-none">
                            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl">📁</div>
                            <div className="text-sm font-bold uppercase tracking-widest text-white">No media found</div>
                            <p className="text-xs max-w-xs">Upload your first high-quality asset to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {mediaItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative aspect-square bg-white/5 border border-white/5 overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 active:scale-95 shadow-lg"
                                    onClick={() => onSelect(item.storagePath)}
                                >
                                    <img
                                        src={item.storagePath}
                                        alt={item.fileName}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <p className="text-[10px] font-bold text-white truncate max-w-full">{item.fileName}</p>
                                        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mt-1">{(item.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    if (!mounted) return null;

    return createPortal(component, document.body);
}
