import React, { useState, useMemo, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import ActionElement from "@/Components/ActionElement";

export default function Cart({ products }) {
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false); // Nuevo: Estado de éxito
    const [discount, setDiscount] = useState(0);

    const triggerError = (msg) => {
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(null), 3000);
    };

    // Función para mostrar éxito y limpiar
    const triggerSuccess = () => {
        setSuccessMessage(true);
        setTimeout(() => {
            setSuccessMessage(false);
            router.reload({ only: ["products"] });
        }, 2000);
    };

    const filteredProducts = useMemo(() => {
        if (searchTerm.length < 2) return [];
        return products
            .filter(
                (p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.sku.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .slice(0, 5);
    }, [searchTerm, products]);

    const addToCart = (product) => {
        const existing = cart.find((item) => item.id === product.id);
        if (existing) {
            if (existing.quantity >= product.stock) {
                triggerError(
                    `Sin stock: Solo quedan ${product.stock} de ${product.name}`,
                );
                return;
            }
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                ),
            );
        } else {
            if (product.stock < 1) {
                triggerError(`"${product.name}" está agotado`);
                return;
            }
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        setSearchTerm("");
    };

    const updateQuantity = (id, delta, currentStock) => {
        setCart(
            cart.map((item) => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    if (newQty > currentStock) {
                        triggerError(
                            `Límite alcanzado: ${currentStock} disponibles`,
                        );
                        return item;
                    }
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            }),
        );
    };

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;

    const handleConfirmSale = () => {
        if (cart.length === 0) return;

        router.post(
            route("sales.process"),
            {
                cart,
                discount_percentage: discount,
                total_amount: total,
            },
            {
                onSuccess: () => {
                    setCart([]);
                    setDiscount(0);
                    triggerSuccess();
                },
                onError: (errors) =>
                    triggerError(errors.error || "Error al procesar"),
            },
        );
    };

    return (
        <div className="bg-[#0f131a] min-h-screen text-white font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] pb-40">
            <Head title="Punto de Venta" />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0f131a]/80 backdrop-blur-xl border-b border-white/10 px-4 pt-12 pb-4">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <ActionElement
                        href="dashboard"
                        text="Atrás"
                        className="!text-[#0a84ff] !bg-transparent !p-0"
                    />
                    <h1 className="text-[17px] font-bold">Venta Nueva</h1>
                    <button
                        onClick={() => {
                            setCart([]);
                            setDiscount(0);
                        }}
                        className="text-[#ff453a] font-medium"
                    >
                        Limpiar
                    </button>
                </div>
            </header>

            {/* Cartel de Venta Exitosa (Capa superior) */}
            {successMessage && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                    <div className="relative bg-[#34c759] text-white p-8 rounded-[32px] shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-5xl">
                            ✓
                        </div>
                        <h2 className="text-2xl font-bold">Venta Exitosa</h2>
                        <p className="opacity-90">Stock actualizado</p>
                    </div>
                </div>
            )}

            {/* Banner de Error */}
            {errorMessage && (
                <div className="fixed top-24 left-4 right-4 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="max-w-md mx-auto bg-[#ff453a] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-white/20">
                        <span className="text-xl">⚠️</span>
                        <p className="text-[15px] font-semibold">
                            {errorMessage}
                        </p>
                    </div>
                </div>
            )}

            <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
                {/* Buscador */}
                <section className="relative">
                    <div className="bg-white/5 border border-white/10 rounded-2xl flex items-center px-4 py-3 focus-within:border-[#0a84ff]/50 transition-colors">
                        <span className="text-[#8e8e93] mr-3">🔍</span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar producto..."
                            className="bg-transparent border-none p-0 w-full text-[17px] focus:ring-0"
                        />
                    </div>

                    {filteredProducts.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1c1c1e] border border-white/10 rounded-2xl shadow-2xl z-20 divide-y divide-white/5">
                            {filteredProducts.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => addToCart(p)}
                                    className="w-full p-4 flex justify-between items-center active:bg-white/10"
                                >
                                    <div className="text-left">
                                        <p className="font-medium">{p.name}</p>
                                        <p className="text-[12px] text-[#8e8e93]">
                                            Disponibles: {p.stock}
                                        </p>
                                    </div>
                                    <p className="text-[#34c759] font-bold">
                                        ${p.price}
                                    </p>
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                {/* Lista de Productos */}
                <section className="space-y-3">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/5 border border-white/10 rounded-[22px] p-4 flex flex-col gap-3"
                        >
                            <div className="flex justify-between items-start">
                                <p className="font-medium text-[16px]">
                                    {item.name}
                                </p>
                                <button
                                    onClick={() =>
                                        setCart(
                                            cart.filter(
                                                (i) => i.id !== item.id,
                                            ),
                                        )
                                    }
                                    className="text-[#48484a]"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center bg-black/20 rounded-xl p-1 border border-white/5">
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                -1,
                                                item.stock,
                                            )
                                        }
                                        className="w-10 h-10 flex items-center justify-center text-2xl text-[#0a84ff]"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 font-bold text-lg">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                1,
                                                item.stock,
                                            )
                                        }
                                        className="w-10 h-10 flex items-center justify-center text-2xl text-[#0a84ff]"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-[20px] font-black">
                                    ${item.price * item.quantity}
                                </span>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Descuento */}
                <section className="bg-white/5 border border-white/10 rounded-[22px] p-4 space-y-3">
                    <h2 className="text-[13px] text-[#8e8e93] uppercase tracking-widest font-semibold">
                        Descuento Cliente
                    </h2>
                    <div className="flex justify-between gap-2">
                        {[0, 5, 10, 15, 20].map((pct) => (
                            <button
                                key={pct}
                                onClick={() => setDiscount(pct)}
                                className={`flex-1 py-2 rounded-xl text-[14px] font-bold transition-all ${discount === pct ? "bg-[#0a84ff] text-white shadow-lg shadow-[#0a84ff]/20" : "bg-white/10 text-[#8e8e93]"}`}
                            >
                                {pct === 0 ? "Off" : `${pct}%`}
                            </button>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-[#0f131a]/90 backdrop-blur-2xl border-t border-white/10 px-6 pt-5 pb-10">
                <div className="max-w-md mx-auto flex flex-col gap-4">
                    <div className="space-y-1">
                        {discount > 0 && (
                            <div className="flex justify-between text-[#ff453a] text-sm font-bold px-2">
                                <span>Ahorro ({discount}%)</span>
                                <span>-${discountAmount}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-end px-2">
                            <span className="text-[#8e8e93] font-medium">
                                Total Final
                            </span>
                            <span className="text-3xl font-black">
                                ${total}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleConfirmSale}
                        disabled={cart.length === 0}
                        className="w-full py-4 bg-[#34c759] text-white font-bold rounded-[20px] text-[19px] shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                    >
                        Confirmar Cobro
                    </button>
                </div>
            </footer>
        </div>
    );
}
