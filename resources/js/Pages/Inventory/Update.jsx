import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import ActionElement from "@/Components/ActionElement";

export default function Update({ products }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const { data, setData, put, processing } = useForm({
        name: "",
        price: "",
        stock: "",
        bulk: false,
    });

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleSelect = (product) => {
        setSelectedProduct(product);
        setData({
            name: product.name,
            price: product.price,
            stock: product.stock,
            bulk: false,
        });
        setSearchTerm("");
        setShowResults(false);
    };

    const applyQuickIncrease = (percentage) => {
        const currentPrice = parseFloat(selectedProduct.price);
        const val =
            typeof percentage === "string"
                ? parseFloat(percentage)
                : percentage;
        if (isNaN(val)) return;
        const increase = currentPrice * (val / 100);
        setData("price", Math.round(currentPrice + increase));
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("products.update", selectedProduct.id));
    };

    return (
        <div className="bg-[#0f131a] min-h-screen text-white font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] pb-40">
            <Head title="Actualizar Stock" />

            {/* Header estilo Nav Bar */}
            <header className="sticky top-0 z-50 bg-[#0f131a]/80 backdrop-blur-xl border-b border-[#38383a] px-4 pt-12 pb-4">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <ActionElement
                        href={"dashboard"}
                        text={"Atrás"}
                        className="!bg-transparent !p-0 !text-[#0a84ff] text-[17px]"
                    />
                    <h1 className="text-[17px] font-semibold">Inventario</h1>
                    <button className="text-[#0a84ff] text-[17px] font-medium opacity-50 cursor-not-allowed">
                        Escanear
                    </button>
                </div>
            </header>

            <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
                {/* Buscador estilo Search Bar */}
                <section className="relative">
                    <div className="relative flex items-center bg-[#1c1c1e] rounded-xl px-3 py-2 border border-[#38383a]">
                        <span className="material-symbols-outlined bg-[#ff9f0a] text-[#1c1c1e] text-[20px] mr-5 p-1 rounded-lg ">
                            Buscar
                        </span>
                        <input
                            type="text"
                            className="bg-transparent border-none p-0 w-full text-[17px] focus:ring-0 placeholder:text-[#8e8e93]"
                            placeholder="Buscar por nombre o Código..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowResults(true);
                            }}
                        />
                    </div>

                    {showResults && searchTerm.length > 0 && (
                        <div className="absolute z-10 w-full mt-2 bg-[#1c1c1e] border border-[#38383a] rounded-[14px] shadow-2xl max-h-60 overflow-y-auto divide-y divide-[#38383a]">
                            {filteredProducts.map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() => handleSelect(p)}
                                    className="p-4 active:bg-[#2c2c2e] flex justify-between items-center transition-colors"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[16px] font-medium">
                                            {p.name}
                                        </span>
                                        <span className="text-[12px] text-[#8e8e93] font-mono">
                                            {p.sku}
                                        </span>
                                    </div>
                                    <span className="text-[#ff9f0a] font-semibold">
                                        ${p.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {selectedProduct ? (
                    <form
                        onSubmit={submit}
                        className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                        {/* Grupo de Datos del Producto */}
                        <div>
                            <h2 className="text-[13px] text-[#8e8e93] uppercase mb-2 ml-4 tracking-tight">
                                Información Actual
                            </h2>
                            <div className="bg-[#1c1c1e] rounded-[14px] overflow-hidden">
                                <div className="p-4 border-b border-[#38383a]">
                                    <label className="block text-[12px] text-[#8e8e93] mb-1">
                                        NOMBRE DEL ARTÍCULO
                                    </label>
                                    <input
                                        className="w-full bg-transparent border-none p-0 text-[17px] focus:ring-0 text-white font-medium"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-2">
                                    <div className="p-4 border-r border-[#38383a]">
                                        <label className="block text-[12px] text-[#8e8e93] mb-1">
                                            SKU (ID)
                                        </label>
                                        <span className="text-[17px] text-[#8e8e93] font-mono">
                                            {selectedProduct.sku}
                                        </span>
                                    </div>
                                    <div className="p-4 bg-[#2c2c2e]/30">
                                        <label className="block text-[12px] text-[#ff9f0a] font-bold mb-1">
                                            NUEVO PRECIO
                                        </label>
                                        <div className="flex items-center">
                                            <span className="text-[#ff9f0a] mr-1 font-semibold">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                className="w-full bg-transparent border-none p-0 text-[17px] focus:ring-0 text-[#ff9f0a] font-bold"
                                                value={data.price}
                                                onChange={(e) =>
                                                    setData(
                                                        "price",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botones de Aumento Rápido Segmented Control */}
                        <div>
                            <h2 className="text-[13px] text-[#8e8e93] uppercase mb-2 ml-4 tracking-tight">
                                Aumento Rápido
                            </h2>
                            <div className="flex bg-[#1c1c1e] p-1 rounded-[14px] gap-1">
                                {[5, 10, 20].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => applyQuickIncrease(num)}
                                        className="flex-1 py-2 text-[15px] font-semibold bg-[#38383a] hover:bg-[#48484a] active:bg-[#2c2c2e] rounded-[10px] transition-colors"
                                    >
                                        +{num}%
                                    </button>
                                ))}
                                <div className="flex-1 relative">
                                    <input
                                        type="number"
                                        placeholder="%"
                                        className="w-full bg-[#0f131a] border-none rounded-[10px] py-2 text-center text-[15px] focus:ring-1 focus:ring-[#ff9f0a]"
                                        onChange={(e) =>
                                            applyQuickIncrease(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Fijo */}
                        <footer className="fixed bottom-0 left-0 right-0 bg-[#0f131a]/90 backdrop-blur-xl border-t border-[#38383a] px-6 pt-4 pb-10">
                            <div className="max-w-md mx-auto space-y-4">
                                {/* Toggle Switch */}
                                <div className="flex items-center justify-between p-4 bg-[#1c1c1e] rounded-[14px]">
                                    <div className="flex items-center gap-5">
                                        <span className="material-symbols-outlined text-[#0a84ff]">
                                            <img
                                                src="../images/bxs-layer.svg"
                                                alt="Layer"
                                                className=""
                                            />
                                        </span>
                                        <span className="text-[17px] font-medium">
                                            Actualizar todos los productos
                                        </span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="w-12 h-6 rounded-full bg-[#38383a] border-none checked:bg-[#34c759] appearance-none cursor-pointer transition-colors relative checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-transform"
                                        checked={data.bulk}
                                        onChange={(e) =>
                                            setData("bulk", e.target.checked)
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-[#ff9f0a] text-black font-bold rounded-[14px] text-[17px] active:opacity-70 transition-opacity shadow-lg"
                                >
                                    {processing
                                        ? "GUARDANDO..."
                                        : "GUARDAR CAMBIOS"}
                                </button>
                            </div>
                        </footer>
                    </form>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-[#8e8e93]">
                        <p className="text-[17px]">
                            Busca un producto para editar
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
