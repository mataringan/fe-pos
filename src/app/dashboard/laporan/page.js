"use client";

import { TRANSACTION, TRANSACTION_ADMIN, WHOAMI } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LaporanChart from "./laporanChart";
import { getExcel } from "@/utils/generateExcel";
import Button from "@/components/Button";
import Link from "next/link";

export default function Laporan() {
    const role = useSelector((state) => state.userData.role);
    const token = localStorage.getItem("token");
    const [user, setUser] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const name = user.name;

    useEffect(() => {
        if (role === "admin" || role === "super admin") {
            fetchDataAdmin();
            fetchDataUser();
        } else {
            fetchDataKaryawan();
            fetchDataUser();
        }
    }, []);

    const fetchDataUser = async () => {
        await axios
            .get(WHOAMI, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setUser(res.data.data);
            });
    };

    // console.log(user);

    const fetchDataAdmin = async () => {
        await axios
            .get(TRANSACTION_ADMIN, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setLaporan(res.data.data);
            });
    };

    const fetchDataKaryawan = async () => {
        await axios
            .get(TRANSACTION, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setLaporan(res.data.data);
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
                                Hi Super Admin! Selamat Datang di Dashboard
                                Laporan
                            </p>
                        ) : role === "admin" ? (
                            <p>Hi Admin! Selamat Datang di Dashboard Laporan</p>
                        ) : (
                            <p>
                                Hi Karyawan! Selamat Datang di Dashboard Laporan
                            </p>
                        )}
                    </div>
                    <div>
                        <LaporanChart laporan={laporan} name={name} />
                    </div>
                </div>
            </div>
        </div>
    );
}
