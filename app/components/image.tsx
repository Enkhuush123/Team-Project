export const Image = () => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <input
        className="w-full h-12 px-4 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Title"
      />

      <label className="w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-blue-400 transition">
        <input type="file" className="hidden" />
        <p className="text-sm font-medium">Drag and drop images or videos</p>
        <p className="text-xs text-gray-400">or click to upload</p>
      </label>

      <div className="flex justify-end">
        <button className="px-5 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">
          Post
        </button>
      </div>
    </div>
  );
};
