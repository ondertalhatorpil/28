import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import HomePage from './pages/Home/index'
import MemoryForm from "./pages/HatiraApp/MemoryForm";
import AdminPanel from "./pages/HatiraApp/AdminPanel";
import ApprovedMemories from "./pages/HatiraApp/AprovedMemories";

// Sayfa değişikliklerini izlemek için özel bir bileşen
function PageTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Rota değişikliğinde Google Analytics'e bildir
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);
  
  return null; // Görsel bir şey render etmez
}

const Router = () => {
    return(
        <>
        <BrowserRouter>
            <PageTracker /> {/* Sayfa izleme bileşenini Router içinde kullan */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gecmisin-izleri/hatira-paylas" element={<MemoryForm />} />
                <Route path="/administrator" element={<AdminPanel />} />
                <Route path="/gecmisin-izleri" element={<ApprovedMemories />} />
            </Routes>
        </BrowserRouter>
        </>
    )   
}

export default Router