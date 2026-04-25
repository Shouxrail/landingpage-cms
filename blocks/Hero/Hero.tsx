export const Hero = ({ data }: { data: { title: string; subtitle: string; description: string; align?: string; bgColor?: string; bgImage?: string; buttons?: { label: string; url: string }[] } }) => {
  const buttons = data.buttons || [{ label: "Get Started", url: "#" }];
  const alignment = data.align || "text-center justify-center";

  const bgStyle: any = {};
  if (data.bgColor) bgStyle.backgroundColor = data.bgColor;
  if (data.bgImage) {
    bgStyle.backgroundImage = `url(${data.bgImage})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center";
  }

  let baseClass = "relative py-20 px-6 ";
  if (!data.bgColor && !data.bgImage) {
    baseClass += "bg-gradient-to-b from-slate-50 to-white";
  }

  return (
    <section className={`${baseClass} ${alignment}`} style={bgStyle}>
      {data.bgImage && <div className="absolute inset-0 bg-white/90 z-0"></div>}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <div className={`w-full flex flex-col ${data.align?.includes('start') ? 'items-start' : data.align?.includes('end') ? 'items-end' : 'items-center'}`}>
          <p className="mt-4 text-xl text-slate-600">{data.subtitle}</p>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">{data.title}</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl">{data.description}</p>
        </div>
        {buttons && buttons.length > 0 && (
          <div className={`mt-8 w-full flex flex-wrap gap-4 ${alignment}`}>
            {buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.url || "#"}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {btn.label || "Click Here"}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
