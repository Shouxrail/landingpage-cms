export default function Image({ data }: { data: any }) {
    if (!data.src) {
        return (
            <div className="w-full bg-slate-100 aspect-video flex items-center justify-center">
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No image selected</p>
            </div>
        );
    }

    return (
        <figure className="w-full space-y-3 py-8">
            <div className="overflow-hidden shadow-2xl">
                <img
                    src={data.src}
                    alt={data.alt}
                    className="w-full h-auto transition-transform duration-700"
                />
            </div>
            {data.caption && (
                <figcaption className="text-center text-slate-400 text-sm italic font-medium">
                    {data.caption}
                </figcaption>
            )}
        </figure>
    );
}
