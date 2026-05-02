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
  const [expandedBlockIdx, setExpandedBlockIdx] = useState<number | null>(null);
  const [expandedObjectIdx, setExpandedObjectIdx] = useState<number | null>(null);

  const toggleBlock = (idx: number) => {
    setExpandedBlockIdx(prev => (prev === idx ? null : idx));
  };

  const toggleObject = (idx: number) => {
    setExpandedObjectIdx(prev => (prev === idx ? null : idx));
  };

  if (!schema) return null;

  return (
    <div className="space-y-6">
      {Object.entries(schema).map(([key, config]: [string, any]) => {
        const value = data[key] ?? config.default;

        if (config.type === "text") {
          return (
            <div key={key} className="form-control w-full">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label><br />
              <input
                type="text"
                className="input input-sm bg-white/5 border-white/10 text-white font-medium h-10 w-full"
                value={value}
                onChange={(e) => onChange({ ...data, [key]: e.target.value })}
              />
            </div>
          );
        }

        if (config.type === "textarea") {
          return (
            <div key={key} className="form-control w-full">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label><br />
              <textarea
                className="textarea textarea-sm bg-white/5 border-white/10 text-white font-medium min-h-[80px] w-full"
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
                const isExpanded = expandedObjectIdx === i;

                return (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative transition-all duration-300">
                    <div
                      onClick={() => toggleObject(i)}
                      className="p-4 bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <h4 className="text-[10px] font-black text-white px-2 py-0.5 rounded-full bg-white/5 uppercase tracking-widest flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 text-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                        {itemData.title || `Item ${i + 1}`}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newArr = value.filter((_: any, index: number) => index !== i);
                          onChange({ ...data, [key]: newArr });
                        }}
                        className="btn btn-circle btn-ghost btn-xs text-error/60 hover:text-error hover:bg-error/10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-6 border-t border-white/10 animate-in slide-in-from-top-2 duration-300">
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
                    )}
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
                  toggleObject(Array.isArray(value) ? value.length : 0);
                }}
                className="btn btn-sm btn-ghost bg-white/5 border-white/10 text-white/60 hover:text-white mt-2 font-bold w-full h-12 rounded-2xl"
              >
                + Add {config.label.slice(0, -1) || "Item"}
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

        if (config.type === "number") {
          return (
            <div key={key} className="form-control w-full">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              <input
                type="number"
                className="input input-sm bg-white/5 border-white/10 text-white font-medium h-10 w-full"
                value={value}
                onChange={(e) => onChange({ ...data, [key]: Number(e.target.value) })}
              />
            </div>
          );
        }

        if (config.type === "boolean") {
          return (
            <div key={key} className="form-control w-full flex flex-row items-center justify-between py-3 border-b border-white/5 last:border-0">
              <label className="label p-0 flex-1 cursor-pointer">
                <span className="label-text-alt text-white/70 font-bold uppercase tracking-widest text-[10px]">{config.label}</span>
              </label>
              <input
                type="checkbox"
                className="toggle toggle-sm toggle-primary bg-white/10"
                checked={!!value}
                onChange={(e) => onChange({ ...data, [key]: e.target.checked })}
              />
            </div>
          );
        }

        if (config.type === "blocks") {
          return (
            <div key={key} className="form-control w-full space-y-4">
              <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
              {Array.isArray(value) && value.map((block: any, i: number) => {
                const isExpanded = expandedBlockIdx === i;

                return (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative transition-all duration-300">
                    <div
                      onClick={() => toggleBlock(i)}
                      className="p-4 bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <h4 className="text-[10px] font-black text-white px-2 py-0.5 rounded-full bg-white/5 uppercase tracking-widest flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 text-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                        {block.type} Block
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newArr = value.filter((_: any, index: number) => index !== i);
                          onChange({ ...data, [key]: newArr });
                        }}
                        className="btn btn-circle btn-ghost btn-xs text-error/60 hover:text-error hover:bg-error/10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>

                    {isExpanded && BLOCK_REGISTRY[block.type] && (
                      <div className="p-6 border-t border-white/10 animate-in slide-in-from-top-2 duration-300">
                        <PropertyEditor
                          schema={BLOCK_REGISTRY[block.type].Schema}
                          data={block.data || {}}
                          onChange={(newData) => {
                            const newArr = [...value];
                            newArr[i] = { ...block, data: newData };
                            onChange({ ...data, [key]: newArr });
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
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
                      toggleBlock(Array.isArray(value) ? value.length : 0);
                    }}
                    className="btn btn-sm btn-ghost bg-white/5 border-white/10 text-white/60 hover:text-white font-bold text-xs h-12 rounded-2xl"
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
                  value={isValidHex ? value : "#000000"}
                  onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="default"
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

        if (config.type === "range") {
          return (
            <div key={key} className="form-control w-full space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="label py-1"><span className="label-text-alt text-white/40 font-bold uppercase tracking-widest text-[9px]">{config.label}</span></label>
                <span className="text-[10px] font-black text-primary transition-all tabular-nums bg-primary/10 px-2 py-0.5 rounded-full">{value}{config.unit || ""}</span>
              </div>
              <input
                type="range"
                min={config.min ?? 0}
                max={config.max ?? 100}
                step={config.step ?? 1}
                className="range range-xs range-primary bg-white/5 h-2 w-full"
                value={value}
                onChange={(e) => onChange({ ...data, [key]: Number(e.target.value) })}
              />
              <div className="flex justify-between text-[8px] text-white/20 font-black uppercase tracking-widest px-1">
                <span>{config.min ?? 0}</span>
                <span>{config.max ?? 100}</span>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
