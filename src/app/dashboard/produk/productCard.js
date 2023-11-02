"use client";

import { GET_PRODUCT } from "@/apis";
import Button from "@/components/Button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product, onDelete }) => {
    const formattedPrice = product.price.toLocaleString("id-ID", {
        sytle: "currency",
        currency: "IDR",
    });
    return (
        <div className="bg-white rounded-lg shadow-md max-w-xs aspect-[16/9]">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                <p className="text-gray-600 mb-1">{product.category}</p>
                <p className="text-gray-700 mb-2">Rp {formattedPrice}</p>
                <p className="text-gray-500">{product.point} poin</p>
                <p className="text-gray-500">{product.description}</p>
                <div className="flex justify-center mt-4 gap-2">
                    <Link href={`/dashboard/produk/${product.id}`}>
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
};

export default ProductCard;
