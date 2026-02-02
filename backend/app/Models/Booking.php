<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'customer_name',
        'email',
        'booking_date',
        'service_type',
        'status',
    ];
}
