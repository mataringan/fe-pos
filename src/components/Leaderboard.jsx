// components/Leaderboard.js
import React from "react";
import BottomNavbar from "./BottomNavbar";

const LeaderboardLayout = ({ data }) => {
    return (
        <div className="p-4 ">
            <table className="w-full table-fixed border border-collapse border-yellow-300">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="w-10 border border-yellow-300 py-2">
                            No
                        </th>
                        <th className="border border-yellow-300 ">Nama</th>
                        <th className="w-12 lg:w-52 border border-yellow-300">
                            Poin
                        </th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {data.map((user, index) => (
                        <tr key={index}>
                            <td className="w-10 border border-yellow-300 py-2">
                                {index + 1}
                            </td>
                            <td className="border border-yellow-300">
                                {user.name} <br />
                                {user.phone}
                            </td>
                            <td className="w-10 border border-yellow-300">
                                {user.points_balance}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardLayout;
