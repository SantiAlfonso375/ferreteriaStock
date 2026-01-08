import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const appName = "Ferretería El Mallin"; // Nombre de tu app

    return (
        <>
            <Head title="Bienvenido a Ferretería El Mallin" />

            <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 selection:bg-blue-500 selection:text-white">
                {/* Navbar (Opcional, si el usuario está logueado) */}
                {/* <div className="absolute top-0 right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                        >
                            Panel de Control
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                            >
                                Iniciar Sesión
                            </Link>

                            <Link
                                href={route("register")}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>*/}

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
                    {!auth.user && (
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                            <Link
                                href={route("login")}
                                className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
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
                    )}

                    {/* Sección de Características / Detalles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-6">
                        {/* Característica 1 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center text-blue-500 text-4xl mb-4">
                                {/* Ícono de inventario */}
                                <img
                                    src="../images/bx-time-five.svg"
                                    alt="Logo de inventario"
                                    className="w-10 h-10 object-contain rounded-full"
                                ></img>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Control de Stock
                            </h3>
                            <p className="text-gray-700 dark:text-gray-400">
                                Gestiona tu inventario en tiempo real, con
                                alertas de bajo stock para reposición.
                            </p>
                        </div>

                        {/* Característica 2 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center text-green-500 text-4xl mb-4">
                                {/* Ícono de reportes */}

                                <img
                                    src="../images/bx-dollar-circle.svg"
                                    alt="Logo de inventario"
                                    className="w-10 h-10 object-contain rounded-full"
                                ></img>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Reportes y Precios
                            </h3>
                            <p className="text-gray-700 dark:text-gray-400">
                                Visualiza informes de ventas, productos
                                populares y ajusta precios fácilmente.
                            </p>
                        </div>

                        {/* Característica 3 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center text-yellow-500 text-4xl mb-4">
                                {/* Ícono de facilidad de uso */}
                                <img
                                    src="../images/bx-bolt-circle.svg"
                                    alt="Logo de inventario"
                                    className="w-10 h-10 object-contain rounded-full"
                                ></img>{" "}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Simple y Rápido
                            </h3>
                            <p className="text-gray-700 dark:text-gray-400">
                                Interfaz intuitiva y optimizada para que tu
                                negocio nunca pare.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-center mt-12 px-0 sm:items-center sm:justify-between">
                        <div className="ms-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0">
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
