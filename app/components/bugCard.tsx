import { Button } from "@/components/ui/button";

export default function BugCard() {
  return (
    <div className="flex flex-col gap-5 shadow-sm p-5 h-70 ">
      <div className="border-b p-2">
        <h2 className="font-bold text-2xl">User Test & points</h2>
      </div>
      <div className="flex flex-col gap-3 border-b p-2">
        <p>Submit bug and earn points.</p>
        <div className="flex justify-center">
          <Button className="w-30">Submit a Bug</Button>
        </div>
      </div>
    </div>
  );
}
