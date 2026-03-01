"use client";
import { useState } from "react";
import { loginAction } from "./actions";
import { FastForward, LogIn, SkipBack } from "@deemlol/next-icons";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError("");
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="card glass w-full max-w-sm border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
        <div className="p-10 text-center bg-white/5 backdrop-blur-2xl border-b border-white/10">
          <div className="avatar placeholder mb-6">
            <div className="bg-primary text-primary-content rounded-3xl w-20 h-20 shadow-[0_0_40px_rgba(var(--p),0.3)] border border-white/20">
              <LogIn size={40} color="#FFFFFF" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Admin Portal</h1>
          {/* <p className="text-white/50 text-sm font-medium">Secure Access Dashboard</p> */}
        </div>

        <div className="card-body p-10">
          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div role="alert" className="alert alert-error bg-error/20 border-error/30 text-error-content py-3 text-sm animate-in slide-in-from-top-2 duration-300 backdrop-blur-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-semibold">{error}</span>
              </div>
            )}
            <Link className="flex gap-2 align-center hover:text-blue-400 transition-all duration-300" href="/"><SkipBack size={20} /> Back to Home</Link>
            <div className="space-y-5">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text text-white/70 font-bold text-xs uppercase tracking-widest">Username</span>
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white placeholder:text-white/20 transition-all duration-300 focus:scale-[1.02]"
                  placeholder="admin"
                />
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text text-white/70 font-bold text-xs uppercase tracking-widest">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="input input-bordered focus:input-primary bg-white/5 border-white/10 text-white placeholder:text-white/20 transition-all duration-300 focus:scale-[1.02]"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="btn btn-primary btn-block shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all duration-300 text-base font-bold h-12"
              >
                {pending ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <>
                    Sign In
                    <FastForward size={24} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/30 text-xs font-medium tracking-wide">© 2026 Landing Page CMS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
