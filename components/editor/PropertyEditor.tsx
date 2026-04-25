"use client";
import { useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";
import { BLOCK_REGISTRY } from "@/lib/registry";

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

        if (config.type === "video") {
          return (
            <div key={key} className="form-control w-full">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                  {value ? <video src={value} className="w-full h-full object-cover" muted playsInline /> : <div className="text-[10px] text-white/10">Null</div>}
                </div>
                <button
                  onClick={() => setShowMediaPicker(key)}
                  className="btn btn-ghost btn-sm bg-white/5 border border-white/10 text-white/60 hover:text-white flex-1 h-12 font-bold px-4"
                >
                  {value ? "Change Video" : "Select Video"}
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

        if (config.type === "list") {
          return (
            <div key={key} className="form-control w-full space-y-2">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              {Array.isArray(value) && value.map((item: string, i: number) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    className="input input-sm bg-white/5 border-white/10 text-white font-medium h-10 flex-1"
                    value={item}
                    onChange={(e) => {
                      const newArr = [...value];
                      newArr[i] = e.target.value;
                      onChange({ ...data, [key]: newArr });
                    }}
                  />
                  <button
                    onClick={() => {
                      const newArr = value.filter((_: any, index: number) => index !== i);
                      onChange({ ...data, [key]: newArr });
                    }}
                    className="btn btn-square btn-ghost btn-sm text-error/60 hover:text-error hover:bg-error/10 h-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newArr = Array.isArray(value) ? [...value, "New Item"] : ["New Item"];
                  onChange({ ...data, [key]: newArr });
                }}
                className="btn btn-sm btn-ghost bg-white/5 border-white/10 text-white/60 hover:text-white mt-2 font-bold"
              >
                + Add Item
              </button>
            </div>
          );
        }

        if (config.type === "objectList") {
          return (
            <div key={key} className="form-control w-full space-y-4">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              {Array.isArray(value) && value.map((item: any, i: number) => {
                const itemData = typeof item === 'object' && item !== null ? item : {};
                return (
                  <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl relative space-y-4">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                      {itemData.title || `Item ${i + 1}`}
                    </h4>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => {
                          const newArr = value.filter((_: any, index: number) => index !== i);
                          onChange({ ...data, [key]: newArr });
                        }}
                        className="btn btn-circle btn-ghost btn-xs text-error/60 hover:text-error hover:bg-error/10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <PropertyEditor
                      schema={config.itemSchema}
                      data={itemData}
                      onChange={(newItemData) => {
                        const newArr = [...value];
                        newArr[i] = newItemData;
                        onChange({ ...data, [key]: newArr });
                      }}
                    />
                  </div>
                );
              })}
              <button
                onClick={() => {
                  const defaultObj = Object.entries(config.itemSchema).reduce((acc: any, [k, v]: [string, any]) => {
                    acc[k] = v.default;
                    return acc;
                  }, {});
                  const newArr = Array.isArray(value) ? [...value, defaultObj] : [defaultObj];
                  onChange({ ...data, [key]: newArr });
                }}
                className="btn btn-sm btn-ghost bg-white/5 border-white/10 text-white/60 hover:text-white mt-2 font-bold w-full"
              >
                + Add Object
              </button>
            </div>
          );
        }

        if (config.type === "select") {
          return (
            <div key={key} className="form-control w-full">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              <select
                className="select select-sm bg-white/5 border-white/10 text-white font-medium h-10 w-full"
                value={value}
                onChange={(e) => onChange({ ...data, [key]: e.target.value })}
              >
                {config.options?.map((opt: any, i: number) => (
                  <option key={i} value={opt.value} className="bg-slate-800 text-white">{opt.label}</option>
                ))}
              </select>
            </div>
          );
        }

        if (config.type === "blocks") {
          return (
            <div key={key} className="form-control w-full space-y-4">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              {Array.isArray(value) && value.map((block: any, i: number) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl relative space-y-4">
                  <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center justify-between">
                    <span>{block.type} Block</span>
                    <button
                      onClick={() => {
                        const newArr = value.filter((_: any, index: number) => index !== i);
                        onChange({ ...data, [key]: newArr });
                      }}
                      className="btn btn-circle btn-ghost btn-xs text-error/60 hover:text-error hover:bg-error/10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </h4>
                  {BLOCK_REGISTRY[block.type] && (
                    <PropertyEditor
                      schema={BLOCK_REGISTRY[block.type].Schema}
                      data={block.data || {}}
                      onChange={(newData) => {
                        const newArr = [...value];
                        newArr[i] = { ...block, data: newData };
                        onChange({ ...data, [key]: newArr });
                      }}
                    />
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.keys(BLOCK_REGISTRY).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      const schema = BLOCK_REGISTRY[type].Schema;
                      const defaultData = Object.entries(schema).reduce((acc: any, [k, v]: [string, any]) => {
                        acc[k] = v.default;
                        return acc;
                      }, {});
                      const newArr = Array.isArray(value) ? [...value, { type, data: defaultData }] : [{ type, data: defaultData }];
                      onChange({ ...data, [key]: newArr });
                    }}
                    className="btn btn-sm btn-ghost bg-white/5 border-white/10 text-white/60 hover:text-white font-bold text-xs"
                  >
                    + Add {type}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        if (config.type === "color") {
          const isValidHex = value && typeof value === 'string' && value.startsWith('#');
          return (
            <div key={key} className="form-control w-full">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-lg p-1 pr-1">
                <input
                  type="color"
                  className="w-8 h-8 rounded shrink-0 cursor-pointer bg-transparent border-0 p-0"
                  value={isValidHex ? value : "#ffffff"}
                  onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="#ffffff"
                  className="bg-transparent text-white font-medium text-sm flex-1 outline-none min-w-0 px-2"
                  value={value || ""}
                  onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                />
                <button
                  onClick={() => onChange({ ...data, [key]: "transparent" })}
                  className="btn btn-ghost btn-xs text-[10px] font-black text-white/30 hover:text-white hover:bg-white/10 uppercase tracking-wider"
                >
                  Clear
                </button>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
