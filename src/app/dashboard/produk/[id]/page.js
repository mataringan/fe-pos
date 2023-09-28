"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Input from "@/components/Input";
import BottomNavbar from "@/components/BottomNavbar";
import { GET_PRODUCT } from "@/apis";
import Button from "@/components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stok, setStok] = useState(0);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${GET_PRODUCT}/${id}`);
                const data = response.data.data;
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setStok(data.stok);
                setCategory(data.category);
                setImage(data.image);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleRadioChange = (e) => {
        setCategory(e.target.value);
    };

    const handleUpdate = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            await axios
                .put(
                    `${GET_PRODUCT}/${id}`,
                    {
                        name,
                        description,
                        price,
                        stok,
                        category,
                        image: newImage || image,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                .then((res) => {
                    // console.log(res);
                    toast.success(res.data.message);
                    router.push("/dashboard/produk");
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
            <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                {/* Main Content */}
                <h1 className="font-bold text-2xl">Dashboard</h1>
                <p className="mb-2">
                    Hi Admin! Selamat Datang di Dashboard Edit Produk
                </p>
                <div>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label
                                htmlFor="Nama"
                                className="block font-semibold mb-1"
                            >
                                Nama Produk
                            </label>
                            <Input
                                type="text"
                                id="Nama"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="Deskripsi"
                                className="block font-semibold mb-1"
                            >
                                Deskripsi
                            </label>
                            <textarea
                                id="Deskripsi"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border rounded"
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor="Harga"
                                className="block font-semibold mb-1"
                            >
                                Harga
                            </label>
                            <Input
                                type="number"
                                id="Harga"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="Stok"
                                className="block font-semibold mb-1"
                            >
                                Stok
                            </label>
                            <Input
                                type="number"
                                id="Stok"
                                value={stok}
                                onChange={(e) => setStok(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">
                                Kategori
                            </label>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="benih"
                                        name="Kategori"
                                        value="Benih"
                                        onChange={handleRadioChange}
                                        checked={category === "Benih"}
                                        className="mr-2"
                                    />
                                    <label htmlFor="benih">Benih</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="pupuk"
                                        name="Kategori"
                                        value="Pupuk"
                                        onChange={handleRadioChange}
                                        checked={category === "Pupuk"}
                                        className="mr-2"
                                    />
                                    <label htmlFor="pupuk">Pupuk</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            {newImage ? (
                                <img
                                    src={URL.createObjectURL(newImage)}
                                    width={100}
                                    height={100}
                                    alt={name}
                                    className="rounded"
                                />
                            ) : image ? (
                                <img
                                    src={image}
                                    width={100}
                                    height={100}
                                    alt={name}
                                    className="rounded"
                                />
                            ) : null}
                            <Input
                                type="file"
                                onChange={(e) => setNewImage(e.target.files[0])}
                                className="mt-2"
                            />
                        </div>
                        <Button
                            type="submit"
                            className={`bg-blue-500 text-white px-4 py-2 rounded ${
                                isLoading
                                    ? " opacity-70 pointer-events-none"
                                    : ""
                            }`}
                        >
                            {isLoading ? "Loading..." : "Update"}
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
        </div>
    );
}
