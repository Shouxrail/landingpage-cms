"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import BlockRenderer from "@/components/BlockRenderer";
import MediaPicker from "@/components/admin/MediaPicker";

interface EditorProps {
  slug: string;
  initialTitle: string;
  initialBlocks: any[];
  initialStatus: string;
  initialSeoTitle: string;
  initialSeoDescription: string;
  initialOgImage: string;
}

export default function Editor({
  slug: initialSlug,
  initialTitle,
  initialBlocks,
  initialStatus,
  initialSeoTitle,
  initialSeoDescription,
  initialOgImage
}: EditorProps) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [status, setStatus] = useState(initialStatus);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle);
  const [seoDescription, setSeoDescription] = useState(initialSeoDescription);
  const [ogImage, setOgImage] = useState(initialOgImage);
  const [isSaving, setIsSaving] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ message: string; type: string } | null>(null);

  const saveToMysql = async (publish: boolean = false) => {
    setIsSaving(true);
    const targetStatus = publish ? "published" : "draft";

    try {
      const res = await fetch(`/api/admin/editor/${initialSlug}`, {
        method: "POST",
        body: JSON.stringify({
          content: { blocks },
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

  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      {/* Sidebar Controls */}
      <Sidebar
        blocks={blocks}
        onUpdateBlocks={setBlocks}
        title={title}
        status={status}
        onUpdateTitle={setTitle}
        slug={slug}
        onUpdateSlug={setSlug}
        seoTitle={seoTitle}
        onUpdateSeoTitle={setSeoTitle}
        seoDescription={seoDescription}
        onUpdateSeoDescription={setSeoDescription}
        ogImage={ogImage}
        onUpdateOgImage={() => setShowMediaPicker(true)}
        onSave={saveToMysql}
        isSaving={isSaving}
      />
      {alertMessage && (
        <div className={`fixed top-4 right-4 z-50 ${alertMessage.type === "success" ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded-lg`}>
          {alertMessage.message}
        </div>
      )}
      {/* Media Picker */}
      {showMediaPicker && (
        <MediaPicker
          title="Select Page Social Image"
          onSelect={(url) => { setOgImage(url); setShowMediaPicker(false); }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}

      {/* Live Preview Area */}
      <main className="flex-1 overflow-y-auto bg-white/80 backdrop-blur-sm relative shadow-2xl border border-white/20">
        <div className="sticky m-4 left-6 z-50 pointer-events-none">
          <div className="glass px-6 py-2.5 shadow-xl border border-white/20 inline-flex items-center gap-3 rounded-full animate-in slide-in-from-top-4 duration-700">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Live Preview: {slug}</div>
          </div>
        </div>

        <div className="min-h-full p-4 md:p-8">
          <BlockRenderer blocks={blocks} />
        </div>

        {/* Empty State */}
        {blocks.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
            <div className="avatar placeholder mb-8">
              <div className="bg-primary/10 text-primary-content rounded-full w-24 h-24 border border-primary/20 shadow-inner">
                <span className="text-4xl">✨</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Your canvas is empty</h3>
            <p className="font-medium text-slate-400 max-w-xs">Add a block from the sidebar to start building your landing page.</p>
          </div>
        )}
      </main>
    </div>
  );
}
