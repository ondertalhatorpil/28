import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Loader2, Calendar, MapPin, Search, Filter, User, Mail, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeaderController from '../../components/Header/HeaderController';
import Footer from '../../components/Footer';

// BackgroundDecorations component'i
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
      <div className="text-[40rem] font-bold text-[#39a045] opacity-[0.05] leading-none select-none">28</div>
    </div>
  </div>
);

const ApprovedMemories = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);

  useEffect(() => {
    const fetchApprovedMemories = async () => {
      try {
        const q = query(
          collection(db, 'memories'),
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const memoriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toLocaleDateString() || '-'
        }));
        
        const uniqueCities = [...new Set(memoriesData.map(m => m.city).filter(Boolean))];
        setCities(uniqueCities);
        setMemories(memoriesData);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
      setLoading(false);
    };

    fetchApprovedMemories();
  }, []);

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = !searchTerm || 
      memory.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.memory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = !selectedCity || memory.city === selectedCity;
    
    return matchesSearch && matchesCity;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-[#39a045]" />
      </div>
    );
  }

  return (
    <>
      <HeaderController />
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black pt-24">
      <BackgroundDecorations />
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#39a045] mb-4">
              28 Şubat Hatıraları
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto pb-10">
              Tarihe tanıklık edenlerin gözünden 28 Şubat süreci
            </p>
            <a
                href="/gecmisin-izleri/hatira-paylas"
                className="inline-flex items-center px-6 py-3 bg-[#39a045] text-white rounded-lg 
                  hover:bg-[#2d8035] transition-all duration-300 shadow-lg hover:shadow-[#39a045]/20
                  transform hover:-translate-y-1"
              >
                <span className="mr-2">Hatıranı Herkezle Paylaş</span>
                <ChevronDown className="w-5 h-5" />
              </a>
          </div>

          {/* Filters */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Hatıralarda ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                  focus:ring-2 focus:ring-[#39a045] focus:border-transparent transition-all
                  text-white placeholder-gray-500"
              />
            </div>

            {cities.length > 0 && (
              <div className="relative w-full md:w-64">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                    focus:ring-2 focus:ring-[#39a045] focus:border-transparent appearance-none
                    transition-all text-white"
                >
                  <option value="">Tüm Şehirler</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {filteredMemories.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Henüz onaylanmış hatıra bulunmamaktadır
                </h3>
                <p className="text-gray-400">
                  Filtreleri temizleyerek tüm hatıraları görüntüleyebilirsiniz.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMemories.map((memory) => (
                <div
                  key={memory.id}
                  onClick={() => setSelectedMemory(memory)}
                  className="group relative overflow-hidden backdrop-blur-md border border-gray-800 rounded-xl
                    hover:border-[#39a045]/30 transition-all duration-500 cursor-pointer
                    bg-gradient-to-br from-gray-900/90 to-gray-800/90"
                >
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#39a045]/0 to-[#39a045]/0 
                    group-hover:from-[#39a045]/10 group-hover:to-transparent transition-all duration-500" />
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-px bg-gradient-to-r from-transparent via-[#39a045]/10 to-transparent 
                    opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                  <div className="relative p-6 h-full flex flex-col">
                    {/* Header Section */}
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 
                        group-hover:text-[#39a045] transition-colors duration-300">
                        {memory.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-400 bg-gray-800/50 
                          rounded-full px-3 py-1">
                          <User className="w-4 h-4" />
                          <span>{memory.firstName} {memory.lastName}</span>
                        </div>
                        {memory.city && (
                          <div className="flex items-center gap-1.5 text-gray-400 bg-gray-800/50 
                            rounded-full px-3 py-1">
                            <MapPin className="w-4 h-4" />
                            <span>{memory.city}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <p className="text-gray-300 line-clamp-3 mb-4">
                        {memory.memory}
                      </p>
                    </div>

                    {/* Footer Section */}
                    <div className="mt-auto pt-4 border-t border-gray-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{memory.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[#39a045] text-sm font-medium 
                        group-hover:translate-x-1 transition-transform duration-300">
                        <span>Detaylar</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Memory Modal */}
      {selectedMemory && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMemory(null)}
        >
          <div 
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 
              rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedMemory.title}
                </h2>
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 rounded-full px-4 py-2">
                  <User className="w-5 h-5" />
                  <span>{selectedMemory.firstName} {selectedMemory.lastName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 rounded-full px-4 py-2">
                  <Mail className="w-5 h-5" />
                  <span>{selectedMemory.email}</span>
                </div>
                {selectedMemory.city && (
                  <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 rounded-full px-4 py-2">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedMemory.city}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 rounded-full px-4 py-2">
                  <Calendar className="w-5 h-5" />
                  <span>{selectedMemory.createdAt}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {selectedMemory.memory}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default ApprovedMemories;