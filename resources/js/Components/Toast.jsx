import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Toast() {
    const { flash, errors } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success"); // success, error

    useEffect(() => {
        const handleCustomEvent = (event) => {
            setMessage(event.detail.message);
            setType(event.detail.type || "success");
            setVisible(true);
        };

        window.addEventListener('toast-show', handleCustomEvent);

        if (flash.success) {
            setMessage(flash.success);
            setType("success");
            setVisible(true);
        } else if (flash.error) {
            setMessage(flash.error);
            setType("error");
            setVisible(true);
        } else if (Object.keys(errors).length > 0) {
            setMessage("Corrija los errores en el formulario.");
            setType("error");
            setVisible(true);
        }

        return () => window.removeEventListener('toast-show', handleCustomEvent);
    }, [flash, errors]);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs px-4 animate-fade-in-down">
            <div
                className={`${type === "error" ? "bg-[#ff453a]" : "bg-[#30d158]"
                    } text-white p-4 rounded-2xl shadow-2xl text-center font-bold border border-white/20 transition-all transform duration-300`}
            >
                {message}
            </div>
        </div>
    );
}
