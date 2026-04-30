export default function Image({ data }: { data: any }) {
    if (!data.src) {
        return (
            <div className="w-full bg-slate-100 rounded-2xl aspect-video flex items-center justify-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No image selected</p>
            </div>
        );
    }

    return (
        <figure className="w-full space-y-3 py-8">
            <div className="overflow-hidden rounded-3xl shadow-2xl border border-slate-200">
                <img
                    src={data.src}
                    alt={data.alt}
                    className="w-full h-auto hover:scale-105 transition-transform duration-700"
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
