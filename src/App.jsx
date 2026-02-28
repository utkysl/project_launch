import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';

function App() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE"); // IDLE, SUBMITTING, SUCCESS, ERROR
  const [isOpen, setIsOpen] = useState(false); // Pop-up kontrolü
  
  // Ekran genişliğini takip eden state (768px altı mobil kabul edilir)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Formspree gönderim fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("SUBMITTING");

    try {
      const response = await fetch("https://formspree.io/f/mzdawwyk", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setState("SUCCESS");
        setTimeout(() => { 
          setIsOpen(false); 
          setState("IDLE"); 
          setEmail(""); 
        }, 3000);
      } else {
        setState("ERROR");
      }
    } catch (error) {
      setState("ERROR");
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center bg-black text-white overflow-hidden selection:bg-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* ARKA PLAN: Cihaza göre değişen görsel */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700" 
        style={{ backgroundImage: `url(${isMobile ? '/bg-phone.png' : '/bg.png'})` }}
      >
      </div>

      {/* ANA İÇERİK: Mobilde alt alta, Masaüstünde yan yana */}
      <div className="relative z-10 w-full max-w-7xl px-6 py-12 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* SOL TARAF: Yazılar */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:w-1/2">
          <div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none" style={{ fontWeight: 900 }}>
              GoodJob
            </h1>
            <p className="mt-4 text-[9px] md:text-xs tracking-[0.4em] font-medium text-white/50">
                SERVICE MARKETPLACE PLATFORM
            </p>
          </div>

          {/* Daktilo Efekti */}
          <div className="text-2xl md:text-5xl font-black tracking-tighter text-white/90 h-12 md:h-24 flex items-center" style={{ fontWeight: 900 }}>
            <Typewriter
              options={{
                strings: ['Çok yakında', 'Coming soon'],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 70,
                cursor: '|'
              }}
            />
          </div>

          {/* Ana Buton */}
          <button 
            onClick={() => setIsOpen(true)}
            className="px-10 py-4 bg-white text-black rounded-full font-black text-xs md:text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
            style={{ fontWeight: 900 }}
          >
            Yayınlandığında Haber Ver!
          </button>
        </div>

        
      </div>

      {/* POP-UP (MODAL) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsOpen(false)}></div>
          
          <div className="relative bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-3xl text-center">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>

            {state === "SUCCESS" ? (
              <div className="py-10">
                <h3 className="text-3xl font-black mb-4 tracking-tighter" style={{ fontWeight: 900 }}>Harika!</h3>
                <p className="text-white/60 font-medium">Başarıyla listeye eklendin. Uygulama yayınlandığında sana haber vereceğiz.</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-black mb-2 tracking-tighter" style={{ fontWeight: 900 }}>Beni Haberdar Et</h3>
                <p className="text-white/50 mb-8 font-medium text-sm">Gelişmelerden ilk senin haberin olsun.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input 
                    type="email" 
                    required
                    placeholder="E-posta adresin"
                    className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/40 text-white text-center transition-all outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button 
                    type="submit"
                    disabled={state === "SUBMITTING"}
                    className="w-full py-4 bg-white text-black rounded-2xl font-black tracking-widest hover:bg-zinc-200 transition-all disabled:opacity-50"
                    style={{ fontWeight: 900 }}
                  >
                    {state === "SUBMITTING" ? "KAYDEDİLİYOR..." : "LİSTEYE KATIL"}
                  </button>
                </form>
                {state === "ERROR" && <p className="mt-4 text-red-400 text-xs font-bold tracking-widest">BİR HATA OLUŞTU, TEKRAR DENE.</p>}
              </>
            )}
          </div>
        </div>
      )}

      {/* Sağ Alt Köşe Bilgisi */}
      <div className="absolute bottom-10 right-10 text-[9px] font-mono text-white/20 tracking-widest uppercase hidden md:block">
        v1.0-alpha // 2026
      </div>
    </div>
  );
}

export default App;