import AdminLayout from '@/Layouts/AdminLayout';
import Editor from '@/components/editor/Editor';

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
    
    return (
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
    );
}
