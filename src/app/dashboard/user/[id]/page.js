"use client";

import { GET_USER } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditUser() {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const roleUser = useSelector((state) => state.userData.role);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        await axios
            .get(`${GET_USER}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                const data = res.data.data;
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setRole(data.role);
            });
    };

    const hanldeUpdateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await axios
            .put(
                `${GET_USER}/${id}`,
                {
                    name,
                    email,
                    phone,
                    role,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                // console.log(res);
                setIsLoading(false);
                toast.success("Update Data User Berhasil");
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
                        <form onSubmit={hanldeUpdateUser}>
                            <div className="flex flex-col my-4">
                                <label htmlFor="name" className="mb-2">
                                    Name
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    defaultValue={name}
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
                                    defaultValue={phone}
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
                                    defaultValue={email}
                                    placeholder="Masukkan Email"
                                    className="p-2 border rounded-lg bg-[#F7FBFF]"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <span>Role</span>
                                <span className="text-red-600">*</span>
                                <div className="flex gap-4 mt-2">
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
