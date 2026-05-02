export const VideoBlockComponent = ({ data }: { data: { url: string; poster?: string; fit?: string; hideControls?: boolean; autoPlay?: boolean; loop?: boolean } }) => {
    const customFit = data.fit || "aspect-video object-cover";
    const hideControls = data.hideControls || false;
    const autoPlay = data.autoPlay || false;
    const loop = data.loop || false;

    return (
        <section className="max-w-5xl mx-auto w-full flex justify-center">
            <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                    key={data.url}
                    className={`w-full ${customFit}`}
                    controls={!hideControls}
                    autoPlay={autoPlay}
                    muted={autoPlay}
                    loop={loop}
                    playsInline={autoPlay}
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
