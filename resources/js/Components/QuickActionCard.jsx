import { Link } from "@inertiajs/react";

export default function QuickActionCard({
    href = "#",
    icon,
    title,
    description,
    variant = "light", // 'light' o 'dark'
    iconBgColor = "bg-gray-100",
    iconColor = "text-gray-600",
}) {
    // Estilos base según la variante
    const baseStyles =
        variant === "dark"
            ? "bg-gradient-to-br from-[#402565] to-[#2D1B4E] text-white shadow-lg"
            : "bg-white text-gray-800 shadow-md border border-gray-100";

    const titleColor = variant === "dark" ? "text-white" : "text-gray-800";
    const descColor = variant === "dark" ? "text-gray-300" : "text-gray-500";

    return (
        <Link
            href={href.startsWith("http") || href === "#" ? href : route(href)}
            className={`${baseStyles} p-4 rounded-3xl cursor-pointer hover:scale-105 transition-transform flex flex-col`}
        >
            <div
                className={`${iconBgColor} ${iconColor} w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-xl`}
            >
                {icon}
            </div>
            <h3 className={`font-bold text-sm ${titleColor}`}>{title}</h3>
            <p className={`text-[10px] ${descColor}`}>{description}</p>
        </Link>
    );
}
