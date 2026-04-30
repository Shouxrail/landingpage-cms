import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MediaPicker from "@/components/admin/MediaPicker";
import axios from "axios";

interface SettingsProps {
    settings: any;
}

export default function SettingsPage({ settings: initialSettings }: SettingsProps) {
    const [settings, setSettings] = useState({
        site_name: initialSettings?.site_name || "",
        site_description: initialSettings?.site_description || "",
        base_url: initialSettings?.base_url || "",
        seo_title_template: initialSettings?.seo_title_template || "%s | My Site",
        og_image_url: initialSettings?.og_image_url || "",
        logo_url: initialSettings?.logo_url || "",
        favicon_url: initialSettings?.favicon_url || "",
        ga_id: initialSettings?.ga_id || "",
        fb_pixel_id: initialSettings?.fb_pixel_id || "",
        custom_head_scripts: initialSettings?.custom_head_scripts || "",
        navigation_menu: initialSettings?.navigation_menu || { items: [] as { label: string; url: string; target?: "_self" | "_blank" }[] }
    });
    
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [activePicker, setActivePicker] = useState<"og" | "logo" | "favicon" | null>(null);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccess(false);
        try {
            const res = await axios.post("/admin/settings", settings);
            if (res.data.success) {
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
        if (activePicker === "og") setSettings({ ...settings, og_image_url: url });
        if (activePicker === "logo") setSettings({ ...settings, logo_url: url });
        if (activePicker === "favicon") setSettings({ ...settings, favicon_url: url });
        setActivePicker(null);
    };

    return (
        <AdminLayout title="Settings">
            <div className="p-8 md:p-12 space-y-10 max-w-5xl mx-auto w-full animate-in fade-in duration-700">
                <header className="flex items-center gap-4">
                    <Link href="/admin" className="btn btn-ghost btn-circle text-white/40">
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
                                        value={settings.site_name}
                                        onChange={e => setSettings({ ...settings, site_name: e.target.value })}
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
                                        value={settings.base_url || ""}
                                        onChange={e => setSettings({ ...settings, base_url: e.target.value })}
                                        placeholder="https://yourdomain.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Site Logo</span></label>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                                            {settings.logo_url ? <img src={settings.logo_url} className="w-full h-full object-contain" /> : <span className="text-white/20">Logo</span>}
                                        </div>
                                        <button type="button" onClick={() => setActivePicker("logo")} className="btn btn-ghost btn-outline border-white/10 text-white/60 hover:text-white flex-1 h-14 rounded-2xl">Choose Logo</button>
                                    </div>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Favicon</span></label>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                                            {settings.favicon_url ? <img src={settings.favicon_url} className="w-10 h-10 object-contain" /> : <span className="text-white/20 italic text-[10px]">Icon</span>}
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
                                    value={settings.site_description || ""}
                                    onChange={e => setSettings({ ...settings, site_description: e.target.value })}
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
                                    value={settings.seo_title_template || ""}
                                    onChange={e => setSettings({ ...settings, seo_title_template: e.target.value })}
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
                                        {settings.og_image_url ? <img src={settings.og_image_url} className="w-full h-full object-cover" /> : <span className="text-white/10 font-bold uppercase tracking-widest text-[10px]">No Default Image</span>}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center gap-4">
                                        <button type="button" onClick={() => setActivePicker("og")} className="btn btn-primary btn-outline border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-2xl h-14">Choose from Library</button>
                                        <p className="text-[10px] text-white/30 italic">Used when sharing via WhatsApp, Facebook, etc. if page doesn't have one.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu Builder */}
                    <div className="card glass border border-white/10 shadow-2xl">
                        <div className="card-body p-10 space-y-8">
                            <h2 className="text-xl font-bold text-white mb-2 underline decoration-primary underline-offset-8">Navigation Menu Builder</h2>

                            <div className="space-y-4">
                                {settings.navigation_menu.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-4 items-end bg-white/5 p-4 rounded-2xl border border-white/5 animate-in slide-in-from-left-4">
                                        <div className="flex-1 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label className="label py-1"><span className="label-text-alt text-white/30 font-black uppercase text-[8px] tracking-widest">Link Label</span></label>
                                                    <input
                                                        type="text"
                                                        className="input input-sm bg-white/5 border-white/10 text-white font-bold h-10"
                                                        value={item.label}
                                                        onChange={e => {
                                                            const newItems = [...settings.navigation_menu.items];
                                                            newItems[idx].label = e.target.value;
                                                            setSettings({ ...settings, navigation_menu: { items: newItems } });
                                                        }}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label py-1"><span className="label-text-alt text-white/30 font-black uppercase text-[8px] tracking-widest">URL / Path</span></label>
                                                    <input
                                                        type="text"
                                                        className="input input-sm bg-white/5 border-white/10 text-white font-bold h-10"
                                                        value={item.url}
                                                        onChange={e => {
                                                            const newItems = [...settings.navigation_menu.items];
                                                            newItems[idx].url = e.target.value;
                                                            setSettings({ ...settings, navigation_menu: { items: newItems } });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newItems = settings.navigation_menu.items.filter((_: any, i: number) => i !== idx);
                                                    setSettings({ ...settings, navigation_menu: { items: newItems } });
                                                }}
                                                className="btn btn-square btn-sm btn-ghost text-error/40 hover:text-error"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    type="button"
                                                    disabled={idx === 0}
                                                    onClick={() => {
                                                        const newItems = [...settings.navigation_menu.items];
                                                        [newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]];
                                                        setSettings({ ...settings, navigation_menu: { items: newItems } });
                                                    }}
                                                    className="btn btn-square btn-xs btn-ghost text-white/20 hover:text-white"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={idx === settings.navigation_menu.items.length - 1}
                                                    onClick={() => {
                                                        const newItems = [...settings.navigation_menu.items];
                                                        [newItems[idx], newItems[idx + 1]] = [newItems[idx + 1], newItems[idx]];
                                                        setSettings({ ...settings, navigation_menu: { items: newItems } });
                                                    }}
                                                    className="btn btn-square btn-xs btn-ghost text-white/20 hover:text-white"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setSettings({ ...settings, navigation_menu: { items: [...settings.navigation_menu.items, { label: "New Link", url: "/" }] } })}
                                    className="btn btn-outline border-dashed border-white/10 text-white/40 hover:text-primary hover:border-primary w-full h-14 rounded-2xl flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                                    Add Menu Item
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card glass border border-white/10 shadow-2xl">
                        <div className="card-body p-10 space-y-8">
                            <h2 className="text-xl font-bold text-white mb-2 underline decoration-accent underline-offset-8">Analytics & Custom Scripts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Google Analytics ID</span></label>
                                    <input type="text" className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white font-medium h-14 w-full" value={settings.ga_id || ""} onChange={e => setSettings({ ...settings, ga_id: e.target.value })} placeholder="G-XXXXXXXXXX" />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Meta Pixel ID</span></label>
                                    <input type="text" className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white font-medium h-14 w-full" value={settings.fb_pixel_id || ""} onChange={e => setSettings({ ...settings, fb_pixel_id: e.target.value })} placeholder="123456789012345" />
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Custom Head Scripts (HTML)</span></label>
                                <textarea className="textarea textarea-bordered focus:textarea-primary bg-white/5 border-white/10 text-white font-mono text-xs min-h-[150px] w-full" value={settings.custom_head_scripts || ""} onChange={e => setSettings({ ...settings, custom_head_scripts: e.target.value })} placeholder="<script>...your tracking code...</script>" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
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
        </AdminLayout>
    );
}
