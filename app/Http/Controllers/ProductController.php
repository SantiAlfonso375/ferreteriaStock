<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    // Listado general de productos
    public function index()
    {
        return Inertia::render("Products/Index", [
            "products" => Product::latest()->get(),
        ]);
    }

    // Guardar producto nuevo con SKU automático
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string|max:255",
            "price" => "required|numeric|min:0",
            "stock" => "required|integer|min:0",
        ]);

        $validated["sku"] = $this->generateUniqueSku();

        Product::create($validated);

        return redirect()->route("products.index");
    }

    /**
     * Actualizar producto o TODO el inventario
     */
    public function update(Request $request, Product $product)
    {
        // Caso 1: Actualización Masiva por Porcentaje
        if ($request->bulk) {
            $request->validate([
                "price" => "required|numeric|min:0",
            ]);

            $oldPrice = $product->price;
            $newPrice = $request->price;

            if ($oldPrice > 0) {
                $multiplier = $newPrice / $oldPrice;

                DB::transaction(function () use ($multiplier) {
                    Product::query()->update([
                        "price" => DB::raw("ROUND(price * $multiplier)"),
                    ]);
                });

                return redirect()
                    ->route("inventory.update")
                    ->with("success", "Aumento masivo aplicado correctamente");
            }
        }

        // Caso 2: Actualización Normal de un solo producto
        $validated = $request->validate([
            "name" => "required|string|max:255",
            "price" => "required|numeric|min:0",
            "stock" => "required|integer",
        ]);

        $product->update($validated);

        return redirect()
            ->route("inventory.update")
            ->with("success", "Producto actualizado");
    }

    // Carga la página de inventario con todos los productos
    public function inventoryPage()
    {
        return Inertia::render("Inventory/Update", [
            "products" => Product::all(),
        ]);
    }

    // --- FUNCIONES PARA EL CARRITO Y VENTAS ---

    public function cartPage()
    {
        return Inertia::render("Inventory/Cart", [
            "products" => Product::where("stock", ">", 0)->get(),
        ]);
    }

    public function processSale(Request $request)
    {
        $request->validate([
            "cart" => "required|array|min:1",
        ]);

        $cart = $request->input("cart");

        try {
            DB::transaction(function () use ($cart) {
                foreach ($cart as $item) {
                    $product = Product::findOrFail($item["id"]);

                    if ($product->stock < $item["quantity"]) {
                        throw new \Exception(
                            "Stock insuficiente para: " . $product->name,
                            );
                    }

                    $product->decrement("stock", $item["quantity"]);
                }
            });

            return redirect()
                ->route("dashboard")
                ->with("success", "Venta realizada con éxito");
        }
        catch (\Exception $e) {
            return redirect()
                ->back()
                ->withErrors(["error" => $e->getMessage()]);
        }
    }

    // --- UTILIDADES ---

    private function generateUniqueSku()
    {
        do {
            $randomId = mt_rand(10000000, 99999999);
            $sku = "ART-" . $randomId;
        } while (Product::where("sku", $sku)->exists());

        return $sku;
    }
}