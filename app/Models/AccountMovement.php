<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountMovement extends Model
{
    use HasFactory;

    protected $fillable = [
        "client_id",
        "description",
        "amount",
        "type",
        "items",
    ];

    protected $casts = [
        "items" => "array",
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
