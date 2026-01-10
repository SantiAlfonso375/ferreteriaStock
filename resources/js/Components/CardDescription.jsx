export default function CardDescritpion({
    title,
    description,
    iconPath,
    iconAlt = "Icon",
}) {
    return (
        <div className="bg-white/30 dark:bg-grackdrop-blur-md dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4">
                <img
                    src={iconPath}
                    alt={iconAlt}
                    className="w-12 h-12 object-contain rounded-full bg-gray-100 dark:bg-gray-700 p-2"
                />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-center">
                {description}
            </p>
        </div>
    );
}
