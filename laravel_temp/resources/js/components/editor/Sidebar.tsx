"use client";
import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { BLOCK_REGISTRY } from "@/lib/registry";

interface SidebarProps {
  deviceMode?: "desktop" | "mobile";
  blocks: any[];
  onUpdateBlocks: (blocks: any[]) => void;
  settings: { 
    backgroundColor?: string; 
    isSnapScroll?: boolean; 
    isSnapScrollMobile?: boolean;
    isTitleReveal?: boolean; 
    isTitleRevealMobile?: boolean;
  };
  onUpdateSettings: (settings: any) => void;
  selectedIndex: number | null;
  onSelectIndex: (index: number | null) => void;
  title: string;
  onUpdateTitle: (title: string) => void;
  status: string;
  slug: string;
  onUpdateSlug: (slug: string) => void;
  seoTitle: string;
  onUpdateSeoTitle: (title: string) => void;
  seoDescription: string;
  onUpdateSeoDescription: (desc: string) => void;
  ogImage: string;
  onUpdateOgImage: () => void;
  isSaving: boolean;
  saveToMysql: (publish: boolean) => void;
  setDeviceMode: (mode: "desktop" | "mobile") => void;
  setSelectedIndex: (index: number | null) => void;
}

export default function Sidebar({
  deviceMode = "desktop",
  blocks,
  onUpdateBlocks,
  settings,
  onUpdateSettings,
  selectedIndex,
  onSelectIndex,
  title,
  onUpdateTitle,
  isSaving,
  saveToMysql,
  slug,
  status,
  onUpdateSlug,
  seoTitle,
  onUpdateSeoTitle,
  seoDescription,
  onUpdateSeoDescription,
  ogImage,
  onUpdateOgImage,
  setDeviceMode,
  setSelectedIndex
}: SidebarProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'architecture' | 'page' | 'seo'>('architecture');

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(index, 0, movedBlock);
    onUpdateBlocks(newBlocks);
    onSelectIndex(index);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const addBlock = (type: string) => {
    const config = BLOCK_REGISTRY[type];
    const defaultData = Object.entries(config.Schema).reduce((acc: any, [key, val]: [string, any]) => {
      acc[key] = val.default;
      return acc;
    }, {});

    onUpdateBlocks([...blocks, { type, data: defaultData }]);
    onSelectIndex(blocks.length);
    setActiveTab('architecture');
  };

  const removeBlock = (index: number) => {
    onUpdateBlocks(blocks.filter((_, i) => i !== index));
    if (selectedIndex === index) onSelectIndex(null);
  };

  return (
    <aside className="w-[30%] border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col h-full overflow-hidden">
      {/* TOP STATUS BAR */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/20">
        <Link href="/admin" className="btn btn-primary btn-sm h-9 px-6 rounded-lg text-white font-bold">
          Back
        </Link>
        <div className="flex flex-col items-center justify-center">
          <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{slug}</div>
          {deviceMode === 'mobile' && (
            <div className="text-[9px] font-bold text-primary uppercase tracking-widest mt-0.5 bg-primary/10 px-2 py-0.5 rounded">Mobile Blocks</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => saveToMysql(status === 'published' ? true : false)}
            disabled={isSaving}
            className="btn btn-ghost btn-sm h-9 px-6 rounded-lg text-white font-bold"
          >
            {isSaving ? "..." : "Save"}
          </button>
          <button
            onClick={() => saveToMysql(status === 'published' ? false : true)}
            disabled={isSaving}
            className={`btn btn-sm h-9 px-6 rounded-lg font-bold ${status === 'published' ? 'btn-error' : 'btn-primary'}`}
          >
            {status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </header>
      <div className="flex border-b border-white/5">
        {[
          { id: 'architecture', label: 'Blocks' },
          { id: 'page', label: 'Meta' },
          { id: 'seo', label: 'SEO' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-white/20 hover:text-white/40'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        {activeTab === 'architecture' && (
          <>
            <section className="space-y-4">
              <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Block Order</h3>
              <div className="space-y-1">
                {blocks.map((block, idx) => (
                  <div
                    key={idx}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, idx)}
                    onClick={() => onSelectIndex(selectedIndex === idx ? null : idx)}
                    className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between
                      ${dragOverIndex === idx && draggedIndex !== idx ? 'border-primary/60 bg-primary/5 scale-[1.01]' : ''}
                      ${draggedIndex === idx ? 'opacity-40 scale-95' : ''}
                      ${selectedIndex === idx && draggedIndex !== idx ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' : 'bg-white/5 border-transparent hover:border-white/10'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {/* Grip handle */}
                      <div className="text-white/20 hover:text-white/50 cursor-grab active:cursor-grabbing shrink-0" title="Drag to reorder">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
                          <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                          <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
                        </svg>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${selectedIndex === idx ? 'bg-primary' : 'bg-white/20'}`}></div>
                      <span className="text-[11px] font-bold capitalize text-white">{block.type}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); removeBlock(idx); }} className="opacity-0 group-hover:opacity-100 text-error/60 hover:text-error transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Add Block</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(BLOCK_REGISTRY).map(type => (
                  <button key={type} onClick={() => addBlock(type)} className="p-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-white/50 hover:bg-primary/20 hover:border-primary/30 hover:text-white transition-all text-center capitalize">
                    {type}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'page' && (
          <section className="space-y-6">

            <div className="space-y-4">
              <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">General Info</h3>
              {/* TOP VIEWPORT TOGGLE BAR */}
              <div className="h-14 bg-black/40 backdrop-blur-md flex items-center justify-center gap-2 z-10">
                <div className="bg-white/5 p-1 rounded-xl flex gap-1 border border-white/10">
                  <button
                    onClick={() => { setDeviceMode('desktop'); setSelectedIndex(null); }}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${deviceMode === 'desktop' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Desktop
                  </button>
                  <button
                    onClick={() => { setDeviceMode('mobile'); setSelectedIndex(null); }}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${deviceMode === 'mobile' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    Mobile
                  </button>
                </div>
              </div>
              <div className="form-control">
                <label className="label py-1"><span className="label-text-alt text-white/30 font-black uppercase text-[8px] tracking-widest">Internal Page Title</span></label>
                <input type="text" className="input input-sm bg-white/5 border-white/10 text-white font-bold h-10" value={title} onChange={(e) => onUpdateTitle(e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label py-1"><span className="label-text-alt text-white/30 font-black uppercase text-[8px] tracking-widest">URL Slug Path</span></label>
                <div className="join w-full">
                  <span className="join-item bg-white/5 border border-white/10 px-2 flex items-center text-white/20 text-xs">/</span>
                  <input type="text" className="input input-sm bg-white/5 border-white/10 text-white font-bold h-10 join-item flex-1" value={slug} onChange={(e) => onUpdateSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Page Styling</h3>

              <div className="form-control">
                <label className="label cursor-pointer flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl transition-colors hover:bg-white/10">
                  <div className="flex flex-col">
                    <span className="label-text-alt text-white/50 font-black uppercase text-[8px] tracking-widest">Snap Scroll (Desktop)</span>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-xs"
                    checked={settings.isSnapScroll !== false} // Default to true if undefined
                    onChange={(e) => onUpdateSettings({ ...settings, isSnapScroll: e.target.checked })}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl transition-colors hover:bg-white/10">
                  <span className="label-text-alt text-white/50 font-black uppercase text-[8px] tracking-widest">Snap Scroll (Mobile)</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-xs"
                    checked={settings.isSnapScrollMobile || false}
                    onChange={(e) => onUpdateSettings({ ...settings, isSnapScrollMobile: e.target.checked })}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl transition-colors hover:bg-white/10">
                  <span className="label-text-alt text-white/50 font-black uppercase text-[8px] tracking-widest">Title Reveal (Desktop)</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-xs"
                    checked={settings.isTitleReveal || false}
                    onChange={(e) => onUpdateSettings({ ...settings, isTitleReveal: e.target.checked })}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl transition-colors hover:bg-white/10">
                  <span className="label-text-alt text-white/50 font-black uppercase text-[8px] tracking-widest">Title Reveal (Mobile)</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-xs"
                    checked={settings.isTitleRevealMobile || false}
                    onChange={(e) => onUpdateSettings({ ...settings, isTitleRevealMobile: e.target.checked })}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label py-1"><span className="label-text-alt text-white/30 font-black uppercase text-[8px] tracking-widest">Background Color</span></label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                  <input
                    type="color"
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none"
                    value={settings.backgroundColor || '#ffffff'}
                    onChange={(e) => onUpdateSettings({ ...settings, backgroundColor: e.target.value })}
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      className="bg-transparent border-none text-white font-mono text-[10px] w-full focus:outline-none"
                      value={settings.backgroundColor || '#ffffff'}
                      onChange={(e) => onUpdateSettings({ ...settings, backgroundColor: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {['#ffffff', '#000000', '#f8fafc', '#0f172a', '#334155'].map(color => (
                    <button
                      key={color}
                      onClick={() => onUpdateSettings({ ...settings, backgroundColor: color })}
                      className={`w-full aspect-square rounded-lg border border-white/10 transition-transform active:scale-95 ${settings.backgroundColor === color ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'seo' && (
          <section className="space-y-6">
            <div className="form-control">
              <label className="label py-1"><span className="label-text-alt text-white/30 font-black uppercase text-[8px] tracking-widest">Google / SEO Title</span></label>
              <input type="text" className="input input-sm bg-white/5 border-white/10 text-white font-bold h-10" value={seoTitle} onChange={(e) => onUpdateSeoTitle(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label py-1"><span className="label-text-alt text-white/30 font-black uppercase text-[8px] tracking-widest">Meta Description</span></label>
              <textarea className="textarea textarea-sm bg-white/5 border-white/10 text-white font-bold min-h-[100px]" value={seoDescription} onChange={(e) => onUpdateSeoDescription(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label py-1"><span className="label-text-alt text-white/30 font-black uppercase text-[8px] tracking-widest">Social Share Image</span></label>
              <div className="flex gap-2">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-2 min-h-[100px] flex items-center justify-center relative overflow-hidden group">
                  {ogImage ? (
                    <img src={ogImage} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Preview" />
                  ) : (
                    <span className="text-[10px] font-bold text-white/10">No image chosen</span>
                  )}
                  <button onClick={() => onUpdateOgImage()} className="relative z-10 btn btn-xs btn-primary font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all">Change</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
