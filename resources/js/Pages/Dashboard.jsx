import QuickActionCard from "@/Components/QuickActionCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ products = [] }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState("");

    const stockAlerts = products.filter((product) => product.stock <= 5);
    const urgentCount = stockAlerts.filter((p) => p.stock === 0).length;

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.sku.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <AuthenticatedLayout>
            <Head title="Ferretería El Mallín" />

            <div className="min-h-screen bg-[#0f131a] text-white font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] pb-24">
                <div className="px-6 pt-12 pb-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-[#8e8e93] text-[13px] font-semibold uppercase tracking-wider">
                                {auth.user.role === "admin"
                                    ? "Administrador"
                                    : "Empleado"}
                            </p>
                            <h1 className="text-[34px] font-bold tracking-tight leading-tight">
                                Hola, {auth.user.name.split(" ")[0]}
                            </h1>
                        </div>
                        <div className="w-10 h-10 bg-[#2c2c2e] rounded-full flex items-center justify-center border border-[#38383a]">
                            <span className="text-sm">👤</span>
                        </div>
                    </div>
                    <p className="text-[#8e8e93] text-[15px]">
                        Ferretería El Mallín
                    </p>
                </div>
                {/* BUSCADOR ESTILO */}
                <div className="px-6 mb-8">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-[#8e8e93] mr-4">🔍</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar herramientas..."
                            className="w-full bg-transparent border-t-slate-900 text-[17px] rounded-[12px] py-3 pl-10 pr-12 focus:ring-0 focus:ring-[#0a84ff] placeholder:text-[#8e8e93] transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center border-l border-[#38383a] my-2">
                            <img
                                src="../images/bx-barcode-reader.svg"
                                alt="Escanear"
                                className="h-5 w-5 opacity-50 ml-2"
                            />
                        </div>
                    </div>
                </div>
                {/* RESULTADOS DE BÚSQUEDA FLOTANTES */}
                {search.length > 0 && (
                    <div className="px-6 absolute z-20 w-full -mt-6">
                        <div className="bg-[#1c1c1e]/90 backdrop-blur-xl rounded-[14px] shadow-2xl border border-[#38383a] max-h-64 overflow-y-auto divide-y divide-[#38383a]">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="p-4 flex justify-between items-center active:bg-[#2c2c2e]"
                                >
                                    <div>
                                        <p className="text-[17px] font-medium">
                                            {product.name}
                                        </p>
                                        <p className="text-[13px] text-[#8e8e93]">
                                            CODIGO: {product.sku}
                                        </p>
                                    </div>
                                    <p className="text-[#ff9f0a] font-bold">
                                        ${product.price}
                                    </p>
                                </div>
                            ))}
                            <section className="flex justify-center items-center py-10">
                                No se encontraron más productos
                            </section>
                        </div>
                    </div>
                )}
                {/* GRID DE ACCIONES RÁPIDAS */}
                <div className="px-6 mb-10">
                    <h2 className="text-[13px] text-[#8e8e93] uppercase font-semibold mb-3 ml-1 tracking-wider">
                        Acciones Rápidas
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <QuickActionCard
                            variant="dark"
                            icon="🛒"
                            iconBgColor="bg-white"
                            title="Venta"
                            description="Nueva factura"
                            href="sales.cart"
                            className="!rounded-[20px] !bg-[#1c1c1e] !border-none !shadow-none active:scale-95 transition-transform"
                        />
                        <QuickActionCard
                            icon="🏷️"
                            iconBgColor="bg-[#0a84ff]"
                            title="Inventario"
                            description="Actualizar stock, precios..."
                            href="inventory.update"
                            className="!rounded-[20px] !bg-[#1c1c1e] !border-none !shadow-none active:scale-95 transition-transform"
                        />
                        <QuickActionCard
                            icon="👤"
                            iconBgColor="bg-[#af52de]"
                            title="Clientes"
                            description="Registrar"
                            href="account.index"
                            className="!rounded-[20px] !bg-[#1c1c1e] !border-none !shadow-none active:scale-95 transition-transform"
                        />
                        <QuickActionCard
                            icon="📦"
                            iconBgColor="bg-[#ff9f0a]"
                            title="Cargar"
                            description="Nuevos productos"
                            href="products.index"
                            className="!rounded-[20px] !bg-[#1c1c1e] !border-none !shadow-none active:scale-95 transition-transform"
                        />
                        <QuickActionCard
                            icon="🚚"
                            iconBgColor="bg-[#30d158]"
                            title="Pedidos"
                            description="Generar PDF"
                            href="orders.index"
                            className="!rounded-[20px] !bg-[#1c1c1e] !border-none !shadow-none active:scale-95 transition-transform"
                        />
                    </div>
                </div>
                {/* ALERTAS DE REPOSICIÓN DINÁMICAS */}
                <div className="px-6">
                    <div className="flex justify-between items-end mb-3 ml-1">
                        <h2 className="text-[13px] text-[#8e8e93] uppercase font-semibold tracking-wider">
                            Alertas de Stock
                        </h2>
                        {urgentCount > 0 && (
                            <span className="text-[#ff453a] text-[12px] font-bold animate-pulse">
                                {urgentCount} URGENTES
                            </span>
                        )}
                    </div>

                    <div className="bg-[#1c1c1e] rounded-[14px] overflow-hidden divide-y divide-[#38383a]">
                        {stockAlerts.length > 0 ? (
                            stockAlerts.slice(0, 100).map((product) => {
                                // Mostramos solo las primeras 5 alertas
                                const isOut = product.stock === 0;
                                const color = isOut ? "#ff453a" : "#ff9f0a";

                                return (
                                    <div
                                        key={product.id}
                                        className="p-4 flex items-center justify-between active:bg-[#2c2c2e] transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            ></div>
                                            <div>
                                                <h4 className="text-[17px] font-medium leading-tight">
                                                    {product.name}
                                                </h4>
                                                <p className="text-[13px] text-[#8e8e93] mt-0.5">
                                                    SKU: {product.sku}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p
                                                className="text-[15px] font-semibold"
                                                style={{ color: color }}
                                            >
                                                {isOut
                                                    ? "Sin Stock"
                                                    : "Bajo Stock"}
                                            </p>
                                            <p className="text-[13px] text-[#8e8e93]">
                                                {product.stock} un.
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-8 text-center text-[#8e8e93] text-sm italic">
                                ✅ Todo el stock está al día
                            </div>
                        )}
                    </div>
                </div>{" "}
            </div>
        </AuthenticatedLayout>
    );
}
