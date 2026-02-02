<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BookingController;

Route::get('/bookings', [BookingController::class, 'index']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::get('/bookings/{booking}/pdf', [BookingController::class, 'exportPdf']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
