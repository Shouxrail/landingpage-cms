export const EditorBlockComponent = ({ data }: { data: { title: string; content: string; media?: string; } }) => (
    <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
                {data.title && <h2 className="text-3xl font-bold text-slate-900 mb-4">{data.title}</h2>}
                {data.content && <p className="text-lg text-slate-600 whitespace-pre-wrap">{data.content}</p>}
            </div>
            {data.media && (
                <div className="flex-1 w-full">
                    <img src={data.media} alt={data.title} className="w-full h-auto rounded-xl shadow-lg object-cover" />
                </div>
            )}
        </div>
    </section>
);
