export default function HelpCenter() {
  const categories = [
    {
      title: "Account & Profile",
      desc: "Manage your account settings",
      href: "/help/account",
    },
    {
      title: "Posting & Content",
      desc: "Create, edit and manage posts",
      href: "/help/posting",
    },
    {
      title: "Community Rules",
      desc: "Learn our rules and policies",
      href: "/help/rules",
    },
    {
      title: "Technical Issues",
      desc: "Fix bugs and errors",
      href: "/help/technical",
    },
    {
      title: "About us",
      desc: "More information about us",
      href: "/about",
    },
    {
      title: "Report",
      href: "/report",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-4">Help Center</h1>
        <p className="text-center text-gray-600 mb-8">How can we help you?</p>

        <div className="max-w-xl mx-auto mb-12">
          <input
            className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for help..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 c">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              className="bg-white border rounded-2xl p-6 hover:shadow-md transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
              <p className="text-sm text-gray-600">{cat.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-bold mb-4">Popular articles</h2>
          <ul className="space-y-2 text-blue-600 text-sm">
            <li>• How to create a post</li>
            <li>• Reset your password</li>
            <li>• Why was my post removed?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
