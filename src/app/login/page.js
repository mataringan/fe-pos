"use client";
import { LOGIN_API, RESEND_OTP } from "@/apis";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { userAction } from "@/store/user-slice";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const session = useSession();
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the state
    };

    const handleResendOtp = async ({ email }) => {
        try {
            await axios
                .post(RESEND_OTP, {
                    email,
                })
                .then((res) => {
                    // console.log(res);
                });
            // console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    // const hanldeLogin = async (e) => {
    //   e.preventDefault();

    //   signIn("credentials", {
    //     email: email,
    //     password: password,
    //     redirect: false,
    //   }).then((res) => {
    //     if (res.error) {
    //       toast.error(res.error);
    //     }
    //     if (res.error === "User not verified") {
    //       dispatch(userAction.addToEmail(email));
    //       setTimeout(() => {
    //         router.push("/verify-user");
    //       }, 2000);
    //     }
    //     if (!res.error) {
    //       const token = session?.data?.user?.token;

    //       toast.success("Sukses Login");
    //       setTimeout(() => {
    //         dispatch(userAction.login(token));
    //         router.push("/dashboard");
    //       }, 2000);
    //     }
    //   });
    // };

    const handleLogin = async (data) => {
        setIsLoading(true);
        // e.preventDefault();
        // setEmail(data.email);
        try {
            const response = await axios.post(
                LOGIN_API,
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    },
                }
            );
            localStorage.setItem("token", response.data.token);
            if (response.status === 201) {
                toast.success("Berhasil Login");
                dispatch(userAction.addToEmail(response.data.email));
                dispatch(userAction.login(response.data.role));
                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                if (responseData.status === "error") {
                    toast.error(responseData.message);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1500);
                }
                if (responseData.message === "User not verified") {
                    handleResendOtp({ email: data.email });
                    dispatch(userAction.addToEmail(data.email));
                    setTimeout(() => {
                        router.push("/verify-user");
                    }, 2000);
                }
            } else {
                console.error("Error saat melakukan login:", error);
            }
        }
    };

    // const token = session?.data?.user?.token;

    return (
        <div className="lg:flex lg:h-screen  lg:overflow-y-hidden ">
            <div className="lg:w-[50%] h-[35%]  lg:h-screen order-2 flex justify-center  lg:items-center">
                <div className="relative w-[80%] mt-4 md:h-[500px] h-[180px] lg:w-[90%] lg:h-[90%] ">
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
                <div className="lg:w-[60%]  w-[80%]">
                    <h1 className="text-2xl font-bold mb-2">Welcome Back 🖐️</h1>
                    <p className="lg:mb-7 mb-2">
                        Today is a new day.Its your day.
                    </p>
                    <div>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="flex flex-col my-4">
                                <label htmlFor="email" className="mb-2">
                                    Email
                                    <span className="text-red-600">*</span>
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Email tidak boleh kosong",
                                        pattern: /^\S+@\S+$/i,
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Masukkan Email"
                                            className={`p-2 border rounded-lg bg-[#F7FBFF] ${
                                                errors.email
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <p className="mt-2 text-[13px]">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="mb-2">
                                    Password
                                    <span className="text-red-600">*</span>
                                </label>
                                <div className="relative">
                                    <div className="flex">
                                        <Controller
                                            name="password"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required:
                                                    "Password harus diisi",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    id="password"
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Masukkan Password"
                                                    className="p-2 border rounded-lg bg-[#F7FBFF] flex-grow"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-3 right-3 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <AiOutlineEyeInvisible />
                                            ) : (
                                                <AiOutlineEye />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-[13px]">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="text-right lg:mt-7 mt-3 text-[13px] text-blue-700 font-semibold">
                                <Link href="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>
                            <Button
                                type="submit"
                                className={`bg-[#162D3A] text-white w-full p-3 border rounded-xl lg:mt-5 mt-3 ${
                                    isLoading
                                        ? "opacity-70 pointer-events-none"
                                        : ""
                                }`}
                            >
                                {isLoading ? "Loading..." : "Sign In"}
                            </Button>
                        </form>
                    </div>
                    {/* <div className="flex items-center lg:my-6 my-3">
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                        <div className="mx-4 text-gray-500">Or</div>
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                    </div> */}
                    <div className="text-center lg:mt-7 mt-4 text-[13px] ">
                        {/* <p>
                            Dont you have an account?
                            <Link
                                href="/register"
                                className="text-blue-700 font-semibold"
                            >
                                Sign Up
                            </Link>
                        </p> */}
                        <p className="md:mt-10 mt-4">
                            © 2023 CV Ngaos Berkah Family
                        </p>
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

export default Login;
