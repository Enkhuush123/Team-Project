"use client";

import { useEffect, useState } from "react";
import CoinIcon from "../_icons/CoinIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type User = {
  points: number;
};

export default function UserPoints({ points }: { points: number }) {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch("/api/user", { method: "GET" });
      const data = await res.json();
      setUser(data);
    };
    getUserData();
  }, []);

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-white/5 p-6 text-white">
      <h2 className="text-lg font-semibold">Your Points</h2>
      <div className="mt-3 text-4xl font-extrabold flex items-center gap-3">
        <CoinIcon /> {points}
        <span className="text-base font-medium text-white/60 ml-2">points</span>
      </div>
      <div className="flex flex-col w-full mt-6 gap-3 items-start">
        <TransferPointsDialog />
        <Button
          onClick={() => {
            router.push("/transfer-history");
          }}
        >
          See transfer history
        </Button>
      </div>
    </div>
  );
}

const TransferPointsDialog = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePointTransfer = async () => {
    const res = await fetch("/api/points/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        amount,
        description,
      }),
    });

    const data = await res.json();

    console.log(data);

    setDialogOpen(false);
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="hover:brightness-110 transition ">
          Transfer points
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <DialogHeader>
          <DialogTitle>Transfer points</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="User email"
          className="border border-white rounded-sm px-2 placeholder:text-gray-500"
        />
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          placeholder="Points to transfer"
          className="border border-white rounded-sm px-2 "
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a description"
          className="border border-white rounded-sm px-2 placeholder:text-gray-500"
        />
        <div
          onClick={handlePointTransfer}
          className="w-full border text-center border-gray-500 p-1 rounded-sm"
        >
          Send Points
        </div>
      </DialogContent>
    </Dialog>
  );
};
