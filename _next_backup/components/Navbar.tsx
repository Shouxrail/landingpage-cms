"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-8 py-6 bg-transparent`}
        >
            <div className="w-full mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-3 group"
                    onClick={() => {
                        if (window.location.pathname === '/' || window.location.pathname === '') {
                            setTimeout(() => window.dispatchEvent(new Event('scroll-to-hash')), 10);
                        }
                    }}
                >
                    {logoUrl ? (
                        <img src={logoUrl} alt={siteName} className="w-[265px] object-contain transition-transform group-hover:scale-110" />
                    ) : (
                        <span className="text-xl font-black text-white tracking-tighter">
                            {siteName?.split(' ')[0]}<span className="text-primary">.</span>
                        </span>
                    )}
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {menuItems.map((item, idx) => {
                        const isAnchor = item.url.startsWith('#');
                        const isHome = item.url === '/' || item.url === '';

                        return (
                            <Link
                                key={idx}
                                href={item.url}
                                target={item.target}
                                scroll={!isAnchor && !isHome}
                                onClick={(e) => {
                                    if (isAnchor || isHome) {
                                        if (isAnchor) window.location.hash = item.url;
                                        if (isHome) {
                                            // For home/root, we remove hash and scroll to top
                                            window.history.pushState("", document.title, window.location.pathname + window.location.search);
                                        }
                                        setTimeout(() => window.dispatchEvent(new Event('scroll-to-hash')), 10);
                                    }
                                    // setActiveHash(item.url);
                                }}
                                className={`${activeHash === item.url ? 'slashicon-active' : 'slashicon-hover'} text-[16px] font-bold tracking-[15%] text-white hover:text-white/70 transition-colors`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-3xl border-b border-white/10 p-8 space-y-6 animate-in slide-in-from-top-4">
                    {menuItems.map((item, idx) => {
                        const isAnchor = item.url.startsWith('#');
                        const isHome = item.url === '/' || item.url === '';

                        return (
                            <Link
                                key={idx}
                                href={item.url}
                                scroll={!isAnchor && !isHome}
                                onClick={() => {
                                    if (isAnchor || isHome) {
                                        console.log('Mobile nav item clicked:', item.url);
                                        if (isAnchor) window.location.hash = item.url;
                                        if (isHome) {
                                            window.history.pushState("", document.title, window.location.pathname + window.location.search);
                                        }
                                        setTimeout(() => window.dispatchEvent(new Event('scroll-to-hash')), 10);
                                    }
                                    setIsMobileMenuOpen(false);
                                    setActiveHash(item.url);
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
