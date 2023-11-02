"use client";

import { INFORMATION } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddInformation() {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [date, setDate] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("token");
    const router = useRouter();

    const handleAddInformation = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const isoDate = new Date(date).toISOString();

        await axios
            .post(
                INFORMATION,
                { title, content, date: isoDate },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                // console.log(res);
                setIsLoading(false);
                toast.success("Tambah Data Informasi Berhasil");
                setTimeout(() => {
                    router.push("/dashboard/information");
                }, 2000);
            });
    };

    return (
        <div>
            <div className="flex w-full">
                <div className="lg:w-[20%]">
                    <BottomNavbar />
                </div>
                <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                    <h1 className="font-bold text-2xl">Informasi</h1>
                    <p className="mb-2">
                        Hi Admin! Selamat Datang di Dashboard Tambah Informasi
                    </p>
                    <form onSubmit={handleAddInformation}>
                        <div className="mb-4">
                            <label
                                htmlFor="Title"
                                className="block font-semibold mb-2"
                            >
                                Judul
                            </label>
                            <Input
                                type="text"
                                id="Title"
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="Content"
                                className="block font-semibold mb-2"
                            >
                                Content
                            </label>
                            <textarea
                                id="Content"
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 border rounded"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="Tanggal"
                                className="block font-semibold mb-2"
                            >
                                Tanggal
                            </label>
                            <Input
                                type="date"
                                id="Tanggal"
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <Button
                            type="submit"
                            className={`bg-blue-500 text-white px-4 py-2 rounded ${
                                isLoading
                                    ? "opacity-70 pointer-events-none"
                                    : ""
                            }`}
                        >
                            {isLoading ? "Loading..." : "Kirim"}
                        </Button>
                    </form>
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
