"use client";

import { GET_PRODUCT, TRANSACTION } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTransaksi() {
    const role = useSelector((state) => state.userData.role);
    const router = useRouter();
    const [product, setProduct] = useState([]);
    const [productId, setProductId] = useState();
    const [buyer, setBuyer] = useState();
    const [date, setDate] = useState();
    const [quantity, setQuantity] = useState();
    const [image, setImage] = useState();
    const [address, setAddress] = useState();
    const [note, setNote] = useState();
    const [status, setStatus] = useState("");
    const [selectedOption, setSelectedOption] = useState();
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);

    const handleDropdownChange = (e) => {
        const selectedProductName = e.target.value;
        const selectedProduct = product.find(
            (p) => p.name === selectedProductName
        );
        if (selectedProduct) {
            setProductId(selectedProduct.id);
        }
        setSelectedOption(selectedProductName);
    };

    // console.log(productId);
    // console.log(product);

    useEffect(() => {
        fetchDataProduct();
    }, []);

    const handleAddTransaction = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const isoDate = new Date(date).toISOString();
            await axios
                .post(
                    TRANSACTION,
                    {
                        productId,
                        buyer,
                        date: isoDate,
                        quantity,
                        image,
                        status,
                        address,
                        note,
                    },
                    {
                        headers: {
                            accept: "*/*",
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                .then((res) => {
                    // console.log(res);
                    const data = res.data;
                    toast.success("Tambah Transaksi Berhasil");
                    setTimeout(() => {
                        router.push("/dashboard/transaksi");
                    }, 2000);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDataProduct = async () => {
        const response = await axios.get(GET_PRODUCT);
        // console.log(response);
        const data = response.data.data;
        setProduct(data);
        // console.log(data[0].id);
        setProductId(data[0].id);
    };

    // console.log(status);

    return (
        <div>
            <div className="flex w-full">
                <div className="lg:w-[20%]">
                    <BottomNavbar />
                </div>
                <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                    <h1 className="font-bold text-2xl">Dashboard</h1>
                    <p className="mb-2">
                        Selamat Datang di Dashboard Transaksi
                    </p>
                    <form onSubmit={handleAddTransaction}>
                        <div className="mb-4">
                            <label
                                htmlFor="pembeli"
                                className="block font-semibold mb-2"
                            >
                                Nama Pembeli
                            </label>
                            <Input
                                type="text"
                                onChange={(e) => setBuyer(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label>Pilih Produk</label>
                            <select
                                value={selectedOption}
                                onChange={(e) => handleDropdownChange(e)}
                                className="w-full p-2 border rounded bg-white"
                            >
                                {product.map((option) => (
                                    <option key={option.id} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tanggal">Tanggal Transaksi</label>
                            <Input
                                id="tanggal"
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="jumlah">Jumlah</label>
                            <Input
                                type="number"
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="alamat">Alamat</label>
                            <Input
                                type="text"
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <span>Status</span>
                            <div className="flex gap-4">
                                <div className="flex flex-row gap-2">
                                    <Input
                                        id="lunas"
                                        type="radio"
                                        value="Lunas"
                                        checked={status === "Lunas"}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    />
                                    <label htmlFor="lunas">Lunas</label>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Input
                                        id="belum-lunas"
                                        type="radio"
                                        value="Belum Lunas"
                                        checked={status === "Belum Lunas"}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    />
                                    <label htmlFor="belum-lunas">
                                        Belum Lunas
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="catatan">Catatan</label>
                            <Input
                                type="text"
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="mr-4">
                                Bukti
                            </label>
                            <Input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div>
                            {image && (
                                <Image
                                    src={URL.createObjectURL(image)}
                                    width={100}
                                    height={100}
                                    alt="transaction-image"
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
    );
}
