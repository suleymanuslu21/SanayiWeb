"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";

interface NavbarProps {
    arama?: string;
    setArama?: (value: string) => void;
}

export default function Navbar({ arama = "", setArama }: NavbarProps) {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-md shadow-md border-b border-white/20">

            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-800 tracking-wide">
                    <span></span> VYS OTOMOTİV
                </Link>


                {/* Menü */}
                <nav className="flex gap-6 items-center text-sm justify-center flex-1">
                    {["/", "/hakkimizda", "/iletisim"].map((path, i) => {
                        const label = ["Anasayfa", "Hakkımızda", "İletişim"][i];
                        return (
                            <Link
                                key={path}
                                href={path}
                                className={`relative transition-colors duration-200 px-1
    ${pathname === path ? "text-blue-600 font-semibold" : "text-gray-800"}`}
                            >
                                {label}
                                <span
                                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 transition-all duration-300 scale-x-0 origin-left ${pathname === path ? "scale-x-100" : "group-hover:scale-x-100"
                                        }`}
                                />
                            </Link>

                        );
                    })}
                </nav>

                {/* Arama */}
                {setArama && (
                    <div className="relative group">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm group-focus-within:text-blue-600" />
                        <input
                            type="text"
                            value={arama}
                            onChange={(e) => setArama(e.target.value)}
                            placeholder="Ürün ara..."
                            className="pl-9 pr-4 py-2 text-sm rounded-full bg-white/70 text-gray-800 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-64"
                        />

                    </div>
                )}
            </div>
        </header>
    );
}
