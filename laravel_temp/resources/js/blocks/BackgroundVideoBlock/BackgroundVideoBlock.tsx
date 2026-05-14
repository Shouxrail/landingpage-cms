import { lazy, Suspense, useState, useEffect, useRef } from "react";
const BlockRenderer = lazy(() => import("@/components/BlockRenderer"));

export const BackgroundVideoBlockComponent = ({ data }: { data: any }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);

    const url = data.url;
    const poster = data.poster || "";
    const opacity = data.overlayOpacity || "bg-black/60";
    const placement = data.contentPosition || "items-center justify-center text-center";
    const videoSize = data.videoSize || "w-full h-full";
    const videoPlacement = data.videoPlacement || "top-0 left-0";
    const objectPosition = data.objectPosition || "object-center";
    const horizontalOffset = data.horizontalOffset || 0;
    const horizontalOffsetUnit = data.horizontalOffsetUnit || "%";
    const horizontalPadding = data.horizontalPadding || 0;
    const isFixed = data.fixedBackground || false;
    let heightClass = data.height || "h-screen";
    if (heightClass === "h-screen") heightClass = "h-[100dvh]";
    if (heightClass === "min-h-screen") heightClass = "min-h-[100dvh]";
    const childBlocks = data.children || [];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" } // Load slightly before it enters the viewport
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id={data.id || ""}
            className={`relative ${heightClass} flex overflow-hidden group ${isFixed ? '[clip-path:inset(0)]' : ''}`}
            style={{
                backgroundColor: data.bgColor || '#000000',
                paddingLeft: `${(horizontalPadding || 0) / 16}rem`,
                paddingRight: `${(horizontalPadding || 0) / 16}rem`,
            }}
        >
            {/* Auto-playing muted background video */}
            {url && (
                <video
                    key={url}
                    poster={poster}
                    preload="none"
                    className={`${isFixed ? 'fixed' : 'absolute'} z-0 pointer-events-none object-cover ${videoPlacement} ${videoSize} ${objectPosition} transition-all duration-300`}
                    style={{
                        objectPosition: horizontalOffset !== 0 
                            ? `calc(50% + ${horizontalOffsetUnit === 'px' ? `${horizontalOffset / 16}rem` : `${horizontalOffset}${horizontalOffsetUnit}`}) center` 
                            : undefined
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    {isInView && <source src={url} type="video/mp4" />}
                </video>
            )}

            {/* Darkness Overlay mapped from config */}
            <div className={`${isFixed ? 'fixed' : 'absolute'} top-0 left-0 w-full h-full z-10 transition-colors duration-500 ${opacity} ${isFixed ? 'pointer-events-none' : ''}`}></div>

            {/* Nested interactive generic foreground mapped via Layout config */}
            <div className={`relative z-20 w-full flex ${placement}`}>
                <Suspense fallback={null}>
                    <BlockRenderer blocks={childBlocks} />
                </Suspense>
            </div>
        </section>
    );
};
