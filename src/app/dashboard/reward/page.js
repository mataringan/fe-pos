"use client";

import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { REWARD } from "@/apis";
import RewardCard from "./rewardCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Reward() {
    const token = localStorage.getItem("token");
    const [reward, setReward] = useState([]);

    useEffect(() => {
        axios
            .get(REWARD, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setReward(res.data.data);
            });
    }, []);

    const handleDelete = async (id) => {
        await axios
            .delete(`${REWARD}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                toast.success("Hapus Data Reward Berhasil");
                setReward((prevRew) => prevRew.filter((p) => p.id !== id));
            });
    };
    return (
        <div className="flex w-full">
            <div className="lg:w-[20%]">
                {/* Sidebar */}
                <BottomNavbar />
            </div>
            <div className="order-2 lg:w-[100%] w-[100%] p-4 mb-32 lg:mb-16 overflow-y-auto">
                {/* Main Content */}
                <h1 className="font-bold text-2xl">Reward</h1>
                <p className="mb-4">Hi! Selamat Datang di Dashboard Reward</p>
                <Button>
                    <Link
                        href="reward/add-reward"
                        className="bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-white"
                    >
                        Tambah Data
                    </Link>
                </Button>
                <div className="lg:flex gap-2">
                    {reward &&
                        reward.map((item) => (
                            <RewardCard
                                key={item.id}
                                reward={item}
                                onDelete={handleDelete}
                            />
                        ))}
                </div>
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
