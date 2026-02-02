<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class BookingController extends Controller
{
    public function index()
    {
        return response()->json(Booking::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'booking_date' => 'required|date',
            'service_type' => 'required|string|max:255',
        ]);

        $booking = Booking::create($validated);

        return response()->json($booking, 201);
    }

    public function exportPdf(Booking $booking)
    {
        $pdf = Pdf::loadView('pdf.booking', compact('booking'));
        
        return $pdf->download("booking-{$booking->id}.pdf");
    }
}
