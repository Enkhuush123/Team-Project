import BlogCard from "./components/blogCard";
import BugCard from "./components/bugCard";
import ItNewsCard from "./components/itNewsCard";

export default function Home() {
  return (
    <div className="m-auto flex gap-5  ">
      <ItNewsCard />
      <div className="flex gap-5 flex-col">
        <BugCard />
        <BlogCard />
      </div>
    </div>
  );
}
