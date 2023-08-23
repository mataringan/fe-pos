"use client";

import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FORGOT_PASSWORD } from "@/apis";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleForgot = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios
        .post(
          FORGOT_PASSWORD,
          {
            email,
          },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="lg:flex lg:h-screen  lg:overflow-y-hidden ">
      <div className="lg:w-[50%] h-[35%]  lg:h-screen order-2 flex justify-center  lg:items-center">
        <div className="relative w-[80%] mt-4 md:h-[500px] h-[200px] lg:w-[90%] lg:h-[90%] ">
          <Image
            alt="image-auth"
            src={"/image-auth.jpg"}
            fill
            className="border rounded-2xl lg:object-cover lg:object-top"
          />
        </div>
      </div>
      <div className="lg:w-[50%]  order-1 flex justify-center items-center mt-6 lg:mt-0">
        <div className="lg:w-[60%]  w-[80%]">
          <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
          <div>
            <form onSubmit={handleForgot}>
              <div className="flex flex-col my-2">
                <label htmlFor="email" className="mb-2">
                  Email
                  <span className="text-red-600">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan Email"
                  className="p-2 border rounded-lg bg-[#F7FBFF]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className={`bg-[#162D3A] text-white w-full p-3 border rounded-xl lg:mt-5 mt-3 ${
                  isLoading ? "opacity-70 pointer-events-none" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </form>
            <div className="text-center lg:mt-7 mt-4 text-[13px] ">
              <p className="mt-10">© 2023 CV Ngaos Berkah Family</p>
            </div>
          </div>
        </div>
      </div>
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
  );
}
