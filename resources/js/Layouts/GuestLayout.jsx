import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center dark:bg-gray-900  sm:justify-center sm:pt-0">
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="h-32 w-32 fill-current text-gray-500" />
                </Link>
            </div>*/}

            <div className=" w-full overflow-hidden bg-gray-900  shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
