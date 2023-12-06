"use client";

import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
    CLAIM_REWARD,
    REWARD,
    REWARD_AVAILABLE_EMPLOYEE,
    REWARD_BUYER,
    REWARD_EMPLOYEE,
} from "@/apis";
import RewardCard from "./rewardCard";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

export default function Reward() {
    const token = localStorage.getItem("token");
    const role = useSelector((state) => state.userData.role);

    const [rewardBuyer, setRewardBuyer] = useState([]);
    const [rewardEmployee, setRewardEmployee] = useState([]);
    const [rewardAvailableEmployee, setRewardAvailableEmployee] = useState([]);

    const [getClaim, setGetClaim] = useState(false);

    useEffect(() => {
        axios
            .get(REWARD_BUYER, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setRewardBuyer(res.data.data);
            });

        axios
            .get(REWARD_EMPLOYEE, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setRewardEmployee(res.data.data);
            });

        if (role === "karyawan") {
            axios
                .get(REWARD_AVAILABLE_EMPLOYEE, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setRewardAvailableEmployee(res.data.data);
                    setGetClaim(true);
                });
        }
    }, []);

    const handleClaimReward = async (id) => {
        try {
            await axios
                .put(
                    `${CLAIM_REWARD}`,
                    { idReward: id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    toast.success("Claim Reward Berhasil");
                    setRewardAvailableEmployee((prevRew) =>
                        prevRew.filter((p) => p.id !== id)
                    );
                });
        } catch (error) {
            // console.error(error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

    const handleDelete = async (id) => {
        await axios
            .delete(`${REWARD}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                toast.success("Hapus Data Reward Berhasil");
                setRewardBuyer((prevRew) => prevRew.filter((p) => p.id !== id));
                setRewardEmployee((prevRew) =>
                    prevRew.filter((p) => p.id !== id)
                );
            });
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
                <p className="mb-4">Hi! Selamat Datang di Dashboard Reward</p>
                {role === "super admin" || role === "admin" ? (
                    <Button>
                        <Link
                            href="reward/add-reward"
                            className="bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-white"
                        >
                            Tambah Data
                        </Link>
                    </Button>
                ) : (
                    ""
                )}
                <div className="mt-4">
                    <div>
                        <p className="font-semibold">Reward Karyawan</p>
                        <div className="lg:flex gap-2">
                            {rewardEmployee &&
                                rewardEmployee.map((item) => (
                                    <div key={item.id}>
                                        <RewardCard
                                            rewardData={item}
                                            onDelete={handleDelete}
                                            role={role}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">Reward Petani</p>
                        <div className="lg:flex gap-2">
                            {rewardBuyer &&
                                rewardBuyer.map((item) => (
                                    <RewardCard
                                        key={item.id}
                                        rewardData={item}
                                        role={role}
                                        onDelete={handleDelete}
                                    />
                                ))}
                        </div>
                    </div>
                    {role === "karyawan" ? (
                        <div>
                            <p className="font-semibold">Reward Anda</p>
                            <div className="lg:flex gap-2">
                                {rewardAvailableEmployee &&
                                    rewardAvailableEmployee.map((item) => (
                                        <div key={item.id}>
                                            <RewardCard
                                                rewardData={item}
                                                onDelete={handleDelete}
                                                onReward={handleClaimReward}
                                                claim={getClaim}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
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
