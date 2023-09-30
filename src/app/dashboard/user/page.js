"use client";

import { GET_ALL_USER, GET_USER } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserTable from "./userTable";
import Link from "next/link";
import Button from "@/components/Button";
import ExcelJS from "exceljs";
import Input from "@/components/Input";
import { useDebounce } from "use-debounce";

export default function User() {
    const role = useSelector((state) => state.userData.role);
    const [user, setUser] = useState([]);
    const token = localStorage.getItem("token");
    const [searchName, setSearchName] = useState("");
    const [searchRole, setSearchRole] = useState("");

    const [debouncedSearchName] = useDebounce(searchName, 500);
    const [debouncedSearchRole] = useDebounce(searchRole, 500);

    const getAllUser = async (searchName, searchRole) => {
        // await axios.get(GET_ALL_USER).then((res) => {
        //     setUser(res.data.data);
        //     // console.log(res.data.data);
        // });
        let apiURL = `${GET_ALL_USER}?`;
        if (searchName) {
            apiURL += `name=${searchName}`;
        }
        if (searchName && searchRole) {
            apiURL += "&";
        }
        if (searchRole) {
            apiURL += `role=${searchRole}`;
        }

        await axios.get(apiURL).then((res) => {
            // console.log(res);
            setUser(res.data.data);
        });
    };

    useEffect(() => {
        getAllUser(debouncedSearchName, debouncedSearchRole);
    }, [debouncedSearchName, debouncedSearchRole]);

    const getExcellUser = async () => {
        try {
            if (user) {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet("Data");
                worksheet.columns = [
                    {
                        header: "Nama",
                        key: "nama",
                        width: 25,
                    },
                    {
                        header: "Email",
                        key: "email",
                        width: 25,
                    },
                    {
                        header: "Phone",
                        key: "phone",
                        width: 25,
                    },
                    {
                        header: "Role",
                        key: "role",
                        width: 25,
                    },
                ];

                user.forEach((item) => {
                    worksheet.addRow({
                        nama: item.name,
                        email: item.email,
                        phone: item.phone,
                        role: item.role,
                    });
                });

                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ",
                });
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = `Laporan user.xlsx`;
                a.click();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (idUser) => {
        await axios
            .delete(`${GET_USER}/${idUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                // console.log(res);
                setTimeout(() => {
                    setUser((prev) => {
                        return prev.filter((u) => u.id !== idUser);
                    });
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
                        {role === "super admin" ? (
                            <p>
                                Hi Super Admin! Selamat Datang di Dashboard User
                            </p>
                        ) : role === "admin" ? (
                            <p>Hi Admin! Selamat Datang di Dashboard User</p>
                        ) : (
                            <p>Hi Karyawan! Selamat Datang di Dashboard User</p>
                        )}
                    </div>
                    <div className="flex justify-between ">
                        <Link href="/dashboard/user/add-user">
                            <Button className="bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-white">
                                + Tambah Karyawan / Cabang
                            </Button>
                        </Link>
                        <div className="flex gap-3">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="p-2 rounded-md"
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <select
                                className="p-2 rounded-md bg-white"
                                onChange={(e) => setSearchRole(e.target.value)}
                            >
                                <option value="">Role</option>
                                <option value="karyawan">Karyawan</option>
                                <option value="cabang">Cabang</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            className=" text-black font-bold py-1 px-2 mb-2"
                            onClick={() => {
                                getExcellUser();
                            }}
                        >
                            Cetak Data User
                        </button>
                        <UserTable user={user} onDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
}
