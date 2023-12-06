// components/CardReward.js
import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { formatRupiah } from "@/utils/formatRupiah";
import { FaCheck } from "react-icons/fa6";

const RewardCard = ({ rewardData, onReward, onDelete, role, claim }) => {
    const { id, point, reward, description, who } = rewardData;

    return (
        <div className="max-w-xs mx-auto lg:mx-0 my-4 bg-white rounded-md overflow-hidden shadow-md">
            <div className="p-4">
                <h2 className="text-xl font-semibold">{description}</h2>
                <p className="text-gray-600 mt-2">ID: {id}</p>
                <p className="text-gray-600">Point: {point}</p>
                <p className="text-gray-600">Reward: {formatRupiah(reward)}</p>

                {who === "employee" ? (
                    claim === true ? (
                        <Button
                            onClick={() => {
                                onReward(id);
                            }}
                        >
                            <div className="bg-green-500 flex text-white w-[150px] rounded-rad-1 justify-center p-1 gap-1 cursor-pointer rounded-md">
                                <p>✔️</p>
                                <p>Claim Reward</p>
                            </div>
                        </Button>
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )}
                {role === "super admin" || role === "admin" ? (
                    <div className="flex gap-2 mt-8 justify-center">
                        <Link href={`/dashboard/reward/${id}`}>
                            <div className="bg-color-1 flex bg-yellow-400 text-white w-[90px] justify-center p-1 gap-1 cursor-pointer rounded-md">
                                <p>📝</p>
                                <p>Edit</p>
                            </div>
                        </Link>
                        <Button
                            onClick={() => {
                                onDelete(id);
                            }}
                        >
                            <div className="bg-red-600 flex text-white w-[90px] rounded-rad-1 justify-center p-1 gap-1 cursor-pointer rounded-md">
                                <p>❌</p>
                                <p>Delete</p>
                            </div>
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default RewardCard;
