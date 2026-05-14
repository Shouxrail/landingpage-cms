import { useState, useEffect } from 'react';
import BlockRenderer from '@/components/BlockRenderer';
import Navbar from '@/components/Navbar';
import SnapScrollContainer from '@/components/SnapScrollContainer';
import HashScrollHandler from '@/components/HashScrollHandler';
import TitleRevealOverlay from '@/components/TitleRevealOverlay';
import { Head } from '@inertiajs/react';
import { useResponsiveScale } from '@/hooks/useResponsiveScale';

interface LandingProps {
    page: {
        slug: string;
        page_title: string;
        content: {
            blocks: any[];
            settings?: {
                backgroundColor?: string;
                isSnapScroll?: boolean;
                isSnapScrollMobile?: boolean;
                isTitleReveal?: boolean;
                isTitleRevealMobile?: boolean;
            };
        };
        mobile_content?: any;
        seo_title?: string;
        seo_description?: string;
        og_image?: string;
    };
    settings: {
        site_name?: string;
        logo_url?: string;
        favicon_url?: string;
        seo_title_template?: string;
        navigation_menu?: { items: { label: string; url: string; target?: string }[] };
    };
}

export default function Landing({ page, settings }: LandingProps) {
    const content = page.content || { blocks: [] };
    const mobileContent = page.mobile_content || null;
    const blocks = content.blocks || [];
    const mobileBlocks = mobileContent?.blocks || [];
    const hasMobileBlocks = mobileBlocks.length > 0;
    const pageSettings = content.settings || {};
    const { isDesktop, scale } = useResponsiveScale(1536, 768, 480);

    // Select settings based on device
    const isSnapScroll = isDesktop
        ? (pageSettings.isSnapScroll !== false) // Default true for desktop
        : (pageSettings.isSnapScrollMobile || false); // Default false for mobile

    const isTitleReveal = isDesktop
        ? (pageSettings.isTitleReveal || false)
        : (pageSettings.isTitleRevealMobile || false);

    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!isTitleReveal || isSnapScroll || hasAnimated) return;

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsAnimating(true);
                setHasAnimated(true);
                // The animation exits on its own, but we should clear isAnimating after it finishes
                setTimeout(() => setIsAnimating(false), 2000);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isTitleReveal, isSnapScroll, hasAnimated]);

    const navbar = (
        <Navbar
            logoUrl={settings?.logo_url}
            siteName={settings?.site_name}
            menuItems={settings?.navigation_menu?.items}
        />
    );

    const rawTitle = page.seo_title || page.page_title || 'Landing Page';
    let finalTitle = rawTitle;
    if (settings?.seo_title_template) {
        finalTitle = settings.seo_title_template.replace('%s', rawTitle);
    } else if (settings?.site_name) {
        finalTitle = `${rawTitle} | ${settings.site_name}`;
    }

    const headContent = (
        <Head>
            <title>{finalTitle}</title>
            {settings?.favicon_url && <link rel="icon" href={settings.favicon_url} />}
            {page.seo_description && <meta name="description" content={page.seo_description} />}
            {page.og_image && <meta property="og:image" content={page.og_image} />}
        </Head>
    );

    if (isSnapScroll) {
        return (
            <>
                {headContent}
                <HashScrollHandler />
                {navbar}
                <div className="h-full">
                    {isDesktop ? (
                        <SnapScrollContainer
                            blocks={blocks}
                            siteName={settings?.site_name}
                            isTitleReveal={isTitleReveal}
                            backgroundColor={pageSettings.backgroundColor}
                        />
                    ) : (
                        <SnapScrollContainer
                            blocks={hasMobileBlocks ? mobileBlocks : blocks}
                            siteName={settings?.site_name}
                            isTitleReveal={isTitleReveal}
                            backgroundColor={pageSettings.backgroundColor}
                        />
                    )}
                </div>
            </>
        );
    }

    return (
        <>
            {headContent}
            <HashScrollHandler />
            {navbar}
            <main
                style={{
                    backgroundColor: pageSettings.backgroundColor || 'transparent',
                    overflowX: 'hidden',
                }}
            >
                {isTitleReveal && (
                    <TitleRevealOverlay isVisible={isAnimating} siteName={settings?.site_name || ''} />
                )}
                {isDesktop ? (
                    <BlockRenderer blocks={blocks} />
                ) : (
                    <BlockRenderer blocks={hasMobileBlocks ? mobileBlocks : blocks} />
                )}
            </main>
        </>
    );
}
