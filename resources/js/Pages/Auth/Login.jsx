import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };
    const [showPassword, setShowPassword] = useState(false);

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            <div className="min-h-screen bg-[#0f131a] flex flex-col justify-center items-center p-6 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
                {/* Logo o Icono de Llave */}
                <div className="mb-8 w-20 h-20 bg-gradient-to-tr from-[#0a84ff] to-[#5e5ce6] rounded-[22px] flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <span className="text-4xl">
                        <Link href="/">🔐</Link>
                    </span>
                </div>

                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-white text-center mb-2 tracking-tight">
                        Ferretería El Mallín
                    </h1>
                    <p className="text-[#8e8e93] text-center mb-8">
                        Ingresa tus credenciales
                    </p>

                    {status && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-[14px] text-sm font-medium text-green-400 text-center">
                            {status}
                        </div>
                    )}

                    {/* TARJETA */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-2xl">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Input Email */}
                            <div>
                                <label className="block text-[13px] font-semibold text-[#8e8e93] uppercase tracking-wider mb-2 ml-1">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full !bg-white/5 !border-white/10 !text-white !rounded-[12px] !py-3 focus:!ring-[#0a84ff] focus:!bg-white/10 transition-all placeholder:text-[#48484a]"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="ejemplo@correo.com"
                                    />
                                </div>
                                <InputError
                                    message={errors.email}
                                    className="mt-2 text-[#ff453a]"
                                />
                            </div>

                            {/* Input Password */}
                            <div>
                                <label className="block text-[13px] font-semibold text-[#8e8e93] uppercase tracking-wider mb-2 ml-1">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        // Si showPassword es true, el tipo es "text" (se ve). Si es false, es "password" (puntos).
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={data.password}
                                        className="w-full !bg-white/5 !border-white/10 !text-white !rounded-[12px] !py-3 !pr-12 focus:!ring-[#0a84ff] transition-all"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="••••••••"
                                    />

                                    {/* Este botón cambia el estado de true a false y viceversa */}
                                    <button
                                        type="button" // IMPORTANTE: para que no envíe el formulario al tocarlo
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xl opacity-60 hover:opacity-100 transition-opacity"
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-[#ff453a]"
                                />
                            </div>

                            {/* Remember me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked,
                                            )
                                        }
                                        className="!rounded-full !border-white/20 !bg-white/5 text-[#0a84ff] focus:ring-[#0a84ff]"
                                    />
                                    <span className="ms-2 text-sm text-[#8e8e93] group-hover:text-white transition-colors">
                                        Recordarme
                                    </span>
                                </label>

                                {/* {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-[#0a84ff] hover:text-[#5e5ce6] transition-colors font-medium"
                                    >
                                        ¿Olvidaste tu clave?
                                    </Link>
                                )}*/}
                            </div>

                            {/* Botón de Acción */}
                            <div className="pt-2">
                                <PrimaryButton
                                    className="w-full !bg-[#0a84ff] hover:!bg-[#007aff] !py-4 !rounded-[15px] !text-lg !font-bold !justify-center !border-none shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Accediendo..."
                                        : "Iniciar Sesión"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Footer del Formulario */}
                    {/* comentar despues asi registro los usuario y depues comento esto y las rutas de auth.php*/}
                    {/* <p className="mt-8 text-center text-[#48484a] text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link
                            href={route("register")}
                            className="text-[#0a84ff] font-semibold"
                        >
                            Regístrate aquí
                        </Link>
                    </p>*/}
                </div>
            </div>
        </GuestLayout>
    );
}
