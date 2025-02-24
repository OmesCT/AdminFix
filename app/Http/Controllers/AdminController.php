<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Reservations;
use App\Models\Tables;

class AdminController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        // ดึงข้อมูล reservations และ tables
        $reservations = Reservations::select('id', 'first_name', 'email')->get();
        $tables = Tables::select('id', 'seat', 'available')->get();

        return Inertia::render('Admin/Panel', [
            'reservations' => $reservations,
            'tables' => $tables,
            'csrf_token' => csrf_token(),
        ]);
    }

    public function cancelReservation($id)
    {
        $reservation = Reservations::find($id);

        if ($reservation) {
            // หาโต๊ะที่ถูกจองโดยลูกค้านี้
            $table = Tables::where('reserveed_by_user_id', $reservation->id)->first();

            if ($table) {
                // อัปเดตสถานะโต๊ะให้กลับมาเป็นว่าง
                $table->update([
                    'available' => 1,
                    'reserveed_by_user_id' => null
                ]);
            }

            // ลบการจองออกจากฐานข้อมูล
            $reservation->delete();

            return redirect()->route('admin.panel')->with('success', 'Reservation cancelled successfully.');
        }

        return redirect()->route('admin.panel')->with('error', 'Reservation not found.');
    }

    public function editCustomer($id)
    {
        $reservation = Reservations::findOrFail($id);
        return Inertia::render('Admin/Edit', [
            'reservation' => $reservation,
            'csrf_token' => csrf_token(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservations::findOrFail($id);
        $reservation->update($request->all());
        return redirect()->route('admin.panel')->with('success', 'Reservation updated successfully.');
    }
}