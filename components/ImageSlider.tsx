//C:\Users\MONSTER\sanayi-site\components\ImageSlider.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

export default function ImageSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000); // 4 saniyede bir geçiş

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] rounded-xl overflow-hidden shadow-lg mb-10">

            <AnimatePresence mode="wait">
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt={`Slider ${index + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                />
            </AnimatePresence>
        </div>
    );
}
