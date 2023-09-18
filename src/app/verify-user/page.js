"use client";

import { RESEND_OTP, VERIFY_USER } from "@/apis";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

function VerifyOTP() {
    const router = useRouter();
    const emailUser = useSelector((state) => state.userData.email);
    const [otp, setOTP] = useState("");
    const [countdown, setCountdown] = useState(0);

    const handleVerify = async () => {
        try {
            const response = await axios.put(VERIFY_USER, {
                otp,
            });
            if (response.data.status === "success") {
                toast.success("OTP verified successfully!");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleResendOtp = async () => {
        try {
            setCountdown(60);
            const response = await axios.post(RESEND_OTP, {
                email: emailUser,
            });
            // console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            if (countdown === 0) {
                clearInterval(timer);
            }

            return () => clearInterval(timer);
        }
    }, [countdown]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4 text-center">
                    Verify OTP
                </h1>
                <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <input
                            key={index}
                            type="number"
                            className="w-12 h-12 text-2xl border rounded-lg text-center focus:outline-none focus:border-blue-500"
                            min="0"
                            max="9"
                            value={otp[index - 1] || ""}
                            onChange={(e) => {
                                const newOTP =
                                    otp.slice(0, index - 1) +
                                    e.target.value +
                                    otp.slice(index);
                                setOTP(newOTP.slice(0, 6));
                            }}
                        />
                    ))}
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        className="w-full py-2 bg-blue-500  text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={handleVerify}
                    >
                        Verify
                    </button>
                    <button
                        className={`w-full py-2 ${
                            countdown > 0
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        } text-white rounded-lg focus:outline-none`}
                        onClick={handleResendOtp}
                        disabled={countdown > 0}
                    >
                        {countdown > 0
                            ? `Resend OTP in ${countdown}s`
                            : "Resend OTP"}
                    </button>
                    <ToastContainer
                        position="top-right" // Posisi toast container
                        autoClose={3000} // Durasi toast muncul dalam ms
                        hideProgressBar={false} // Menampilkan atau menyembunyikan progress bar
                        newestOnTop={false} // Menampilkan toast baru di atas atau di bawah toast lama
                        closeOnClick // Menutup toast saat diklik
                        rtl={false} // Teks toast mengikuti arah kanan ke kiri (misalnya dalam bahasa Arab)
                        pauseOnFocusLoss // Menjeda toast saat fokus hilang dari halaman
                        draggable // Memungkinkan pengguna untuk menyeret toast
                        pauseOnHover // Menjeda toast saat kursor mengarah ke atasnya
                    />
                </div>
            </div>
        </div>
    );
}

export default VerifyOTP;
