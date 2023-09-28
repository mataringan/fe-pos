import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chart.js/auto";
import "chartjs-plugin-datalabels";
import {
    getExcel,
    getExcelAllLaporan,
    getExcelLaporanAddress,
    getExcelLaporanBelumLunas,
    getExcelLaporanLunas,
    getExcelLaporanProduk,
    getExcelLaporanStatus,
} from "@/utils/generateExcel";

const LaporanChart = ({ laporan, name }) => {
    const groupedData = {};
    laporan.forEach((laporan) => {
        const buyer = laporan.buyer;
        const productName = laporan.Product.name;
        if (!groupedData[productName]) {
            groupedData[productName] = {
                quantity: 0,
            };
        }
        groupedData[productName].quantity += laporan.quantity;
    });

    const labels = Object.keys(groupedData);
    const dataValues = Object.values(groupedData).map((item) => item.quantity);

    // Generate a fixed set of colors
    const colors = [
        "#FF5733",
        "#33FF57",
        "#5733FF",
        "#33FFFF",
        "#FF33FF",
        "#FFFF33",
        // Add more colors as needed
    ];

    const backgroundColors = colors.slice(0, labels.length);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Jumlah Produk Dibeli",
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                datalabels: {
                    color: "#000", // Warna teks
                    align: "center", // Posisi teks
                    anchor: "center",
                    offset: 0, // Jarak antara teks dengan elemen chart
                    font: {
                        weight: "bold",
                    },
                },
            },
        ],
    };

    const groupedDataAddress = {};
    laporan.forEach((laporan) => {
        const buyer = laporan.buyer;
        const address = laporan.address;
        if (!groupedDataAddress[address]) {
            groupedDataAddress[address] = {
                quantity: 0,
            };
        }
        groupedDataAddress[address].quantity += laporan.quantity;
    });

    const labelsAddress = Object.keys(groupedDataAddress);
    const dataValuesAddress = Object.values(groupedDataAddress).map(
        (item) => item.quantity
    );

    // Generate a fixed set of colors
    const colorsAddress = [
        "#FF5733",
        "#33FF57",
        "#5733FF",
        "#33FFFF",
        "#FF33FF",
        "#FFFF33",
        // Add more colors as needed
    ];

    const backgroundColorsAddress = colors.slice(0, labelsAddress.length);

    const dataAddress = {
        labels: labelsAddress,
        datasets: [
            {
                label: "Jumlah Produk Dibeli",
                data: dataValuesAddress,
                backgroundColor: backgroundColorsAddress,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                datalabels: {
                    color: "#000", // Warna teks
                    align: "center", // Posisi teks
                    anchor: "center",
                    offset: 0, // Jarak antara teks dengan elemen chart
                    font: {
                        weight: "bold",
                    },
                },
            },
        ],
    };

    const optionsPie = {
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
            },
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    // Hitung jumlah transaksi yang "Lunas" dan "Belum Lunas"
    const lunasCount = laporan.filter((item) => item.status === "Lunas").length;
    const belumLunasCount = laporan.filter(
        (item) => item.status === "Belum Lunas"
    ).length;
    const totalTransactions = laporan.length;

    // Hitung persentase "Lunas" dan "Belum Lunas"
    const persentaseLunas = (lunasCount / totalTransactions) * 100;
    const persentaseBelumLunas = (belumLunasCount / totalTransactions) * 100;

    const dataIsDone = {
        labels: ["Lunas", "Belum Lunas"],
        datasets: [
            {
                data: [persentaseLunas, persentaseBelumLunas],
                backgroundColor: ["#33FF57", "#FF5733"], // Warna untuk "Lunas" dan "Belum Lunas"
                borderWidth: 1,
            },
        ],
    };

    const optionsBar = {
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
            },
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
        plugins: {
            legend: {
                display: false, // Sembunyikan legend
            },
            datalabels: {
                display: true,
                color: "#000",
                align: "center",
                anchor: "center",
                offset: 0,
                font: {
                    weight: "bold",
                },

                formatter: (value, context) => {
                    // Menggunakan labels yang sesuai dengan indeks data
                    const label = dataIsDone.labels[context.dataIndex];
                    return label + ": " + value.toFixed(2) + "%";
                },
            },
        },
    };

    return (
        <div className="w-full">
            <div className="lg:flex">
                <div className="w-full px-3 lg:px-0 mb-4 text-center">
                    <h2 className="text-xl font-semibold mb-4">
                        Laporan Produk
                    </h2>
                    <div className="w-full px-8 lg:px-0 ">
                        <Pie data={data} options={optionsPie} />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                        onClick={() => {
                            getExcelLaporanProduk({ laporan, name });
                        }}
                    >
                        Cetak Laporan Product
                    </button>
                </div>
                <div className="w-full px-4 text-center">
                    <h2 className="text-xl font-semibold lg:mb-11 ">
                        Laporan Persentase Lunas & Belum Lunas
                    </h2>
                    <div className="w-full px-8 lg:px-0">
                        <Bar data={dataIsDone} options={optionsBar} />
                        <div className="mt-4">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-3"
                                onClick={() => {
                                    getExcelLaporanLunas({ laporan, name });
                                }}
                            >
                                Cetak Laporan Lunas
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-3"
                                onClick={() => {
                                    getExcelLaporanBelumLunas({
                                        laporan,
                                        name,
                                    });
                                }}
                            >
                                Cetak Laporan Belum Lunas
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-3"
                                onClick={() => {
                                    getExcelLaporanStatus({
                                        laporan,
                                        name,
                                    });
                                }}
                            >
                                Cetak Laporan Lunas & Belum Lunas
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full px-4 my-4 lg:my-0 text-center">
                    <h2 className="text-xl font-semibold mb-4">
                        Laporan Alamat
                    </h2>
                    <div className="w-full px-8 lg:px-0 ">
                        <Pie data={dataAddress} options={optionsPie} />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                            onClick={() => {
                                getExcelLaporanAddress({
                                    laporan,
                                    name,
                                });
                            }}
                        >
                            Cetak Laporan Alamat
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-10 text-center">
                <button
                    onClick={() => {
                        getExcelAllLaporan({ laporan, name });
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    Cetak Semua Laporan
                </button>
            </div>
        </div>
    );
};

export default LaporanChart;
