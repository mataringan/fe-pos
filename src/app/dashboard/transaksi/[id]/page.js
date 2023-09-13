"use client";

import { TRANSACTION } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTransaction() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const router = useRouter();

  const [buyer, setBuyer] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const isoDate = new Date(date).toISOString();
    const response = await axios
      .put(
        `${TRANSACTION}/${id}`,
        {
          buyer,
          date: isoDate,
          quantity,
          image: newImage || image,
          address,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          router.push("/dashboard/transaksi");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex w-full">
      <div className="lg:w-[20%]">
        <BottomNavbar />
      </div>
      <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p className="mb-2">Edit Transaksi</p>
        <form onSubmit={handleUpdate}>
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
            {newImage ? (
              <Image
                src={URL.createObjectURL(newImage)}
                width={100}
                height={100}
                alt="image-transaction"
              />
            ) : image ? (
              <Image
                src={image}
                width={100}
                height={100}
                alt="image-transaction"
              />
            ) : null}
          </div>
          <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
          <Button type="submit" className="bg-slate-500">
            Update
          </Button>
        </form>
      </div>
      <ToastContainer
        position="top-right" // Posisi toast container
        autoClose={3000} // Durasi toast muncul dalam ms
        hideProgressBar={false} // Menampilkan atau menyembunyikan progress bar
        newestOnTop={false} // Menampilkan toast baru di atas atau di bawah toast lama
        closeOnClick // Menutup toast saat diklik
        rtl={false} // Teks toast mengikuti arah kanan ke kiri (misalnya dalam bahasa Arab)
        pauseOnFocusLoss // Menjeda toast saat fokus hilang dari halaman
        draggable // Memungkinkan pengguna untuk menyeret toast
        pauseOnHover // Menjeda toast saat kursor mengarah ke atasnya
      />
    </div>
  );
}
