export const Features = ({ data }: { data: { items: string[] } }) => (
  <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
    {data.items?.map((item, i) => (
      <div key={i} className="p-6 border rounded-xl shadow-sm bg-white">
        <h3 className="font-bold text-lg mb-2">Feature {i + 1}</h3>
        <p className="text-slate-500">{item}</p>
      </div>
    ))}
  </section>
);

export default Features;
