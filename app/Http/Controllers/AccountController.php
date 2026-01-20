<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Product;
use App\Models\AccountMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class AccountController extends Controller
{
    public function index()
    {
        return Inertia::render("Account/AccountSale", [
            "clients" => Client::with([
                "movements" => function ($query) {
                    $query->latest();
                },
            ])->get(),
            "products" => Product::where("stock", ">", 0)->get(),
        ]);
    }

    public function registerDebt(Request $request, Client $client)
    {
        $request->validate([
            "items" => "required|array",
            "total_amount" => "required|numeric",
        ]);

        DB::transaction(function () use ($request, $client) {
            $descripcionHerramientas = collect($request->items)
                ->map(fn($item) => $item["quantity"] . "x " . $item["name"])
                ->implode(", ");

            AccountMovement::create([
                "client_id" => $client->id,
                "description" => $descripcionHerramientas,
                "amount" => $request->total_amount,
                "type" => "debt",
                "items" => json_encode($request->items),
            ]);

            $client->increment("balance", $request->total_amount);

            foreach ($request->items as $item) {
                $product = Product::find($item["id"]);
                if ($product) {
                    $product->decrement("stock", $item["quantity"]);
                }
            }
        });

        return back()->with("message", "Deuda registrada y stock actualizado");
    }

    public function registerPayment(Request $request, Client $client)
    {
        $request->validate([
            "amount" => "required|numeric|min:1",
        ]);

        DB::transaction(function () use ($request, $client) {
            // Registramos el pago
            AccountMovement::create([
                "client_id" => $client->id,
                "description" => "Pago Recibido",
                "amount" => $request->amount,
                "type" => "payment",
                "items" => null,
            ]);

            // Resto del saldo
            $client->decrement("balance", $request->amount);

            // Si el saldo llega a 0 o menos, limpio el historial
            if ($client->fresh()->balance <= 0) {
                AccountMovement::where("client_id", $client->id)->delete();
            }
        });

        return back()->with(
            "message",
            "Pago registrado. Historial reiniciado si el saldo llegó a 0.",
        );
    }

    public function downloadPdf(Client $client)
    {
        $movements = $client->movements()->orderBy("created_at", "asc")->get();

        $data = [
            "client" => $client,
            "movements" => $movements,
            "date" => now()->format("d/m/Y"),
            "total" => $client->balance,
        ];

        $pdf = Pdf::loadView("pdf.client_debt", $data);

        return $pdf->download("estado-cuenta-{$client->name}.pdf");
    }
}
