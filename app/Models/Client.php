<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    // Estos son los campos que permito guardar en la base de datos
    protected $fillable = ["name", "dni", "phone", "balance"];

    /**
     * Relación con los movimientos (las veces que sacó fiado o pagó)
     */
    public function movements()
    {
        return $this->hasMany(AccountMovement::class);
    }
}
