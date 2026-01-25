import React from "react";
import { useForm, Head } from "@inertiajs/react";
import ActionElement from "@/Components/ActionElement";

export default function Index({ products }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        price: "",
        stock: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("products.store"), {
            onSuccess: () => reset(),
        });
    };

    const recentProducts = products.slice(0, 4);

    return (
        <div className="p-5 bg-[#0f131a] min-h-screen text-white font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
            <Head title="Inventario Ferretería" />

            <div className="max-w-md mx-auto">
                <div className="flex items-center mb-6">
                    <ActionElement
                        href={"dashboard"}
                        text={"Atrás"}
                        className="!bg-transparent !p-0 !text-[#0a84ff] text-[17px] flex items-center"
                    />
                </div>

                <h1 className="text-[34px] font-bold mb-6 tracking-tight tracking-[-0.5px]">
                    Nuevo Producto
                </h1>

                <form onSubmit={submit} className="space-y-4">
                    <div className="bg-[#1c1c1e] rounded-[14px] overflow-hidden">
                        <div className="p-4 border-b border-[#38383a]">
                            <label className="block text-[13px] text-[#8e8e93] mb-1">
                                NOMBRE
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full bg-transparent border-none p-0 text-[17px] focus:ring-0 placeholder:text-[#48484a]"
                                placeholder="Ej: Bulón de Cabeza Hexagonal 20 x 30 mm ..."
                            />
                            {errors.name && (
                                <p className="text-[#ff453a] text-[12px] mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="p-4 border-r border-[#38383a]">
                                <label className="block text-[13px] text-[#8e8e93] mb-1">
                                    PRECIO
                                </label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    className="w-full bg-transparent border-none p-0 text-[17px] focus:ring-0"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="p-4">
                                <label className="block text-[13px] text-[#8e8e93] mb-1">
                                    STOCK
                                </label>
                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                    className="w-full bg-transparent border-none p-0 text-[17px] focus:ring-0"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#ff9f0a] text-black font-semibold py-4 rounded-[14px] text-[17px] active:opacity-70 transition-opacity shadow-lg"
                    >
                        {processing ? "Guardando..." : "Agregar Producto"}
                    </button>
                </form>

                {/* LISTADO LIMITADO A 4 PRODUCTOS */}
                <div className="flex justify-between items-end mt-10 mb-2 px-4">
                    <h2 className="text-[13px] text-[#8e8e93] uppercase tracking-tight">
                        Últimos Agregados
                    </h2>
                </div>

                <div className="bg-[#1c1c1e] rounded-[14px] overflow-hidden divide-y divide-[#38383a]">
                    {recentProducts.length > 0 ? (
                        recentProducts.map((product) => (
                            <div
                                key={product.id}
                                className="p-4 flex justify-between items-center active:bg-[#2c2c2e] transition-colors"
                            >
                                <div className="flex flex-col">
                                    <span className="text-[17px] font-medium leading-tight">
                                        {product.name}
                                    </span>
                                    <span className="text-[14px] text-[#8e8e93] mt-0.5">
                                        {product.sku}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[17px] font-semibold text-[#ff9f0a]">
                                        ${product.price}
                                    </span>
                                    <span
                                        className={`text-[12px] mt-0.5 ${product.stock < 5 ? "text-[#ff453a] font-bold" : "text-[#8e8e93]"}`}
                                    >
                                        {product.stock} un.
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-[#8e8e93] text-[15px]">
                            No hay productos registrados
                        </div>
                    )}
                </div>

                <p className="text-center text-[12px] text-[#48484a] mt-6">
                    Mostrando solo los 4 ingresos más recientes
                </p>
            </div>
        </div>
    );
}
