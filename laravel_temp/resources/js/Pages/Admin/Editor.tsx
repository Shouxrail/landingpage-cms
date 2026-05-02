import Editor from '@/components/editor/Editor';
import { Head } from '@inertiajs/react';

interface EditorPageProps {
    page: {
        slug: string;
        page_title: string;
        content: any;
        mobile_content: any;
        status: string;
        seo_title: string;
        seo_description: string;
        og_image: string;
    };
    settings: any;
}

export default function EditorPage({ page, settings }: EditorPageProps) {
    const content = page.content || { blocks: [], settings: {} };
    const mobileContent = page.mobile_content || { blocks: null };
    
    let finalTitle = `Editing: ${page.page_title}`;
    if (settings?.seo_title_template) {
        finalTitle = settings.seo_title_template.replace('%s', finalTitle);
    } else if (settings?.site_name) {
        finalTitle = `${finalTitle} | ${settings.site_name}`;
    }
    
    return (
        <>
            <Head title={finalTitle} />
            <Editor
                slug={page.slug}
                initialTitle={page.page_title}
                initialBlocks={content.blocks || []}
                initialMobileBlocks={mobileContent.blocks}
                initialSettings={content.settings || { backgroundColor: "#ffffff" }}
                initialStatus={page.status || 'draft'}
                initialSeoTitle={page.seo_title || ''}
                initialSeoDescription={page.seo_description || ''}
                initialOgImage={page.og_image || ''}
            />
        </>
    );
}
