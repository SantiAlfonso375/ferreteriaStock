<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AccountController;
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

    // Inventario y Productos
    Route::get("/productos", [ProductController::class, "index"])->name(
        "products.index",
    );
    Route::post("/productos", [ProductController::class, "store"])->name(
        "products.store",
    );
    Route::put("/productos/{product}", [
        ProductController::class,
        "update",
    ])->name("products.update");
    Route::get("/inventario/actualizar", [
        ProductController::class,
        "inventoryPage",
    ])->name("inventory.update");
    Route::post("/productos/ajuste-masivo", [
        ProductController::class,
        "bulkUpdatePrice",
    ])->name("products.bulkUpdate");

    // Caja / Ventas
    Route::get("/ventas/nueva", [ProductController::class, "cartPage"])->name(
        "sales.cart",
    );
    Route::post("/ventas/procesar", [
        ProductController::class,
        "processSale",
    ])->name("sales.process");

    // Clientes y Cuenta Corriente
    Route::resource("clients", ClientController::class);

    // --- RUTAS DE ACCOUNT / CUENTA CORRIENTE ---
    Route::get("/cuenta-corriente", [AccountController::class, "index"])->name(
        "account.index",
    );

    // Ruta para registrar deuda (Retirar herramientas)
    Route::post("/clientes/{client}/retirar", [
        AccountController::class,
        "registerDebt",
    ])->name("clients.add-debt");

    // Ruta para registrar pago (Entrega de efectivo)
    Route::post("/clientes/{client}/pagar", [
        AccountController::class,
        "registerPayment",
    ])->name("clients.add-payment");

    // Ruta para generar el PDF (Apunta a downloadPdf que es el nombre en tu controlador)
    Route::get("/clientes/{client}/pdf", [
        AccountController::class,
        "downloadPdf",
    ])->name("clients.pdf");
});

require __DIR__ . "/auth.php";
