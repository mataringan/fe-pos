"use client";

import ExcelJS from "exceljs";

export const getExcelAllLaporan = async ({ laporan, name }) => {
    try {
        if (laporan) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Data");

            worksheet.columns = [
                {
                    header: "Id Transaksi",
                    key: "id_transaksi",
                    width: 40,
                },
                {
                    header: "Produk",
                    key: "product",
                    width: 25,
                },
                {
                    header: "Harga",
                    key: "harga",
                    width: 25,
                },
                {
                    header: "Nama Pembeli",
                    key: "pembeli",
                    width: 25,
                },
                {
                    header: "Alamat",
                    key: "alamat",
                    width: 25,
                },
                {
                    header: "Jumlah",
                    key: "jumlah",
                    width: 25,
                },
                {
                    header: "Total",
                    key: "total",
                    width: 25,
                },
                {
                    header: "Catatan",
                    key: "catatan",
                    width: 25,
                },
                {
                    header: "Bukti",
                    key: "bukti",
                    width: 25,
                },
                {
                    header: "Status",
                    key: "status",
                    width: 25,
                },
            ];

            laporan.forEach((item) => {
                worksheet.addRow({
                    id_transaksi: item.id,
                    product: item.Product.name,
                    harga: item.Product.price,
                    pembeli: item.buyer,
                    alamat: item.address,
                    jumlah: item.quantity,
                    total: item.amount,
                    catatan: item.note,
                    bukti: item.image,
                    status: item.status,
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ",
            });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `Laporan - ${name}.xlsx`;
            a.click();
        }
    } catch (error) {
        console.log(error);
    }
};

export const getExcelLaporanProduk = async ({ laporan, name }) => {
    try {
        if (laporan) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Data");

            worksheet.columns = [
                {
                    header: "Id Transaksi",
                    key: "id_transaksi",
                    width: 40,
                },
                {
                    header: "Produk",
                    key: "product",
                    width: 25,
                },
                {
                    header: "Nama Pembeli",
                    key: "pembeli",
                    width: 25,
                },
            ];

            laporan.forEach((item) => {
                worksheet.addRow({
                    id_transaksi: item.id,
                    product: item.Product.name,
                    pembeli: item.buyer,
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ",
            });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `Laporan Produk ${name}.xlsx`;
            a.click();
        }
    } catch (error) {
        console.log(error);
    }
};

export const getExcelLaporanStatus = async ({ laporan, name }) => {
    try {
        if (laporan) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Data");

            worksheet.columns = [
                {
                    header: "Id Transaksi",
                    key: "id_transaksi",
                    width: 40,
                },
                {
                    header: "Produk",
                    key: "product",
                    width: 25,
                },
                {
                    header: "Harga",
                    key: "harga",
                    width: 25,
                },
                {
                    header: "Nama Pembeli",
                    key: "pembeli",
                    width: 25,
                },
                {
                    header: "Alamat",
                    key: "alamat",
                    width: 25,
                },
                {
                    header: "Jumlah",
                    key: "jumlah",
                    width: 25,
                },
                {
                    header: "Total",
                    key: "total",
                    width: 25,
                },
                {
                    header: "Catatan",
                    key: "catatan",
                    width: 25,
                },
                {
                    header: "Status",
                    key: "status",
                    width: 25,
                },
            ];

            laporan.forEach((item) => {
                worksheet.addRow({
                    id_transaksi: item.id,
                    product: item.Product.name,
                    harga: item.Product.price,
                    pembeli: item.buyer,
                    alamat: item.address,
                    jumlah: item.quantity,
                    total: item.amount,
                    catatan: item.note,
                    status: item.status,
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ",
            });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `Laporan Lunas & Belum lunas - ${name}.xlsx`;
            a.click();
        }
    } catch (error) {
        console.log(error);
    }
};

export const getExcelLaporanLunas = async ({ laporan, name }) => {
    try {
        if (laporan) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Data");

            worksheet.columns = [
                {
                    header: "Id Transaksi",
                    key: "id_transaksi",
                    width: 40,
                },
                {
                    header: "Produk",
                    key: "product",
                    width: 25,
                },
                {
                    header: "Harga",
                    key: "harga",
                    width: 25,
                },
                {
                    header: "Nama Pembeli",
                    key: "pembeli",
                    width: 25,
                },
                {
                    header: "Alamat",
                    key: "alamat",
                    width: 25,
                },
                {
                    header: "Jumlah",
                    key: "jumlah",
                    width: 25,
                },
                {
                    header: "Total",
                    key: "total",
                    width: 25,
                },
                // {
                //     header: "Catatan",
                //     key: "catatan",
                //     width: 25,
                // },
                {
                    header: "Status",
                    key: "status",
                    width: 25,
                },
            ];

            // filter lunas
            const laporanLunas = laporan.filter(
                (item) => item.status === "Lunas"
            );

            laporanLunas.forEach((item) => {
                worksheet.addRow({
                    id_transaksi: item.id,
                    product: item.Product.name,
                    harga: item.Product.price,
                    pembeli: item.buyer,
                    alamat: item.address,
                    jumlah: item.quantity,
                    total: item.amount,
                    // catatan: item.note,
                    status: item.status,
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ",
            });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `Laporan Lunas - ${name}.xlsx`;
            a.click();
        }
    } catch (error) {
        console.log(error);
    }
};

export const getExcelLaporanBelumLunas = async ({ laporan, name }) => {
    try {
        if (laporan) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Data");

            worksheet.columns = [
                {
                    header: "Id Transaksi",
                    key: "id_transaksi",
                    width: 40,
                },
                {
                    header: "Produk",
                    key: "product",
                    width: 25,
                },
                {
                    header: "Harga",
                    key: "harga",
                    width: 25,
                },
                {
                    header: "Nama Pembeli",
                    key: "pembeli",
                    width: 25,
                },
                {
                    header: "Alamat",
                    key: "alamat",
                    width: 25,
                },
                {
                    header: "Jumlah",
                    key: "jumlah",
                    width: 25,
                },
                {
                    header: "Total",
                    key: "total",
                    width: 25,
                },
                {
                    header: "Catatan",
                    key: "catatan",
                    width: 25,
                },
                {
                    header: "Status",
                    key: "status",
                    width: 25,
                },
            ];

            // filter lunas
            const laporanLunas = laporan.filter(
                (item) => item.status === "Belum Lunas"
            );

            laporanLunas.forEach((item) => {
                worksheet.addRow({
                    id_transaksi: item.id,
                    product: item.Product.name,
                    harga: item.Product.price,
                    pembeli: item.buyer,
                    alamat: item.address,
                    jumlah: item.quantity,
                    total: item.amount,
                    catatan: item.note,
                    status: item.status,
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ",
            });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `Laporan Belum lunas - ${name}.xlsx`;
            a.click();
        }
    } catch (error) {
        console.log(error);
    }
};

export const getExcelLaporanAddress = async ({ laporan, name }) => {
    try {
        if (laporan) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Data");

            worksheet.columns = [
                {
                    header: "Id Transaksi",
                    key: "id_transaksi",
                    width: 40,
                },
                {
                    header: "Produk",
                    key: "product",
                    width: 25,
                },
                {
                    header: "Alamat",
                    key: "alamat",
                    width: 25,
                },
                {
                    header: "Jumlah",
                    key: "jumlah",
                    width: 25,
                },
            ];

            laporan.forEach((item) => {
                worksheet.addRow({
                    id_transaksi: item.id,
                    product: item.Product.name,
                    alamat: item.address,
                    jumlah: item.quantity,
                    status: item.status,
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ",
            });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `Laporan Alamat - ${name}.xlsx`;
            a.click();
        }
    } catch (error) {
        console.log(error);
    }
};
