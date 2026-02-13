<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Orders/Index');
    }

    public function downloadPdf(Request $request)
    {
        $request->validate([
            'supplier' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string',
            'items.*.quantity' => 'required|numeric|min:1',
        ]);

        $data = [
            'supplier' => $request->supplier,
            'items' => $request->items,
            'date' => now()->format('d/m/Y'),
        ];

        $pdf = Pdf::loadView('pdf.order', $data);

        $filename = "pedido-" . strtolower(str_replace(' ', '-', $request->supplier)) . "-" . now()->format('d-m-Y') . ".pdf";

        return $pdf->download($filename);
    }
}