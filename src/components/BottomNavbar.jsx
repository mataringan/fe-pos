"use client";

//components
import { MdOutlineAccountCircle, MdAddCircle } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { SlNotebook } from "react-icons/sl";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function BottomNavbar() {
    const role = useSelector((state) => state.userData.role);
    // console.log(role);
    return (
        <div className="fixed inset-x-0 bottom-0 flex h-[80px] justify-around bg-white p-2 text-[18px] shadow-low lg:fixed lg:order-1 lg:flex-col lg:h-screen lg:w-[15%]  items-center">
            <div>
                <Link
                    href="/dashboard"
                    className="flex gap-x-2 items-center lg:flex-row flex-col"
                >
                    <BiHomeAlt />
                    <h1 className="font-bold">Home</h1>
                </Link>
            </div>
            <div>
                <Link
                    href="/dashboard/transaksi"
                    className="flex gap-x-2 items-center lg:flex-row flex-col"
                >
                    <BsCart2 />
                    <h1 className="font-bold">Transaksi</h1>
                </Link>
            </div>
            {role === "admin" && (
                <div>
                    <Link
                        href="/dashboard/produk"
                        className="flex gap-x-2 items-center lg:flex-row flex-col"
                    >
                        <MdAddCircle />
                        <h1 className="font-bold text-body-1">Produk</h1>
                    </Link>
                </div>
            )}
            <div>
                <Link
                    href="/dashboard/laporan"
                    className="flex gap-x-2 items-center lg:flex-row flex-col"
                >
                    <SlNotebook />
                    <h1 className="font-bold">Laporan</h1>
                </Link>
            </div>
            <div>
                <Link
                    href="/dashboard/akun"
                    className="flex gap-x-2 items-center lg:flex-row flex-col"
                >
                    <MdOutlineAccountCircle />
                    <h1 className="font-bold">Akun</h1>
                </Link>
            </div>
        </div>
    );
}
