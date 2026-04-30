export const VideoBlockComponent = ({ data }: { data: { url: string; poster?: string; fit?: string } }) => {
    const customFit = data.fit || "aspect-video object-cover";

    return (
        <section className="py-10 px-6 max-w-5xl mx-auto w-full flex justify-center">
            <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                    key={data.url}
                    className={`w-full ${customFit}`}
                    controls
                    preload="metadata"
                    poster={data.poster || undefined}
                >
                    <source src={data.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
};
