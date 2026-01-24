import React, { useState, useMemo, useEffect } from "react";
import { Head, router } from "@inertiajs/react";

export default function ProviderAccount({ products, providers }) {
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [providerSearch, setProviderSearch] = useState("");
    const [productSearch, setProductSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [view, setView] = useState("debt"); // 'debt' (compra) o 'history' (historial/pagos)
    const [isCreating, setIsCreating] = useState(false);
    const [notification, setNotification] = useState(null);

    // Estado para el modal de pago
    const [paymentModal, setPaymentModal] = useState({ show: false, amount: "" });
    const [paymentMethod, setPaymentMethod] = useState("Efectivo");

    const [newProvider, setNewProvider] = useState({ name: "", cuit: "", phone: "" });

    // Actualizar proveedor seleccionado si cambian las props
    useEffect(() => {
        if (selectedProvider) {
            const updated = providers.find((p) => p.id === selectedProvider.id);
            if (updated) setSelectedProvider(updated);
        }
    }, [providers]);

    const filteredProviders = useMemo(() => {
        if (providerSearch.length < 1) return [];
        return providers.filter((p) =>
            p.name.toLowerCase().includes(providerSearch.toLowerCase()) ||
            (p.cuit && p.cuit.includes(providerSearch))
        ).slice(0, 5);
    }, [providerSearch, providers]);

    const totalCart = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

    // --- ACCIONES ---

    const handleSavePurchase = () => {
        if (cart.length === 0) return;
        router.post(route("providers.add-purchase", selectedProvider.id), {
            items: cart,
            total_amount: totalCart
        }, {
            onSuccess: () => {
                setCart([]);
                setView("history");
                setNotification({ msg: "Compra registrada al proveedor", type: "success" });
            },
        });
    };

    const handleRegisterPayment = () => {
        const amount = parseFloat(paymentModal.amount);
        if (!amount || amount <= 0) return;

        router.post(route("providers.add-payment", selectedProvider.id), {
            amount: amount,
            method: paymentMethod // Enviamos el método: Efectivo, Transferencia, Tarjeta
        }, {
            onSuccess: () => {
                setPaymentModal({ show: false, amount: "" });
                setNotification({ msg: `Pago de $${amount} registrado`, type: "success" });
            },
        });
    };

    return (
        <div className="bg-black min-h-screen text-white font-sans pb-44">
            <Head title="Gestión de Proveedores" />

            {/* Notificaciones similares a iOS */}
            {notification && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs px-4">
                    <div className={`${notification.type === "error" ? "bg-[#ff453a]" : "bg-[#30d158]"} text-white p-4 rounded-2xl shadow-2xl text-center font-bold border border-white/20`}>
                        {notification.msg}
                    </div>
                </div>
            )}

            <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10 px-4 pt-10 pb-4">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <button onClick={() => selectedProvider ? setSelectedProvider(null) : window.history.back()} className="text-[#0a84ff] text-lg flex items-center">
                        <span className="text-2xl mr-1">‹</span> Atrás
                    </button>
                    <h1 className="text-[17px] font-semibold text-center">Cuentas Proveedores</h1>
                    <button onClick={() => setSelectedProvider(null)} className="text-[#0a84ff] text-[17px]">Inicio</button>
                </div>
            </header>

            <main className="max-w-md mx-auto px-4 mt-6">
                {!selectedProvider ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-end px-1">
                            <h2 className="text-3xl font-bold tracking-tight">Proveedores</h2>
                            <button onClick={() => setIsCreating(!isCreating)} className="text-[#0a84ff] font-medium text-lg">
                                {isCreating ? "Cancelar" : "Nuevo"}
                            </button>
                        </div>

                        {isCreating ? (
                            <div className="bg-[#1c1c1e] rounded-2xl p-4 space-y-4 border border-white/5">
                                <input className="w-full bg-[#2c2c2e] rounded-xl p-4 outline-none" placeholder="Razón Social / Nombre" value={newProvider.name} onChange={e => setNewProvider({...newProvider, name: e.target.value})} />
                                <input className="w-full bg-[#2c2c2e] rounded-xl p-4 outline-none" placeholder="CUIT" value={newProvider.cuit} onChange={e => setNewProvider({...newProvider, cuit: e.target.value})} />
                                <button className="w-full bg-[#0a84ff] py-4 rounded-xl font-bold" onClick={() => {/* logic to save provider */}}>Guardar Proveedor</button>
                            </div>
                        ) : (
                            <div className="bg-[#1c1c1e] rounded-xl flex items-center px-4 py-3 border border-white/10">
                                <span className="mr-2">🔍</span>
                                <input className="bg-transparent border-none w-full text-white focus:ring-0 text-lg" placeholder="Buscar Proveedor..." value={providerSearch} onChange={e => setProviderSearch(e.target.value)} />
                            </div>
                        )}

                        <div className="space-y-2">
                            {filteredProviders.map(p => (
                                <button key={p.id} onClick={() => setSelectedProvider(p)} className="w-full p-4 bg-[#1c1c1e] rounded-2xl text-left flex justify-between items-center border border-white/5">
                                    <div>
                                        <p className="text-lg font-bold">{p.name}</p>
                                        <p className="text-xs text-gray-500 font-bold uppercase">CUIT: {p.cuit}</p>
                                    </div>
                                    <span className="text-gray-600 text-2xl">›</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* CARD DEL PROVEEDOR */}
                        <div className="bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e] p-6 rounded-3xl border border-white/10 shadow-2xl">
                            <p className="text-[#0a84ff] text-xs font-black uppercase tracking-widest mb-1">Proveedor Seleccionado</p>
                            <h2 className="text-3xl font-bold">{selectedProvider.name}</h2>
                            <div className="mt-4 inline-block bg-black/40 px-4 py-3 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-gray-400 uppercase font-bold">Saldo a Pagar</p>
                                <p className="text-2xl font-black text-[#ff9f0a]">
                                    ${selectedProvider.balance || "0.00"}
                                </p>
                            </div>
                        </div>

                        {/* SELECTOR DE VISTA */}
                        <div className="bg-[#1c1c1e] p-1 rounded-xl flex border border-white/5">
                            <button onClick={() => setView("debt")} className={`flex-1 py-2 text-sm font-bold rounded-lg ${view === "debt" ? "bg-[#636366]" : "text-gray-500"}`}>Anotar Factura</button>
                            <button onClick={() => setView("history")} className={`flex-1 py-2 text-sm font-bold rounded-lg ${view === "history" ? "bg-[#636366]" : "text-gray-500"}`}>Historial de Pagos</button>
                        </div>

                        {view === "history" ? (
                            <div className="space-y-3">
                                {selectedProvider.movements?.map((m) => (
                                    <div key={m.id} className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                                        <div>
                                            <p className="text-[11px] text-gray-500 font-bold">{new Date(m.created_at).toLocaleDateString()}</p>
                                            <p className="font-bold">{m.description}</p>
                                            {m.method && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400">{m.method}</span>}
                                        </div>
                                        <p className={`font-black text-lg ${m.type === 'purchase' ? 'text-[#ff453a]' : 'text-[#30d158]'}`}>
                                            {m.type === 'purchase' ? `+$${m.amount}` : `-$${m.amount}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                           <div className="text-center py-10 text-gray-500">
                               {/* Aquí iría la lógica de búsqueda de productos/herramientas igual a tu código original */}
                               <p>Interfaz de carga de productos...</p>
                           </div>
                        )}
                    </div>
                )}
            </main>

            {/* MODAL DE TRES FORMAS DE PAGO (Solo se muestra al querer "Pagar") */}
            {paymentModal.show && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4">
                    <div className="bg-[#1c1c1e] w-full max-w-md rounded-[2.5rem] p-6 border border-white/10 animate-in fade-in slide-in-from-bottom-10">
                        <h3 className="text-xl font-bold mb-4 text-center">Registrar Pago</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase ml-2">Monto</label>
                                <input
                                    autoFocus
                                    type="number"
                                    className="w-full bg-[#2c2c2e] rounded-2xl p-4 text-2xl font-black outline-none border border-white/5 focus:border-[#30d158]"
                                    value={paymentModal.amount}
                                    onChange={e => setPaymentModal({...paymentModal, amount: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {["Efectivo", "Transferencia", "Tarjeta"].map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setPaymentMethod(m)}
                                        className={`py-3 rounded-xl text-xs font-bold border transition-all ${paymentMethod === m ? 'bg-[#30d158] border-transparent text-black' : 'bg-transparent border-white/10 text-gray-400'}`}
                                    >
                                        {m}
                                    </button>
                                Arabo                                ))}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button onClick={() => setPaymentModal({show: false, amount: ""})} className="flex-1 py-4 font-bold text-gray-500">Cancelar</button>
                                <button onClick={handleRegisterPayment} className="flex-1 py-4 bg-[#30d158] rounded-2xl font-black text-black">CONFIRMAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FOOTER ACCIÓN */}
            {selectedProvider && (
                <footer className="fixed bottom-10 left-4 right-4 max-w-md mx-auto z-50">
                    <div className="bg-[#1c1c1e]/80 backdrop-blur-3xl p-5 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <button
                            onClick={() => view === "debt" ? handleSavePurchase() : setPaymentModal({show: true, amount: ""})}
                            className={`w-full py-5 rounded-[1.5rem] font-black text-xl active:scale-95 ${view === "debt" ? "bg-[#0a84ff]" : "bg-[#30d158] text-black"}`}
                        >
                            {view === "debt" ? "GUARDAR COMPRA" : "REGISTRAR PAGO"}
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );
}
