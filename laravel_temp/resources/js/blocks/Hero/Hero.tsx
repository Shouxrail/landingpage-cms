import { lazy, Suspense } from "react";
const BlockRenderer = lazy(() => import("@/components/BlockRenderer"));

export const Hero = ({ data }: {
  data: {
    bgColor?: string;
    bgImage?: string;
    paddingY?: number;
    align?: string;
    overlayOpacity?: string;
    children?: any[];
  }
}) => {
  const alignment = data.align || "items-center text-center";
  const paddingY = data.paddingY !== undefined ? `${data.paddingY / 16}rem` : "6.25rem";
  const overlay = data.overlayOpacity || "bg-transparent";
  const childBlocks = data.children || [];

  const bgStyle: any = {
    paddingTop: paddingY,
    paddingBottom: paddingY,
  };

  if (data.bgColor) bgStyle.backgroundColor = data.bgColor;
  if (data.bgImage) {
    bgStyle.backgroundImage = `url(${data.bgImage})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center";
  }

  let baseClass = "relative px-6 ";
  if (!data.bgColor && !data.bgImage) {
    baseClass += "bg-gradient-to-b from-slate-50 to-white";
  }

  return (
    <section className={`${baseClass} flex flex-col ${alignment} overflow-hidden`} style={bgStyle}>
      {/* Background Image Overlay */}
      {data.bgImage && <div className={`absolute inset-0 z-0 ${overlay}`}></div>}

      <div className="relative z-10 max-w-[80rem] mx-auto w-full">
        <div className={`w-full flex flex-col ${alignment}`}>
          <Suspense fallback={null}>
            <BlockRenderer blocks={childBlocks} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Hero;
