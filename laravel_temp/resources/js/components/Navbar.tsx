"use client";
import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

interface NavbarProps {
    logoUrl?: any;
    siteName?: string;
    menuItems?: { label: string; url: string; target?: string }[];
}

export default function Navbar({ logoUrl, siteName, menuItems = [] }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('');

    useEffect(() => {
        // Set initial hash
        setActiveHash(window.location.hash);

        const handleHashChange = () => {
            setActiveHash(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);

        // Intersection Observer for active section tracking
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Look at the middle of the screen
            threshold: 0
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id) {
                        setActiveHash(`#${id}`);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // Function to refresh observations
        const refreshObserver = () => {
            observer.disconnect();
            const sections = document.querySelectorAll('main > div[id], main > section[id]');
            sections.forEach(section => observer.observe(section));
        };

        refreshObserver();

        // Glassmorphism scroll detection & Active Section Fallback
        const container = document.querySelector('main');
        const handleScroll = () => {
            if (!container) return;
            const scrollPos = container.scrollTop;
            setIsScrolled(scrollPos > 50);

            // Fallback: If we're using snap scroll, we can calculate active section by scroll position
            // This is more reliable for "scrolling up" in stacked layouts
            if (getComputedStyle(container).scrollSnapType !== 'none') {
                const index = Math.round(scrollPos / window.innerHeight);
                const sections = document.querySelectorAll('main > div[id], main > section[id]');
                const activeSection = sections[index];
                if (activeSection && activeSection.id) {
                    setActiveHash(`#${activeSection.id}`);
                }
            }
        };

        if (container) container.addEventListener("scroll", handleScroll);
        window.addEventListener("scroll", handleScroll);

        // Also watch for DOM changes to re-observe if sections are added/removed
        const mutationObserver = new MutationObserver(refreshObserver);
        if (container) mutationObserver.observe(container, { childList: true });

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            if (container) container.removeEventListener("scroll", handleScroll);
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [menuItems]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-[2rem] py-[1.25rem] bg-[rgba(0,0,0,0.35)] backdrop-blur-[0.25rem]`}
        >
            <div className="w-full mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-[0.75rem] group"
                    onClick={() => {
                        if (window.location.pathname === '/' || window.location.pathname === '') {
                            setTimeout(() => window.dispatchEvent(new Event('scroll-to-hash')), 10);
                        }
                    }}
                >
                    {logoUrl ? (
                        <img src={logoUrl} alt={siteName} className="w-[9rem] md:w-[12.5rem] object-contain transition-transform group-hover:scale-110" />
                    ) : (
                        <span className="text-xl font-black text-white tracking-tighter">
                            {siteName?.split(' ')[0]}<span className="text-primary">.</span>
                        </span>
                    )}
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-[2rem]">
                    {menuItems.map((item, idx) => {
                        const hasHash = item.url.includes('#');
                        const isHome = item.url === '/' || item.url === '';

                        // Parse path and hash parts from URL like "/page#section"
                        const [urlPath, urlHashFragment] = item.url.split('#');
                        const hashPart = hasHash ? `#${urlHashFragment}` : '';
                        const pathPart = urlPath || '/';

                        const isActive = hasHash
                            ? activeHash === hashPart
                            : window.location.pathname === (item.url || '/');
                        const linkClass = `${isActive ? 'slashicon-active' : 'slashicon-hover'} text-base font-bold tracking-[15%] text-white hover:text-white/70 transition-colors`;

                        if (hasHash) {
                            return (
                                <a
                                    key={idx}
                                    href={item.url}
                                    className={linkClass}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (window.location.pathname === pathPart) {
                                            // Same page → just scroll to hash
                                            window.location.hash = hashPart;
                                            setTimeout(() => window.dispatchEvent(new Event('scroll-to-hash')), 10);
                                        } else {
                                            // Different page → full navigation
                                            window.location.href = item.url;
                                        }
                                    }}
                                >
                                    {item.label}
                                </a>
                            );
                        }

                        return (
                            <Link
                                key={idx}
                                href={item.url || '/'}
                                target={item.target}
                                preserveScroll={isHome}
                                onClick={() => {
                                    if (isHome) {
                                        window.history.pushState("", document.title, window.location.pathname + window.location.search);
                                        setTimeout(() => window.dispatchEvent(new Event('scroll-to-hash')), 10);
                                    }
                                }}
                                className={linkClass}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="tracking-[30%] lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-3xl border-b border-white/10 p-[2rem] space-y-[1.5rem] animate-in slide-in-from-top-4">
                    {menuItems.map((item, idx) => {
                        const hasHash = item.url.includes('#');
                        const isHome = item.url === '/' || item.url === '';
                        const [urlPath, urlHashFragment] = item.url.split('#');
                        const hashPart = hasHash ? `#${urlHashFragment}` : '';
                        const pathPart = urlPath || '/';

                        if (hasHash) {
                            return (
                                <a
                                    key={idx}
                                    href={item.url}
                                    className="block text-lg font-bold text-white/70 hover:text-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMobileMenuOpen(false);
                                        if (window.location.pathname === pathPart) {
                                            window.location.hash = hashPart;
                                            setTimeout(() => window.dispatchEvent(new Event('scroll-to-hash')), 10);
                                        } else {
                                            window.location.href = item.url;
                                        }
                                    }}
                                >
                                    {item.label}
                                </a>
                            );
                        }

                        return (
                            <Link
                                key={idx}
                                href={item.url || '/'}
                                preserveScroll={isHome}
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    if (isHome) {
                                        window.history.pushState("", document.title, window.location.pathname + window.location.search);
                                        setTimeout(() => window.dispatchEvent(new Event('scroll-to-hash')), 10);
                                    }
                                }}
                                className="block text-lg font-bold text-white/70 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
