"use client";

import { useEffect, useState } from "react";
import BuyPoints from "../components/buyPoints";
import UserPoints from "../components/userPoints";

export default function PointPage() {
  const [points, setPoints] = useState<number>(0);
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setPoints(data.points ?? 0);
    };
    load();
  }, []);
  return (
    <div className="max-w-6xl mx-auto mt-20 px-6">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <UserPoints points={points} />
        <BuyPoints onBought={(newPoints) => setPoints(newPoints)} />
        <TransferHistory />
      </div>
    </div>
  );
}

type Transactions = {
  id: string;
  amount: number;
  fromUserId: string;
  description: string;
};

const TransferHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch("/api/user", { method: "GET" });
      const data = await res.json();
      setUserId(data.id);
    };

    getUserData();
    const getHistory = async () => {
      const res = await fetch("api/points/history", {
        method: "GET",
      });

      const data = await res.json();
      console.log(data);
      setTransactions(data);
    };
    getHistory();
  }, []);

  return (
    <div className=" w-120 h-fit py-10 border border-gray-700 rounded-xl">
      {transactions.map((item: Transactions) => (
        <div key={item.id} className="text-white flex justify-between px-5">
          <div>
            {userId === item.fromUserId ? <span>-</span> : <span>+</span>}
            {item.amount}
          </div>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};
