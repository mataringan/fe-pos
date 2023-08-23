"use client";

import { WHOAMI } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import { userAction } from "@/store/user-slice";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showDisplay, setShowDisplay] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // if (token) {
    //   const fetchData = async () => {
    //     const res = await axios.get(WHOAMI, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //   };
    //   fetchData();
    // }
    if (!token) {
      toast.error("Anda Belum Login");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      setShowDisplay(false);
    }
  }, []);

  const handleLogout = () => {
    dispatch(userAction.logout());
    toast.success("berhasil keluar");
    setTimeout(() => {
      localStorage.removeItem("token");
      router.push("/login");
    }, 2000);
  };

  return (
    <div>
      {showDisplay && (
        <div className="flex w-full">
          <div className="lg:w-[20%]">
            <BottomNavbar />
          </div>
          <div>
            <p>Page Dashboard</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center" // Posisi toast container
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
