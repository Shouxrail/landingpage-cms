"use client";
import { useState } from "react";
import Link from "next/link";
import { BLOCK_REGISTRY } from "@/lib/registry";
import PropertyEditor from "./PropertyEditor";

interface SidebarProps {
  blocks: any[];
  onUpdateBlocks: (blocks: any[]) => void;
  title: string;
  status: string;
  onUpdateTitle: (title: string) => void;
  slug: string;
  onUpdateSlug: (slug: string) => void;
  seoTitle: string;
  onUpdateSeoTitle: (val: string) => void;
  seoDescription: string;
  onUpdateSeoDescription: (val: string) => void;
  ogImage: string;
  onUpdateOgImage: (val: string) => void;
  onSave: (publish: boolean) => void;
  isSaving: boolean;
}

export default function Sidebar({
  blocks,
  onUpdateBlocks,
  title,
  status,
  onUpdateTitle,
  slug,
  onUpdateSlug,
  seoTitle,
  onUpdateSeoTitle,
  seoDescription,
  onUpdateSeoDescription,
  ogImage,
  onUpdateOgImage,
  onSave,
  isSaving
}: SidebarProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const updateBlockData = (index: number, newData: any) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], data: newData };
    onUpdateBlocks(newBlocks);
  };

  const addBlock = (type: string) => {
    const config = BLOCK_REGISTRY[type];
    const defaultData = Object.entries(config.Schema).reduce((acc: any, [key, val]: [string, any]) => {
      acc[key] = val.default;
      return acc;
    }, {});

    onUpdateBlocks([...blocks, { type, data: defaultData }]);
    setSelectedIndex(blocks.length);
  };

  const removeBlock = (index: number) => {
    onUpdateBlocks(blocks.filter((_, i) => i !== index));
    if (selectedIndex === index) setSelectedIndex(null);
  };

  return (
    <aside className="w-[380px] bg-white/5 backdrop-blur-3xl border-r border-white/10 flex flex-col h-screen overflow-hidden selection:bg-primary/30">
      <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-2xl sticky top-0 z-20">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link href="/admin/menu" className="btn btn-ghost btn-circle btn-sm text-white/40 -ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <h2 className="font-black text-2xl text-white tracking-tighter">Editor</h2>
            <div className="badge badge-primary badge-xs animate-pulse capitalize">{status}</div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => onSave(status === "published")}
            disabled={isSaving}
            className="btn btn-ghost btn-sm h-10 px-6 font-bold text-white"
          >
            {isSaving ? <span className="loading loading-spinner loading-xs"></span> : "Save"}
          </button>

          <button
            onClick={() => onSave(status !== "published")}
            disabled={isSaving}
            className={`btn btn-sm text-white shadow-lg shadow-primary/20 h-10 px-6 font-bold ${status === "draft" ? "btn-primary" : "btn-error"}`}
          >
            {isSaving ? <span className="loading loading-spinner loading-xs"></span> : status === "draft" ? "Publish" : "Unpublish"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {/* Page Meta Settings */}
        <section className="space-y-5">
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Identity</h3>
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Page Title</span></label>
            <input
              type="text"
              className="input input-sm bg-white/5 border-white/10 text-white font-bold h-10"
              value={title}
              onChange={(e) => onUpdateTitle(e.target.value)}
            />
          </div>
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">URL Slug</span></label>
            <div className="join w-full">
              <span className="join-item bg-white/5 border border-white/10 px-3 flex items-center text-white/20 text-xs font-bold">/</span>
              <input
                type="text"
                className="input input-sm bg-white/5 border-white/10 text-white font-bold h-10 flex-1 join-item"
                value={slug}
                onChange={(e) => onUpdateSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              />
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="space-y-5">
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">SEO Optimization</h3>
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">SEO Title Tag</span></label>
            <input
              type="text"
              placeholder="Search engine title..."
              className="input input-sm bg-white/5 border-white/10 text-white font-bold h-10"
              value={seoTitle}
              onChange={(e) => onUpdateSeoTitle(e.target.value)}
            />
          </div>
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Meta Description</span></label>
            <textarea
              placeholder="Search engine summary..."
              className="textarea textarea-sm bg-white/5 border-white/10 text-white font-bold min-h-[80px]"
              value={seoDescription}
              onChange={(e) => onUpdateSeoDescription(e.target.value)}
            />
          </div>
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-white/50 font-bold text-[10px] uppercase tracking-widest">Share Image (OG Image) URL</span></label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="https://..."
                className="input input-sm bg-white/5 border-white/10 text-white font-bold h-10 flex-1 min-w-0"
                value={ogImage}
                onChange={(e) => onUpdateOgImage(e.target.value)}
              />
              <button
                onClick={() => onUpdateOgImage("")}
                className="btn btn-ghost btn-sm bg-white/5 border border-white/10 text-white/40 hover:text-white h-10 px-3 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </button>
            </div>
            <label className="label py-1">
              <span className="label-text-alt text-white/20 text-[9px] italic line-clamp-1">Leave empty to use global default</span>
            </label>
          </div>
        </section>

        {/* Block List */}
        <section>
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">Page Architecture</h3>
          <div className="space-y-3">
            {blocks.length === 0 && (
              <div className="text-white/20 text-sm italic py-4 text-center border border-dashed border-white/10 rounded-2xl">
                No blocks added yet
              </div>
            )}
            {blocks.map((block, idx) => (
              <div
                key={idx}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${selectedIndex === idx
                  ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--p),0.1)]"
                  : "bg-white/5 border-white/5 hover:border-white/20"
                  }`}
                onClick={() => setSelectedIndex(idx)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full transition-colors ${selectedIndex === idx ? "bg-primary shadow-[0_0_10px_rgba(var(--p),0.5)]" : "bg-white/20"}`}></div>
                  <span className={`text-sm font-bold capitalize ${selectedIndex === idx ? "text-white" : "text-white/60"}`}>{block.type}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeBlock(idx); }}
                  className="opacity-0 group-hover:opacity-100 btn btn-ghost btn-xs text-error/60 hover:text-error transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Property Editor */}
        {selectedIndex !== null && (
          <section className="bg-white/5 p-6 rounded-3xl border border-white/10 animate-in slide-in-from-bottom-4 duration-500 shadow-inner">
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6 flex items-center justify-between">
              Attributes: {blocks[selectedIndex].type}
              <button onClick={() => setSelectedIndex(null)} className="btn btn-ghost btn-xs text-white/20 hover:text-white">Close</button>
            </h3>
            <PropertyEditor
              schema={BLOCK_REGISTRY[blocks[selectedIndex!].type]?.Schema}
              data={blocks[selectedIndex!].data}
              onChange={(newData) => updateBlockData(selectedIndex!, newData)}
            />
          </section>
        )}

        {/* Add Block */}
        <section>
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">Library</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(BLOCK_REGISTRY).map((type) => (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="p-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 flex flex-col items-center gap-3 active:scale-95 group"
              >
                <div className="p-2 bg-white/5 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </div>
                <span className="capitalize">{type}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
