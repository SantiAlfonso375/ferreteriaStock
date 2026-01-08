import React from "react";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ products }) {
    // El hook useForm maneja el estado y el envío al backend de Laravel
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        sku: "",
        price: "",
        stock: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        // Esto envía los datos al método 'store' de tu ProductController
        post(route("products.store"), {
            onSuccess: () => reset(),
        });
    };

    // Función para eliminar
    // const handleDelete = (id) => {
    //     if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    //         router.delete(route("products.destroy", id));
    //     }
    // };

    return (
        <div className="p-8 dark:bg-gray-900 min-h-screen">
            <Head title="Inventario Ferretería" />

            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-200 mb-8">
                    Agregar Stock:
                </h1>

                {/* FORMULARIO PARA AGREGAR PRODUCTOS */}
                <form
                    onSubmit={submit}
                    className="bg-gray-100 p-6 rounded-lg shadow-md mb-10"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Producto
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.name && (
                                <div className="text-red-500 text-xs">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Código (SKU)
                            </label>
                            <input
                                type="text"
                                value={data.sku}
                                onChange={(e) => setData("sku", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.sku && (
                                <div className="text-red-500 text-xs">
                                    {errors.sku}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Precio
                            </label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Cantidad
                            </label>
                            <input
                                type="number"
                                value={data.stock}
                                onChange={(e) =>
                                    setData("stock", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex justify-center mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            {processing
                                ? "Guardando..."
                                : "Agregar al Inventario"}
                        </button>
                    </div>
                </form>

                {/* TABLA DE PRODUCTOS */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Código
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Precio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Stock
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {product.sku}
                                    </td>
                                    <td className="px-6 py-4 font-bold">
                                        ${product.price}
                                    </td>
                                    <td className="px-6 py-4 italic">
                                        {product.stock} unidades
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
