<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservations extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'table_id',
        'reserved_at',
        'expires_at',
    ];
    public function table()
    {
        return $this->belongsTo(Table::class);
    }
    public function reservation()
    {
        return $this->hasOne(Reservations::class);
    }
}
