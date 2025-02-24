<?php

use App\Http\Controllers\CreateController;
use App\Http\Controllers\ReservationsController;
use App\Http\Controllers\TablesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\CustomerController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // เส้นทางการจองโต๊ะ
    Route::get('/reserve', [TablesController::class, 'index'])->name('reserve.index');
    Route::post('/reserve', [ReservationsController::class, 'store'])->name('reserve.store');
    Route::post('/tables/{table}/reserve', [ReservationsController::class, 'store'])->name('tables.reserve');
    Route::patch('/api/tables/{id}/reserve', [ReservationsController::class, 'store']);

    // หน้าสร้างการจอง
    Route::get('/create', [CreateController::class, 'showCreateForm'])->name('create');

    // API สำหรับการจอง
    Route::post('/reserve-table', [ReservationsController::class, 'reserveTable']);

    // หน้าแก้ไขการจอง
    Route::get('/customer/edit/{id}', [CustomerController::class, 'edit'])->name('customer.edit');
    Route::post('/customer/update/{id}', [CustomerController::class, 'update'])->name('customer.update');

});

Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/admin/panel', [AdminController::class, 'index'])->name('admin.panel');
    Route::post('/admin/reservations/{id}/cancel', [AdminController::class, 'cancelReservation'])->name('admin.cancelReservation');
    Route::get('/admin/editcustomer/{id}', [AdminController::class, 'editcustomer'])->name('admin.editcustomer');
    Route::post('/admin/update/{id}', [AdminController::class, 'update'])->name('admin.update');

});


require __DIR__.'/auth.php';
