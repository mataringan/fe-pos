"use client";

import { INFORMATION } from "@/apis";
import Button from "@/components/Button";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const AccordionItem = ({ id, title, content, date, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const role = useSelector((state) => state.userData.role);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-4">
            <button
                onClick={toggleAccordion}
                className="flex justify-between items-center w-full px-4 py-2 text-left bg-slate-50 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
                <span className="text-lg font-semibold">{title}</span>
                <div className="flex gap-4">
                    <span
                        className={`transform transition-transform ${
                            isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    >
                        &#x25BE;
                    </span>
                    <span>{date}</span>
                </div>
            </button>
            {isOpen && (
                <div className="bg-gray-100 p-4">
                    <p className="text-gray-800">{content}</p>
                    {role === "admin" || role === "super admin" ? (
                        <div className="flex justify-center mt-4 gap-2 lg:justify-end">
                            <Link href={`/dashboard/information/${id}`}>
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
                    ) : (
                        ""
                    )}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
