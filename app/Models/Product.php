<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    // Esto es OBLIGATORIO para que el método Product::create() funcione
    protected $fillable = ["name", "sku", "price", "stock", "description"];
}
