import Button from "@/components/Button";
import { formatRupiah } from "@/utils/formatRupiah";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TransactionCard({ transaction, onDelete }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-1 lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-2">
                        Transaction ID: {transaction.id}
                    </h2>
                    <p className="text-gray-600 mb-2">
                        User: {transaction.User.name}{" "}
                        {`(${transaction.User.role})`}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Buyer: {transaction.buyer}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Product : {transaction.Product.name}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Date: {transaction.date}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Quantity: {transaction.quantity}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Address: {transaction.address}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Note: {transaction.note}
                    </p>
                    <p className="text-gray-700">
                        Amount: {formatRupiah(transaction.amount)}
                    </p>
                </div>
                <div className="col-span-1 lg:col-span-1">
                    {transaction.image && (
                        <Image
                            src={transaction.image}
                            alt={`Transaction ID: ${transaction.id}`}
                            //   className="w-full h-auto"
                            width={1000}
                            height={1000}
                        />
                    )}
                </div>
                <div className="flex gap-2">
                    <Link href={`/dashboard/transaksi/${transaction.id}`}>
                        <div className="bg-color-1 flex bg-yellow-400 text-white w-[90px] justify-center p-1 gap-1 cursor-pointer rounded-md">
                            <p>📝</p>
                            <p>Edit</p>
                        </div>
                    </Link>
                    <Button onClick={onDelete}>
                        <div className="bg-red-600 flex text-white w-[90px] rounded-rad-1 justify-center p-1 gap-1 cursor-pointer rounded-md">
                            <p>❌</p>
                            <p>Delete</p>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}
