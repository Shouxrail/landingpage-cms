import BlockRenderer from '@/components/BlockRenderer';
import Navbar from '@/components/Navbar';
import SnapScrollContainer from '@/components/SnapScrollContainer';
import HashScrollHandler from '@/components/HashScrollHandler';
import { Head } from '@inertiajs/react';

interface LandingProps {
    page: {
        slug: string;
        page_title: string;
        content: {
            blocks: any[];
            settings?: {
                backgroundColor?: string;
                isSnapScroll?: boolean;
                isTitleReveal?: boolean;
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
    const isSnapScroll = pageSettings.isSnapScroll || false;

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
                {hasMobileBlocks ? (
                    <>
                        <div className="hidden md:block h-full">
                            <SnapScrollContainer
                                blocks={blocks}
                                siteName={settings?.site_name}
                                isTitleReveal={pageSettings.isTitleReveal || false}
                                backgroundColor={pageSettings.backgroundColor}
                            />
                        </div>
                        <div className="block md:hidden h-full">
                            <SnapScrollContainer
                                blocks={mobileBlocks}
                                siteName={settings?.site_name}
                                isTitleReveal={pageSettings.isTitleReveal || false}
                                backgroundColor={pageSettings.backgroundColor}
                            />
                        </div>
                    </>
                ) : (
                    <SnapScrollContainer
                        blocks={blocks}
                        siteName={settings?.site_name}
                        isTitleReveal={pageSettings.isTitleReveal || false}
                        backgroundColor={pageSettings.backgroundColor}
                    />
                )}
            </>
        );
    }

    return (
        <>
            {headContent}
            <HashScrollHandler />
            {navbar}
            <main style={{ backgroundColor: pageSettings.backgroundColor || 'transparent', overflowX: 'hidden' }}>
                {hasMobileBlocks ? (
                    <>
                        <div className="hidden md:block">
                            <BlockRenderer blocks={blocks} />
                        </div>
                        <div className="block md:hidden">
                            <BlockRenderer blocks={mobileBlocks} />
                        </div>
                    </>
                ) : (
                    <BlockRenderer blocks={blocks} />
                )}
            </main>
        </>
    );
}
