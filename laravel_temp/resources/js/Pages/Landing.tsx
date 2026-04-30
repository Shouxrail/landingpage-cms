import BlockRenderer from '@/components/BlockRenderer';
import Navbar from '@/components/Navbar';
import SnapScrollContainer from '@/components/SnapScrollContainer';
import HashScrollHandler from '@/components/HashScrollHandler';

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
    };
    settings: {
        site_name?: string;
        logo_url?: string;
        navigation_menu?: { items: { label: string; url: string; target?: string }[] };
    };
}

export default function Landing({ page, settings }: LandingProps) {
    const content = page.content || { blocks: [] };
    const blocks = content.blocks || [];
    const pageSettings = content.settings || {};
    const isSnapScroll = pageSettings.isSnapScroll || false;

    const navbar = (
        <Navbar
            logoUrl={settings?.logo_url}
            siteName={settings?.site_name}
            menuItems={settings?.navigation_menu?.items}
        />
    );

    if (isSnapScroll) {
        return (
            <>
                <HashScrollHandler />
                {navbar}
                <SnapScrollContainer
                    blocks={blocks}
                    siteName={settings?.site_name}
                    isTitleReveal={pageSettings.isTitleReveal || false}
                    backgroundColor={pageSettings.backgroundColor}
                />
            </>
        );
    }

    return (
        <>
            <HashScrollHandler />
            {navbar}
            <main style={{ backgroundColor: pageSettings.backgroundColor || 'transparent', overflowX: 'hidden' }}>
                <BlockRenderer blocks={blocks} />
            </main>
        </>
    );
}
