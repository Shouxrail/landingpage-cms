import Link from "next/link";

export const Card = ({ data }: {
  data: {
    suptitle?: string;
    suptitleColor?: string;
    title?: string;
    titleSize?: string;
    titleColor?: string;
    description?: string;
    descSize?: string;
    descriptionSize?: string;
    descColor?: string;
    descriptionColor?: string;
    bgColor?: string;
    paddingY?: number;
    align?: string;
    maxWidth?: number;
    maxWidthUnit?: string;
    overlayOpacity?: string;
    buttons?: {
      text: string;
      url: string;
      icon?: string;
      textColor?: string;
      textHoverColor?: string;
      bgColor?: string;
      bgHoverColor?: string;
    }[];
  }
}) => {
  const alignment = data.align || "items-center text-center";
  const paddingY = data.paddingY !== undefined ? `${data.paddingY}px` : "100px";
  const overlay = data.overlayOpacity || "bg-transparent";

  const bgStyle: any = {
    paddingTop: paddingY,
    paddingBottom: paddingY,
  };

  if (data.bgColor) bgStyle.backgroundColor = data.bgColor;

  const containerAlignClass = data.align?.includes('start') ? 'items-start' : data.align?.includes('end') ? 'items-end' : 'items-center';
  const unit = data.maxWidthUnit || "%";
  const maxWidth = data.maxWidth !== undefined ? `${data.maxWidth}${unit}` : `100%`;

  return (
    <section
      className={`relative px-6 flex flex-col ${alignment} w-full`}>
      <div className="relative z-10 w-full transition-all duration-500" style={{ ...bgStyle, maxWidth }}>
        <div className={`w-full flex flex-col ${containerAlignClass} space-y-6`}>
          {data.suptitle && (
            <span
              className="text-xs tracking-[0.3em] font-medium uppercase transition-all pb-2"
              style={{ color: data.suptitleColor || 'var(--p)' }}
            >
              {data.suptitle}
            </span>
          )}

          {data.title && (
            <h2
              className={`${data.titleSize || "text-5xl"} font-bold tracking-tight leading-[1.1] transition-all duration-500`}
              style={{ color: data.titleColor || '#ffffff' }}
            >
              {data.title}
            </h2>
          )}

          {data.description && (
            <p
              className={`${data.descSize || data.descriptionSize || "text-lg"} leading-relaxed transition-all duration-500 whitespace-pre-line`}
              style={{ color: data.descColor || data.descriptionColor || 'rgba(255,255,255,0.6)' }}
            >
              {data.description}
            </p>
          )}

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
