import CardDescritpion from "@/Components/CardDescription";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const appName = "Ferretería El Mallin"; // Nombre de tu app
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
            <Head title="Bienvenido a Ferretería El Mallin" />

            <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 selection:bg-blue-500 selection:text-white">
                {/* Contenido principal - Hero Section */}
                <div className="flex items-center justify-center min-h-screen flex-col p-6 text-center">
                    <img
                        src="../images/Background.svg"
                        alt="Logo de Ferretería"
                        className=" mb-6 w-56 h-56 object-contain rounded-full"
                    />
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Bienvenido a{" "}
                        <span className="text-blue-600">{appName}</span>
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl"></p>

                    {/* Botones de Login / Register */}
                    {!auth.user ? (
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                            <Link
                                href={route("login")}
                                className="px-8 py-3 bg-blue-600 backdrop-blur-[2px] text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-8 py-3 bg-gray-200 text-gray-800 font-bold text-lg rounded-lg shadow-lg hover:bg-gray-300 transition duration-300 transform hover:scale-105"
                            >
                                Registrarse
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href={route("dashboard")}
                            className="px-8 py-3 bg-blue-600 backdrop-blur-[2px] text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                        >
                            Ir al Inventario de El Mallín
                        </Link>
                    )}

                    {/* Sección de Características / Detalles */}
                    <section className="py-4 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {features.map((item, index) => (
                                <CardDescritpion
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    iconPath={item.icon}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="flex justify-center mt-12 px-0 sm:items-center sm:justify-between">
                        <div className="ms-4 text-center text-md text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0">
                            Developed by{" "}
                            <a
                                href="https://www.linkedin.com/in/ngsanti/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white"
                            >
                                Santiago Alfonso
                            </a>
                            <spam> &copy;2026</spam>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
