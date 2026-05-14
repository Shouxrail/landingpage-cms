export const VideoBlockComponent = ({ data }: { data: { url: string; poster?: string; fit?: string; hideControls?: boolean; autoPlay?: boolean; loop?: boolean; widthMode?: string, height?: number, horizontalOffset?: number, scale?: number, clipContent?: boolean } }) => {
    const customFit = data.fit || "aspect-video object-cover";
    const hideControls = data.hideControls || false;
    const autoPlay = data.autoPlay || false;
    const loop = data.loop || false;
    const widthMode = data.widthMode || "max-w-5xl px-4";
    const isFullWidth = widthMode.includes("w-full");
    const horizontalOffset = data.horizontalOffset || 0;
    const scale = data.scale || 1;
    const clipContent = data.clipContent !== false; // Default true

    return (
        <section className={`${widthMode} mx-auto w-full flex justify-center`}>
            <div className={`w-full relative ${isFullWidth ? '' : 'shadow-2xl'} ${clipContent ? 'overflow-hidden' : ''} bg-black`}>
                <video
                    key={data.url}
                    className={`w-full ${customFit} transition-all duration-300`}
                    style={{
                        transform: `translateX(${horizontalOffset}%) scale(${scale})`,
                        transformOrigin: 'center center'
                    }}
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
