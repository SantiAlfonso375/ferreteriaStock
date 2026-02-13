<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }

        .info-pedido {
            margin-bottom: 20px;
        }

        .info-pedido strong {
            color: #000;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th {
            background: #f8f8f8;
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        td {
            padding: 10px;
            border-bottom: 1px solid #eee;
            vertical-align: top;
        }

        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 10px;
            color: #999;
        }

        .logo-img {
            width: 100px;
            height: 100px;
            border-radius: 20px;
            margin-bottom: 10px;
            object-contain: contain;
        }
    </style>
</head>

<body>
    <div class="header">
        @if(isset($logo))
        <img src="{{ $logo }}" class="logo-img" alt="Logo">
        @endif
        <div class="logo">FERRETERÍA EL MALLÍN</div>
        <p>Orden de Pedido | Fecha: {{ $date }}</p>
    </div>

    <div class="info-pedido">
        <p><strong>Proveedor:</strong> {{ $supplier }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 20%;">Cantidad</th>
                <th style="width: 80%;">Detalle / Herramienta</th>
            </tr>
        </thead>
        <tbody>
            @foreach($items as $item)
            <tr>
                <td>{{ $item['quantity'] }}</td>
                <td>{{ $item['name'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Este documento es una orden de pedido generada por el sistema de Ferretería El Mallín.
    </div>
</body>. .

</html>