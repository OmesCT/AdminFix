import React from "react";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";

export default function Edit() {
    const { reservations, auth, csrf_token } = usePage().props;

    if (!auth || !reservations) {
        return (
            <AuthenticatedLayout>
                <h1 className="text-xl font-semibold text-red-500">ข้อมูลไม่ถูกต้อง</h1>
            </AuthenticatedLayout>
        );
    }

    if (auth.email !== reservations.email) {
        return (
            <AuthenticatedLayout>
                <h1 className="text-xl font-semibold text-red-500">คุณไม่มีสิทธิ์แก้ไขการจองนี้</h1>
            </AuthenticatedLayout>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        Inertia.post(`/customer/update/${reservations.id}`, formData, {
            headers: {
                "X-CSRF-TOKEN": csrf_token
            },
            onSuccess: () => {
                Inertia.visit('/reserve');
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <h1 className="text-xl font-semibold">แก้ไขข้อมูลการจอง</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_token" value={csrf_token} />
                <div>
                    <label htmlFor="first_name">ชื่อ</label>
                    <input type="text" id="first_name" name="first_name" defaultValue={reservations.first_name} />
                </div>
                <div>
                    <label htmlFor="email">อีเมล</label>
                    <input type="email" id="email" name="email" defaultValue={reservations.email} />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">อัปเดต</button>
            </form>
        </AuthenticatedLayout>
    );
}
