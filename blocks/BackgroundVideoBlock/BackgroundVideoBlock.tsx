import dynamic from "next/dynamic";

const BlockRenderer = dynamic(() => import("@/components/BlockRenderer"));

export const BackgroundVideoBlockComponent = ({ data }: { data: any }) => {
    const url = data.url || "https://www.w3schools.com/html/mov_bbb.mp4";
    const opacity = data.overlayOpacity || "bg-black/60";
    const placement = data.contentPosition || "items-center justify-center text-center";
    const videoSize = data.videoSize || "w-full h-full";
    const videoPlacement = data.videoPlacement || "top-0 left-0";
    const objectPosition = data.objectPosition || "object-center";
    const horizontalOffset = data.horizontalOffset || 0;
    const childBlocks = data.children || [];

    return (
        <section className={`relative w-screen h-screen flex overflow-hidden group`}>
            {/* Auto-playing muted background video */}
            <video
                key={url}
                className={`absolute z-0 pointer-events-none object-cover ${videoPlacement} ${videoSize} ${objectPosition} transition-transform duration-300`}
                style={{ transform: `translateX(${horizontalOffset}%)` }}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={url} type="video/mp4" />
            </video>

            {/* Darkness Overlay mapped from config */}
            <div className={`absolute top-0 left-0 w-full h-full z-10 transition-colors duration-500 ${opacity}`}></div>

            {/* Nested interactive generic foreground mapped via Layout config */}
            <div className={`relative z-20 w-full flex ${placement} lg:p-[100px] md:p-[40px]`}>
                <div className="w-full">
                    <BlockRenderer blocks={childBlocks} />
                </div>
            </div>
        </section>
    );
};
