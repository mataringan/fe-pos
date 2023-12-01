// components/CardReward.js
import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

const RewardCard = ({ reward, onDelete }) => {
    const { id, point, discount, description, createdAt, updatedAt } = reward;

    return (
        <div className="max-w-xs mx-auto lg:mx-0 my-4 bg-white rounded-md overflow-hidden shadow-md">
            <div className="p-4">
                <h2 className="text-xl font-semibold">{description}</h2>
                <p className="text-gray-600 mt-2">ID: {id}</p>
                <p className="text-gray-600">Point: {point}</p>
                <p className="text-gray-600">Discount: {discount}</p>
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
            </div>
        </div>
    );
};

export default RewardCard;
