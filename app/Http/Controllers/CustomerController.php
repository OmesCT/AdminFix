<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservations;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function edit($id)
    {
        $reservation = Reservations::findOrFail($id);

        return Inertia::render('Customer/Edit', [
            'reservations' => $reservation,
            'auth' => auth()->user(),
            'csrf_token' => csrf_token(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservations::findOrFail($id);

        $reservation->update($request->all());

        return redirect()->route('reserve.index')->with('success', 'Reservation updated successfully.');
    }
}
