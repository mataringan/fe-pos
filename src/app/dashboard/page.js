"use client";

import BottomNavbar from "@/components/BottomNavbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcConferenceCall } from "react-icons/fc";
import { FcPaid } from "react-icons/fc";
import { FcDatabase } from "react-icons/fc";
import { FcInTransit } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";
import NewTransactionTable from "./newTransaction";
import AccordionItem from "./accordion";
import Image from "next/image";
import axios from "axios";
import {
    GET_ALL_USER,
    GET_PRODUCT,
    INFORMATION,
    NEW_TRANSACTION,
    TRANSACTION_ADDRESS,
} from "@/apis";
import { formatRupiah } from "@/utils/formatRupiah";
import Link from "next/link";

export default function Dashboard() {
    const router = useRouter();
    const [showDisplay, setShowDisplay] = useState(true);
    const token = localStorage.getItem("token");
    const role = useSelector((state) => state.userData.role);
    const [user, setUser] = useState([]);
    const [product, setProduct] = useState([]);
    const [address, setAddress] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [information, setInformation] = useState([]);

    useEffect(() => {
        if (!token) {
            toast.error("Anda Belum Login");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
            setShowDisplay(false);
        } else {
            axios.get(GET_ALL_USER).then((res) => {
                // console.log(res);
                setUser(res.data.data);
            });

            axios.get(GET_PRODUCT).then((res) => {
                // console.log(res);
                setProduct(res.data.data);
            });

            axios
                .get(TRANSACTION_ADDRESS, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    setAddress(res.data.data);
                });

            axios
                .get(NEW_TRANSACTION, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    setTransaction(res.data.data);
                });

            axios.get(INFORMATION).then((res) => {
                // console.log(res);
                setInformation(res.data.data);
            });
        }
    }, []);

    const calculateTotalStock = () => {
        let totalAllStock = 0;

        for (const totalStock of product) {
            totalAllStock += totalStock.stok;
        }

        return totalAllStock;
    };

    const calculateIncome = () => {
        let totalIncome = 0;

        for (const income of transaction) {
            totalIncome += income.amount;
        }

        return totalIncome;
    };

    const handleDelete = async (idInformation) => {
        await axios
            .delete(`${INFORMATION}/${idInformation}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setTimeout(() => {
                    setInformation((prevInfo) => {
                        return prevInfo.filter((i) => i.id !== idInformation);
                    });
                }, 2000);
            });
    };

    return (
        <div>
            {showDisplay && (
                <div className="flex w-full">
                    <div className="lg:w-[20%]">
                        <BottomNavbar />
                    </div>
                    <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                        <div className="mb-6">
                            <h1 className="font-bold text-2xl">Dashboard</h1>
                            {role === "super admin" ? (
                                <p>
                                    Hi Super Admin! Selamat Datang di Dashboard
                                </p>
                            ) : role === "admin" ? (
                                <p>Hi Admin! Selamat Datang di Dashboard</p>
                            ) : (
                                <p>Hi Karyawan! Selamat Datang di Dashboard</p>
                            )}
                        </div>
                        <div className="flex lg:justify-around flex-col lg:flex-row items-center gap-4 lg:gap-0">
                            <div className="w-[260px] h-36 bg-blue-500 rounded-md flex items-center justify-center gap-4 flex-col p-12 text-white ">
                                {role === "admin" || role === "super admin" ? (
                                    <div>
                                        <div className="flex items-center justify-center gap-4">
                                            <Link
                                                href={"/dashboard/user"}
                                                className="flex items-center gap-4"
                                            >
                                                <p className="text-[30px]">
                                                    {user.length}
                                                </p>
                                                <FcConferenceCall className="text-[30px]" />
                                            </Link>
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                Cabang & Karyawan
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center justify-center gap-4">
                                            <p className="text-[30px]">
                                                {user.length}
                                            </p>
                                            <FcConferenceCall className="text-[30px]" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                Cabang & Karyawan
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="w-[260px] h-36 bg-green-500 rounded-md flex items-center justify-center gap-4 flex-col p-12 text-white ">
                                <div className="flex items-center justify-center gap-4">
                                    <p className="text-[30px]">
                                        {calculateTotalStock()}
                                    </p>
                                    <FcPaid className="text-[30px]" />
                                </div>
                                <div>
                                    <p className="font-semibold">Stok Barang</p>
                                </div>
                            </div>
                            {role === "super admin" ? (
                                <div className="w-[260px] h-36 bg-violet-500 rounded-md flex items-center justify-center gap-4 flex-col text-white ">
                                    <div className="flex items-center justify-center gap-4">
                                        <p className="text-[20px]">
                                            {formatRupiah(calculateIncome())}
                                        </p>
                                        <FcCurrencyExchange className="text-[30px]" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            Pendapatan
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="w-[260px] h-36 bg-yellow-500 rounded-md flex items-center justify-center gap-4 flex-col p-12 text-white ">
                                <div className="flex items-center justify-center gap-4">
                                    <p className="text-[30px]">
                                        {product.length}
                                    </p>
                                    <FcDatabase className="text-[30px]" />
                                </div>
                                <div>
                                    <p className="font-semibold">
                                        Total Produk
                                    </p>
                                </div>
                            </div>
                            <div className="w-[260px] h-36 bg-sky-500 rounded-md flex items-center justify-center gap-4 flex-col p-12 text-white ">
                                <div className="flex items-center justify-center gap-4">
                                    <p className="text-[30px]">
                                        {address.length}
                                    </p>
                                    <FcInTransit className="text-[30px]" />
                                </div>
                                <div>
                                    <p className="font-semibold">Jangkauan</p>
                                </div>
                            </div>
                        </div>
                        <div className="my-6">
                            <h1 className="text-2xl font-semibold mb-4">
                                Transaksi Terbaru
                            </h1>
                            <NewTransactionTable transactions={transaction} />
                        </div>
                        <div className="my-6">
                            <h1 className="text-2xl font-semibold mb-4">
                                Produk
                            </h1>

                            <div className="mt-2">
                                <div className="container mx-auto p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                                    {product.map((product, index) => (
                                        <div
                                            className="bg-white rounded-lg shadow-md max-w-xs aspect-[16/9]"
                                            key={index}
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="p-4">
                                                <h2 className="text-lg font-semibold mb-1">
                                                    {product.name}
                                                </h2>
                                                <p className="text-gray-600 mb-1">
                                                    {product.category}
                                                </p>
                                                <p className="text-gray-700 mb-2">
                                                    {formatRupiah(
                                                        product.price
                                                    )}
                                                </p>
                                                <p className="text-gray-500">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center mb-4 gap-2">
                                <h1 className="text-2xl font-semibold">
                                    Informasi
                                </h1>
                                {role === "admin" || role === "super admin" ? (
                                    <div>
                                        <Link href="/dashboard/information">
                                            <HiOutlineInformationCircle className="h-5 w-5 mb-2" />
                                        </Link>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            {information.map((item, index) => (
                                <AccordionItem
                                    id={item.id}
                                    key={index}
                                    title={item.title}
                                    content={item.content}
                                    date={item.date}
                                    onDelete={() => {
                                        handleDelete(item.id);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer
                position="top-center" // Posisi toast container
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
