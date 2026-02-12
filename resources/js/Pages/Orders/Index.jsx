import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";

export default function Index() {
    const [newItem, setNewItem] = useState({ name: "", quantity: 1 });
    const { data, setData, post, processing, errors } = useForm({
        supplier: "",
        items: [],
    });

    const addItem = () => {
        if (!newItem.name || newItem.quantity < 1) return;
        setData("items", [...data.items, { ...newItem, id: Date.now() }]);
        setNewItem({ name: "", quantity: 1 });
    };

    const removeItem = (id) => {
        setData("items", data.items.filter((i) => i.id !== id));
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            // Using window.axios (defined in bootstrap.js) to handle direct download
            const response = await window.axios.post(route("orders.pdf"), data, {
                responseType: 'blob'
            });

            // Create a blob URL and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `pedido-${data.supplier.replace(/\s+/g, '-')}-${new Date().toLocaleDateString('es-AR').replace(/\//g, '-')}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.dispatchEvent(new CustomEvent('toast-show', { detail: { message: "Documento generado", type: "success" } }));

            // Reset the form after successful generation
            setData({
                supplier: "",
                items: [],
            });
        } catch (error) {
            console.error("PDF Error:", error);
            window.dispatchEvent(new CustomEvent('toast-show', { detail: { message: "Error al generar el PDF", type: "error" } }));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Nuevo Pedido" />

            <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-['-apple-system','BlinkMacSystemFont','SF_Pro_Display','Helvetica_Neue',Arial,sans-serif] selection:bg-[#0a84ff]/30 pb-32">
                {/* Header Estilo iOS/macOS */}
                <header className="sticky top-0 z-50 bg-[#121212]/70 backdrop-blur-3xl border-b border-white/10 px-6 py-4">
                    <div className="max-w-xl mx-auto flex items-center justify-between">
                        <button
                            onClick={() => window.history.back()}
                            className="text-[#0a84ff] hover:text-[#409cff] transition-colors flex items-center group"
                        >
                            <span className="text-2xl mr-1 group-active:scale-90 transition-transform">‹</span>
                            <span className="font-medium">Atrás</span>
                        </button>
                        <h1 className="text-lg font-bold tracking-tight">Nuevo Pedido</h1>
                        <div className="w-12"></div>
                    </div>
                </header>

                <main className="max-w-xl mx-auto px-6 mt-10 space-y-10">
                    <form onSubmit={submit} className="space-y-10">
                        {/* SECCIÓN PROVEEDOR */}
                        <section className="space-y-3">
                            <h2 className="text-[#86868b] text-[13px] font-semibold uppercase tracking-wider ml-4">Proveedor</h2>
                            <div className="bg-[#1c1c1e]/60 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl">
                                <input
                                    className="w-full bg-[#2c2c2e]/50 rounded-xl p-4 transition-all focus:bg-[#2c2c2e]/80 focus:ring-2 focus:ring-[#0a84ff]/50 outline-none text-xl font-medium border border-transparent placeholder:text-gray-600"
                                    placeholder="Nombre del proveedor..."
                                    value={data.supplier}
                                    onChange={(e) => setData("supplier", e.target.value)}
                                    required
                                />
                                {errors.supplier && <p className="text-[#ff453a] text-xs mt-2 ml-1 animate-pulse font-medium">{errors.supplier}</p>}
                            </div>
                        </section>

                        {/* SECCIÓN AGREGAR ITEM */}
                        <section className="space-y-3">
                            <h2 className="text-[#86868b] text-[13px] font-semibold uppercase tracking-wider ml-4">Agregar Herramienta</h2>
                            <div className="bg-[#1c1c1e]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl space-y-5">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        className="flex-1 bg-[#2c2c2e]/50 rounded-xl p-4 transition-all focus:bg-[#2c2c2e]/80 focus:ring-2 focus:ring-[#0a84ff]/50 outline-none text-lg border border-transparent placeholder:text-gray-600"
                                        placeholder="Descripción o código..."
                                        value={newItem.name}
                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
                                    />
                                    <div className="flex items-center gap-3">
                                        <label className="text-sm font-medium text-gray-400 sm:hidden">Cantidad:</label>
                                        <input
                                            type="number"
                                            className="w-full sm:w-28 bg-[#2c2c2e]/50 rounded-xl p-4 transition-all focus:bg-[#2c2c2e]/80 focus:ring-2 focus:ring-[#0a84ff]/50 outline-none text-lg border border-transparent text-center"
                                            value={newItem.quantity}
                                            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="w-full bg-[#0a84ff] py-4 rounded-xl font-bold text-[#ffffff] hover:bg-[#409cff] active:scale-[0.98] transition-all shadow-[0_10px_30px_-10px_rgba(10,132,255,0.4)]"
                                >
                                    ＋ Añadir a la Lista
                                </button>
                            </div>
                        </section>

                        {/* LISTA DE ITEMS */}
                        <section className="space-y-3">
                            <div className="flex justify-between items-center ml-4">
                                <h2 className="text-[#86868b] text-[13px] font-semibold uppercase tracking-wider">Detalle del Pedido</h2>
                                <span className="text-[#0a84ff] text-[13px] font-medium">{data.items.length} items</span>
                            </div>

                            <div className="bg-[#1c1c1e]/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner min-h-[140px] overflow-hidden">
                                {data.items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 opacity-40">
                                        <span className="text-4xl mb-3">📋</span>
                                        <p className="text-sm italic">Lista vacía</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-white/5">
                                        {data.items.map((item) => (
                                            <div key={item.id} className="p-5 flex justify-between items-center group hover:bg-white/5 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-lg">{item.name}</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="bg-[#0a84ff]/10 text-[#0a84ff] text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Cantidad</span>
                                                        <span className="text-gray-400 font-medium">{item.quantity}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="bg-[#ff453a]/10 hover:bg-[#ff453a]/20 text-[#ff453a] p-3 rounded-full active:scale-90 transition-all opacity-40 group-hover:opacity-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.items && <p className="text-[#ff453a] text-xs mt-2 ml-4 font-medium">{errors.items}</p>}
                        </section>

                        {/* BOTÓN FINAL */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing || data.items.length === 0}
                                className="w-full bg-gradient-to-r from-[#0a84ff] to-[#409cff] py-5 rounded-2xl font-black text-xl text-white hover:shadow-[0_15px_40px_-10px_rgba(10,132,255,0.5)] active:scale-[0.97] disabled:opacity-20 disabled:grayscale disabled:scale-100 transition-all shadow-xl flex items-center justify-center gap-3 group"
                            >
                                <span className="group-hover:translate-y-[-2px] transition-transform font-[900]">GENERAR PDF</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                            <p className="text-center text-[#86868b] text-[11px] mt-4 font-medium uppercase tracking-widest italic opacity-50">Ferretería El Mallín • Sistema de Gestión</p>
                        </div>
                    </form>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}

