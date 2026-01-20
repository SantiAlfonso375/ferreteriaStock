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

    // Actualizar un solo producto (Desde formulario de Update.jsx)
    public function update(Request $request, Product $product)
    {
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

    // AJUSTE TOTAL: Aumentar precios de TODO el inventario al toque
    public function bulkUpdatePrice(Request $request)
    {
        $request->validate([
            "percentage" => "required|numeric",
        ]);

        $percentage = $request->percentage;

        Product::query()->update([
            "price" => DB::raw("price * (1 + ($percentage / 100))"),
        ]);

        return redirect()
            ->back()
            ->with("success", "Ajuste del $percentage% aplicado");
    }

    // Carga la página de inventario con todos los productos para el buscador
    public function inventoryPage()
    {
        return Inertia::render("Inventory/Update", [
            "products" => Product::all(),
        ]);
    }

    // --- NUEVAS FUNCIONES PARA EL CARRITO Y VENTAS ---

    // Carga la vista del carrito (Ventas)
    public function cartPage()
    {
        return Inertia::render("Inventory/Cart", [
            "products" => Product::where("stock", ">", 0)->get(),
        ]);
    }

    // Procesa la venta y descuenta stock
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

                    // Verifico si hay stock suficiente antes de restar
                    if ($product->stock < $item["quantity"]) {
                        throw new \Exception(
                            "Stock insuficiente para: " . $product->name,
                        );
                    }

                    // Resto el stock
                    $product->decrement("stock", $item["quantity"]);
                }
            });

            return redirect()
                ->route("dashboard")
                ->with("success", "Venta realizada con éxito");
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withErrors(["error" => $e->getMessage()]);
        }
    }

    // --- UTILIDADES ---

    // Generador de códigos únicos (Formato ART-XXXXXXXX)
    private function generateUniqueSku()
    {
        do {
            $randomId = mt_rand(10000000, 99999999);
            $sku = "ART-" . $randomId;
        } while (Product::where("sku", $sku)->exists());

        return $sku;
    }
}
