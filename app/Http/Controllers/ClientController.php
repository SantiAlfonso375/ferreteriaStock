<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    // Listado de clientes
    public function index()
    {
        return Inertia::render("Clients/Index", [
            "clients" => Client::all(),
        ]);
    }

    // Guardar nuevo cliente
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string|max:255",
            "dni" => "nullable|string|max:20",
            "phone" => "nullable|string|max:20",
        ]);

        Client::create([
            "name" => $validated["name"],
            "dni" => $validated["dni"],
            "phone" => $validated["phone"],
            "balance" => 0, // Empieza sin deuda
        ]);

        return back();
    }
}
