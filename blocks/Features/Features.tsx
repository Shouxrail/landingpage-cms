export const Features = ({ data }: { data: { title?: string; subtitle?: string; items: { title: string; description: string }[] } }) => (
  <section className="py-16 px-6 max-w-6xl mx-auto">
    {(data.title || data.subtitle) && (
      <div className="text-center mb-12">
        {data.title && <h2 className="text-3xl font-bold mb-4">{data.title}</h2>}
        {data.subtitle && <p className="text-slate-500 max-w-2xl mx-auto">{data.subtitle}</p>}
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {data.items?.map((item, i) => (
        <div key={i} className="p-6 border rounded-xl shadow-sm bg-white">
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-slate-500">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
