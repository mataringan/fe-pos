"use client";

import { TRANSACTION, TRANSACTION_ADMIN, TRANSACTION_EMAIL } from "@/apis";
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
import { useDebounce } from "use-debounce";

export default function Transaction() {
    const role = useSelector((state) => state.userData.role);
    const [transaction, setTransaction] = useState([]);
    const [searchName, setSearchName] = useState();
    const [searchAddress, setSearchAddress] = useState();
    const [searchStatus, setSearchStatus] = useState();
    const [searchDate, setSearchDate] = useState();

    // console.log(searchDate);

    const token = localStorage.getItem("token");
    const [debouncedSearchName] = useDebounce(searchName, 500);
    const [debouncedSearchAddress] = useDebounce(searchAddress, 500);
    const [debouncedSearchStatus] = useDebounce(searchStatus, 500);
    const [debouncedSearchDate] = useDebounce(searchDate, 500);

    useEffect(() => {
        if (role === "admin" || role === "super admin") {
            // fethDataAdmin();
            getAllTransaction(
                debouncedSearchName,
                debouncedSearchAddress,
                debouncedSearchStatus,
                debouncedSearchDate
            );
        } else {
            // fetchDataKaryawan();
            getAllTransaction(
                debouncedSearchName,
                debouncedSearchAddress,
                debouncedSearchStatus,
                debouncedSearchDate
            );
        }
    }, [
        debouncedSearchName,
        debouncedSearchAddress,
        debouncedSearchStatus,
        debouncedSearchDate,
    ]);

    // const fetchDataKaryawan = async () => {
    //     await axios
    //         .get(TRANSACTION, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             setTransaction(res.data.data);
    //         });
    // };

    // const fethDataAdmin = async () => {
    //     await axios
    //         .get(TRANSACTION_ADMIN, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             // console.log(res);
    //             setTransaction(res.data.data);
    //         });
    // };

    const getAllTransaction = async (
        searchName,
        searchAddress,
        searchStatus,
        searchDate
    ) => {
        let apiURL =
            role === "admin" || role === "super admin"
                ? `${TRANSACTION_ADMIN}?`
                : `${TRANSACTION}?`;

        if (searchName) {
            apiURL += `name=${searchName}`;
        }

        if (searchName && searchAddress && searchStatus && searchDate) {
            apiURL += "&";
        }

        if (searchAddress) {
            apiURL += `address=${searchAddress}`;
        }

        if (searchStatus) {
            apiURL += `status=${searchStatus}`;
        }

        if (searchDate) {
            apiURL += `date=${searchDate}`;
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

    // const handleSearch = async () => {
    //     let apiURL =
    //         role === "admin" || role === "super admin"
    //             ? `${TRANSACTION_ADMIN}?`
    //             : `${TRANSACTION}?`;

    //     if (searchName) {
    //         apiURL += `name=${searchName}`;
    //     }

    //     if (searchName && searchAddress && searchStatus) {
    //         apiURL += "&";
    //     }

    //     if (searchAddress) {
    //         apiURL += `address=${searchAddress}`;
    //     }

    //     if (searchStatus) {
    //         apiURL += `status=${searchStatus}`;
    //     }

    //     await axios
    //         .get(apiURL, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             // console.log(res);
    //             setTransaction(res.data.data);
    //         });
    //     // }
    // };

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

    const handleEmail = async (transactionId) => {
        try {
            await axios
                .post(
                    TRANSACTION_EMAIL,
                    {
                        transactionId,
                    },
                    {
                        headers: {
                            accept: "*/*",
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    // console.log(res);
                    toast.success("Cetak Invoice Berhasil, Silahkan cek Email");
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
                    <h1 className="font-bold text-2xl">Transaksi</h1>
                    {role === "super admin" ? (
                        <p>Hi Super Admin! Selamat Datang di Dashboard</p>
                    ) : role === "admin" ? (
                        <p>Hi Admin! Selamat Datang di Dashboard</p>
                    ) : (
                        <p>Hi Karyawan! Selamat Datang di Dashboard</p>
                    )}
                    <div className="lg:flex lg:justify-between lg:items-center my-4">
                        <Button>
                            <Link
                                href="transaksi/add-transaction"
                                className="bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-white"
                            >
                                Tambah Data
                            </Link>
                        </Button>
                        <div className="flex justify-between lg:justify-normal flex-wrap mt-4 text-center lg:gap-2">
                            <div>
                                <label htmlFor="">Name: </label>
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-24 h-10 p-2 rounded-md mt-1"
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
                                    className="w-24  h-10 p-2 rounded-md mt-1"
                                    onChange={(e) =>
                                        setSearchAddress(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="">Tanggal: </label>
                                <input
                                    type="date"
                                    className="w-24 h-10 p-2 rounded-md mt-1"
                                    onChange={(e) =>
                                        setSearchDate(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="status">Status: </label>
                                <select
                                    className="w-24 h-10 p-2 rounded-md mt-1 bg-white"
                                    id="status"
                                    onChange={(e) =>
                                        setSearchStatus(e.target.value)
                                    }
                                >
                                    <option value="">Pilih Status</option>
                                    <option value="lunas">Lunas</option>
                                    <option value="belum lunas">
                                        Belum Lunas
                                    </option>
                                </select>
                            </div>
                            {/* <Button
                                className="flex items-center ml-2   "
                                onClick={() => {
                                    handleSearch();
                                }}
                            >
                                <HiSearch className="w-7 h-7 mt-4 lg:mt-0 md:mt-0" />
                            </Button> */}
                        </div>
                    </div>
                    <div className="lg:flex lg:gap-5">
                        {transaction.map((transaction) => (
                            <TransactionCard
                                key={transaction.id}
                                transaction={transaction}
                                onDelete={() => handleDelete(transaction.id)}
                                onEmail={() => handleEmail(transaction.id)}
                            />
                        ))}
                    </div>
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
