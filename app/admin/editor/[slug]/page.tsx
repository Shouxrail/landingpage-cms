"use client";
import { use, useState, useEffect } from "react";
import Editor from "@/components/editor/Editor";

export default function AdminPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/editor/${slug}`)
      .then((res) => {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setData(data);
          setLoading(false);
        }
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
          <div className="loading loading-spinner loading-lg text-primary mb-6"></div>
          <div className="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Initializing Editor</div>
          <p className="text-white/60 font-medium mt-2">Loading your premium workstation...</p>
        </div>
      </div>
    );
  }

  return <Editor
    slug={slug}
    initialStatus={data?.status || "draft"}
    initialTitle={data?.pageTitle || slug}
    initialSeoTitle={data?.seoTitle || ""}
    initialSeoDescription={data?.seoDescription || ""}
    initialOgImage={data?.ogImage || ""}
    initialBlocks={data?.content?.blocks || []}
  />;
}
