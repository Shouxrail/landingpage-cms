export const Hero = ({ data }: { data: { title: string; subtitle: string } }) => (
  <section className="py-20 px-6 text-center bg-gradient-to-b from-slate-50 to-white">
    <h1 className="text-5xl font-bold tracking-tight text-slate-900">{data.title}</h1>
    <p className="mt-4 text-xl text-slate-600">{data.subtitle}</p>
    <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
      Get Started
    </button>
  </section>
);

export default Hero;
