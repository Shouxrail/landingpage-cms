// blocks/FormBlock/FormBlock.tsx
"use client";
import React, { useState } from "react";

interface FormField {
    name: string;
    label: string;
    type: "text" | "email" | "number" | "textarea" | "select";
    placeholder?: string;
    required?: boolean;
    options?: string;
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

export default function FormBlock({ data }: { data: FormBlockProps }) {
    const {
        title = "Get in Touch",
        description = "",
        formId = "contact-form",
        fields = [],
        submitText = "Submit",
        successMessage = "Thank you!",
        bgColor = "rgba(255, 255, 255, 0.05)"
    } = data || {};

    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/forms/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
                className="card glass border border-white/10 shadow-2xl p-8 md:p-14 rounded-[40px] overflow-hidden relative group"
                style={{ backgroundColor: bgColor }}
            >
                <div className="relative z-10 space-y-8">
                    <div className="space-y-3">
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
                        <div className="grid grid-cols-1 gap-5">
                            {fields && fields.map((field, idx) => (
                                <div key={idx} className="form-control w-full group/field">
                                    <label className="label py-1">
                                        <span className="label-text text-white/40 font-bold uppercase text-[10px] tracking-[0.2em] group-focus-within/field:text-primary transition-colors">
                                            {field.label} {field.required && <span className="text-primary">*</span>}
                                        </span>
                                    </label>
                                    
                                    {field.type === "textarea" ? (
                                        <textarea
                                            required={field.required}
                                            placeholder={field.placeholder}
                                            className="textarea textarea-bordered bg-white/5 border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary h-32 rounded-2xl transition-all placeholder:text-white/20"
                                            onChange={(e) => setFormData({ ...formData, [field.name || `field-${idx}`]: e.target.value })}
                                        />
                                    ) : field.type === "select" ? (
                                        <div className="relative">
                                            <select
                                                required={field.required}
                                                className="select select-bordered w-full bg-white/5 border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl transition-all appearance-none"
                                                onChange={(e) => setFormData({ ...formData, [field.name || `field-${idx}`]: e.target.value })}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>{field.placeholder || "Select an option"}</option>
                                                {field.options?.split(",").map((opt, i) => (
                                                    <option key={i} value={opt.trim()} className="bg-slate-900 text-white">
                                                        {opt.trim()}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type}
                                            required={field.required}
                                            placeholder={field.placeholder}
                                            className="input input-bordered bg-white/5 border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary h-14 rounded-2xl transition-all placeholder:text-white/20"
                                            onChange={(e) => setFormData({ ...formData, [field.name || `field-${idx}`]: e.target.value })}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {error && (
                            <div className="text-red-400 font-bold text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20 animate-in shake">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary btn-lg w-full h-16 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all font-black text-lg tracking-tight group"
                        >
                            {isSubmitting ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    {submitText}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </div>
        </div>
    );
}
