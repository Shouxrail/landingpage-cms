import { lazy, Suspense } from "react";
const BlockRenderer = lazy(() => import("@/components/BlockRenderer"));

export const LayoutBlockComponent = ({ data }: { data: { direction: string; children: any[]; bgColor?: string; isFullScreen?: string; paddingX?: number; paddingY?: number; alignX?: string; alignY?: string } }) => {
    const directionClass = data.direction || "grid-cols-1";
    const childBlocks = data.children || [];
    const bgColor = data.bgColor || "transparent";
    const heightClass = data.height || "h-auto";
    const paddingX = data.paddingX || 0;
    const paddingY = data.paddingY || 0;
    const alignX = data.alignX || "justify-items-stretch";
    const alignY = data.alignY || "items-start";

    return (
        <div
            className={`grid w-full gap-6 ${directionClass} ${alignX} ${alignY} ${heightClass}`}
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
