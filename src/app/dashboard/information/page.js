"use client";

import { INFORMATION } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AccordionItem from "../accordion";
import { useSelector } from "react-redux";

export default function Information() {
    const [information, setInformation] = useState([]);
    const token = localStorage.getItem("token");
    const role = useSelector((state) => state.userData.role);
    // console.log(role);

    useEffect(() => {
        axios.get(INFORMATION).then((res) => {
            // console.log(res);
            setInformation(res.data.data);
        });
    }, []);

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
            <div className="flex w-full">
                <div className="lg:w-[20%]">
                    <BottomNavbar />
                </div>
                <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                    <h1 className="font-bold text-2xl">Dashboard</h1>
                    {role === "super admin" ? (
                        <p>
                            Hi Super Admin! Selamat Datang di Dashboard
                            Informasi
                        </p>
                    ) : role === "admin" ? (
                        <p>Hi Admin! Selamat Datang di Dashboard Informasi</p>
                    ) : (
                        <p>
                            Hi Karyawan! Selamat Datang di Dashboard Informasi
                        </p>
                    )}
                    <Button className="my-6">
                        <Link
                            href="/dashboard/information/add-information"
                            className="bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-white"
                        >
                            Tambah Informasi
                        </Link>
                    </Button>
                    <div>
                        {information.map((item, index) => (
                            <AccordionItem
                                key={index}
                                id={item.id}
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
        </div>
    );
}
