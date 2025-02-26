import React from 'react';
import { Play, Clock, Video } from 'lucide-react';

import VideoBanner1 from '../../assets/video-image-1.jpeg'
import VideoBanner2 from '../../assets/video-image-2.jpeg'
import VideoBanner3 from '../../assets/video-image-3.jpeg'
import VideoBanner4 from '../../assets/video-image-4.jpeg'

const VideoGallery = () => {
  const videos = [
    {
      id: 1,
      thumbnail: VideoBanner2,
      title: "ÖNDER 28 Şubat Kısa Film",
      videoUrl: "https://drive.google.com/file/d/12UDVQOM0Fquzko1HCY_anWkwH9iN5Wjh/view?usp=share_link",
      duration: "12:45"
    },
    {
      id: 2,
      thumbnail: VideoBanner1,
      title: "28 Şubat Kronolojisi",
      videoUrl: "https://drive.google.com/file/d/1wLcT0cseifHVZvtO4B7GN1z-68jMq0fg/view?usp=share_link",
      duration: "08:30"
    },
    {
      id: 3,
      thumbnail: VideoBanner3,
      title: "TRT Haber-28 Şubat Post Modern Darbe",
      videoUrl: "https://www.youtube.com/watch?v=yH0IyTN6_n0",
      duration: "15:20"
    },
    {
      id: 4,
      thumbnail: VideoBanner4,
      title: "Ülke TV-28 Şubat Hatırlatması Özgürlük Zinciri",
      videoUrl: "https://www.youtube.com/watch?v=BP1yv_7Nrik",
      duration: "10:15"
    }
  ];

  return (
    <div className="w-full py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section with Title and Description */}
        <div className="mb-10 md:mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-3 bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm border border-[#39a045]/20">
            <Video size={18} className="text-[#39a045]" />
            <span className="text-white/90 text-sm font-medium">Video Belgeseller</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            28 Şubat <span className="text-[#39a045]">Sürecini</span> Anlamak
          </h2>
          
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Post-modern darbe olarak anılan 28 Şubat sürecini anlatan belgesel ve video içerikler. Dönemin tanıklarının anlatımları ve arşiv görüntüleriyle tarihi bir döneme ışık tutuyoruz.
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#39a045] to-transparent mx-auto mt-6"></div>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
          {videos.map((video) => (
            <div key={video.id} className="rounded-xl overflow-hidden border border-white/5 shadow-lg shadow-black/30 group">
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block absolute inset-0 z-20"
                >
                  {/* Completely transparent link overlay */}
                </a>
                
                {/* Thumbnail image */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Play Button */}
                <div className="absolute left-1/2 top-[59%] -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-500 group-hover:scale-110">
                  <div className="bg-[#39a045] rounded-full w-16 h-16 flex items-center justify-center shadow-md shadow-black/30">
                    <Play className="w-5 h-5 text-white" fill="white" />
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                  <h3 className="text-white text-sm font-medium">{video.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-[#39a045]/80">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{video.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="rounded-xl overflow-hidden border border-white/5 shadow-lg shadow-black/30 group">
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block absolute inset-0 z-20"
                >
                  {/* Completely transparent link overlay */}
                </a>
                
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Play Button */}
                <div className="absolute left-1/2 top-46 -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-500 group-hover:scale-110">
                  <div className="bg-[#39a045] rounded-full w-20 h-20 flex items-center justify-center shadow-md shadow-black/30">
                    <Play className="w-8 h-8 text-white" fill="white" />
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                  <h3 className="text-white text-lg font-medium">{video.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-[#39a045]/80">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{video.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;