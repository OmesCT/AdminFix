import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditCustomer() {
    const { reservation, csrf_token } = usePage().props;

    // ใช้ useForm hook เพื่อจัดการกับข้อมูลฟอร์ม
    const { data, setData, post, processing, errors } = useForm({
        first_name: reservation.first_name,
        email: reservation.email,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // ส่งคำขอแบบ POST ไปยัง server
        post(`/admin/update/${reservation.id}`);
    };

    return (
        <AuthenticatedLayout>
            <h1 className="text-xl font-semibold">Edit Customer</h1>
            <form onSubmit={handleSubmit}>
                {/* CSRF Token */}
                <input type="hidden" name="_token" value={csrf_token} />
                
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                    />
                    {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    disabled={processing}
                >
                    {processing ? "Updating..." : "Update"}
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
