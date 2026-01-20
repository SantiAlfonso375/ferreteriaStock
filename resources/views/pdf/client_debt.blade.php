<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .info-cliente { margin-bottom: 20px; }
        .info-cliente strong { color: #000; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #f8f8f8; padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        td { padding: 10px; border-bottom: 1px solid #eee; vertical-align: top; }
        .total-box { margin-top: 30px; text-align: right; font-size: 18px; }
        .total-box span { background: #ff453a; color: white; padding: 10px 20px; border-radius: 8px; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #999; }
        .pago-texto { color: #28a745; font-weight: bold; font-style: italic; }
        .monto-pago { color: #28a745; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>RESUMEN DE CUENTA</h1>
        <p>Ferretería El Mallin | Fecha: {{ $date }}</p>
    </div>

    <div class="info-cliente">
        <p><strong>Cliente:</strong> {{ $client->name }}</p>
        @if($client->dni)<p><strong>DNI/CUIT:</strong> {{ $client->dni }}</p>@endif
        @if($client->phone)<p><strong>Teléfono:</strong> {{ $client->phone }}</p>@endif
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 15%;">Fecha</th>
                <th style="width: 65%;">Detalle / Productos</th>
                <th style="width: 20%;">Monto</th>
            </tr>
        </thead>
        <tbody>
            @foreach($movements as $m)
                @php
                    // Intentamos decodificar el JSON. El segundo parámetro 'true' lo convierte en array.
                    $items = is_string($m->items) ? json_decode($m->items, true) : $m->items;
                    $esPago = empty($items);
                @endphp
                <tr>
                    <td>{{ $m->created_at->format('d/m/Y') }}</td>
                    <td>
                        @if(!$esPago && (is_array($items) || is_object($items)))
                            @foreach($items as $item)
                                {{ data_get($item, 'quantity') }}x {{ data_get($item, 'name') }}
                                (${{ number_format(data_get($item, 'price', 0), 2) }})<br>
                            @endforeach
                        @else
                            <span class="pago-texto">PAGO RECIBIDO</span>
                        @endif
                    </td>
                    <td class="{{ $esPago ? 'monto-pago' : '' }}">
                        {{ $esPago ? '-' : '+' }} ${{ number_format($m->amount, 2) }}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total-box">
        <strong>SALDO TOTAL PENDIENTE:</strong>
        <span>${{ number_format($total, 2) }}</span>
    </div>

    <div class="footer">
        Este documento es un resumen de cuenta corriente y no posee valor fiscal.
    </div>
</body>
</html>
