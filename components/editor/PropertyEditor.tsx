"use client";
import { useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";

interface PropertyEditorProps {
  schema: any;
  data: any;
  onChange: (newData: any) => void;
}

export default function PropertyEditor({ schema, data, onChange }: PropertyEditorProps) {
  const [showMediaPicker, setShowMediaPicker] = useState<string | null>(null);

  if (!schema) return null;

  return (
    <div className="space-y-6">
      {Object.entries(schema).map(([key, config]: [string, any]) => {
        const value = data[key] ?? config.default;

        if (config.type === "text") {
          return (
            <div key={key} className="form-control w-full">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              <input
                type="text"
                className="input input-sm bg-white/5 border-white/10 text-white font-medium h-10"
                value={value}
                onChange={(e) => onChange({ ...data, [key]: e.target.value })}
              />
            </div>
          );
        }

        if (config.type === "textarea") {
          return (
            <div key={key} className="form-control w-full">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              <textarea
                className="textarea textarea-sm bg-white/5 border-white/10 text-white font-medium min-h-[80px]"
                value={value}
                onChange={(e) => onChange({ ...data, [key]: e.target.value })}
              />
            </div>
          );
        }

        if (config.type === "image") {
          return (
            <div key={key} className="form-control w-full">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                  {value ? <img src={value} className="w-full h-full object-cover" /> : <div className="text-[10px] text-white/10">Null</div>}
                </div>
                <button
                  onClick={() => setShowMediaPicker(key)}
                  className="btn btn-ghost btn-sm bg-white/5 border border-white/10 text-white/60 hover:text-white flex-1 h-12 font-bold px-4"
                >
                  {value ? "Change Asset" : "Select Asset"}
                </button>
              </div>
              {showMediaPicker === key && (
                <MediaPicker
                  title={`Select ${config.label}`}
                  onSelect={(url) => {
                    onChange({ ...data, [key]: url });
                    setShowMediaPicker(null);
                  }}
                  onClose={() => setShowMediaPicker(null)}
                />
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
