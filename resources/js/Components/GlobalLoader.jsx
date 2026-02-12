import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Spinner from "@/Components/Spinner";

export default function GlobalLoader() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const startListener = router.on("start", () => {
            setIsLoading(true);
        });

        const finishListener = router.on("finish", () => {
            setIsLoading(false);
        });

        return () => {
            // Clean up listeners if needed, though Inertia handles this well.
            // router.off('start', startListener); // router.on returns the unregister function in newer versions? 
            // Checking documentation, router.on returns void in v1. 
            // Actually router.on returns a cleanup function in v1.0+.
            startListener();
            finishListener();
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-[#1c1c1e] p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center">
                <Spinner className="w-10 h-10 mb-2" />
                <span className="text-white font-medium text-sm">Cargando...</span>
            </div>
        </div>
    );
}
