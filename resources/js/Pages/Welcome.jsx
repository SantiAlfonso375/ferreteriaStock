import ActionElement from "@/Components/ActionElement";
import CardDescritpion from "@/Components/CardDescription";
import { Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
    const appName = "Ferretería El Mallín";
    const features = [
        {
            title: "Control de Stock",
            description:
                "Gestiona tu inventario en tiempo real, con alertas de bajo stock para reposición.",
            icon: "/images/bx-time-five.svg",
        },
        {
            title: "Reportes y Precios",
            description:
                "Visualiza informes de ventas, productos populares y ajusta precios fácilmente.",
            icon: "/images/bx-dollar-circle.svg",
        },
        {
            title: "Simple y Rápido",
            description:
                "Interfaz intuitiva y optimizada para que tu negocio nunca pare.",
            icon: "/images/bx-bolt-circle.svg",
        },
    ];

    return (
        <>
            <Head title="Bienvenido a Ferretería El Mallín" />

            <div className="relative min-h-screen bg-[#0f131a] selection:bg-[#0a84ff] selection:text-white font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] overflow-x-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0a84ff] opacity-10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ff9f0a] opacity-5 blur-[120px] rounded-full"></div>

                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
                    {/* Logo Estilo App Icon */}
                    <div className="mb-8 relative">
                        <div className="absolute inset-0 bg-white opacity-20 blur-2xl rounded-full"></div>
                        <img
                            src="../images/Background.svg"
                            alt="Logo"
                            className="relative w-40 h-40 sm:w-48 sm:h-48 object-contain rounded-[35px] shadow-2xl border border-white/10"
                        />
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Bienvenido a <br className="sm:hidden" />
                        <span className="text-[#0a84ff]"> {appName}</span>
                    </h1>

                    <p className="text-[#8e8e93] text-lg sm:text-xl mb-10 max-w-xl font-medium">
                        La solución inteligente para el control total de tu
                        ferretería.
                    </p>

                    {/* Botones de Login / Register */}
                    <div className="w-full max-w-sm flex flex-col space-y-4 mb-20">
                        {!auth.user ? (
                            <>
                                <ActionElement
                                    href="login"
                                    text="Iniciar Sesión"
                                    className="!bg-[#0a84ff] !text-white !rounded-[15px] !py-4 !text-lg !font-semibold !shadow-lg active:scale-95 transition-transform"
                                />
                                {/* <ActionElement
                                    href="register"
                                    text="Registrarse"
                                    className="!bg-white/10 !text-white !backdrop-blur-md !border !border-white/10 !rounded-[15px] !py-4 !text-lg !font-semibold active:bg-white/20 transition-all"
                                />*/}
                            </>
                        ) : (
                            <ActionElement
                                href="dashboard"
                                text="Ir al Inventario"
                                className="!bg-[#ff9f0a] !text-black !rounded-[15px] !py-4 !text-lg !font-bold !shadow-lg active:scale-95 transition-transform"
                            />
                        )}
                    </div>

                    {/* Sección de Características */}
                    <section className="w-full max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {features.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 text-left hover:bg-white/10 transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-[#0a84ff]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <img
                                            src={item.icon}
                                            className="w-6 h-6 invert"
                                            alt="icon"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#8e8e93] leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Footer*/}
                    <footer className="mt-20 pb-10 text-[#48484a] text-sm">
                        <p>
                            Developed by{" "}
                            <a
                                href="https://www.linkedin.com/in/ngsanti/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#8e8e93] hover:text-[#0a84ff] transition-colors font-medium"
                            >
                                Santiago Alfonso
                            </a>
                            <span> &copy; 2026</span>
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}
