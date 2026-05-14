import { Link } from "@inertiajs/react";
import { lazy, Suspense } from "react";
const BlockRenderer = lazy(() => import("@/components/BlockRenderer"));

export const Card = ({ data }: {
  data: {
    suptitle?: string;
    suptitleColor?: string;
    suptitleSize?: string;
    title?: string;
    titleSize?: string;
    titleColor?: string;
    bgColor?: string;
    paddingY?: number;
    paddingX?: number;
    align?: string;
    maxWidth?: number;
    maxWidthUnit?: string;
    buttons?: {
      text: string;
      url: string;
      icon?: string;
      textColor?: string;
      textHoverColor?: string;
      bgColor?: string;
      bgHoverColor?: string;
    }[];
    icon?: string;
    iconSize?: number;
    children?: any[];
    suptitleMarginLeft?: number;
  }
}) => {
  const alignment = data.align || "items-center text-center";
  const paddingY = data.paddingY !== undefined ? `${data.paddingY / 16}rem` : "0rem";
  const paddingX = data.paddingX !== undefined ? `${data.paddingX / 16}rem` : "0rem";
  const childBlocks = data.children || [];

  const bgStyle: any = {
    paddingTop: paddingY,
    paddingBottom: paddingY,
    paddingLeft: paddingX,
    paddingRight: paddingX,
  };

  if (data.bgColor) bgStyle.backgroundColor = data.bgColor;

  const containerAlignClass = data.align?.includes('start') ? 'items-start' : data.align?.includes('end') ? 'items-end' : 'items-center';
  const unit = data.maxWidthUnit || "%";
  const maxWidth = data.maxWidth !== undefined ? `${data.maxWidth}${unit}` : `100%`;

  return (
    <section
      className={`relative flex flex-col ${alignment}`} style={{ ...bgStyle, maxWidth }}>
      <div className="relative z-10 w-full transition-all duration-500 flex-1">
        <div className={`w-full flex flex-col ${containerAlignClass} space-y-6`}>
          <div className="flex items-baseline self-start gap-3" style={data.icon ? {
            transform: `translateX(-${((data.iconSize || 48) + 12) / 16}rem)`,
            marginLeft: `${data.suptitleMarginLeft || 0}px`,
          } : {}}>
            {data.icon && (
              <img
                src={data.icon}
                alt=""
                style={{ width: `${(data.iconSize || 48) / 16}rem`, height: 'auto' }}
                className="object-contain"
              />
            )}
            {data.suptitle && (
              <span
                className={`${data.suptitleSize} ${data.icon ? "" : "tracking-[0.3em]"} font-medium transition-all whitespace-pre-line`}
                style={{ color: data.suptitleColor || 'var(--p)' }}
              >
                {data.suptitle}
              </span>
            )}
          </div>

          {data.title && (
            <h2
              className={`${data.titleSize || "text-5xl"} font-bold tracking-tight leading-[1.1] transition-all duration-500 whitespace-pre-line`}
              style={{ color: data.titleColor || '#ffffff' }}
            >
              {data.title}
            </h2>
          )}

          <Suspense fallback={null}>
            <BlockRenderer blocks={childBlocks} />
          </Suspense>

          {data.buttons && data.buttons.length > 0 && (
            <div className={`flex mt-6 flex-wrap gap-4 w-full justify-between`}>
              {data.buttons.map((btn, i) => {
                const btnStyle: any = {
                  '--btn-bg': btn.bgColor || 'transparent',
                  '--btn-bg-hover': btn.bgHoverColor || btn.bgColor || 'transparent',
                  '--btn-color': btn.textColor || '#ffffff',
                  '--btn-color-hover': btn.textHoverColor || btn.textColor || '#ffffff',
                };

                const isCustom = btn.bgColor || btn.textColor || btn.bgHoverColor || btn.textHoverColor;
                const customClass = isCustom ? 'border-none bg-[var(--btn-bg)] hover:bg-[var(--btn-bg-hover)] text-[var(--btn-color)] hover:text-[var(--btn-color-hover)]' : '';

                return (
                  <Link
                    key={i}
                    href={btn.url || "#"}
                    className={`group/btn rounded-2xl ${btnStyle['--btn-bg'] !== 'transparent' ? "px-6 py-2" : ""} font-semibold text-xl tracking-tight transition-all active:scale-95 flex items-center gap-3 ${customClass}`}
                    style={btnStyle}
                  >
                    {btn.icon && (
                      <div
                        className="w-5 h-5 transition-colors duration-300 bg-[var(--btn-color)] group-hover/btn:bg-[var(--btn-color-hover)]"
                        style={{
                          WebkitMaskImage: `url(${btn.icon})`,
                          maskImage: `url(${btn.icon})`,
                          WebkitMaskRepeat: 'no-repeat',
                          maskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'center',
                          maskPosition: 'center',
                          WebkitMaskSize: 'contain',
                          maskSize: 'contain',
                        }}
                      />
                    )}
                    {btn.text}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Card;
