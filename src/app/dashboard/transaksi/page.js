"use client";

import { TRANSACTION, TRANSACTION_ADMIN } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "./transactionCard";

export default function Transaction() {
  const role = useSelector((state) => state.userData.role);
  const [transaction, setTransaction] = useState([]);
  // console.log(role);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (role === "admin") {
      fethDataAdmin();
    } else {
      fetchDataKaryawan();
    }
  }, []);

  const fetchDataKaryawan = async () => {
    const response = await axios
      .get(TRANSACTION, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setTransaction(res.data.data);
      });
  };

  // console.log(transaction);

  const fethDataAdmin = async () => {
    const response = await axios
      .get(TRANSACTION_ADMIN, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setTransaction(res.data.data);
      });
  };
  return (
    <div>
      <div className="flex w-full">
        <div className="lg:w-[20%]">
          <BottomNavbar />
        </div>
        <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          {role === "karyawan" ? (
            <p className="mb-2">
              Hi karyawan! Selamat Datang di Dashboard Transaction
            </p>
          ) : (
            <p className="mb-2">
              Hi Admin! Selamat Datang di Dashboard Transaction
            </p>
          )}
          {transaction.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}
