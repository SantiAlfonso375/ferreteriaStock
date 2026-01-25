import { Link } from "@inertiajs/react";
export default function ActionElement({ href, text, classAction }) {
    return (
        <Link
            href={route(href)}
            className={`px-8 py-3 bg-blue-600 backdrop-blur-[2px] text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 ${classAction}`}
        >
            {text}
        </Link>
    );
}
