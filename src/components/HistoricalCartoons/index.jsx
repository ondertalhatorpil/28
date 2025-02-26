import React, { useState } from 'react';
import { X, FileText, AlertTriangle } from 'lucide-react';

const ImageGrid = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        {
            id: 1,
            url: "/assets/karikatür/2.jpg",
            title: "28 Şubat Döneminde Yayınlanan Karikatür",
            description: "Post-modern darbe sürecinde basında yer alan ve toplum mühendisliğine hizmet eden rahatsız edici içeriklerden biri."
        },
        {
            id: 2,
            url: "/assets/karikatür/4.jpg",
            title: "28 Şubat Medyası Karikatürü",
            description: "Basının 28 Şubat sürecindeki tutumunu yansıtan, kamuoyu algısını manipüle etmeye çalışan içeriklerden biri."
        },
        {
            id: 3,
            url: "/assets/karikatür/1.jpg",
            title: "Milli Görüş Hedefli Karikatür",
            description: "Dönemin siyasi atmosferinde İslami kesime karşı oluşturulan ötekileştirici algının basındaki yansımalarından."
        },
        {
            id: 4,
            url: "/assets/karikatür/3.jpg",
            title: "28 Şubat Sürecinde Basın Tutumu",
            description: "Medyanın 28 Şubat sürecindeki taraflı ve ayrıştırıcı tutumunu gösteren örneklerden biri."
        },
        {
            id: 5,
            url: "/assets/karikatür/5.jpg",
            title: "Başörtüsü Karşıtı Karikatür",
            description: "28 Şubat sürecinde özellikle başörtülü kadınları hedef alan ayrımcı söylemlerin görsel ifadelerinden."
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-5 mb-16 sm:mb-20 md:mb-24">
            {/* Başlık ve Açıklama */}
            <div className="text-center mb-12">
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                    28 Şubat <span className="text-[#39a045]">Karanlığında</span> Basın
                </h2>
                
                <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
                    Post-modern darbe sürecinde bazı gazetelerin yayınladığı ahlaksız, ayrımcı ve ötekileştirici karikatürler. Bu içerikler, medyanın toplum mühendisliğindeki rolünü göstermesi açısından tarihsel belge niteliğindedir.
                </p>
                
                {/* Dekoratif çizgi */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#39a045] to-transparent mx-auto mt-6"></div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-4 gap-4 h-[600px]">
                {/* Büyük görsel - sol taraf */}
                <div className="col-span-2 h-full">
                    <div 
                        className="w-full h-full bg-gray-900 rounded-lg overflow-hidden cursor-pointer shadow-md shadow-black/50 border border-white/5
                            hover:shadow-lg transition-all duration-300 group"
                        onClick={() => setSelectedImage(images[0])}
                    >
                        <div className="relative w-full h-full overflow-hidden">
                            <img 
                                src={images[0].url} 
                                alt={images[0].title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <div className="text-white">
                                    <p className="text-xs text-white/70">Karikatür</p>
                                    <h3 className="text-base font-medium">{images[0].title}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orta sütun - üst üste 2 görsel */}
                <div className="flex flex-col gap-4 h-full">
                    {images.slice(1, 3).map((image) => (
                        <div 
                            key={image.id}
                            className="flex-1 bg-gray-900 rounded-lg overflow-hidden cursor-pointer shadow-md shadow-black/50 border border-white/5
                                hover:shadow-lg transition-all duration-300 group"
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                <img 
                                    src={image.url} 
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                    <p className="text-white text-sm font-medium">{image.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sağ sütun - üst üste 2 görsel */}
                <div className="flex flex-col gap-4 h-full">
                    {images.slice(3, 5).map((image) => (
                        <div 
                            key={image.id}
                            className="flex-1 bg-gray-900 rounded-lg overflow-hidden cursor-pointer shadow-md shadow-black/50 border border-white/5
                                hover:shadow-lg transition-all duration-300 group"
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                <img 
                                    src={image.url} 
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                    <p className="text-white text-sm font-medium">{image.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-4">
                {/* Ana görsel */}
                <div 
                    className="aspect-square w-full bg-gray-900 rounded-lg overflow-hidden cursor-pointer shadow-md shadow-black/50 border border-white/5
                        group transition-all duration-300"
                    onClick={() => setSelectedImage(images[0])}
                >
                    <div className="relative w-full h-full overflow-hidden">
                        <img 
                            src={images[0].url} 
                            alt={images[0].title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                            <p className="text-white text-sm font-medium">{images[0].title}</p>
                        </div>
                    </div>
                </div>

                {/* Diğer görseller 2x2 grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 sm:mb-0">
                    {images.slice(1).map((image) => (
                        <div 
                            key={image.id}
                            className="aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer shadow-md shadow-black/50 border border-white/5
                                group transition-all duration-300"
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                <img 
                                    src={image.url} 
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                                    <p className="text-white text-xs font-medium">{image.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/95 z-50 p-4 flex items-center justify-center"
                    onClick={() => setSelectedImage(null)}
                >
                    <div 
                        className="relative w-full max-w-3xl bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-3 right-3 z-10 bg-black/50 text-white/70 hover:text-white 
                                rounded-full p-2 transition-colors border border-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="p-4">
                            <div className="relative aspect-square md:aspect-auto md:h-[70vh]">
                                <img 
                                    src={selectedImage.url} 
                                    alt={selectedImage.title}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4 text-[#39a045]" />
                                    <h3 className="text-lg md:text-xl font-bold text-white">
                                        {selectedImage.title}
                                    </h3>
                                </div>
                                <p className="text-sm md:text-base text-white/70">
                                    {selectedImage.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGrid;