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
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, Clock, Send, User, FileText, Coins } from "lucide-react";

export default function UserPoints({ points }: { points: number }) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10 bg-linear-to-r from-violet-500/10 to-purple-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
            <p className="text-white/50 text-sm">Transfer & manage points</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <TransferPointsDialog />

        <button
          onClick={() => router.push("/transfer-history")}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-white font-medium">Transfer History</div>
              <div className="text-white/50 text-sm">View past transactions</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
}

const TransferPointsDialog = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePointTransfer = async () => {
    if (!email || !amount) return;

    setLoadingTransfer(true);
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
    setLoadingTransfer(false);

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {
        setEmail("");
        setAmount(null);
        setDescription("");
        setSuccess(false);
        setDialogOpen(false);
      }, 1500);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-linear-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 hover:from-violet-500/30 hover:to-purple-500/30 hover:border-violet-500/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-white font-medium">Transfer Points</div>
              <div className="text-white/50 text-sm">Send to another user</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-all" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-black/95 border border-white/10 text-white backdrop-blur-xl max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">Transfer Points</DialogTitle>
              <DialogDescription className="text-white/50">
                Send points to another user
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Email Input */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">Recipient Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">Amount</label>
            <div className="relative">
              <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="number"
                min={1}
                step={1}
                value={amount ?? ""}
                onChange={(e) => {
                  const v = e.target.valueAsNumber;
                  setAmount(Number.isNaN(v) ? null : v);
                }}
                placeholder="Enter amount"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">Description (Optional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-white/40" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a note..."
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handlePointTransfer}
            disabled={!email || !amount || loadingTransfer}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-linear-to-r from-violet-500 to-purple-600 text-white font-semibold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loadingTransfer ? (
              <Spinner className="w-5 h-5" />
            ) : success ? (
              <>
                <span className="text-green-300">Transfer Successful!</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Points
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
