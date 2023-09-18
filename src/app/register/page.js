"use client";
import { REGISTER_API } from "@/apis";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { userAction } from "@/store/user-slice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState();
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("image", image);
            formData.append("password", password);

            const response = await axios.post(REGISTER_API, formData, {
                // headers: {
                //   "Content-Type": "multipart/form-data",
                // },
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                },
            });
            // console.log(response);

            if (response.status === 201) {
                toast.success(response.data.message);
                dispatch(userAction.addToEmail(response.data.data.email));
                setTimeout(() => {
                    router.push("/verify-user");
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
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
                        className="border rounded-2xl object-cover object-top lg:object-cover lg:object-top"
                        priority="true"
                    />
                </div>
            </div>
            <div className="lg:w-[50%]  order-1 flex justify-center items-center mt-4 lg:mt-0">
                <div className="lg:w-[60%] w-[80%]">
                    <h1 className="text-2xl font-bold mb-2">Welcome🖐️</h1>
                    <div>
                        <form onSubmit={handleRegister}>
                            <div className="flex flex-col my-4">
                                <label htmlFor="name" className="mb-2">
                                    Name
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    placeholder="Masukkan Nama"
                                    className="p-2 border rounded-lg bg-[#F7FBFF]"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="phone" className="mb-2">
                                    Phone
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    id="phone"
                                    type="text"
                                    placeholder="085"
                                    className="p-2 border rounded-lg bg-[#F7FBFF]"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
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

                            {/* <div className="flex flex-col my-2">
                <label htmlFor="image" className="mb-2">
                  Image
                  <span className="text-red-600">*</span>
                </label>
                <Input
                  id="image"
                  type="file"
                  className="p-2 border rounded-lg bg-[#F7FBFF]"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div> */}
                            <div className="flex flex-col">
                                <label htmlFor="password" className="mb-2">
                                    Password
                                    <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Masukkan Password"
                                    className="p-2 border rounded-lg bg-[#F7FBFF]"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                type="submit"
                                className={`bg-[#162D3A] text-white w-full p-3 border rounded-xl lg:mt-5 mt-3 ${
                                    isLoading
                                        ? "opacity-70 pointer-events-none"
                                        : ""
                                }`}
                            >
                                {isLoading ? "Loading..." : "Sign Up"}
                            </Button>
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
                        </form>
                    </div>
                    <div className="flex items-center lg:my-3 my-3">
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                        <div className="mx-4 text-gray-500">Or</div>
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                    </div>
                    <div className="text-center lg:mt-3 mt-4 text-[13px] ">
                        <p>
                            Do you have an account?{" "}
                            <Link
                                href="/login"
                                className="text-blue-700 font-semibold"
                            >
                                Sign In
                            </Link>
                        </p>
                        <p className="mt-5">© 2023 CV Ngaos Berkah Family</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
