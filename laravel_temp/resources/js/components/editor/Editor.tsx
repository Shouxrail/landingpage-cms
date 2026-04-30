"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import BlockRenderer from "@/components/BlockRenderer";
import MediaPicker from "@/components/admin/MediaPicker";
import ViewportScaler from "@/components/ViewportScaler";
import PropertyEditor from "./PropertyEditor";
import { BLOCK_REGISTRY } from "@/lib/registry";

interface EditorProps {
  slug: string;
  initialTitle: string;
  initialBlocks: any[];
  initialMobileBlocks: any[] | null;
  initialSettings?: { backgroundColor?: string };
  initialStatus: string;
  initialSeoTitle: string;
  initialSeoDescription: string;
  initialOgImage: string;
}

export default function Editor({
  slug: initialSlug,
  initialTitle,
  initialBlocks,
  initialMobileBlocks,
  initialSettings = { backgroundColor: "#ffffff" },
  initialStatus,
  initialSeoTitle,
  initialSeoDescription,
  initialOgImage
}: EditorProps) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [blocks, setBlocks] = useState(initialBlocks);
  const [mobileBlocks, setMobileBlocks] = useState<any[] | null>(initialMobileBlocks);
  const [settings, setSettings] = useState(initialSettings);
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [status, setStatus] = useState(initialStatus);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const [ogImage, setOgImage] = useState(initialOgImage);
  const [isSaving, setIsSaving] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeBlocks = deviceMode === "desktop" ? blocks : (mobileBlocks || []);
  const setActiveBlocks = deviceMode === "desktop" ? setBlocks : setMobileBlocks as any;

  const saveToMysql = async (publish: boolean = false) => {
    setIsSaving(true);
    const targetStatus = publish ? "published" : "draft";

    try {
      const res = await axios.post(`/admin/editor/${initialSlug}`, {
        content: { blocks, settings },
        mobileContent: mobileBlocks ? { blocks: mobileBlocks } : null,
        pageTitle: title,
        slug: slug,
        status: targetStatus,
        seoTitle: seoTitle,
        seoDescription: seoDescription,
        ogImage: ogImage
      });
      if (res.data.success) {
        if (slug !== initialSlug) {
          window.location.href = `/admin/editor/${slug}`;
        } else {
          setAlertMessage({ message: "Changes " + (publish ? "published" : "saved") + " successfully!", type: "success" });
        }
        setStatus(targetStatus);
      } else {
        setAlertMessage({ message: "Failed to save changes.", type: "error" });
      }
    } catch (error: any) {
      console.error("Save failed:", error);
      setAlertMessage({ message: error.response?.data?.message || "Failed to save changes.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const updateBlockData = (index: number, newData: any) => {
    const newBlocks = [...activeBlocks];
    newBlocks[index] = { ...newBlocks[index], data: newData };
    setActiveBlocks(newBlocks);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      {/* 1. SIDEBAR (ARCHITECTURE LIST + META + SEO) */}
      <Sidebar
        deviceMode={deviceMode}
        blocks={activeBlocks}
        onUpdateBlocks={setActiveBlocks}
        settings={settings}
        onUpdateSettings={setSettings}
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}
        title={title}
        isSaving={isSaving}
        saveToMysql={saveToMysql}
        onUpdateTitle={setTitle}
        status={status}
        slug={slug}
        onUpdateSlug={setSlug}
        seoTitle={seoTitle}
        onUpdateSeoTitle={setSeoTitle}
        seoDescription={seoDescription}
        onUpdateSeoDescription={setSeoDescription}
        ogImage={ogImage}
        onUpdateOgImage={() => setShowMediaPicker(true)}
      />

      {/* 2. MAIN COMPOSITION AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP VIEWPORT TOGGLE BAR */}
        <div className="h-14 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center gap-2 z-10">
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

        {/* PREVIEW CONTAINER */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[#0a0a0a] pattern-dots custom-scrollbar flex flex-col items-center py-10">
          {deviceMode === 'mobile' && mobileBlocks === null ? (
            <div className="flex flex-col items-center justify-center m-auto p-12 bg-white/5 border border-white/10 rounded-3xl max-w-md text-center">
              <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 border border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Create Mobile Version</h3>
              <p className="text-white/50 text-sm mb-8">Design a custom mobile experience. You can start fresh or copy your existing desktop blocks as a baseline.</p>
              
              <div className="flex flex-col gap-3 w-full">
                <button onClick={() => setMobileBlocks([...blocks])} className="btn btn-primary w-full font-bold shadow-lg shadow-primary/20">
                  Copy Desktop Blocks
                </button>
                <button onClick={() => setMobileBlocks([])} className="btn btn-outline border-white/20 text-white hover:bg-white/10 w-full font-bold">
                  Start Empty
                </button>
              </div>
            </div>
          ) : (
            <div 
              className={`bg-white transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl ${
                deviceMode === 'mobile' 
                  ? 'w-[375px] min-h-[812px] rounded-[3rem] border-[8px] border-[#1a1a1a] shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden' 
                  : 'w-full min-h-full'
              }`}
            >
              <div style={{
                transform: deviceMode === 'desktop' ? 'scale(0.8)' : 'scale(1)',
                transformOrigin: 'top center',
                marginBottom: deviceMode === 'desktop' ? '-20%' : '0'
              }}>
                <div className="overflow-hidden bg-white">
                  {activeBlocks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 min-h-[500px]">
                      <span className="text-6xl mb-6">✨</span>
                      <h3 className="text-xl font-black text-slate-800">Your canvas is empty</h3>
                      <p className="text-slate-500 mt-2">Add your first block from the sidebar</p>
                    </div>
                  ) : (
                    <BlockRenderer blocks={activeBlocks} />
                  )}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 3. BOTTOM EDITOR BAR (PROPERTIES) */}
        <div className={`transition-all duration-500 ease-in-out bg-black border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-40 h-[30%]`}>
          {selectedIndex !== null ? activeBlocks[selectedIndex] && (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <div className="max-w-5xl mx-auto">
                  <PropertyEditor
                    schema={BLOCK_REGISTRY[activeBlocks[selectedIndex].type]?.Schema}
                    data={activeBlocks[selectedIndex].data}
                    onChange={(newData) => updateBlockData(selectedIndex, newData)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center">
              <span className="text-6xl mb-6">✨</span>
              <h3 className="text-xl font-black text-slate-800">Select a block to edit</h3>
            </div>
          )}
        </div>
      </div>

      {alertMessage && (
        <div className={`fixed bottom-24 left-50 -translate-x-1/2 z-[100] ${alertMessage.type === "success" ? "bg-green-500" : "bg-red-500"} text-white px-8 py-3 rounded-2xl shadow-2xl font-bold animate-in slide-in-from-bottom-4`}>
          {alertMessage.message}
        </div>
      )}

      {
        showMediaPicker && (
          <MediaPicker
            title="Select Page Social Image"
            onSelect={(url) => { setOgImage(url); setShowMediaPicker(false); }}
            onClose={() => setShowMediaPicker(false)}
          />
        )
      }
    </div >
  );
}
