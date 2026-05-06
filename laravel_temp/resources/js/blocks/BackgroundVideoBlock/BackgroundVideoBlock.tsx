import { lazy, Suspense, useState, useEffect, useRef } from "react";
const BlockRenderer = lazy(() => import("@/components/BlockRenderer"));

export const BackgroundVideoBlockComponent = ({ data }: { data: any }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);

    const url = data.url || "https://www.w3schools.com/html/mov_bbb.mp4";
    const poster = data.poster || "";
    const opacity = data.overlayOpacity || "bg-black/60";
    const placement = data.contentPosition || "items-center justify-center text-center";
    const videoSize = data.videoSize || "w-full h-full";
    const videoPlacement = data.videoPlacement || "top-0 left-0";
    const objectPosition = data.objectPosition || "object-center";
    const horizontalOffset = data.horizontalOffset || 0;
    const horizontalPadding = data.horizontalPadding || 0;
    const isFixed = data.fixedBackground || false;
    const heightClass = data.height || "h-screen";
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
            className={`relative w-screen ${heightClass} flex overflow-hidden group ${isFixed ? '[clip-path:inset(0)]' : ''}`}
            style={{
                backgroundColor: data.bgColor || '#000000',
                paddingLeft: `${(horizontalPadding || 0) / 16}rem`,
                paddingRight: `${(horizontalPadding || 0) / 16}rem`,
            }}
        >
            {/* Auto-playing muted background video */}
            <video
                key={url}
                poster={poster}
                preload="none"
                className={`${isFixed ? 'fixed' : 'absolute'} z-0 pointer-events-none object-cover ${videoPlacement} ${videoSize} ${objectPosition} transition-transform duration-300`}
                style={{ transform: `translateX(${horizontalOffset}%)` }}
                autoPlay
                loop
                muted
                playsInline
            >
                {isInView && <source src={url} type="video/mp4" />}
            </video>

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
