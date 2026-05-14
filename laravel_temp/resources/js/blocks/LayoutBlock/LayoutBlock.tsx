import { lazy, Suspense } from "react";
const BlockRenderer = lazy(() => import("@/components/BlockRenderer"));

export const LayoutBlockComponent = ({ data }: { data: { direction: string; children: any[]; bgColor?: string; height?: string; isFullScreen?: string; paddingX?: number; paddingY?: number; alignX?: string; alignY?: string; stackType?: string } }) => {
    const directionClass = data.direction || "grid-cols-1";
    const childBlocks = data.children || [];
    const bgColor = data.bgColor || "transparent";
    let heightClass = data.height || "h-auto";
    if (heightClass === "h-screen") heightClass = "h-[100dvh]";
    if (heightClass === "min-h-screen") heightClass = "min-h-[100dvh]";
    const paddingX = data.paddingX || 0;
    const paddingY = data.paddingY || 0;
    const alignX = data.alignX || "justify-items-stretch";
    const alignY = data.alignY || "items-start";
    const stackType = data.stackType || "grid";

    return (
        <div
            className={`${stackType} w-full gap-6 ${directionClass} ${alignX} ${alignY} ${heightClass}`}
            style={{
                backgroundColor: bgColor,
                paddingLeft: `${paddingX / 16}rem`,
                paddingRight: `${paddingX / 16}rem`,
                paddingTop: `${paddingY / 16}rem`,
                paddingBottom: `${paddingY / 16}rem`,
            }}
        >
            <Suspense fallback={null}>
                <BlockRenderer blocks={childBlocks} />
            </Suspense>
        </div>
    );
};
