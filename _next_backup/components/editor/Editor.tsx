"use client";
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
  initialSettings = { backgroundColor: "#ffffff" },
  initialStatus,
  initialSeoTitle,
  initialSeoDescription,
  initialOgImage
}: EditorProps) {
  const [blocks, setBlocks] = useState(initialBlocks);
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

  const saveToMysql = async (publish: boolean = false) => {
    setIsSaving(true);
    const targetStatus = publish ? "published" : "draft";

    try {
      const res = await fetch(`/api/admin/editor/${initialSlug}`, {
        method: "POST",
        body: JSON.stringify({
          content: { blocks, settings },
          pageTitle: title,
          slug: slug,
          status: targetStatus,
          seoTitle: seoTitle,
          seoDescription: seoDescription,
          ogImage: ogImage
        }),
      });
      if (res.ok) {
        if (slug !== initialSlug) {
          window.location.href = `/admin/editor/${slug}`;
        } else {
          setAlertMessage({ message: "Changes " + (publish ? "published" : "saved") + " successfully!", type: "success" });
        }
        setStatus(targetStatus);
      } else {
        setAlertMessage({ message: "Failed to save changes. " + res.statusText, type: "error" });
      }
    } catch (error) {
      console.error("Save failed:", error);
      setAlertMessage({ message: "Failed to save changes.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const updateBlockData = (index: number, newData: any) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], data: newData };
    setBlocks(newBlocks);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      {/* 1. SIDEBAR (ARCHITECTURE LIST + META + SEO) */}
      <Sidebar
        blocks={blocks}
        onUpdateBlocks={setBlocks}
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
        {/* PREVIEW CONTAINER */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-white pattern-dots custom-scrollbar">
          <div className="bg-gray-300 flex flex-col items-center">
            <div style={{
              transform: 'scale(0.7)',
              transformOrigin: 'top center',
              // width: '1440px',
              marginBottom: '-60%' // Offset the layout gap created by the transform
            }}>
              <div className="overflow-hidden bg-black">
                {blocks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50">
                    <span className="text-6xl mb-6">✨</span>
                    <h3 className="text-xl font-black text-slate-800">Your canvas is empty</h3>
                    <p className="text-slate-500 mt-2">Add your first block from the sidebar</p>
                  </div>
                ) : (
                  <BlockRenderer blocks={blocks} />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* 3. BOTTOM EDITOR BAR (PROPERTIES) */}
        <div className={`transition-all duration-500 ease-in-out bg-black border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-40 h-[30%]`}>
          {selectedIndex !== null ? blocks[selectedIndex] && (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <div className="max-w-5xl mx-auto">
                  <PropertyEditor
                    schema={BLOCK_REGISTRY[blocks[selectedIndex].type]?.Schema}
                    data={blocks[selectedIndex].data}
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
