"use client";

import { WHOAMI } from "@/apis";
import BottomNavbar from "@/components/BottomNavbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Account() {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    Whoami();
  }, []);

  const Whoami = async () => {
    const fetchAPI = axios
      .get(WHOAMI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        const data = res.data.data;
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setRole(data.role);
        setImage(data.image);
      });
  };
  return (
    <div className="flex w-full">
      <div className="lg:w-[20%]">
        <BottomNavbar />
      </div>
      <div className="order-2 lg:w-[100%] p-4 mb-16 overflow-y-auto ">
        <div className="text-center">
          {isEditMode ? (
            <div>
              <Image src={image} width={100} height={100} />
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
          ) : (
            <div className="mb-4">
              <Image
                src={image}
                alt="Your Profile"
                className="w-32 h-32 rounded-full mx-auto"
                width={128}
                height={128}
              />
              <h1 className="text-2xl font-semibold mt-4">{name}</h1>
              <p className="text-gray-600">{email}</p>
              <p className="text-gray-600">{phone}</p>
              <p className="text-gray-600">{role}</p>

              <Button onClick={() => setIsEditMode(true)} className="mt-4">
                Update Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
