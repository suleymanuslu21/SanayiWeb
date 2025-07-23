// C:\Users\MONSTER\sanayi-site\app\page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { FaWrench, FaOilCan } from "react-icons/fa";
import ImageSlider from "@/components/ImageSlider";
import Navbar from "@/components/Navbar";

interface Urun {
  _id: string;
  ad: string;
  aciklama: string;
  fiyat: number;
  resim: string;
  kategori: string;
  stok?: number;
  aktif?: boolean;

}

export default function HomePage() {
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [aktifKategori, setAktifKategori] = useState<string>("");
  const [tumUrunler, setTumUrunler] = useState<Urun[]>([]);
  const [arama, setArama] = useState<string>("");

  // Ürünler bölümüne scroll yapmak için referans
  const urunlerRef = useRef<HTMLDivElement>(null);

  // Arama yapıldığında otomatik scroll
  useEffect(() => {
    if (arama.trim() && urunlerRef.current) {
      // Scroll işlemini bir sonraki render anına bırak
      setTimeout(() => {
        urunlerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }, [arama]);

  useEffect(() => {
    const url = aktifKategori
      ? `/api/urunler?kategori=${aktifKategori}`
      : "/api/urunler";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUrunler(data);
        if (tumUrunler.length === 0) {
          fetch("/api/urunler")
            .then((res) => res.json())
            .then((all) => setTumUrunler(all));
        }
      });
  }, [aktifKategori]);

  const toplamUrun = tumUrunler.length;
  const yedekParcaSayisi = tumUrunler.filter((u) => u.kategori === "yedek-parcalar").length;
  const yagSayisi = tumUrunler.filter((u) => u.kategori === "yaglar").length;
  const filtreliUrunler = urunler
    .filter((urun) => urun.ad.toLowerCase().includes(arama.toLowerCase()));



  return (
    <>
      <Navbar arama={arama} setArama={setArama} />

      <main className="relative min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 text-slate-800 p-6">

        {/* Slider bölümü */}
        <section className="relative z-10">
          <ImageSlider />
        </section>

        {/* Ürünler ve filtreleme bölümü */}
        <section className="relative z-20" ref={urunlerRef}>

          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 my-8">
              Ürünlerimiz
            </h2>
          </div>

          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            <button
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${!aktifKategori ? "bg-blue-600 text-white" : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-100"
                }`}
              onClick={() => setAktifKategori("")}
            >
              Tümü ({toplamUrun})
            </button>

            <button
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md flex items-center gap-2 ${aktifKategori === "yedek-parcalar" ? "bg-blue-600 text-white" : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-100"
                }`}
              onClick={() => setAktifKategori("yedek-parcalar")}
            >
              <FaWrench className="text-sm" /> Yedek Parçalar ({yedekParcaSayisi})
            </button>

            <button
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md flex items-center gap-2 ${aktifKategori === "yaglar" ? "bg-blue-600 text-white" : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-100"
                }`}
              onClick={() => setAktifKategori("yaglar")}
            >
              <FaOilCan className="text-sm" /> Yağlar ({yagSayisi})
            </button>
          </div>

          {filtreliUrunler.length === 0 ? (
            <p className="text-center text-gray-500">Eşleşen ürün bulunamadı.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {filtreliUrunler.map((urun) => (
                <div
                  key={urun._id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
                >
                  <div className="rounded-lg overflow-hidden mb-3 aspect-[4/3]">
                    <img
                      src={urun.resim || "/file.svg"}
                      alt={urun.ad}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-1">{urun.ad}</h3>
                  <p className="text-gray-600 text-sm mb-2">{urun.aciklama}</p>
                  <p className="text-blue-600 font-semibold">₺{urun.fiyat}</p>
                  <p className={`text-sm ${urun.stok === 0
                      ? "text-red-600"
                      : urun.stok !== undefined && urun.stok <= 3
                        ? "text-orange-500"
                        : "text-gray-500"
                    }`}>
                    Stok: {
                      urun.stok === 0
                        ? "Tükendi"
                        : urun.stok !== undefined && urun.stok <= 3
                          ? `Az Kaldı (${urun.stok})`
                          : `${urun.stok ?? 0} adet`
                    }
                  </p>





                  <p className="text-xs text-gray-400 mt-1">Kategori: {urun.kategori}</p>

                </div>
              ))}
            </div>
          )}

        </section>
      </main>
    </>
  );
}
