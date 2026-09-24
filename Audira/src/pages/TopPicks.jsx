import React, { useState } from 'react';

const PRODUCTS = [
    {
        id: "audira-one",
        name: "Audira One",
        price: 4499,
        color: "Forest Green & Brass",
        image: "/images/black.png",
        // Optional: fine-tune individual scale if needed (e.g., "scale-95")
    },
    {
        id: "audira-pulse",
        name: "Audira Pulse",
        price: 7999,
        isCenterHero: true,
        color: "Caramel Leather & Copper",
        image: "/images/brown4.png", // Preserves height & aspect ratio for GSAP target
    },
    {
        id: "audira-max-pro",
        name: "Audira Max Pro",
        price: 11499,
        color: "Matte Titanium & Silver",
        image: "/images/white.png",
    },
];

const TopPicks = ({
    title = "TOP PICKS",
    products = PRODUCTS,
    onSelectProduct = (product) => console.log("Selected:", product),
}) => {
    const [activeId, setActiveId] = useState("audira-pulse");

    return (
        <section 
            id="section5" 
            className="relative w-full min-h-screen bg-[var(--color-bg)] py-16 sm:py-24 px-4 sm:px-8 select-none overflow-hidden"
        >
            {/* Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[500px] rounded-full bg-white/40 blur-[100px] sm:blur-[130px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-[var(--color-dark)] uppercase font-sans">
                        {title}
                    </h2>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 items-end justify-items-center">
                    {products.map((item) => {
                        const isCenter = item.isCenterHero || item.id === "audira-pulse";
                        const isSelected = activeId === item.id;

                        return (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setActiveId(item.id);
                                    onSelectProduct(item);
                                }}
                                className={`group flex flex-col items-center cursor-pointer transition-all duration-300 w-full max-w-[280px] sm:max-w-[320px] md:max-w-none ${
                                    isSelected ? "opacity-100" : "opacity-90 hover:opacity-100"
                                }`}
                            >
                                {/* Slot Container */}
                                <div
                                    id={isCenter ? "headphone-target-s5" : undefined}
                                    className={`relative flex items-center justify-center transition-transform duration-500 ease-out max-w-full ${
                                        isCenter
                                            ? "w-72 sm:w-88 md:w-80 lg:w-[26rem] scale-105 md:scale-110"
                                            : "w-44 sm:w-52 md:w-48 lg:w-56" // Scaled down to match center hero visual scale
                                    }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className={`relative z-10 w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:-translate-y-3 drop-shadow-[0_22px_24px_rgba(40,22,10,0.30)] ${
                                            isCenter ? "opacity-0 pointer-events-none" : ""
                                        } ${item.imgClass || ""}`}
                                        loading="lazy"
                                    />

                                    {/* Ground shadow beneath card */}
                                    <div className="absolute -bottom-3 w-3/4 h-5 rounded-[100%] bg-[#361e0e]/20 blur-lg transition-all duration-500 group-hover:scale-90 group-hover:opacity-40" />
                                </div>

                                {/* Product Info */}
                                <div className="mt-8 text-center flex flex-col items-center">
                                    <h3 className="text-base sm:text-lg font-semibold text-[#281b12] tracking-normal transition-colors group-hover:text-[#4a2e1b]">
                                        {item.name}
                                    </h3>

                                    <div className="mt-1 flex items-baseline justify-center gap-2">
                                        <span className="text-lg sm:text-xl font-bold text-[#1a120c]">
                                            ₹{item.price.toLocaleString("en-IN")}
                                        </span>
                                        {item.originalPrice && (
                                            <span className="text-xs sm:text-sm line-through text-[#8f8072]">
                                                ₹{item.originalPrice.toLocaleString("en-IN")}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="mt-4 px-6 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 bg-[#341e11] text-[#faf6f0] hover:bg-[#201108] active:scale-95 shadow-sm opacity-90 group-hover:opacity-100"
                                    >
                                        BUY NOW
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TopPicks;