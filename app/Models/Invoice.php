<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_month',
        'reference_year',
        'card_id',
        'status',
        'value',
        'invoice_expiration'
    ];

    public function card(){
        return $this->belongsTo(Card::class);
    }
}
