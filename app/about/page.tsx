export default function About() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">Бидний тухай</h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
          Бид бол хөгжүүлэгчдэд зориулсан хамтын платформ юм. Энд хэрэглэгчид
          өөрсдийн бичсэн кодоо хуваалцаж, бусадтай хамтран алдааг нь олж засах,
          мөн өөрийн оруулсан хувь нэмрээрээ урамшуулал авах боломжтой.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Feature
            title="Код хуваалцах"
            desc="Өөрийн бичсэн кодоо олон нийттэй хуваалцаж, санал зөвлөгөө авна."
            icon="💻"
          />
          <Feature
            title="Алдаа засах"
            desc="Бусдын кодын алдааг илрүүлж, хамтран шийдэл олно."
            icon="🐞"
          />
          <Feature
            title="Оноо цуглуулах"
            desc="Идэвхтэй оролцоогоороо оноо цуглуулна."
            icon="⭐"
          />
          <Feature
            title="Урамшуулал авах"
            desc="Цуглуулсан оноогоо мөнгөн болон бусад урамшуулал болгоно."
            icon="💰"
          />
        </div>

        <div className="bg-white border rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Бидний зорилго</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Хөгжүүлэгчид хамтран суралцаж, мэдлэгээ хуваалцан, хөдөлмөрөө
            шударгаар үнэлүүлэх итгэлтэй, найдвартай орчныг бүрдүүлэх явдал юм.
          </p>
        </div>

        {/* Call to action */}
      </div>
    </section>
  );
}

const Feature = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) => {
  return (
    <div className="p-6 border rounded-2xl bg-white hover:shadow-md transition">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
};
