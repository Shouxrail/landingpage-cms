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
                    console.log('Scrolling to position:', pos);
                    // Disable snap to allow smooth movement
                    container.style.scrollSnapType = 'none';

                    container.scrollTo({ top: pos, behavior: 'smooth' });

                    // Wait longer for the scroll to finish before re-enabling snap
                    setTimeout(() => {
                        container.style.scrollSnapType = 'y mandatory';
                    }, 1000);
                }
            };

            if (!hash || hash === '#' || hash === '#top') {
                performScroll(0);
                return;
            }

            if (target && container) {
                // Find the index of the section to scroll to
                // We look for direct children of the container that have the id or contain the target
                const sections = Array.from(container.querySelectorAll(':scope > div, :scope > section'));
                const index = sections.findIndex(s => s === target || s.contains(target));
                
                if (index !== -1) {
                    console.log('Target section index found:', index);
                    performScroll(index * container.clientHeight);
                } else {
                    // Fallback to offsetTop if index lookup fails
                    performScroll((target as HTMLElement).offsetTop);
                }
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