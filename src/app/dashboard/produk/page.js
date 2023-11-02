"use client";

import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import Link from "next/link";
import axios from "axios";
import { GET_PRODUCT } from "@/apis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardProduk() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get(GET_PRODUCT);
        // console.log(res);
        setProducts(res.data.data);
    };

    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            const fetchData = await axios
                .delete(`${GET_PRODUCT}/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    toast.success("Hapus Produk Berhasil");
                    setTimeout(() => {
                        setProducts((prevProducts) => {
                            return prevProducts.filter(
                                (p) => p.id !== productId
                            );
                        });
                    }, 2000);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex w-full">
            <div className="lg:w-[20%]">
                <BottomNavbar />
            </div>
            <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                <h1 className="font-bold text-2xl">Produk</h1>
                <p className="mb-2">
                    Hi Admin! Selamat Datang di Dashboard Produk
                </p>
                <Link href="/dashboard/produk/add-product">
                    <Button className="bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-white">
                        + Tambah Produk
                    </Button>
                </Link>

                <div className="mt-2">
                    <div className="container mx-auto p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                        {products.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                onDelete={() => handleDelete(product.id)}
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
        </div>
    );
}
