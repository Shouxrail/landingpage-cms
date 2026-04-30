import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        router.post('/admin/login', { username, password }, {
            onError: () => { setError('Invalid username or password.'); setLoading(false); },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
            <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-2xl font-black text-white mb-2">Admin Login</h1>
                <p className="text-white/40 text-sm mb-8">Sign in to manage your landing pages.</p>
                {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-bold rounded-lg py-3 hover:bg-white/90 transition disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
