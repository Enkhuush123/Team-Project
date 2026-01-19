"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Transactions = {
  id: string;
  amount: number;
  fromUserId: string;
  description: string;
  toUserEmail: string;
  createdAt: string;
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
    <div className="mx-auto mt-5 w-[80%] h-fit py-10 border border-gray-700 rounded-xl">
      <Table>
        <TableCaption>A list of your recent transfers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((item: Transactions) => (
            <TableRow className="text-white">
              <TableCell
                key={item.id}
                className="text-white flex justify-between px-5"
              >
                <div
                  style={{
                    color: userId !== item.fromUserId ? "green" : "red",
                  }}
                >
                  {userId === item.fromUserId ? <span>-</span> : <span>+</span>}
                  {item.amount}
                </div>
              </TableCell>
              <TableCell>
                <p>{item.description}</p>
              </TableCell>
              <TableCell>
                <p>{item.toUserEmail}</p>
              </TableCell>
              <TableCell>
                <p>{new Date(item.createdAt).toLocaleString()}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransferHistory;
