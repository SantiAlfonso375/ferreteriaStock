<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return Inertia::render("Welcome", [
        "canLogin" => Route::has("login"),
        "canRegister" => Route::has("register"),
        "laravelVersion" => Application::VERSION,
        "phpVersion" => PHP_VERSION,
    ]);
})->name("Welcome");

Route::get("/dashboard", function () {
    return Inertia::render("Dashboard", [
        "products" => Product::all(),
    ]);
})
    ->middleware(["auth", "verified"])
    ->name("dashboard");

Route::middleware("auth")->group(function () {
    // Perfil
    Route::get("/profile", [ProfileController::class, "edit"])->name(
        "profile.edit",
    );
    Route::patch("/profile", [ProfileController::class, "update"])->name(
        "profile.update",
    );
    Route::delete("/profile", [ProfileController::class, "destroy"])->name(
        "profile.destroy",
    );

    // RUTAS DE LA FERRETERÍA
    Route::get("/productos", [ProductController::class, "index"])->name(
        "products.index",
    );
    Route::post("/productos", [ProductController::class, "store"])->name(
        "products.store",
    );

    // Ruta para procesar la actualización de un producto (Desde el formulario de Inventario)
    Route::put("/productos/{product}", [
        ProductController::class,
        "update",
    ])->name("products.update");

    // Ruta para ver la página de actualizar inventario (Buscador + Formulario)
    Route::get("/inventario/actualizar", [
        ProductController::class,
        "inventoryPage",
    ])->name("inventory.update");

    // Ruta para el ajuste total de todos los los productos (Desde precios por porcentaje)
    Route::post("/productos/ajuste-masivo", [
        ProductController::class,
        "bulkUpdatePrice",
    ])->name("products.bulkUpdate");
});

require __DIR__ . "/auth.php";
