import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.jsx';
import { Loader2, Calendar, MapPin, Mail, User, Lock, Check, X } from 'lucide-react';

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

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  // Admin Panel States
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      if (credentials.username === 'admin' && credentials.password === 'admin28subat') {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
      } else {
        setAuthError('Kullanıcı adı veya şifre hatalı!');
      }
    } catch (error) {
      setAuthError('Giriş yapılırken bir hata oluştu.');
    }

    setAuthLoading(false);
  };

  // Oturum kontrolü
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Hatıraları getir
  const fetchMemories = async () => {
    try {
      const q = query(collection(db, 'memories'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const memoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toLocaleDateString() || '-'
      }));
      setMemories(memoriesData);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMemories();
    }
  }, [isAuthenticated]);

  const updateMemoryStatus = async (memoryId, status) => {
    try {
      await updateDoc(doc(db, 'memories', memoryId), {
        status: status
      });
      await fetchMemories();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black">
        <BackgroundDecorations />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#39a045] mb-2">
                  Admin Girişi
                </h2>
                <p className="text-gray-400">
                  Yönetim paneline erişmek için giriş yapın
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-500/20 text-red-200 rounded-lg">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Kullanıcı Adı
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      required
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                        focus:ring-2 focus:ring-[#39a045] focus:border-transparent
                        text-white placeholder-gray-500"
                      placeholder="Kullanıcı adınız"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Şifre
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="password"
                      required
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                        focus:ring-2 focus:ring-[#39a045] focus:border-transparent
                        text-white placeholder-gray-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 px-4 bg-[#39a045] text-white rounded-lg hover:bg-[#2d8035] 
                    transition-all duration-300 flex items-center justify-center disabled:opacity-50
                    hover:shadow-lg hover:shadow-[#39a045]/20"
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Giriş Yapılıyor...
                    </>
                  ) : (
                    'Giriş Yap'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-[#39a045]" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <BackgroundDecorations />

      <div className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#39a045] mb-4">
                Hatıra Yönetimi
              </h1>
              <p className="text-gray-400 text-lg">
                Gönderilen hatıraları inceleyip onaylayabilirsiniz
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30
                transition-all duration-300"
            >
              Çıkış Yap
            </button>
          </div>

          <div className="grid gap-6">
            {memories.map((memory) => (
              <div
                key={memory.id}
                className="group relative overflow-hidden backdrop-blur-md border border-gray-800 rounded-xl
                  bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#39a045]/0 to-[#39a045]/0 
                  group-hover:from-[#39a045]/5 group-hover:to-transparent transition-all duration-500" />

                <div className="relative">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#39a045] transition-colors">
                        {memory.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-1.5 text-gray-400 bg-gray-800/50 rounded-full px-3 py-1">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{memory.firstName} {memory.lastName}</span>
                        </div>
                        
                        {memory.city && (
                          <div className="flex items-center gap-1.5 text-gray-400 bg-gray-800/50 rounded-full px-3 py-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{memory.city}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1.5 text-gray-400 bg-gray-800/50 rounded-full px-3 py-1">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{memory.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-gray-400 bg-gray-800/50 rounded-full px-3 py-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{memory.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {(!memory.status || memory.status === 'pending') && (
                        <>
                          <button
                            onClick={() => updateMemoryStatus(memory.id, 'approved')}
                            className="p-2 bg-[#39a045] text-white rounded-full hover:bg-[#2d8035]
                              transition-all duration-300 hover:shadow-lg hover:shadow-[#39a045]/20"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateMemoryStatus(memory.id, 'rejected')}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600
                              transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium
                        ${memory.status === 'approved' 
                          ? 'bg-[#39a045]/20 text-[#39a045]' 
                          : memory.status === 'rejected'
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-yellow-500/20 text-yellow-500'}`}
                      >
                        {memory.status === 'approved' 
                          ? 'Onaylandı' 
                          : memory.status === 'rejected' 
                          ? 'Reddedildi' 
                          : 'Beklemede'}
                      </span>
                    </div>
                  </div>

                  {/* Memory Content */}
                  <div className="text-gray-300 whitespace-pre-wrap rounded-lg bg-black/20 p-4">
                    {memory.memory}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;