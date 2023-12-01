"use client";

import BottomNavbar from "@/components/BottomNavbar";
import Link from "next/link";
import { SlNotebook } from "react-icons/sl";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GrCircleInformation } from "react-icons/gr";
import { FaCoins } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function Menu() {
    const role = useSelector((state) => state.userData.role);
    // console.log(role);
    return (
        <div>
            <div className="flex w-full">
                <div className="lg:w-[20%]">
                    {/* Sidebar */}
                    <BottomNavbar />
                </div>
                <div className="order-2 lg:w-[100%] w-[100%] p-4 mb-32 lg:mb-16 overflow-y-auto">
                    {/* Main Content */}
                    <h1 className="font-bold text-2xl">Menu</h1>
                    <p className="mb-2">Hi! Selamat Datang di Dashboard Menu</p>

                    <div className="mt-[24px] flex items-center gap-5 flex-row justify-center lg:justify-normal flex-wrap">
                        <div className="flex w-max flex-col items-center gap-3 rounded-[20px] bg-white px-[16px] pb-[20px] pt-[14px]">
                            <SlNotebook className="h-16 w-16 py-[10px]" />
                            <p className="font-bold">Laporan</p>
                            <Link
                                href={"/dashboard/laporan"}
                                className="w-max rounded-[10px] px-[40px] py-[8px] bg-blue-500 hover:bg-blue-800 text-white"
                            >
                                Pilih
                            </Link>
                        </div>
                        <div className="flex w-max flex-col items-center gap-3 rounded-[20px] bg-white px-[16px] pb-[20px] pt-[14px]">
                            <MdOutlineLeaderboard className="h-16 w-16 py-[10px]" />
                            <p className="font-bold">Leaderboard</p>
                            <Link
                                href={"/dashboard/leaderboard"}
                                className="w-max rounded-[10px] px-[40px] py-[8px] bg-blue-500 hover:bg-blue-800 text-white"
                            >
                                Pilih
                            </Link>
                        </div>
                        {role === "admin" || role === "super admin" ? (
                            <div className="flex w-max flex-col items-center gap-3 rounded-[20px] bg-white px-[16px] pb-[20px] pt-[14px]">
                                <FiUsers className="h-16 w-16 py-[10px]" />
                                <p className="font-bold">User</p>
                                <Link
                                    href={"/dashboard/user"}
                                    className="w-max rounded-[10px] px-[40px] py-[8px] bg-blue-500 hover:bg-blue-800 text-white"
                                >
                                    Pilih
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="flex w-max flex-col items-center gap-3 rounded-[20px] bg-white px-[16px] pb-[20px] pt-[14px]">
                            <GrCircleInformation className="h-16 w-16 py-[10px]" />
                            <p className="font-bold">Informasi</p>
                            <Link
                                href={"/dashboard/information"}
                                className="w-max rounded-[10px] px-[40px] py-[8px] bg-blue-500 hover:bg-blue-800 text-white"
                            >
                                Pilih
                            </Link>
                        </div>
                        {role === "admin" || role === "super admin" ? (
                            <div className="flex w-max flex-col items-center gap-3 rounded-[20px] bg-white px-[16px] pb-[20px] pt-[14px]">
                                <FaCoins className="h-16 w-16 py-[10px]" />
                                <p className="font-bold">Reward</p>
                                <Link
                                    href={"/dashboard/reward"}
                                    className="w-max rounded-[10px] px-[40px] py-[8px] bg-blue-500 hover:bg-blue-800 text-white"
                                >
                                    Pilih
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
