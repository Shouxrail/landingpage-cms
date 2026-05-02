import { lazy, Suspense } from "react";
const BlockRenderer = lazy(() => import("@/components/BlockRenderer"));

export const LayoutBlockComponent = ({ data }: { data: { direction: string; children: any[]; bgColor?: string; isFullScreen?: string; paddingX?: number; paddingY?: number; alignX?: string; alignY?: string } }) => {
    const directionClass = data.direction || "grid-cols-1";
    const childBlocks = data.children || [];
    const bgColor = data.bgColor || "transparent";
    const isFullScreen = data.isFullScreen || 'none';
    const paddingX = data.paddingX || 0;
    const paddingY = data.paddingY || 0;
    const alignX = data.alignX || "justify-items-stretch";
    const alignY = data.alignY || "items-start";

    return (
        <div
            className={`grid w-full h-full gap-6 ${directionClass} ${alignX} ${alignY} ${isFullScreen === 'full' ? 'h-screen w-100' : ''}`}
            style={{
                backgroundColor: bgColor,
                paddingLeft: `${paddingX}px`,
                paddingRight: `${paddingX}px`,
                paddingTop: `${paddingY}px`,
                paddingBottom: `${paddingY}px`,
            }}
        >
            <Suspense fallback={null}>
                <BlockRenderer blocks={childBlocks} />
            </Suspense>
        </div>
    );
};
