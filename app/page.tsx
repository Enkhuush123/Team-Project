import BlogCard from "./components/blogCard";
import BugCard from "./components/bugCard";
import ItNewsCard from "./components/itNewsCard";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-56px)] w-full bg-black">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-130 w-130 rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-105 w-105 rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto  px-6 md:px-10 py-10 min-h-[calc(100vh-56px)]">
        <div className="grid gap-6 lg:grid-cols-3 min-h-[calc(100vh-56px-80px)]">
          <ItNewsCard />
          <BugCard />
          <BlogCard />
        </div>
      </div>
    </main>
  );
}
