import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
    const { tables = [], reservations = [], auth } = usePage().props;
    console.log("Tables:", tables);
    console.log("Reservations:", reservations);
    console.log("Auth:", auth);
    
    const user = auth?.user;

    // ตรวจสอบว่าเป็นแอดมินหรือไม่
    const isAdmin = user && /^csmju(0[1-9]|[1-9][0-9])@gmail\.com$/.test(user.email);

    // ถ้าไม่ใช่แอดมิน ให้แสดงข้อความไม่มีสิทธิ์เข้าถึง
    if (!isAdmin) {
        return <div className="text-red-500 text-center mt-10">ไม่มีสิทธิ์เข้าถึงหน้านี้</div>;
    }

    return (
        <AuthenticatedLayout>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>

            {/* แสดงข้อมูลโต๊ะ */}
            <h2 className="mt-4 text-lg font-bold">Tables</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ชื่อโต๊ะ</th>
                        <th className="border p-2">สถานะ</th>
                        <th className="border p-2">การกระทำ</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.length > 0 ? (
                        tables.map((table) => (
                            <tr key={table.id} className="border">
                                <td className="border p-2">{table.name}</td>
                                <td className="border p-2">{table.available ? "ว่าง" : "ถูกจอง"}</td>
                                <td className="border p-2">
                                    {!table.available && (
                                        <form method="POST" action={`/admin/reservations/${table.id}/cancel`}>
                                            <button type="submit" className="bg-red-500 text-white px-3 py-1 rounded">
                                                ยกเลิก
                                            </button>
                                        </form>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-2">ไม่มีข้อมูลโต๊ะ</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* แสดงข้อมูลลูกค้า */}
            <h2 className="mt-4 text-lg font-bold">Customers</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ชื่อ</th>
                        <th className="border p-2">อีเมล</th>
                        <th className="border p-2">การกระทำ</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length > 0 ? (
                        reservations.map((reservation) => (
                            <tr key={reservation.id} className="border">
                                <td className="border p-2">{reservation.first_name}</td>
                                <td className="border p-2">{reservation.email}</td>
                                <td className="border p-2">
                                    <Link
                                        href={`/admin/edit/${reservation.id}`}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        แก้ไข
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-2">ไม่มีข้อมูลลูกค้า</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
}
