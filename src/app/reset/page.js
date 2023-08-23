"use client";
import { RESET_PASSWORD } from "@/apis";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParams = searchParams.get("token");
    setToken(tokenParams);
    console.log(token);
  }, [tokenParams]);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios
        .put(
          RESET_PASSWORD,
          {
            password,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            router.push("/login");
          }, 2000);
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
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <div>
            <form onSubmit={handleReset}>
              <div className="flex flex-col my-2">
                <label htmlFor="password" className="mb-2">
                  Password
                  <span className="text-red-600">*</span>
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan Password Baru"
                  className="p-2 border rounded-lg bg-[#F7FBFF]"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="mb-2">
                  Confirm Password
                  <span className="text-red-600">*</span>
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi Password Baru"
                  className="p-2 border rounded-lg bg-[#F7FBFF]"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
          </div>
          <div className="text-center lg:mt-7 mt-4 text-[13px] ">
            <p className="mt-10">© 2023 CV Ngaos Berkah Family</p>
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
