"use client";

import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { REWARD } from "@/apis";

export default function EditReward() {
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const router = useRouter();

    const [point, setPoint] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (id) {
            axios.get(`${REWARD}/${id}`).then((res) => {
                // console.log(res);
                const data = res.data.data;
                setPoint(data.point);
                setDiscount(data.discount);
                setDescription(data.description);
            });
        }
    }, [id]);

    const handleEditReward = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            axios
                .put(
                    `${REWARD}/${id}`,
                    { point, discount, description },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then(() => {
                    setIsLoading(false);
                    toast.success("Update Data Reward Berhasil");
                    setTimeout(() => {
                        router.push("/dashboard/reward");
                    }, 1000);
                });
        } catch (error) {
            console.log(error);
        }
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
                <p className="mb-2">
                    Hi! Selamat Datang di Dashboard Edit Reward
                </p>
                <form onSubmit={handleEditReward}>
                    <div className="mb-4">
                        <label
                            htmlFor="point"
                            className="block font-semibold mb-2"
                        >
                            Point
                        </label>
                        <Input
                            id="point"
                            value={point}
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
                            value={discount}
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
                            value={description}
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
                        {isLoading ? "Loading..." : "Edit Reward"}
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
