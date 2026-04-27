// components/HashScrollHandler.tsx
'use client';

import { useEffect } from 'react';

export default function HashScrollHandler() {
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const container = document.querySelector('main');
            const target = hash && hash !== '#' ? document.querySelector(hash) : null;

            const performScroll = (pos: number) => {
                if (container) {
                    // Temporarily disable snap scroll to allow smooth manual movement
                    (container as HTMLElement).style.scrollSnapType = 'none';

                    container.scrollTo({ top: pos, behavior: 'smooth' });

                    // Re-enable snap scroll sooner
                    setTimeout(() => {
                        (container as HTMLElement).style.scrollSnapType = 'y mandatory';
                        // Final alignment check
                        if (pos === 0) container.scrollTop = 0;
                    }, 500);
                }
                window.scrollTo({ top: pos, behavior: 'smooth' });
            };

            if (!hash || hash === '#' || hash === '#top') {
                console.log('Home/Top detected, scrolling to 0');
                performScroll(0);
                return;
            }

            if (target) {
                console.log('Target element found:', target);
                const targetTop = (target as HTMLElement).offsetTop;
                performScroll(targetTop);
            } else {
                console.warn('Target element not found for:', hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('scroll-to-hash', handleHashChange);

        // Use a timeout to ensure the DOM is ready and any initial browser scroll is handled
        const timer = setTimeout(handleHashChange, 300);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('scroll-to-hash', handleHashChange);
            clearTimeout(timer);
        };
    }, []);

    return null;
}