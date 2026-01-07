export const Link = () => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <input
        className="w-full h-12 px-4 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Title"
      />

      <input
        type="url"
        className="w-full h-12 px-4 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="URL"
      />

      <div className="flex justify-end">
        <button className="px-5 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">
          Post
        </button>
      </div>
    </div>
  );
};
