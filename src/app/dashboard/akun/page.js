"use client";

import { GET_USER, WHOAMI } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { userAction } from "@/store/user-slice";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AiFillCamera } from "react-icons/ai";

export default function Account() {
    const token = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        Whoami();
    }, []);

    const handleLogout = () => {
        dispatch(userAction.logout());
        toast.success("Berhasil Keluar");
        setTimeout(() => {
            localStorage.removeItem("token");
            router.push("/login");
        }, 2000);
    };

    const Whoami = async () => {
        axios
            .get(WHOAMI, {
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
                setImage(data.image);
            });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios
                .put(
                    GET_USER,
                    {
                        name,
                        phone,
                        email,
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
                    setIsEditMode(false);
                    setIsLoading(false);
                    toast.success("update user berhasil");
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
            <div className="order-2 lg:w-[100%] w-[100%] p-4 mb-16 overflow-y-auto mx-auto">
                <div className="text-right">
                    <button
                        onClick={handleLogout}
                        className="text-right lg:p-3 p-2 rounded-md font-semibold bg-blue-600 text-white"
                    >
                        Logout
                    </button>
                </div>
                <div className="flex lg:p-44 lg:gap-24 flex-col lg:flex-row mt-7">
                    <div className="flex flex-col ">
                        <div className="flex flex-col">
                            <div className="relative w-32 h-32 mx-auto">
                                {newImage ? (
                                    <Image
                                        src={URL.createObjectURL(newImage)}
                                        alt="image user"
                                        className="w-32 h-32 rounded-full object-cover"
                                        width={128}
                                        height={128}
                                    />
                                ) : image ? (
                                    <Image
                                        src={image}
                                        alt="image user"
                                        className="w-32 h-32 rounded-full object-cover"
                                        width={128}
                                        height={128}
                                    />
                                ) : null}
                                <label
                                    htmlFor="imageInput"
                                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
                                >
                                    <AiFillCamera />
                                </label>
                                {isEditMode && (
                                    <input
                                        type="file"
                                        id="imageInput"
                                        className="hidden"
                                        onChange={(e) =>
                                            setNewImage(e.target.files[0])
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        {isEditMode ? (
                            <div>
                                <button onClick={() => setIsEditMode(false)}>
                                    <IoIosArrowRoundBack className="w-7 h-7" />
                                </button>
                                <form
                                    className="max-w-md mx-auto space-y-4"
                                    onSubmit={handleUpdate}
                                >
                                    <div className="flex flex-row items-center gap-3">
                                        <label
                                            htmlFor="name"
                                            className=" flex-shrink-0 w-[48px] lg:w-20"
                                        >
                                            Nama:
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            defaultValue={name}
                                            className="border rounded-md py-2 px-3 flex-grow focus:outline-none focus:border-blue-500"
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <label
                                            htmlFor="email"
                                            className=" flex-shrink-0 w-[48px] lg:w-20"
                                        >
                                            Email:
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            defaultValue={email}
                                            className="border rounded-md py-2 px-3 flex-grow focus:outline-none focus:border-blue-500"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <label
                                            htmlFor="phone"
                                            className=" flex-shrink-0 w-[48px] lg:w-20"
                                        >
                                            Phone:
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            defaultValue={phone}
                                            className="border rounded-md py-2 px-3 flex-grow focus:outline-none focus:border-blue-500"
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <label
                                            htmlFor="role"
                                            className=" flex-shrink-0 w-[48px] lg:w-20"
                                        >
                                            Role:
                                        </label>
                                        <input
                                            type="text"
                                            id="role"
                                            defaultValue={role}
                                            className="border rounded-md py-2 px-3 flex-grow focus:outline-none focus:border-blue-500"
                                            readOnly
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className={`bg-blue-500 text-white px-4 py-2 rounded ${
                                            isLoading
                                                ? "opacity-70 pointer-events-none"
                                                : ""
                                        }`}
                                    >
                                        {isLoading ? "Loading..." : "Simpan"}
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <div className="">
                                <p className="mt-4">Nama:</p>
                                <p className="text-gray-600"> {name}</p>
                                <p className="mt-4">Email:</p>
                                <p className="text-gray-600">{email}</p>
                                <p className="mt-4">Phone:</p>
                                <p className="text-gray-600">{phone}</p>
                                <p className="mt-4">Role:</p>
                                <p className="text-gray-600">{role}</p>
                                <Button
                                    onClick={() => setIsEditMode(true)}
                                    className="mt-4 p-3 rounded-md font-semibold bg-yellow-400 text-black"
                                >
                                    Update
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
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
