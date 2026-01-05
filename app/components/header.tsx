export default function Header() {
  return (
    <div className="flex justify-evenly p-3 border-b items-center">
      <div className="flex gap-40">
        <div className="flex items-center">
          <h1 className="flex gap-3 font-bold text-2xl">
            <span className="text-blue-500">Software</span>Communtiy
          </h1>
        </div>
        <div className="flex gap-5">
          <button className=" p-2 border rounded-lg">Home</button>
          <button className="p-2 border rounded-lg">User Test</button>
          <button className="p-2 border rounded-lg">Blog</button>
          <button className="p-2 border rounded-lg">IT News</button>
        </div>
      </div>
      <div className="flex gap-5">
        <button className="bg-black rounded-lg text-white p-2">Login</button>
        <button className="p-2 rounded-lg">SignUp</button>
      </div>
    </div>
  );
}
