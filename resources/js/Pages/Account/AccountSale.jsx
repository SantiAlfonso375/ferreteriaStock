import React, { useState, useMemo, useEffect } from "react";
import { Head, router } from "@inertiajs/react";

export default function AccountSale({ products, clients }) {
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientSearch, setClientSearch] = useState("");
    const [productSearch, setProductSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [view, setView] = useState("debt");
    const [isCreating, setIsCreating] = useState(false);
    const [notification, setNotification] = useState(null);

    const [newClient, setNewClient] = useState({
        name: "",
        dni: "",
        phone: "",
    });

    useEffect(() => {
        if (selectedClient) {
            const updatedClient = clients.find(
                (c) => c.id === selectedClient.id,
            );
            if (updatedClient) setSelectedClient(updatedClient);
        }
    }, [clients]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleOpenReceipt = (clientId) => {
        window.open(route("clients.pdf", clientId), "_blank");
    };

    const filteredClients = useMemo(() => {
        if (clientSearch.length < 1) return [];
        return clients
            .filter(
                (c) =>
                    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
                    (c.dni && c.dni.includes(clientSearch)) ||
                    (c.phone && c.phone.includes(clientSearch)),
            )
            .slice(0, 5);
    }, [clientSearch, clients]);

    const filteredProducts = useMemo(() => {
        if (productSearch.length < 1) return [];
        return products
            .filter((p) =>
                p.name.toLowerCase().includes(productSearch.toLowerCase()),
            )
            .slice(0, 5);
    }, [productSearch, products]);

    // --- LÓGICA DEL CARRITO ---
    const addToCart = (product) => {
        const existing = cart.find((i) => i.id === product.id);
        if (existing) {
            updateQuantity(product.id, 1);
        } else {
            if (product.stock <= 0) {
                setNotification({ msg: "Producto sin stock", type: "error" });
                return;
            }
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        setProductSearch("");
    };

    const updateQuantity = (id, delta) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    // Validar stock máximo
                    if (newQty > item.stock) {
                        setNotification({
                            msg: `Máximo disponible: ${item.stock}`,
                            type: "error",
                        });
                        return item;
                    }
                    // Si la cantidad llega a 0, se mantiene en 1 (o podrías eliminarlo)
                    return { ...item, quantity: Math.max(1, newQty) };
                }
                return item;
            }),
        );
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((i) => i.id !== id));
    };

    const totalCart = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const handleSaveDebt = () => {
        if (cart.length === 0) return;
        router.post(
            route("clients.add-debt", selectedClient.id),
            { items: cart, total_amount: totalCart },
            {
                onSuccess: () => {
                    setCart([]);
                    setView("history");
                    setNotification({
                        msg: "Compra guardada",
                        type: "success",
                    });
                },
            },
        );
    };

    const handleRegisterPayment = () => {
        const amount = prompt(`¿Cuánto va a pagar ${selectedClient.name}?`);
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;
        router.post(
            route("clients.add-payment", selectedClient.id),
            { amount: parseFloat(amount) },
            {
                onSuccess: () => {
                    setNotification({
                        msg: "Pago registrado con éxito",
                        type: "success",
                    });
                },
            },
        );
    };

    const handleCreateClient = () => {
        if (!newClient.name)
            return setNotification({
                msg: "Nombre obligatorio",
                type: "error",
            });
        router.post(route("clients.store"), newClient, {
            onSuccess: () => {
                setIsCreating(false);
                setNewClient({ name: "", dni: "", phone: "" });
                setNotification({
                    msg: "Cliente creado con éxito",
                    type: "success",
                });
            },
        });
    };

    return (
        <div className="bg-black min-h-screen text-white font-sans pb-44">
            <Head title="Cuaderno Digital" />

            {notification && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs px-4">
                    <div
                        className={`${notification.type === "error" ? "bg-[#ff453a]" : "bg-[#30d158]"} text-white p-4 rounded-2xl shadow-2xl text-center font-bold border border-white/20`}
                    >
                        {notification.msg}
                    </div>
                </div>
            )}

            <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10 px-4 pt-10 pb-4">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <button
                        onClick={() =>
                            selectedClient
                                ? setSelectedClient(null)
                                : window.history.back()
                        }
                        className="text-[#0a84ff] text-lg flex items-center"
                    >
                        <span className="text-2xl mr-1">‹</span> Atrás
                    </button>
                    <h1 className="text-[17px] font-semibold">
                        Cuaderno de Cuentas
                    </h1>
                    <button
                        onClick={() => {
                            setSelectedClient(null);
                            setCart([]);
                            setClientSearch("");
                        }}
                        className="text-[#0a84ff] text-[17px]"
                    >
                        Inicio
                    </button>
                </div>
            </header>

            <main className="max-w-md mx-auto px-4 mt-6">
                {!selectedClient ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-end px-1">
                            <h2 className="text-3xl font-bold tracking-tight">
                                Clientes
                            </h2>
                            <button
                                onClick={() => setIsCreating(!isCreating)}
                                className="text-[#0a84ff] font-medium text-lg"
                            >
                                {isCreating ? "Cancelar" : "Nuevo"}
                            </button>
                        </div>

                        {isCreating ? (
                            <div className="bg-[#1c1c1e] rounded-2xl p-4 space-y-4 border border-white/5">
                                <p className="text-[#0a84ff] text-xs font-bold uppercase px-1">
                                    Nuevo Cliente
                                </p>
                                <input
                                    className="w-full bg-[#2c2c2e] rounded-xl p-4 focus:ring-1 focus:ring-[#0a84ff] outline-none text-lg"
                                    placeholder="Nombre completo"
                                    value={newClient.name}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    className="w-full bg-[#2c2c2e] rounded-xl p-4 focus:ring-1 focus:ring-[#0a84ff] outline-none text-lg"
                                    placeholder="DNI / CUIT"
                                    value={newClient.dni}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            dni: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    className="w-full bg-[#2c2c2e] rounded-xl p-4 focus:ring-1 focus:ring-[#0a84ff] outline-none text-lg"
                                    placeholder="Teléfono"
                                    value={newClient.phone}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    onClick={handleCreateClient}
                                    className="w-full bg-[#0a84ff] py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform"
                                >
                                    Crear Cliente
                                </button>
                            </div>
                        ) : (
                            <div className="bg-[#1c1c1e] rounded-xl flex items-center px-4 py-3 border border-white/10">
                                <span className="mr-2 text-xl">🔍</span>
                                <input
                                    className="bg-transparent border-none p-0 w-full text-white placeholder:text-gray-500 focus:ring-0 text-lg"
                                    placeholder="Buscar..."
                                    value={clientSearch}
                                    onChange={(e) =>
                                        setClientSearch(e.target.value)
                                    }
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            {filteredClients.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setSelectedClient(c)}
                                    className="w-full p-4 bg-[#1c1c1e] rounded-2xl text-left border border-white/5 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="text-lg font-bold">
                                            {c.name}
                                        </p>
                                        <div className="flex gap-3 text-[11px] text-gray-500 font-bold">
                                            {c.dni && <span>DNI: {c.dni}</span>}
                                            {c.phone && (
                                                <span className="text-[#30d158]">
                                                    📞 {c.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-gray-600 text-2xl">
                                        ›
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e] p-6 rounded-3xl border border-white/10 shadow-2xl">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[#0a84ff] text-xs font-black uppercase tracking-widest mb-1">
                                        Ficha de Cliente
                                    </p>
                                    <h2 className="text-3xl font-bold">
                                        {selectedClient.name}
                                    </h2>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <button
                                        onClick={() =>
                                            handleOpenReceipt(selectedClient.id)
                                        }
                                        className="bg-white/10 p-3 rounded-full active:scale-90 transition-all"
                                    >
                                        📄
                                    </button>
                                    <span className="text-[10px] font-bold text-gray-400">
                                        PDF
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2 inline-block bg-black/40 px-4 py-3 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-gray-400 uppercase font-bold">
                                    Saldo Adeudado
                                </p>
                                <p className="text-2xl font-black text-[#ff453a]">
                                    ${selectedClient.balance || "0.00"}
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#1c1c1e] p-1 rounded-xl flex border border-white/5">
                            <button
                                onClick={() => setView("debt")}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg ${view === "debt" ? "bg-[#636366] text-white" : "text-gray-500"}`}
                            >
                                Anotar Compra
                            </button>
                            <button
                                onClick={() => setView("history")}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg ${view === "history" ? "bg-[#636366] text-white" : "text-gray-500"}`}
                            >
                                Historial
                            </button>
                        </div>

                        {view === "debt" ? (
                            <div className="space-y-4">
                                <div className="bg-[#1c1c1e] rounded-2xl p-2 border border-white/10">
                                    <input
                                        className="w-full bg-transparent border-none p-4 text-lg focus:ring-0"
                                        placeholder="🔍 Buscar producto..."
                                        value={productSearch}
                                        onChange={(e) =>
                                            setProductSearch(e.target.value)
                                        }
                                    />
                                    <div className="px-2 pb-2">
                                        {filteredProducts.map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => addToCart(p)}
                                                disabled={p.stock <= 0}
                                                className="w-full p-4 flex justify-between bg-white/5 rounded-xl mb-2 disabled:opacity-30"
                                            >
                                                <div className="text-left">
                                                    <p className="font-medium">
                                                        {p.name}
                                                    </p>
                                                    <p className="text-[10px] text-gray-500">
                                                        Stock: {p.stock}
                                                    </p>
                                                </div>
                                                <span className="font-black text-[#30d158]">
                                                    ${p.price}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* CARRITO CON CONTROLES DE CANTIDAD */}
                                <div className="space-y-2">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5"
                                        >
                                            <div className="flex justify-between items-center mb-3">
                                                <p className="font-bold text-[17px]">
                                                    {item.name}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                    className="text-[#ff453a] text-xs font-black px-2"
                                                >
                                                    QUITAR
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center bg-black/30 rounded-xl p-1 border border-white/5">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                -1,
                                                            )
                                                        }
                                                        className="w-10 h-10 flex items-center justify-center text-2xl font-bold text-[#0a84ff] active:bg-white/10 rounded-lg"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-12 text-center font-black text-lg">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                1,
                                                            )
                                                        }
                                                        className="w-10 h-10 flex items-center justify-center text-2xl font-bold text-[#0a84ff] active:bg-white/10 rounded-lg"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <p className="font-black text-[#30d158] text-lg">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3 pb-44">
                                {selectedClient.movements?.map((m) => (
                                    <div
                                        key={m.id}
                                        className="bg-[#1c1c1e] p-5 rounded-2xl border border-white/5 flex justify-between items-center"
                                    >
                                        <div className="flex-1 pr-4">
                                            <p className="text-[11px] text-gray-400 font-bold mb-1">
                                                {new Date(
                                                    m.created_at,
                                                ).toLocaleDateString()}
                                            </p>
                                            <p className="font-bold text-lg text-white leading-tight">
                                                {m.description}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p
                                                className={`font-black text-xl ${m.type === "debt" ? "text-[#ff9f0a]" : "text-[#30d158]"}`}
                                            >
                                                {m.type === "debt"
                                                    ? `+$${m.amount}`
                                                    : `-$${m.amount}`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {selectedClient && (
                <footer className="fixed bottom-10 left-4 right-4 max-w-md mx-auto z-50">
                    <div className="bg-[#1c1c1e]/80 backdrop-blur-3xl p-5 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <div className="flex justify-between items-center mb-5 px-3">
                            <span className="text-gray-400 font-bold text-sm uppercase">
                                {view === "debt" ? "Total Compra" : "Saldo"}
                            </span>
                            <span
                                className={`text-3xl font-black ${view === "debt" ? "text-[#ff9f0a]" : "text-[#30d158]"}`}
                            >
                                $
                                {view === "debt"
                                    ? totalCart.toLocaleString()
                                    : selectedClient.balance || "0.00"}
                            </span>
                        </div>
                        <button
                            onClick={
                                view === "debt"
                                    ? handleSaveDebt
                                    : handleRegisterPayment
                            }
                            disabled={view === "debt" && cart.length === 0}
                            className={`w-full py-5 rounded-[1.5rem] font-black text-xl active:scale-95 disabled:opacity-20 ${view === "debt" ? "bg-[#0a84ff]" : "bg-[#30d158]"}`}
                        >
                            {view === "debt" ? "GUARDAR" : "COBRAR"}
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );
}
