"use client";

import { GET_PRODUCT, TRANSACTION } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AddTransaksi() {
  const role = useSelector((state) => state.userData.role);
  //   console.log(role);
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState();
  const [buyer, setBuyer] = useState();
  const [date, setDate] = useState();
  const [quantity, setQuantity] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [note, setNote] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const token = localStorage.getItem("token");

  const handleDropdownChange = (e) => {
    const selectedProductName = e.target.value;
    const selectedProduct = product.find((p) => p.name === selectedProductName);
    if (selectedProduct) {
      setProductId(selectedProduct.id);
    }
    setSelectedOption(selectedProductName);
  };

  //   console.log(productId);

  useEffect(() => {
    fetchDataProduct();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    // mengubah format tanggal
    const isoDate = new Date(date).toISOString();

    const response = await axios
      .post(
        TRANSACTION,
        {
          productId,
          buyer,
          date: isoDate,
          quantity,
          image,
          address,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  const fetchDataProduct = async () => {
    const response = await axios.get(GET_PRODUCT);
    // console.log(response);
    setProduct(response.data.data);
  };

  return (
    <div>
      <div className="flex w-full">
        <div className="lg:w-[20%]">
          <BottomNavbar />
        </div>
        <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <p className="mb-2">Selamat Datang di Dashboard Transaksi</p>
          <form onSubmit={handleAddTransaction}>
            <div>
              <label htmlFor="pembeli">Nama Pembeli</label>
              <Input type="text" onChange={(e) => setBuyer(e.target.value)} />
            </div>
            <div>
              <label>Pilih Produk</label>
              <select value={selectedOption} onChange={handleDropdownChange}>
                {product.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tanggal">Tanggal Transaksi</label>
              <Input type="date" onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="jumlah">Jumlah</label>
              <Input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="alamat">Alamat</label>
              <Input type="text" onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <label htmlFor="catatan">Catatan</label>
              <Input type="text" onChange={(e) => setNote(e.target.value)} />
            </div>
            <div>
              <label htmlFor="image">Bukti</label>
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
            </div>
            <Button>Kirim</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
