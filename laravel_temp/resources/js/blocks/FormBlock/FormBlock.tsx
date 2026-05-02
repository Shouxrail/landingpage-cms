// blocks/FormBlock/FormBlock.tsx
"use client";
import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

interface SubField {
    name: string;
    label: string;
    type: "text" | "email" | "number" | "textarea" | "select";
    placeholder?: string;
    required?: boolean;
    options?: string;
}

interface FormField {
    name: string;
    label: string;
    type: "text" | "email" | "number" | "textarea" | "select" | "multiple";
    placeholder?: string;
    required?: boolean;
    options?: string;
    fields?: SubField[];
}

interface FormBlockProps {
    title?: string;
    description?: string;
    formId?: string;
    fields?: FormField[];
    submitText?: string;
    successMessage?: string;
    bgColor?: string;
}

const inputClass = "input input-bordered bg-white border-black/10 text-black focus:border-primary focus:ring-1 focus:ring-primary h-14 rounded-[8px] transition-all placeholder:text-black/50 w-full";

function SingleInput({ field, fieldKey, formData, setFormData }: {
    field: SubField | FormField;
    fieldKey: string;
    formData: Record<string, any>;
    setFormData: (d: Record<string, any>) => void;
}) {
    if (field.type === "textarea") {
        return (
            <textarea
                required={field.required}
                placeholder={field.placeholder}
                className="textarea textarea-bordered bg-white border-black/10 text-black focus:border-primary focus:ring-1 focus:ring-primary h-32 rounded-[8px] transition-all placeholder:text-black/50 w-full"
                onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
            />
        );
    }
    if (field.type === "select") {
        return (
            <div className="relative">
                <select
                    required={field.required}
                    className="select select-bordered w-full border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary rounded-[8px] transition-all appearance-none"
                    onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
                    defaultValue=""
                >
                    <option value="" disabled>{field.placeholder || "Select an option"}</option>
                    {field.options?.split(",").map((opt, i) => (
                        <option key={i} value={opt.trim()} className="bg-slate-900 text-white">{opt.trim()}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>
        );
    }
    return (
        <input
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            className={inputClass + (!['textarea', 'multiple'].find(v => v === field.type) ? ' h-[41px]' : '')}
            onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
        />
    );
}

export default function FormBlock({ data }: { data: FormBlockProps }) {
    const {
        title = "Get in Touch",
        description = "",
        formId = "contact-form",
        fields = [],
        submitText = "Submit",
        successMessage = "Thank you!",
        bgColor = "transparent"
    } = data || {};

    const { url } = usePage();
    // Extract the slug from the current URL path (e.g. "/my-page" → "my-page")
    const pageSlug = url.split('/').filter(Boolean)[0] || 'home';

    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isHuman, setIsHuman] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const csrfToken = decodeURIComponent(
                document.cookie.split('; ').find(r => r.startsWith('XSRF-TOKEN='))?.split('=')[1] ?? ''
            );

            const response = await fetch(`/forms/${pageSlug}/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    formId,
                    data: formData,
                    pageUrl: window.location.href
                })
            });

            if (!response.ok) throw new Error("Submission failed");

            setSubmitted(true);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{successMessage}</h3>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-primary hover:underline font-bold"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4 md:px-0">
            <div
                className="overflow-hidden relative group"
                style={{ backgroundColor: bgColor }}
            >
                <div className="relative z-10 space-y-2">
                    <div className="space-y-1">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                                {description}
                            </p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1">
                            {fields && fields.map((field, idx) => {
                                // --- MULTIPLE (grouped) fields ---
                                if (field.type === "multiple" && Array.isArray(field.fields)) {
                                    return (
                                        <div key={idx} className="space-y-1 flex flex-direction-row gap-3 items-end">
                                            <label className="pb-[10px] w-[19.5%]">
                                                <span className="text-white">
                                                    {field.label}:
                                                </span>
                                            </label>
                                            <div className="grid gap-3 flex-1" style={{ gridTemplateColumns: `repeat(${field.fields.length}, minmax(0, 1fr))` }}>
                                                {field.fields.map((sub, sIdx) => (
                                                    <div key={sIdx} className="form-control w-full group/field">
                                                        <label className="pb-0.5">
                                                            <span className="text-white text-[9px]">
                                                                {sub.label}:
                                                            </span>
                                                        </label>
                                                        <SingleInput
                                                            field={sub}
                                                            fieldKey={sub.name || `${field.name}_${sIdx}`}
                                                            formData={formData}
                                                            setFormData={setFormData}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

                                // --- SINGLE field ---
                                return (
                                    <div key={idx} className="form-control group/field flex gap-3 pt-5">
                                        <label className="py-1 w-[25%] text-white">
                                            <span className="text-white">
                                                {field.label}:
                                                {/* {field.required && <span className="text-primary">*</span>} */}
                                            </span>
                                        </label>
                                        <SingleInput
                                            field={field}
                                            fieldKey={field.name || `field-${idx}`}
                                            formData={formData}
                                            setFormData={setFormData}
                                        />
                                    </div>
                                );
                            })}
                        </div>


                        {error && (
                            <div className="text-red-400 font-bold text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20 animate-in shake">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-5">
                            <div className="w-[19%] shrink-0"></div>
                            <div className="flex flex-1 justify-between items-center">
                                <div className="flex gap-3 items-center">
                                    <input
                                        type="checkbox"
                                        id="we_are_human"
                                        name="we_are_human"
                                        className="checkbox bg-white rounded"
                                        checked={isHuman}
                                        onChange={(e) => setIsHuman(e.target.checked)}
                                    />
                                    <label htmlFor="we_are_human" className="text-white">we are human</label>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isHuman}
                                    className="btn btn-primary text-[400] px-[50px] rounded-4xl hover:scale-[1.02] active:scale-95 transition-all text-[16px] tracking-[20%] group"
                                >
                                    {isSubmitting ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            {submitText}
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
