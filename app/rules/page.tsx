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
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-2">Олон нийтийн дүрэм</h1>
      <p className="text-gray-400 mb-8">
        Манай нийгэмлэгийг аюулгүй, найрсаг, бүтээлч байлгахын тулд дараах
        дүрмийг мөрдөнө үү.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-red-500 transition"
          >
            <div className="text-red-500 text-xl mb-3">{rule.icon}</div>
            <h3 className="text-white font-semibold mb-1">{rule.title}</h3>
            <p className="text-gray-400 text-sm">{rule.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
