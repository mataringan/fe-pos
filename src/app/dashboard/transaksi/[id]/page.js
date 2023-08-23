"use client";

import { TRANSACTION } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditTransaction() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [buyer, setBuyer] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    const response = await axios.get(`${TRANSACTION}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    const data = response.data.data;
    setBuyer(data.buyer);
    setDate(data.date);
    setQuantity(data.quantity);
    setImage(data.image);
    setAddress(data.address);
    setNote(data.note);
  };
  return (
    <div className="flex w-full">
      <div className="lg:w-[20%]">
        <BottomNavbar />
      </div>
      <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p className="mb-2">Edit Transaksi</p>
        <form>
          <div>
            <label htmlFor="pembeli">Pembeli</label>
            <Input
              value={buyer}
              type="text"
              onChange={(e) => setBuyer(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="date">Tanggal</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="jumlah">Jumlah</label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="alamat">Alamat</label>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="catatan">Catatan</label>
            <Input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div>
            <Image
              src={image}
              width={100}
              height={100}
              alt="image-transaction"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
