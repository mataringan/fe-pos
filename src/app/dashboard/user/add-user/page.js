"use client";

import { ADD_USER } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddUser() {
    const roleUser = useSelector((state) => state.userData.role);
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const hanldeAddUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await axios
            .post(
                ADD_USER,
                {
                    name,
                    email,
                    phone,
                    password,
                    role,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setIsLoading(false);
                // console.log(res);
                toast.success("Tambah User Berhasil");
                setTimeout(() => {
                    router.push("/dashboard/user");
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
                    <div className="mb-6">
                        <h1 className="font-bold text-2xl">Dashboard</h1>
                        {roleUser === "super admin" ? (
                            <p>
                                Hi Super Admin! Selamat Datang di Dashboard
                                Tambah User
                            </p>
                        ) : roleUser === "admin" ? (
                            <p>
                                Hi Admin! Selamat Datang di Dashboard Tambah
                                User
                            </p>
                        ) : (
                            <p>
                                Hi Karyawan! Selamat Datang di Dashboard Tambah
                                User
                            </p>
                        )}
                    </div>
                    <div>
                        <form onSubmit={hanldeAddUser}>
                            <div className="flex flex-col my-4">
                                <label htmlFor="name" className="mb-2">
                                    Name
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    placeholder="Masukkan Nama"
                                    className="p-2 border rounded-lg bg-[#F7FBFF]"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="phone" className="mb-2">
                                    Phone
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    id="phone"
                                    type="text"
                                    placeholder="085"
                                    className="p-2 border rounded-lg bg-[#F7FBFF]"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="email" className="mb-2">
                                    Email
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Masukkan Email"
                                    className="p-2 border rounded-lg bg-[#F7FBFF]"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <span>Role</span>
                                <span className="text-red-600">*</span>
                                <div className="flex gap-4 mt-2">
                                    {roleUser === "super admin" ? (
                                        <div className="flex flex-row gap-2">
                                            <Input
                                                id="admin"
                                                type="radio"
                                                value="admin"
                                                checked={role === "admin"}
                                                onChange={(e) =>
                                                    setRole(e.target.value)
                                                }
                                            />
                                            <label htmlFor="admin">Admin</label>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <div className="flex flex-row gap-2">
                                        <Input
                                            id="cabang"
                                            type="radio"
                                            value="cabang"
                                            checked={role === "cabang"}
                                            onChange={(e) =>
                                                setRole(e.target.value)
                                            }
                                        />
                                        <label htmlFor="cabang">Cabang</label>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <Input
                                            id="karyawan"
                                            type="radio"
                                            value="karyawan"
                                            checked={role === "karyawan"}
                                            onChange={(e) =>
                                                setRole(e.target.value)
                                            }
                                        />
                                        <label htmlFor="karyawan">
                                            Karyawan
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="mb-2">
                                    Password
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Masukkan Password"
                                    className="p-2 border rounded-lg bg-[#F7FBFF]"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                type="submit"
                                className={`bg-[#162D3A] text-white w-full p-3 border rounded-xl lg:mt-5 mt-3 ${
                                    isLoading
                                        ? "opacity-70 pointer-events-none"
                                        : ""
                                }`}
                            >
                                {isLoading ? "Loading..." : "Kirim"}
                            </Button>
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
