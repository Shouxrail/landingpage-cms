"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import MediaPicker from "@/components/admin/MediaPicker";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: "",
        siteDescription: "",
        baseUrl: "",
        seoTitleTemplate: "%s | My Site",
        ogImageUrl: "",
        logoUrl: "",
        faviconUrl: "",
        gaId: "",
        fbPixelId: "",
        customHeadScripts: ""
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [activePicker, setActivePicker] = useState<"og" | "logo" | "favicon" | null>(null);

    useEffect(() => {
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => {
                setSettings(data);
                setLoading(false);
            });
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccess(false);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Failed to save settings", err);
        } finally {
            setIsSaving(false);
        }
    };

    const updateImg = (url: string) => {
        if (activePicker === "og") setSettings({ ...settings, ogImageUrl: url });
        if (activePicker === "logo") setSettings({ ...settings, logoUrl: url });
        if (activePicker === "favicon") setSettings({ ...settings, faviconUrl: url });
        setActivePicker(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-8 md:p-12 space-y-10 max-w-5xl mx-auto w-full animate-in fade-in duration-700">
            <header className="flex items-center gap-4">
                <Link href="/admin/menu" className="btn btn-ghost btn-circle text-white/40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                </Link>
                <div>
                    <div className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-1">Configuration</div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Site Settings</h1>
                </div>
            </header>

            <form onSubmit={handleSave} className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-20">
                {/* General & Branding */}
                <div className="card glass border border-white/10 shadow-2xl">
                    <div className="card-body p-10 space-y-8">
                        <h2 className="text-xl font-bold text-white mb-2 underline decoration-primary underline-offset-8">General & Branding</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Global Site Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white font-medium h-14 w-full"
                                    value={settings.siteName}
                                    onChange={e => setSettings({ ...settings, siteName: e.target.value })}
                                    placeholder="e.g. My Premium Landing Page"
                                    required
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Base Site URL</span>
                                </label><br />
                                <input
                                    type="url"
                                    className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white font-medium h-14 w-full"
                                    value={settings.baseUrl || ""}
                                    onChange={e => setSettings({ ...settings, baseUrl: e.target.value })}
                                    placeholder="https://yourdomain.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Site Logo</span></label>
                                <div className="flex gap-4 items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                                        {settings.logoUrl ? <img src={settings.logoUrl} className="w-full h-full object-contain" /> : <span className="text-white/20">Logo</span>}
                                    </div>
                                    <button type="button" onClick={() => setActivePicker("logo")} className="btn btn-ghost btn-outline border-white/10 text-white/60 hover:text-white flex-1 h-14 rounded-2xl">Choose Logo</button>
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Favicon</span></label>
                                <div className="flex gap-4 items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                                        {settings.faviconUrl ? <img src={settings.faviconUrl} className="w-10 h-10 object-contain" /> : <span className="text-white/20 italic text-[10px]">Icon</span>}
                                    </div>
                                    <button type="button" onClick={() => setActivePicker("favicon")} className="btn btn-ghost btn-outline border-white/10 text-white/60 hover:text-white flex-1 h-14 rounded-2xl">Choose Icon</button>
                                </div>
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Default Meta Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered focus:textarea-primary bg-white/5 border-white/10 text-white font-medium min-h-[100px] w-full"
                                value={settings.siteDescription || ""}
                                onChange={e => setSettings({ ...settings, siteDescription: e.target.value })}
                                placeholder="Briefly describe your website for search engines..."
                            />
                        </div>
                    </div>
                </div>

                {/* Global SEO & Social Sharing */}
                <div className="card glass border border-white/10 shadow-2xl">
                    <div className="card-body p-10 space-y-8">
                        <h2 className="text-xl font-bold text-white mb-2 underline decoration-secondary underline-offset-8">SEO & Social Sharing</h2>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">SEO Title Template</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white font-medium h-14 w-full"
                                value={settings.seoTitleTemplate || ""}
                                onChange={e => setSettings({ ...settings, seoTitleTemplate: e.target.value })}
                                placeholder="e.g. %s | My Site"
                            />
                            <label className="label py-1">
                                <span className="label-text-alt text-white/30 text-[10px] italic">Use <code>%s</code> as a placeholder for the page-specific title.</span>
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Default Social Share (OG) Image</span>
                            </label>
                            <div className="flex gap-6">
                                <div className="w-48 aspect-video rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                                    {settings.ogImageUrl ? <img src={settings.ogImageUrl} className="w-full h-full object-cover" /> : <span className="text-white/10 font-bold uppercase tracking-widest text-[10px]">No Default Image</span>}
                                </div>
                                <div className="flex-1 flex flex-col justify-center gap-4">
                                    <button type="button" onClick={() => setActivePicker("og")} className="btn btn-primary btn-outline border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-2xl h-14">Choose from Library</button>
                                    <p className="text-[10px] text-white/30 italic">Used when sharing via WhatsApp, Facebook, etc. if page doesn't have one.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analytics & Scripts... (Keep previous) */}
                <div className="card glass border border-white/10 shadow-2xl">
                    <div className="card-body p-10 space-y-8">
                        <h2 className="text-xl font-bold text-white mb-2 underline decoration-accent underline-offset-8">Analytics & Custom Scripts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Google Analytics ID</span></label>
                                <input type="text" className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white font-medium h-14 w-full" value={settings.gaId || ""} onChange={e => setSettings({ ...settings, gaId: e.target.value })} placeholder="G-XXXXXXXXXX" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Meta Pixel ID</span></label>
                                <input type="text" className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white font-medium h-14 w-full" value={settings.fbPixelId || ""} onChange={e => setSettings({ ...settings, fbPixelId: e.target.value })} placeholder="123456789012345" />
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Custom Head Scripts (HTML)</span></label>
                            <textarea className="textarea textarea-bordered focus:textarea-primary bg-white/5 border-white/10 text-white font-mono text-xs min-h-[150px] w-full" value={settings.customHeadScripts || ""} onChange={e => setSettings({ ...settings, customHeadScripts: e.target.value })} placeholder="<script>...your tracking code...</script>" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-4 pointer-events-none">
                    {success && (
                        <div className={`fixed flex items-center gap-2 top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="font-bold">Configuration updated!</span>
                        </div>
                    )}
                    <button type="submit" disabled={isSaving} className="btn btn-primary btn-lg shadow-2xl h-14 px-10 font-black tracking-tight pointer-events-auto hover:scale-105 transition-transform">
                        {isSaving ? <span className="loading loading-spinner"></span> : "Save Site Configuration"}
                    </button>
                </div>
            </form>

            {activePicker && (
                <MediaPicker
                    title={`Select Site ${activePicker === "og" ? "Social Image" : activePicker === "logo" ? "Logo" : "Favicon"}`}
                    onSelect={updateImg}
                    onClose={() => setActivePicker(null)}
                />
            )}
        </div>
    );
}
