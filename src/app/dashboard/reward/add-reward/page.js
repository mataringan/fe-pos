"use client";
import { REWARD } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddReward() {
    const [point, setPoint] = useState();
    const [discount, setDiscount] = useState();
    const [description, setDescription] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const router = useRouter();

    const handleAddReward = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            await axios
                .post(
                    REWARD,
                    { point, discount, description },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    setIsLoading(false);
                    toast.success("Tambah Data Reward Berhasil");
                    setTimeout(() => {
                        router.push("/dashboard/reward");
                    }, 1000);
                })
                .catch((err) => {
                    // console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(point, discount, description);

    return (
        <div className="flex w-full">
            <div className="lg:w-[20%]">
                {/* Sidebar */}
                <BottomNavbar />
            </div>
            <div className="order-2 lg:w-[100%] w-[100%] p-4 mb-32 lg:mb-16 overflow-y-auto">
                {/* Main Content */}
                <h1 className="font-bold text-2xl">Reward</h1>
                <p className="mb-2">
                    Hi! Selamat Datang di Dashboard Tambah Reward
                </p>
                <form onSubmit={handleAddReward}>
                    <div className="mb-4">
                        <label
                            htmlFor="point"
                            className="block font-semibold mb-2"
                        >
                            Point
                        </label>
                        <Input
                            id="point"
                            type="number"
                            onChange={(e) => setPoint(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="discount"
                            className="block font-semibold mb-2"
                        >
                            Discount
                        </label>
                        <Input
                            id="discount"
                            type="number"
                            onChange={(e) => setDiscount(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block font-semibold mb-2"
                        >
                            Deskripsi
                        </label>
                        <Input
                            id="description"
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <Button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 font-semibold text-white px-4 py-2 rounded ${
                            isLoading ? "opacity-70 pointer-events-none" : ""
                        }`}
                    >
                        {isLoading ? "Loading..." : "Create Reward"}
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
