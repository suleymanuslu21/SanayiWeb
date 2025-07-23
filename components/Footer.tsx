//C:\Users\MONSTER\sanayi-site\components\Footer.tsx

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white p-6 mt-10">
            <div className="max-w-6xl mx-auto text-center text-sm">
                <p>© {new Date().getFullYear()} VYS Otomotiv. Tüm hakları saklıdır.</p>
                <div className="mt-2 flex justify-center gap-4">
                    <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-400">
                        WhatsApp
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-pink-400">
                        Instagram
                    </a>
                    <a href="mailto:firma@ornek.com" className="hover:underline text-blue-400">
                        E-posta
                    </a>
                </div>
            </div>
        </footer>
    );
}
