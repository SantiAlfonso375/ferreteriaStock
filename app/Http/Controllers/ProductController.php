<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Ver lista de productos
    public function index()
    {
        return Inertia::render("Products/Index", [
            "products" => Product::all(),
        ]);
    }

    // Guardar producto nuevo
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string|max:255",
            "sku" => "required|string|unique:products",
            "price" => "required|numeric",
            "stock" => "required|integer",
        ]);

        Product::create($validated);

        return redirect()->route("products.index");
    }
}
