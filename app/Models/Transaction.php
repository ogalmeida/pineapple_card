<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_lancamento',
        'card_id',
        'data_lancamento',
        'hora_lancamento',
        'estabelecimento',
        'categoria_estabelecimento',
        'latitude_estabelecimento',
        'longitude_estabelecimento',
        'taxa_pontuacao',
        'valor_lancamento'
    ];

    public function card(){
        return $this->belongsTo(Card::class);
    }
}
