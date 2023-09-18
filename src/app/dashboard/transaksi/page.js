"use client";

import { TRANSACTION, TRANSACTION_ADMIN } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "./transactionCard";
import Button from "@/components/Button";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "@/components/Input";
import { HiSearch } from "react-icons/hi";

export default function Transaction() {
    const role = useSelector((state) => state.userData.role);
    const [transaction, setTransaction] = useState([]);
    const [searchName, setSearchName] = useState();
    const [searchAddress, setSearchAddress] = useState();

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (role === "admin") {
            fethDataAdmin();
        } else {
            fetchDataKaryawan();
        }
    }, []);

    const fetchDataKaryawan = async () => {
        await axios
            .get(TRANSACTION, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setTransaction(res.data.data);
            });
    };

    const fethDataAdmin = async () => {
        await axios
            .get(TRANSACTION_ADMIN, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setTransaction(res.data.data);
            });
    };

    const handleSearch = async () => {
        let apiURL =
            role === "admin" ? `${TRANSACTION_ADMIN}?` : `${TRANSACTION}?`;

        if (searchName) {
            apiURL += `name=${searchName}`;
        }

        if (searchName && searchAddress) {
            apiURL += "&";
        }

        if (searchAddress) {
            apiURL += `address=${searchAddress}`;
        }

        await axios
            .get(apiURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setTransaction(res.data.data);
            });
        // }
    };

    const handleDelete = async (transactionId) => {
        try {
            await axios
                .delete(`${TRANSACTION}/${transactionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    toast.success(res.data.message);
                    setTimeout(() => {
                        setTransaction((prevTransaction) => {
                            return prevTransaction.filter(
                                (t) => t.id !== transactionId
                            );
                        });
                    }, 2000);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex w-full">
                <div className="lg:w-[20%]">
                    <BottomNavbar />
                </div>
                <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                    <h1 className="font-bold text-2xl">Dashboard</h1>
                    {role === "karyawan" ? (
                        <p className="mb-2">
                            Hi karyawan! Selamat Datang di Dashboard Transaction
                        </p>
                    ) : (
                        <p className="mb-2">
                            Hi Admin! Selamat Datang di Dashboard Transaction
                        </p>
                    )}
                    <div className="lg:flex lg:justify-between lg:items-center mb-6">
                        <Button>
                            <Link
                                href="transaksi/add-transaction"
                                className="bg-green-500 p-2 rounded-lg text-white"
                            >
                                Tambah Data
                            </Link>
                        </Button>
                        <div className="flex gap-2 mt-4 text-center">
                            <div>
                                <label htmlFor="">Name: </label>
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-32 h-10 p-2 rounded-md mt-1"
                                    onChange={(e) =>
                                        setSearchName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="">Alamat: </label>
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-32 h-10 p-2 rounded-md mt-1"
                                    onChange={(e) =>
                                        setSearchAddress(e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                className="flex items-center"
                                onClick={() => {
                                    handleSearch();
                                }}
                            >
                                <HiSearch />
                            </Button>
                        </div>
                    </div>
                    {transaction.map((transaction) => (
                        <TransactionCard
                            key={transaction.id}
                            transaction={transaction}
                            onDelete={() => handleDelete(transaction.id)}
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
