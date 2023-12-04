"use client";

import axios from "axios";
import BottomNavbar from "@/components/BottomNavbar";
import React, { useEffect, useState } from "react";
import { POINT_BUYER } from "@/apis";
import { useDebounce } from "use-debounce";
import LeaderboardLayout from "@/components/Leaderboard";

export default function Poin() {
    const token = localStorage.getItem("token");

    const [points, setPoints] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchPhone, setSearchPhone] = useState("");

    const [debouncedSearchName] = useDebounce(searchName, 500);
    const [debouncedSearchEmail] = useDebounce(searchEmail, 500);
    const [debouncedSearchPhone] = useDebounce(searchPhone, 500);

    useEffect(() => {
        getAllPoints(
            debouncedSearchName,
            debouncedSearchEmail,
            debouncedSearchPhone
        );
    }, [debouncedSearchName, debouncedSearchEmail, debouncedSearchPhone]);

    const getAllPoints = async (searchName, searchEmail, searchPhone) => {
        let apiURL = `${POINT_BUYER}?`;

        if (searchName) {
            apiURL += `name=${searchName}`;
        }
        if (searchName && searchEmail && searchPhone) {
            apiURL += "&";
        }
        if (searchEmail) {
            apiURL += `email=${searchEmail}`;
        }
        if (searchPhone) {
            apiURL += `phone=${searchPhone}`;
        }

        await axios
            .get(apiURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res.data.data);
                setPoints(res.data.data);
            });
    };

    return (
        <div className="flex w-full">
            <div className="lg:w-[20%]">
                {/* Sidebar */}
                <BottomNavbar />
            </div>
            <div className="order-2 lg:w-[100%] w-[100%] p-4 mb-32 lg:mb-16 overflow-y-auto">
                {/* Main Content */}
                <h1 className="font-bold text-2xl">Menu</h1>
                <p className="mb-2">Hi! Selamat Datang di Dashboard Poin</p>
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
                        <label htmlFor="">Email: </label>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="w-24 h-10 p-2 rounded-md mt-1"
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Phone: </label>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="w-24 h-10 p-2 rounded-md mt-1"
                            onChange={(e) => setSearchPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                    <LeaderboardLayout data={points} />
                </div>
            </div>
        </div>
    );
}
