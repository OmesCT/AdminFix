<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return redirect('/login');
        }
        return Inertia::render('Admin/Panel');
    }
    
    public function cancelReservation($id)
    {
        $reservation = Reservation::find($id);
        if ($reservation) {
            $reservation->delete();
            return redirect()->route('admin.panel')->with('success', 'Reservation cancelled successfully.');
        }
    
        return redirect()->route('admin.panel')->with('error', 'Reservation not found.');
    }
    

    public function edit($id)
    {
        return view('admin.edit', ['reservation_id' => $id]);
    }

    public function update(Request $request, $id)
    {
        return redirect()->route('admin.panel')->with('success', 'Reservation updated successfully.');
    }
}
