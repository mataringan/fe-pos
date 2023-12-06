"use client";

import {
    LEADERBOARD_BUYER,
    LEADERBOARD_USER,
    POINT_EMPLOYEE,
    POINT_USER,
} from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import LeaderboardLayout from "@/components/Leaderboard";
import LeaderboardEmployee from "@/components/LeaderboardKaryawan";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [leaderboardDataUser, setLeaderboardDataUser] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        getLeaderboardBuyer();
        getLeaderboardEmployee();
    }, []);

    const getLeaderboardBuyer = async () => {
        await axios
            .get(LEADERBOARD_BUYER, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                // console.log(res);
                setLeaderboardData(res.data.data);
            });
    };

    const getLeaderboardEmployee = async () => {
        await axios
            .get(POINT_EMPLOYEE, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                // console.log(res);
                setLeaderboardDataUser(res.data.data);
            });
    };

    return (
        <div className="flex flex-col lg:flex-row w-full h-screen">
            <div className="lg:w-[20%]">
                <BottomNavbar />
            </div>
            <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                <h1 className="font-bold text-2xl mb-2">Leaderboard</h1>
                <p className="mb-4">Selamat datang di Leaderboard</p>
                <div>
                    <h1 className="font-semibold text-1xl mb-2">
                        Leaderboard Pembeli
                    </h1>
                    <LeaderboardLayout data={leaderboardData} />
                </div>
                <div>
                    <h1 className="font-semibold text-1xl mb-2">
                        Leaderboard Karyawan
                    </h1>
                    <LeaderboardEmployee data={leaderboardDataUser} />
                </div>
            </div>
        </div>
    );
}
