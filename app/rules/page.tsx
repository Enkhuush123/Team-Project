"use client";

import {
  FaHandshake,
  FaBan,
  FaUserShield,
  FaExclamationTriangle,
  FaGavel,
  FaComments,
} from "react-icons/fa";

const rules = [
  {
    icon: <FaHandshake />,
    title: "Хүндэтгэлтэй харилцах",
    desc: "Бусад гишүүдтэй соёлтой, хүндэтгэлтэй харилцана. Доромжилсон үг, гадуурхалт, дарамт шахалт хориглоно.",
  },
  {
    icon: <FaComments />,
    title: "Эерэг, бүтээлч харилцаа",
    desc: "Утга учиртай, тус болохуйц сэтгэгдэл бичиж, харилцан ойлголцлыг дэмжинэ.",
  },
  {
    icon: <FaBan />,
    title: "Спам болон сурталчилгаа хориглоно",
    desc: "Давтагдсан пост, зөвшөөрөлгүй сурталчилгаа, спам контент байршуулахыг хориглоно.",
  },
  {
    icon: <FaUserShield />,
    title: "Хувийн мэдээлэл хамгаалах",
    desc: "Өөрийн болон бусдын хувийн мэдээллийг зөвшөөрөлгүйгээр нийтлэхийг хориглоно.",
  },
  {
    icon: <FaExclamationTriangle />,
    title: "Зохисгүй контент хориглоно",
    desc: "Хууль бус, доромжилсон, ёс зүйгүй агуулга нийтлэхийг хатуу хориглоно.",
  },
  {
    icon: <FaGavel />,
    title: "Дүрмийн хэрэгжилт",
    desc: "Дүрэм зөрчсөн тохиолдолд пост устгах, аккаунтыг хязгаарлах арга хэмжээ авна.",
  },
];

export default function CommunityRules() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-14">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-extrabold text-white mb-3">
            Олон нийтийн дүрэм
          </h1>
          <p className="text-white/65 leading-relaxed">
            Манай community-г аюулгүй, найрсаг, бүтээлч байлгахын тулд дараах
            дүрмүүдийг мөрдөнө үү.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="
                group relative rounded-2xl p-6
                bg-white/5 border border-white/10 backdrop-blur-xl
                shadow-[0_20px_60px_rgba(99,102,241,0.12)]
                hover:border-violet-500/60 hover:shadow-[0_25px_80px_rgba(139,92,246,0.35)]
                transition
              "
            >
              {/* icon */}
              <div
                className="
                  mb-4 h-12 w-12 rounded-xl
                  flex items-center justify-center
                  bg-gradient-to-br from-violet-500/20 to-cyan-400/20
                  text-violet-300 text-xl
                  group-hover:scale-110 transition
                "
              >
                {rule.icon}
              </div>

              <h3 className="text-white font-semibold text-lg mb-2">
                {rule.title}
              </h3>

              <p className="text-white/65 text-sm leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
