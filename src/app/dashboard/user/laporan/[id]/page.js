"use client";

import { TRANSACTION_BY_USER, WHOAMI } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExcelJS from "exceljs";
import { useDebounce } from "use-debounce";

export default function LaporanUser() {
    const role = useSelector((state) => state.userData.role);
    const token = localStorage.getItem("token");
    const { id } = useParams();

    const [laporan, setLaporan] = useState([]);
    const [name, setName] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchAddress, setSearchAddress] = useState("");
    const [searchDate, setSearchDate] = useState();
    const [searchStatus, setSearchStatus] = useState("");

    const [debouncedSearchName] = useDebounce(searchName, 500);
    const [debouncedSearchAddress] = useDebounce(searchAddress, 500);
    const [debouncedSearchDate] = useDebounce(searchDate, 500);
    const [debouncedSearchStatus] = useDebounce(searchStatus, 500);

    useEffect(() => {
        getTransactionUser(
            debouncedSearchName,
            debouncedSearchAddress,
            debouncedSearchDate,
            debouncedSearchStatus
        );
        axios
            .get(WHOAMI, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setName(res.data.data.name);
            });
    }, [
        debouncedSearchName,
        debouncedSearchAddress,
        debouncedSearchDate,
        debouncedSearchStatus,
    ]);

    const getTransactionUser = async (
        searchName,
        searchAddress,
        searchDate,
        searchStatus
    ) => {
        let apiURL = `${TRANSACTION_BY_USER}/${id}?`;

        if (searchName) {
            apiURL += `name=${searchName}`;
        }

        if (searchName && searchAddress && searchDate && searchStatus) {
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

        axios
            .get(apiURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setLaporan(res.data.data);
            });
    };
    const getExcellLaporanUser = async () => {
        try {
            if (laporan) {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet("Data");
                worksheet.columns = [
                    {
                        header: "id_transaksi",
                        key: "id_transaksi",
                        width: 25,
                    },
                    {
                        header: "product",
                        key: "product",
                        width: 25,
                    },
                    {
                        header: "pembeli",
                        key: "pembeli",
                        width: 25,
                    },
                    {
                        header: "tanggal",
                        key: "tanggal",
                        width: 25,
                    },
                    {
                        header: "jumlah",
                        key: "jumlah",
                        width: 25,
                    },
                    {
                        header: "alamat",
                        key: "alamat",
                        width: 25,
                    },
                    {
                        header: "status",
                        key: "status",
                        width: 25,
                    },
                    {
                        header: "catatan",
                        key: "catatan",
                        width: 25,
                    },
                    {
                        header: "total",
                        key: "total",
                        width: 25,
                    },
                ];

                laporan.forEach((item) => {
                    worksheet.addRow({
                        id_transaksi: item.id,
                        product: item.Product.name,
                        pembeli: item.buyer,
                        tanggal: item.date,
                        jumlah: item.quantity,
                        alamat: item.address,
                        status: item.status,
                        catatan: item.note,
                        total: item.amount,
                    });
                });

                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ",
                });
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = `Laporan Transaksi ${name} - ${role}.xlsx`;
                a.click();
            }
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
                    <div className="mb-6">
                        <h1 className="font-bold text-2xl">Dashboard</h1>
                        {role === "super admin" ? (
                            <p>
                                Hi Super Admin! Selamat Datang di Dashboard
                                Laporan Transaksi User
                            </p>
                        ) : role === "admin" ? (
                            <p>
                                Hi Admin! Selamat Datang di Dashboard Laporan
                                Transaksi User
                            </p>
                        ) : (
                            <p>
                                Hi Karyawan! Selamat Datang di Dashboard Laporan
                                Transaksi User
                            </p>
                        )}
                    </div>
                    <div className="flex justify-between lg:justify-normal flex-wrap mt-4 text-center lg:gap-2">
                        <div>
                            <label htmlFor="">Name: </label>
                            <input
                                type="search"
                                placeholder="Search..."
                                className="w-24 h-10 p-2 rounded-md mt-1"
                                onChange={(e) => setSearchName(e.target.value)}
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
                                onChange={(e) => setSearchDate(e.target.value)}
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
                                <option value="belum lunas">Belum Lunas</option>
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
                    <div className="mt-4">
                        <button
                            className=" text-black font-bold py-1 px-2 mb-2"
                            onClick={() => {
                                getExcellLaporanUser();
                            }}
                        >
                            Cetak Data Laporan {name} - {role}
                        </button>
                    </div>
                    <div className="overflow-x-auto rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-yellow-300">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-2 py-4 text-center text-xs  text-gray-500 uppercase tracking-wider font-bold"
                                    >
                                        No
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4 text-center text-xs  text-gray-500 uppercase tracking-wider font-bold"
                                    >
                                        ID Transaksi
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4 text-center text-xs  text-gray-500 uppercase tracking-wider font-bold"
                                    >
                                        Nama Produk
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4  text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                                    >
                                        Nama Pembeli
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4  text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                                    >
                                        Tanggal
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4  text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                                    >
                                        Jumlah
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4  text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                                    >
                                        Alamat
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4  text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4  text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                                    >
                                        Catatan
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-4  text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                                    >
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {laporan.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {item.id}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {item.Product.name}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {item.buyer}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {item.date}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {item.quantity}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {item.address}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {item.status}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {item.note}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-center">
                                            {item.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
