import React from 'react';
import HeaderController from '../../components/Header/HeaderController';
import CountUpTimer from '../../components/CountUpTimer/index';
import Quotes from '../../components/Quotes';
import NewsGazete from '../../components/NewsGazete';
import StoryExperience from '../../components/StoryExperience';
import HistoricalCartoons from '../../components/HistoricalCartoons';
import ImageGallery from '../../components/ImageGallery';
import Footer from '../../components/Footer';
import VideoGallery from '../../components/VideoGallery';
import Slider from '../../components/Slider/'

const BackgroundDecorations = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%">
        <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#39a045" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
    </div>
    
    <div className="absolute top-0 left-1/3 w-px h-screen bg-gradient-to-b from-[#39a045]/0 via-[#39a045]/5 to-transparent transform -rotate-45" />
    <div className="absolute top-0 right-1/3 w-px h-screen bg-gradient-to-b from-[#39a045]/0 via-[#39a045]/5 to-transparent transform -rotate-45" />
    
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4">
      <div className="text-[40rem] font-bold text-[#39a045] opacity-[0.05] leading-none select-none">
        28
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <BackgroundDecorations />
      
      <div className="relative z-50">
        <HeaderController />
      </div>
      
      <div className="relative">
        {/* Slider Section */}
        <section 
          id="home" 
          className="relative min-h-screen mt-10  pb-16  sm:pb-20 md:py-0 md:h-screen bg-opacity-80 flex items-center justify-center" 
          data-section="home"
        >
          <Slider />
        </section>
        
        {/* Separator */}
        <div className="h-1 sm:h-24 md:h-32"></div>
        
        {/* Quotes Section */}
        <section 
          className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[40vh] bg-opacity-80 flex items-center justify-center"
        >
          <Quotes />
        </section>
        
        {/* Separator */}
        <div className="h-1 sm:h-24 md:h-32"></div>
        
        {/* News Section */}
        <section 
          id="news" 
          className="relative min-h-[70vh] sm:min-h-screen md:h-screen bg-opacity-80 flex items-center justify-center" 
          data-section="news"
        >
          <NewsGazete />
        </section>
        
        {/* Separator */}
        <div className="h-16 sm:h-24 md:h-32"></div>
        
        {/* Cartoons Section */}
        <section 
          id="cartoons" 
          className="relative min-h-[90vh] sm:min-h-screen md:h-screen bg-opacity-80" 
          data-section="cartoons"
        >
          <HistoricalCartoons />
        </section>
        
        {/* Separator */}
        <div className="h-16 sm:h-24 md:h-82"></div>
        
        {/* Gallery Section */}
        <section 
          id="gallery" 
          className="relative min-h-[80vh] sm:min-h-[80vh] md:min-h-[80vh] bg-opacity-80" 
          data-section="gallery"
        >
          <ImageGallery />
        </section>
        
        {/* Separator */}
        <div className="h-16 sm:h-24 md:h-32"></div>
        
        {/* Videos Section */}
        <section 
          id="videos" 
          className="relative min-h-[90vh] sm:min-h-screen md:h-screen bg-opacity-80" 
          data-section="videos"
        >
          <VideoGallery />
        </section>
        
        {/* Separator before footer */}
        <div className="h-16 sm:h-24 md:h-32"></div>
        
        {/* Footer Section */}
        <section className="relative">
          <Footer />
        </section>
      </div>
    </div>
  );
}

export default App;