import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.jsx';
import { Loader2, ArrowLeft } from 'lucide-react';

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

const MemoryForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    email: '',
    title: '',
    memory: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'memories'), {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`,
        createdAt: new Date(),
        status: 'pending' // onay için beklemede
      });

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        city: '',
        email: '',
        title: '',
        memory: ''
      });
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Error:', err);
    }

    setLoading(false);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <BackgroundDecorations />

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4">
        <div className="w-full max-w-2xl">
        <button
              onClick={handleBack}
              className="mb-6 inline-flex items-center text-gray-400 hover:text-white 
                transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Geri Dön</span>
            </button>
          {success ? (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#39a045] mb-2">
                Hatıranız Başarıyla Gönderildi
              </h3>
              <p className="text-gray-400">
                Hatıranız incelendikten sonra sitemizde yayınlanacaktır. Paylaşımınız için teşekkür ederiz.
              </p>
            </div>
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#39a045] mb-3">
                  Hatıranı Bırak
                </h2>
                <p className="text-gray-400">
                  28 Şubat sürecine dair hatıralarınızı bizimle paylaşın
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-500/20 text-red-200 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Adınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                        focus:ring-2 focus:ring-[#39a045] focus:border-transparent
                        text-white placeholder-gray-500"
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                        focus:ring-2 focus:ring-[#39a045] focus:border-transparent
                        text-white placeholder-gray-500"
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                      focus:ring-2 focus:ring-[#39a045] focus:border-transparent
                      text-white placeholder-gray-500"
                    placeholder="İkamet ettiğiniz şehir"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    E-posta Adresiniz *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                      focus:ring-2 focus:ring-[#39a045] focus:border-transparent
                      text-white placeholder-gray-500"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Hatıranızın Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                      focus:ring-2 focus:ring-[#39a045] focus:border-transparent
                      text-white placeholder-gray-500"
                    placeholder="Hatıranız için kısa bir başlık"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Hatıranız *
                  </label>
                  <textarea
                    required
                    value={formData.memory}
                    onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                    rows="6"
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                      focus:ring-2 focus:ring-[#39a045] focus:border-transparent
                      text-white placeholder-gray-500"
                    placeholder="Hatıranızı buraya yazabilirsiniz..."
                  />
                </div>

                <p className="text-sm text-gray-500">
                  * ile işaretli alanlar zorunludur
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[#39a045] text-white rounded-lg hover:bg-[#2d8035] 
                    transition-all duration-300 flex items-center justify-center disabled:opacity-50
                    hover:shadow-lg hover:shadow-[#39a045]/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Gönderiliyor...
                    </>
                  ) : (
                    'Hatıranı Gönder'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryForm;