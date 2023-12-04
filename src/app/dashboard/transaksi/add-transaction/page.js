"use client";

import { GET_PRODUCT, TRANSACTION } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDebounce } from "use-debounce";

export default function AddTransaksi() {
    const role = useSelector((state) => state.userData.role);
    const router = useRouter();
    const [product, setProduct] = useState([]);
    const [productId, setProductId] = useState();
    const [buyer, setBuyer] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [rewardId, setRewardId] = useState();
    const [date, setDate] = useState();
    const [quantity, setQuantity] = useState();
    const [image, setImage] = useState();
    const [address, setAddress] = useState();
    const [note, setNote] = useState();
    const [status, setStatus] = useState("");
    const [selectedOption, setSelectedOption] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [reward, setReward] = useState([]);
    const [clickReward, setClickReward] = useState(false);
    const token = localStorage.getItem("token");

    const [debouncedSearchPhone] = useDebounce(phone, 500);

    // useEffect(() => {
    //     if (debouncedSearchPhone) {
    //         axios
    //             .get(`http://localhost:8000/rewardbypoin`, {
    //                 params: {
    //                     phone: phone,
    //                 },
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             })
    //             .then((res) => {
    //                 // console.log(res);
    //                 setReward(res.data.data);
    //                 // if (res.data.data === null) {
    //                 //     setPointUser(0);
    //                 // } else {
    //                 //     setPointUser(res.data.data.points_balance);
    //                 // }
    //             });
    //     }
    // }, [debouncedSearchPhone]);

    const clickRewardButton = () => {
        setClickReward(!clickReward);
    };

    const checkReward = () => {
        axios
            .get(`http://localhost:8000/rewardbypoin`, {
                params: {
                    phone: phone,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setReward(res.data.data);
            });
    };

    const handleDropdownChange = (e) => {
        const selectedProductName = e.target.value;
        const selectedProduct = product.find(
            (p) => p.name === selectedProductName
        );
        if (selectedProduct) {
            setProductId(selectedProduct.id);
        }
        setSelectedOption(selectedProductName);
    };

    const handleClaimReward = (rewardId) => {
        setRewardId(rewardId);
    };

    useEffect(() => {
        fetchDataProduct();
    }, []);

    const handleAddTransaction = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        // Validasi quantity
        if (!quantity || quantity <= 0) {
            toast.error("Masukan jumlah yang sesuai");
            return;
        }

        try {
            const isoDate = new Date(date).toISOString();
            await axios
                .post(
                    TRANSACTION,
                    {
                        productId,
                        buyer,
                        email,
                        phone,
                        date: isoDate,
                        quantity,
                        image,
                        rewardId,
                        status,
                        address,
                        note,
                    },
                    {
                        headers: {
                            accept: "*/*",
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                .then((res) => {
                    // console.log(res);
                    const data = res.data;
                    toast.success("Tambah Transaksi Berhasil");
                    setTimeout(() => {
                        router.push("/dashboard/transaksi");
                    }, 2000);
                });
        } catch (error) {
            // console.log(error.response.data.message);
            if (
                error.response.data.message ==
                "Stok yang tersedia tidak mencukupi"
            ) {
                toast.error("Stok yang tersedia tidak mencukupi");
            }
            // toast.error("Data Pembeli Sudah Ada");
            setIsLoading(false);
        }
    };

    const fetchDataProduct = async () => {
        const response = await axios.get(GET_PRODUCT);
        // console.log(response);
        const data = response.data.data;
        setProduct(data);
        // console.log(data[0].id);
        setProductId(data[0].id);
    };

    // console.log(status);

    return (
        <div>
            <div className="flex w-full">
                <div className="lg:w-[20%]">
                    <BottomNavbar />
                </div>
                <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
                    <h1 className="font-bold text-2xl">Tambah Transaksi</h1>
                    <p className="mb-2">
                        Selamat Datang di Dashboard Tambah Transaksi
                    </p>
                    <form onSubmit={handleAddTransaction}>
                        <div className="mb-4">
                            <label
                                htmlFor="pembeli"
                                className="block font-semibold mb-2"
                            >
                                Nama Pembeli
                            </label>
                            <Input
                                type="text"
                                onChange={(e) => setBuyer(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="pembeli"
                                className="block font-semibold mb-2"
                            >
                                Email
                            </label>
                            <Input
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="pembeli"
                                className="block font-semibold mb-2"
                            >
                                Phone
                            </label>
                            <Input
                                type="text"
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label>Pilih Produk</label>
                            <select
                                value={selectedOption}
                                onChange={(e) => handleDropdownChange(e)}
                                className="w-full p-2 border rounded bg-white"
                            >
                                {product.map((option) => (
                                    <option key={option.id} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tanggal">Tanggal Transaksi</label>
                            <Input
                                id="tanggal"
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="jumlah">Jumlah</label>
                            <Input
                                type="number"
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="alamat">Alamat</label>
                            <Input
                                type="text"
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <span>Status</span>
                            <div className="flex gap-4">
                                <div className="flex flex-row gap-2">
                                    <Input
                                        id="lunas"
                                        type="radio"
                                        value="Lunas"
                                        checked={status === "Lunas"}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    />
                                    <label htmlFor="lunas">Lunas</label>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Input
                                        id="belum-lunas"
                                        type="radio"
                                        value="Belum Lunas"
                                        checked={status === "Belum Lunas"}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    />
                                    <label htmlFor="belum-lunas">
                                        Belum Lunas
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="catatan">Catatan</label>
                            <Input
                                type="text"
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        {/* <div className="mb-4">
                            <label htmlFor="image" className="mr-4">
                                Bukti
                            </label>
                            <Input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div>
                            {image && (
                                <Image
                                    src={URL.createObjectURL(image)}
                                    width={100}
                                    height={100}
                                    alt="transaction-image"
                                />
                            )}
                        </div> */}
                        <div>
                            <button
                                type="button"
                                className="bg-yellow-500 mb-2 mr-4 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    checkReward();
                                    clickRewardButton();
                                }}
                            >
                                Check Reward
                            </button>
                            {clickReward ? (
                                reward.length > 0 ? (
                                    <div className="flex gap-2">
                                        {reward.map((item) => (
                                            <div
                                                className={
                                                    rewardId === item.id
                                                        ? `border p-4 mb-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-slate-300`
                                                        : `border p-4 mb-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5`
                                                }
                                                key={item.id}
                                            >
                                                <p className="text-lg font-semibold mb-2">
                                                    {item.description}
                                                </p>
                                                <button
                                                    type="button"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => {
                                                        handleClaimReward(
                                                            item.id
                                                        );
                                                    }}
                                                >
                                                    Claim
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="my-2 text-red-800">
                                        Tidak ada reward
                                    </p>
                                )
                            ) : (
                                ""
                            )}

                            <Button
                                type="submit"
                                className={`bg-blue-500 hover:bg-blue-700 font-semibold text-white px-4 py-2 rounded ${
                                    isLoading
                                        ? "opacity-70 pointer-events-none"
                                        : ""
                                }`}
                            >
                                {isLoading
                                    ? "Loading..."
                                    : "Create Transaction"}
                            </Button>
                        </div>
                    </form>
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
