"use client";

import { ADD_PRODUCT } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TambahProdukPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [stok, setStok] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleRadioChange = (e) => {
        setCategory(e.target.value);
    };
    const token = localStorage.getItem("token");

    const handleAddProduct = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            await axios
                .post(
                    ADD_PRODUCT,
                    {
                        name,
                        description,
                        price,
                        stok,
                        category,
                        image,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                .then((res) => {
                    setIsLoading(true);
                    toast.success("Tambah Produk Berhasil");
                    setTimeout(() => {
                        router.push("/dashboard/produk");
                    }, 2000);
                });
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex w-full">
                <div className="lg:w-[20%]">
                    {/* Sidebar */}
                    <BottomNavbar />
                </div>
                <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                    {/* Main Content */}
                    <h1 className="font-bold text-2xl">Dashboard</h1>
                    <p className="mb-2">
                        Hi Admin! Selamat Datang di Dashboard Tambah Produk
                    </p>
                    <div>
                        <form onSubmit={handleAddProduct}>
                            <div className="mb-4">
                                <label
                                    htmlFor="Nama"
                                    className="block font-semibold mb-2"
                                >
                                    Nama Produk
                                </label>
                                <Input
                                    type="text"
                                    id="Nama"
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="Deskripsi"
                                    className="block font-semibold mb-2"
                                >
                                    Deskripsi
                                </label>
                                <textarea
                                    id="Deskripsi"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="w-full p-2 border rounded"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="Harga"
                                    className="block font-semibold mb-2"
                                >
                                    Harga
                                </label>
                                <Input
                                    type="number"
                                    id="Harga"
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="Harga"
                                    className="block font-semibold mb-2"
                                >
                                    Stok
                                </label>
                                <Input
                                    type="number"
                                    id="Harga"
                                    onChange={(e) => setStok(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="kategori"
                                    className="block font-semibold mb-2"
                                >
                                    Kategori
                                </label>
                                <div className="mb-2">
                                    <input
                                        type="radio"
                                        id="benih"
                                        name="kategori"
                                        value="Benih"
                                        onChange={handleRadioChange}
                                        checked={category === "Benih"}
                                        className="mr-2"
                                    />
                                    <label htmlFor="benih">Benih</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="pupuk"
                                        name="kategori"
                                        value="Pupuk"
                                        onChange={handleRadioChange}
                                        checked={category === "Pupuk"}
                                        className="mr-2"
                                    />
                                    <label htmlFor="pupuk">Pupuk</label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="Image"
                                    className="block font-semibold mb-2"
                                >
                                    Gambar Produk
                                </label>
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                    className="w-full"
                                />
                            </div>
                            <div className="mb-4">
                                {image && (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        width={100}
                                        height={100}
                                        alt="product-image"
                                        className="rounded"
                                    />
                                )}
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
        </div>
    );
}
