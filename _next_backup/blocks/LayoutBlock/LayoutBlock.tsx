import dynamic from "next/dynamic";

const BlockRenderer = dynamic(() => import("@/components/BlockRenderer"));

export const LayoutBlockComponent = ({ data }: { data: { direction: string; children: any[] } }) => {
    const directionClass = data.direction || "grid-cols-1";
    const childBlocks = data.children || [];

    return (
        <div className={`grid w-full gap-6 ${directionClass}`}>
            <BlockRenderer blocks={childBlocks} />
        </div>
    );
};
