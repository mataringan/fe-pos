"use client";

import { GET_PRODUCT, TRANSACTION } from "@/apis";
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
    const [product, setProduct] = useState([]);
    const [productId, setProductId] = useState();
    const [buyer, setBuyer] = useState("");
    const [date, setDate] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [address, setAddress] = useState("");
    const [selectedOption, setSelectedOption] = useState();
    const [note, setNote] = useState("");
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
    useEffect(() => {
        if (id) {
            fetchDataId();
            fetchDataAll();
        }
    }, [id]);

    const fetchDataId = async () => {
        const response = await axios.get(`${TRANSACTION}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response);
        const data = response.data.data;
        setProductId(data.productId);
        setBuyer(data.buyer);
        setDate(data.date);
        setQuantity(data.quantity);
        setImage(data.image);
        setAddress(data.address);
        setNote(data.note);
    };

    const fetchDataAll = async () => {
        const response = await axios.get(GET_PRODUCT);
        // console.log(response);
        const data = response.data.data;
        setProduct(data);
    };

    const handleUpdate = async (e) => {
        setIsLoading(true);
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
    // console.log(productId);
    return (
        <div className="flex w-full">
            <div className="lg:w-[20%]">
                <BottomNavbar />
            </div>
            <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                <h1 className="font-bold text-2xl">Dashboard</h1>
                <p className="mb-2">Edit Transaksi</p>
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label htmlFor="pembeli">Pembeli</label>
                        <Input
                            value={buyer}
                            type="text"
                            className="w-full p-2 border rounded"
                            onChange={(e) => setBuyer(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="">Pilih Produk</label>
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
                        <label htmlFor="date">Tanggal</label>
                        <Input
                            type="date"
                            value={date}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="jumlah">Jumlah</label>
                        <Input
                            type="number"
                            value={quantity}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="alamat">Alamat</label>
                        <Input
                            type="text"
                            value={address}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="catatan">Catatan</label>
                        <Input
                            type="text"
                            value={note}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="mr-4">
                            Bukti
                        </label>
                        <Input
                            type="file"
                            onChange={(e) => setNewImage(e.target.files[0])}
                        />
                    </div>
                    <div className="mb-4">
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
                    <Button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${
                            isLoading ? "opacity-70 pointer-events-none" : ""
                        }`}
                    >
                        {isLoading ? "Loading..." : "Kirim"}
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
