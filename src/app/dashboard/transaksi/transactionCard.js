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
                        ID Transaksi: {transaction.id}
                    </h2>
                    <p className="text-gray-600 mb-2">
                        User: {transaction.User.name}{" "}
                        {`(${transaction.User.role})`}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Pembeli: {transaction.buyer}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Produk : {transaction.Product.name}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Tanggal: {transaction.date}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Jumlah: {transaction.quantity}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Alamat: {transaction.address}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Status: {transaction.status}
                    </p>
                    <p className="text-gray-600 mb-2">
                        Catatan: {transaction.note}
                    </p>
                    <p className="text-gray-700">
                        Total: {formatRupiah(transaction.amount)}
                    </p>
                </div>
                <div className="col-span-1 lg:col-span-1">
                    {transaction.image && (
                        <Image
                            src={transaction.image}
                            alt={`Transaction ID: ${transaction.id}`}
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
