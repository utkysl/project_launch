import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';


const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.2 }
  }
};

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.5 + (i * 0.2), duration: 0.6, ease: "easeOut" }
  })
};

function App() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about-start');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("SUBMITTING");
    try {
      const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        setState("SUCCESS");
        setTimeout(() => { setIsOpen(false); setState("IDLE"); setEmail(""); }, 3000);
      } else { setState("ERROR"); }
    } catch (error) { setState("ERROR"); }
  };

  return (
    <div className="bg-black text-white selection:bg-blue-500/30 font-['Inter'] antialiased">


      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center grayscale-[20%]"
          style={{ backgroundImage: `url(${isMobile ? '/bg-phone.png' : '/bg.png'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 text-center px-6">
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-4">GoodJob</h1>
          <div className="text-xl md:text-4xl font-light tracking-widest text-white/80 h-16">
            <Typewriter options={{ strings: ['Hizmet dünyası değişiyor.', 'Çok yakında.', 'Coming soon.'], autoStart: true, loop: true }} />
          </div>
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
            <button onClick={scrollToAbout} className="px-12 py-5 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full font-bold hover:bg-white hover:text-black transition-all">Hakkımızda</button>
            <button onClick={() => setIsOpen(true)} className="px-12 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] uppercase tracking-widest text-xs">Yayınlandığında Haber Ver!</button>
          </div>
        </motion.div>
      </div>

      <div id="about-start" />

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariant} className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl text-center space-y-8">
          <motion.h2 variants={itemVariant} className="text-4xl md:text-7xl font-black leading-tight italic">
            Artık saatlerce uğraşmanıza gerek yok.
          </motion.h2>
          <motion.p variants={itemVariant} className="text-xl md:text-2xl text-white/60 leading-relaxed">
            GoodJob ile tanışın! Hizmet dünyasında kuralları yeniden yazıyoruz. Aradığınızı bulmak kolay, iş almak masrafsız.
          </motion.p>
        </div>
      </motion.section>



      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} className="min-h-screen flex items-center px-6 md:px-20 bg-zinc-950/50 relative py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full z-10">
          <div className="space-y-8 text-left">
            <motion.div variants={itemVariant} className="inline-block px-4 py-1 rounded-full border border-blue-500/50 text-blue-400 text-xs font-bold uppercase tracking-widest">Müşteriler İçin</motion.div>
            <motion.h2 variants={itemVariant} className="text-5xl md:text-7xl font-black uppercase">Tamamen <span className="text-blue-500">Ücretsiz</span></motion.h2>
            <div className="space-y-6">
              {[
                { title: "Sıfır Maliyet", desc: "Uygulamayı indirmek, ilan açmak ve iletişime geçmek %100 ücretsizdir." },
                { title: "Hızlı ve Kolay", desc: "İhtiyacınızı belirtin, uzmanlar saniyeler içinde karşınıza çıksın." },
                { title: "Güvenilir Tercih", desc: "Gerçek kullanıcı yorumları ve puanlamalarla huzurla karar verin." }
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariant} className="flex gap-4 text-left">
                  <div className="h-6 w-6 rounded-full bg-blue-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


          <div className="relative flex flex-col md:block gap-4 md:h-[500px] mt-10 md:mt-0">
            {[
              { name: "Ahmet Y.", service: "Boya Badana", comment: "Saniyeler içinde harika bir usta buldum.", rating: 5, x: 50, y: 50 },
              { name: "Ayşe K.", service: "Özel Ders", comment: "Doğru tercihi yaptım.", rating: 5, x: 150, y: 180 },
              { name: "Mehmet M.", service: "Eşya Taşıma", comment: "Aracısız, en uygun teklif.", rating: 4, x: 30, y: 310 },
            ].map((card, i) => (
              <motion.div
                key={i} custom={i} initial="hidden" whileInView="visible" variants={cardVariant} viewport={{ once: true }}
                className="md:absolute relative bg-zinc-900/80 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl w-full md:w-[350px] space-y-3"
                style={!isMobile ? { left: `${card.x}px`, top: `${card.y}px`, zIndex: 10 + i } : {}}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">{card.name[0]}</div>
                    <div className="text-left">
                      <p className="font-bold text-sm">{card.name}</p>
                      <p className="text-[10px] text-blue-400 uppercase tracking-wider">{card.service}</p>
                    </div>
                  </div>
                  <div className="text-yellow-400 text-xs">{"★".repeat(card.rating)}</div>
                </div>
                <p className="text-xs text-white/70 italic text-left leading-relaxed">"{card.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

   
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} className="min-h-screen flex items-center px-6 md:px-20 relative py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full z-10">

  
          <div className="relative flex flex-col md:block gap-6 md:h-[500px] order-2 md:order-1 mt-10 md:mt-0">
            <motion.div
              custom={0} initial="hidden" whileInView="visible" variants={cardVariant} viewport={{ once: true }}
              className="md:absolute relative top-0 left-0 bg-zinc-900/80 border border-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl w-full md:w-[380px] text-center space-y-4"
            >
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Eski Nesil Platformlar</p>
              <div className="flex justify-center gap-6 items-end h-24 md:h-32">
                <div className="w-10 bg-red-500/20 border border-red-500/40 rounded-t-lg h-full flex flex-col justify-end p-2 text-red-400 font-bold text-[8px]">KOMİSYON</div>
                <div className="w-10 bg-red-500 rounded-t-lg h-2/3 flex flex-col justify-end p-2 text-black font-bold text-[8px]">TEKLİF</div>
              </div>
              <p className="text-[9px] text-white/50 italic italic">"İş gelse de gelmese de para öde..."</p>
            </motion.div>

            <motion.div
              custom={1} initial="hidden" whileInView="visible" variants={cardVariant} viewport={{ once: true }}
              className="md:absolute relative md:top-40 md:left-32 bg-emerald-500 border border-emerald-400 p-6 md:p-8 rounded-3xl shadow-2xl w-full md:w-[380px] text-center space-y-4 text-black"
              style={{ zIndex: 12 }}
            >
              <p className="text-[10px] uppercase font-bold tracking-widest text-black/60 font-black">GoodJob Deneyimi</p>
              <div className="flex justify-center items-end h-24 md:h-32">
                <div className="w-24 bg-black border border-black/20 rounded-t-lg h-full flex flex-col justify-end p-3 text-emerald-400 font-black text-lg uppercase tracking-tighter leading-none">%100<br />KAZANÇ</div>
              </div>
              <p className="text-[9px] text-black/60 font-bold uppercase tracking-tight">Sabit Paket • Sınırsız İş • %0 Komisyon</p>
            </motion.div>
          </div>

          <div className="space-y-8 text-left order-1 md:order-2">
            <motion.div variants={itemVariant} className="inline-block px-4 py-1 rounded-full border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-widest">Profesyoneller İçin</motion.div>
            <motion.h2 variants={itemVariant} className="text-5xl md:text-7xl font-black uppercase leading-tight italic">Kazancınız <span className="text-emerald-500 underline decoration-emerald-500/30">Sizin</span></motion.h2>
            <motion.p variants={itemVariant} className="text-white/60 italic text-sm leading-relaxed">Gereksiz maliyetleri geride bırakın.</motion.p>
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-t from-blue-900/10 to-transparent">
        <motion.h2 variants={itemVariant} className="text-4xl md:text-6xl font-black mb-12 italic uppercase tracking-tighter decoration-blue-500 underline">Neden Biz?</motion.h2>
        <motion.p variants={itemVariant} className="max-w-2xl text-xl text-white/70 mb-12 leading-relaxed">
          Piyasadaki karmaşık ve yüksek komisyonlu sistemlerin aksine, biz hizmet verenin kazancını koruyor, hizmet alanın ise en iyiye ücretsiz ulaşmasını sağlıyoruz.
        </motion.p>
        <motion.div variants={itemVariant} className="space-y-8">
          <h3 className="text-2xl font-bold uppercase tracking-[0.2em] text-white/40 italic">Hizmet Dünyasında "Teklif Başına Ödeme" Devri Bitti!</h3>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setIsOpen(true)} className="px-14 py-6 bg-white text-black rounded-full font-black hover:scale-110 transition-all uppercase tracking-[0.2em] text-xs shadow-[0_20px_40px_rgba(255,255,255,0.2)]">Hemen Başlayın</button>
          </div>
        </motion.div>
      </motion.section>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsOpen(false)}></div>
          <div className="relative bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-3xl text-center">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors text-xl">✕</button>
            {state === "SUCCESS" ? (
              <div className="py-10">
                <h3 className="text-3xl font-black mb-4 tracking-tighter underline decoration-emerald-500">Harika!</h3>
                <p className="text-white/60 font-medium">Başarıyla listeye eklendin. Uygulama yayınlandığında sana haber vereceğiz.</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-black mb-2 tracking-tighter uppercase italic">Beni Haberdar Et</h3>
                <p className="text-white/50 mb-8 font-medium text-xs tracking-widest">GELİŞMELERDEN İLK SENİN HABERİN OLSUN.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input type="email" required placeholder="E-posta adresin" className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/40 text-white text-center transition-all outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <button type="submit" disabled={state === "SUBMITTING"} className="w-full py-4 bg-white text-black rounded-2xl font-black tracking-widest hover:bg-zinc-200 transition-all disabled:opacity-50 text-xs">
                    {state === "SUBMITTING" ? "KAYDEDİLİYOR..." : "LİSTEYE KATIL"}
                  </button>
                </form>
                {state === "ERROR" && <p className="mt-4 text-red-400 text-[10px] font-bold tracking-[0.3em]">BİR HATA OLUŞTU, TEKRAR DENE.</p>}
              </>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-10 right-10 text-[9px] font-mono text-white/20 tracking-[0.4em] uppercase hidden md:block z-50">v1.0-alpha // 2026</div>

    </div>
  );
}

export default App;