"use client";

import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Clock, History, Loader } from "lucide-react";
import CoinIcon from "../_icons/CoinIcon";

type Transaction = {
  id: string;
  amount: number;
  fromUserId: string;
  fromUserEmail: string;
  description: string;
  toUserId: string;
  toUserEmail: string;
  createdAt: string;
};

const TransferHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const [userRes, historyRes] = await Promise.all([
        fetch("/api/user"),
        fetch("/api/points/history"),
      ]);

      const userData = await userRes.json();
      const historyData = await historyRes.json();

      setUserId(userData.id);
      setTransactions(historyData ?? []);
      setLoading(false);
    };

    loadData();
  }, []);

  const isReceived = (item: Transaction) => userId !== item.fromUserId;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-cyan-500/5 to-teal-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />

        <div className="relative max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <History className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Transfer History</h1>
              <p className="text-white/60 mt-1">View all your point transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-white/50">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No transactions yet</h3>
            <p className="text-white/50">Your transfer history will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((item) => {
              const received = isReceived(item);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all"
                >
                  {/* Left: Icon & Info */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        received
                          ? "bg-linear-to-br from-green-500/20 to-emerald-500/20"
                          : "bg-linear-to-br from-red-500/20 to-rose-500/20"
                      }`}
                    >
                      {received ? (
                        <ArrowDownLeft className="w-6 h-6 text-green-400" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-red-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {received ? "Received from" : "Sent to"}
                        </span>
                        <span className="text-white/60 text-sm">
                          {received ? item.fromUserEmail : item.toUserEmail}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-white/50 text-sm mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 text-white/40 text-xs mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount */}
                  <div className="flex items-center gap-2">
                    <div className="scale-75">
                      <CoinIcon />
                    </div>
                    <span
                      className={`text-xl font-bold ${
                        received ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {received ? "+" : "-"}{item.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferHistory;
