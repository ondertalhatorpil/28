import { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";

export const Header = () => {
    const [bgStyle, setBgStyle] = useState({ left: "8px", width: "calc(100% / 6 - 16px)" });
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const menuRef = useRef(null);

    const menuItems = [
        { id: 1, text: "Anasayfa", target: "/", isExternalLink: true},
        { id: 2, text: "Manşetler", target: "news" },
        { id: 3, text: "Karikatürler", target: "cartoons" },
        { id: 4, text: "Albüm", target: "gallery" },
        { id: 5, text: "Belgeseller", target: "videos" },
        { id: 6, text: "Hatıranı Yaz", target: "/gecmisin-izleri", isExternalLink: true },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setIsScrolled(true);
                setMenuOpen(false);
            } else {
                setIsScrolled(false);
                setMenuOpen(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleHover = (e, index) => {
        if (!menuRef.current) return;

        const item = e.target;
        const rect = item.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();

        const width = rect.width;
        const left = rect.left - menuRect.left;

        setBgStyle({
            left: `${left}px`,
            width: `${width}px`,
        });
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setBgStyle({ left: "8px", width: "calc(100% / 6 - 16px)" });
        setHoveredIndex(0);
    };

    const handleClick = (target, isExternalLink) => {
        if (isExternalLink) {
            window.location.href = target;
            toggleMenu();
            return;
        }
    
        // Eğer şu anki sayfa ana sayfa değilse
        if (window.location.pathname !== '/') {
            // Ana sayfaya hash ile yönlendir
            window.location.href = `/#${target}`;
            toggleMenu();
            return;
        }
    
        // Ana sayfadaysa normal scroll işlemi
        const element = document.querySelector(`section[data-section="${target}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            toggleMenu();
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full transition-all duration-300 z-50 mt-[2%]">
            <div className="w-full px-4">
                <div className="flex justify-center items-center h-16">
                    <div className="w-full max-w-3xl relative h-full">
                        {isScrolled && (
                            <div
                                className="flex items-center justify-center cursor-pointer text-[#8B0000] z-[3] p-2 rounded transition-all duration-300"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <button
                                    className="relative p-3 text-white rounded-xl overflow-hidden group"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#39a045]/90 to-[#39a02]/90 backdrop-blur-sm transition-all duration-300 group-hover:scale-110" />
                                    <Menu
                                        size={24}
                                        className="relative z-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] filter-none"
                                    />
                                </button>
                            </div>
                        )}
                        <div
                            ref={menuRef}
                            className={`relative flex justify-around items-center h-16 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm shadow-lg z-10 transition-all duration-500 overflow-hidden w-full ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 h-0"}`}
                            onMouseLeave={handleMouseLeave}
                        >
                            {menuItems.map((item, index) => (
                                <a
                                    key={item.id}
                                    href={item.isExternalLink ? item.target : "#"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(item.target, item.isExternalLink);
                                    }}
                                    className={`relative font-bold px-4 py-2.5 rounded-lg transition-colors duration-300 whitespace-nowrap z-20 cursor-pointer
                                        ${index === 0
                                            ? hoveredIndex === 0
                                                ? 'text-white'
                                                : 'text-gray-400'
                                            : hoveredIndex === index
                                                ? 'text-white'
                                                : 'text-gray-400'
                                    }`}
                                    onMouseEnter={(e) => handleHover(e, index)}
                                >
                                    {item.text}
                                </a>
                            ))}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 h-[45px] bg-[#39a045] rounded-lg transition-all duration-300 z-10"
                                style={bgStyle}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;