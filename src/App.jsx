import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight, X, MapPin, Star, Key, Ruler,
  Armchair, Building, Calendar, Clock, Check,
  ArrowRight, Mail, Phone, Instagram, Linkedin, Facebook, ChevronRight, Award, Users
} from 'lucide-react';
import NohaLogo from './assets/Noha_logo.jpeg';
import HeroImage from './assets/image.png';
import Work1 from './assets/work1.jpeg';
import Work2 from './assets/work2.jpeg';
import Work3 from './assets/work3.jpeg';
import Work4 from './assets/work4.jpeg';
import Work5 from './assets/work5.jpeg';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCursor, setActiveCursor] = useState(false);
  const [cursorText, setCursorText] = useState("View");
  const [activeService, setActiveService] = useState(0);
  const [activeProcess, setActiveProcess] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', interest: 'Residential'
  });

  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(totalScroll / windowHeight);
      setIsScrolled(totalScroll > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    let rafId = null;
    const animateCursor = () => {
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.12;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(animateCursor);
    };
    cursor.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateCursor);
    return () => { window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(rafId); };
  }, []);

  const handleCursorHover = (text = "View") => { setCursorText(text); setActiveCursor(true); };
  const handleCursorLeave = () => { setActiveCursor(false); };

  const services = [
    { id: "01", title: "Spatial Planning", subtitle: "Flow & Function", desc: "Optimizing the rhythm of your home. We analyze movement, light, and utility to create layouts that feel intuitive and expansive.", features: ["Floorplan Optimization", "Light Analysis", "Flow Dynamics"], icon: <Ruler size={28} /> },
    { id: "02", title: "Interior Architecture", subtitle: "Structure & Detail", desc: "Redefining the bones of a space. From bespoke joinery to structural modifications, we craft the permanent elements that define character.", features: ["Custom Millwork", "Material Selection", "Structural Refinement"], icon: <Building size={28} /> },
    { id: "03", title: "Bespoke Styling", subtitle: "Furniture & Decor", desc: "The art of selection. We source rare vintage pieces and commission custom furniture to create a layered, collected narrative.", features: ["Textile curation", "Vintage Sourcing", "Custom Furniture"], icon: <Armchair size={28} /> },
    { id: "04", title: "Art Curation", subtitle: "Finishing Touches", desc: "Soulful additions that provoke thought. We work with galleries and artists to find pieces that resonate with your personal aesthetic.", features: ["Gallery Partnerships", "Installation Styling", "Lighting Design"], icon: <Star size={28} /> }
  ];

  const categories = [
    { title: "Residential", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", count: "45+" },
    { title: "Restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800", count: "20+" },
    { title: "Commercial", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", count: "25+" },
    { title: "Public Space", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800", count: "15+" }
  ];

  const galleryItems = [
    { id: 1, title: "Modular Kitchen Elegance", image: Work1, specs: "L-Shaped Layout | Hexagonal Backsplash" },
    { id: 2, title: "The Panoramic Kitchen", image: Work2, specs: "U-Shaped Design | Ambient Ceiling Lighting" },
    { id: 3, title: "Contemporary Culinary Corner", image: Work3, specs: "Fluted Glass Cabinets | Built-In Appliances" },
    { id: 4, title: "Tropical Retreat Bedroom", image: Work4, specs: "Rattan Wardrobe | Botanical Accent Wall" },
    { id: 5, title: "Serene Minimal Bedroom", image: Work5, specs: "Cane Headboard | Pendant Lighting" }
  ];

  const timeSlots = ["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];
  const navLinks = ['Home', 'About', 'Projects', 'Services', 'Contact'];

  return (
    <div className="min-h-screen font-sans selection:bg-[#D4AF37] selection:text-[#0A0A0A] cursor-auto md:cursor-none overflow-x-hidden">

      <style>{`
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes revealLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes countUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block will-change-transform">
        <div className={`relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 ease-out
          ${activeCursor ? 'w-20 h-20 bg-[#1A1A1A]/90 text-[#FAF7F2] scale-100' : 'w-3 h-3 bg-[#1A1A1A] scale-100'}`}>
          <span className={`text-[9px] font-bold uppercase tracking-widest transition-opacity duration-200 ${activeCursor ? 'opacity-100' : 'opacity-0'}`}>{cursorText}</span>
        </div>
      </div>

      {/* Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-40 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'} px-6 md:px-12 lg:px-16`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onMouseEnter={() => handleCursorHover("Home")} onMouseLeave={handleCursorLeave}>
            <img src={HeroImage} alt="Noha Interiors" className="h-9 md:h-12 w-auto object-contain" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className={`font-body text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative group ${isScrolled ? 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'}`}
                onMouseEnter={() => handleCursorHover(item)} onMouseLeave={handleCursorLeave}>
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="https://www.instagram.com/noha_interiors?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"
              className={`transition-colors duration-300 ${isScrolled ? 'text-[#1A1A1A]/70 hover:text-[#D4AF37]' : 'text-[#1A1A1A]/60 hover:text-[#D4AF37]'}`}
              onMouseEnter={() => handleCursorHover("Follow")} onMouseLeave={handleCursorLeave} aria-label="Instagram">
              <Instagram size={22} />
            </a>
            <a href="#contact" className="bg-[#1A1A1A] text-[#FAF7F2] px-7 py-3 font-body text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-400"
              onMouseEnter={() => handleCursorHover("Book")} onMouseLeave={handleCursorLeave}>
              Get a Consultation
            </a>
          </div>

          {/* Mobile Burger */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden group flex flex-col items-end gap-1.5 p-2">
            <div className={`w-6 h-[1.5px] bg-[#1A1A1A] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-4 h-[1.5px] bg-[#1A1A1A] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'group-hover:w-6'}`} />
            <div className={`w-6 h-[1.5px] bg-[#1A1A1A] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div className={`fixed inset-0 bg-[#FAF7F2] z-[60] transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col items-center justify-center relative px-6">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-6 text-[#1A1A1A] hover:rotate-90 transition-transform duration-500">
            <X size={32} strokeWidth={1} />
          </button>
          <ul className="text-center space-y-4">
            {navLinks.map(item => (
              <li key={item} className="overflow-hidden group">
                <a href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}
                  className="block text-4xl md:text-7xl font-display text-[#1A1A1A]/30 hover:text-[#1A1A1A] hover:italic transition-all duration-500 transform group-hover:translate-x-4">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-12 flex gap-8 text-[#1A1A1A] items-center">
            <a href="https://www.instagram.com/noha_interiors?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-[#D4AF37] transition-all flex items-center gap-2">
              <Instagram size={28} />
              <span className="font-body text-xs uppercase tracking-widest font-semibold">@noha_interiors</span>
            </a>
            <a href="#" className="opacity-40 hover:opacity-100 transition-opacity"><Linkedin size={24} /></a>
            <a href="#" className="opacity-40 hover:opacity-100 transition-opacity"><Facebook size={24} /></a>
          </div>
        </div>
      </div>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <header id="home" className="relative min-h-[100dvh] bg-[#FAF7F2] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-28 md:pt-32 lg:pt-0 lg:min-h-[100dvh] flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-[50%] relative z-10 lg:pr-12 py-8 lg:py-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10 bg-[#D4AF37]" />
              <p className="font-body text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#8B7355]">Interior Design Studio</p>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[15vw] md:text-[10rem] lg:text-[11rem] leading-[0.85] text-[#1A1A1A] mb-2 font-bold tracking-tight">
              NOHA
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
              className="font-script text-2xl md:text-3xl italic text-[#8B7355] mb-6 tracking-wide">
              Crafting Interiors That Inspire
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
              className="font-body text-sm md:text-[15px] text-[#1A1A1A]/60 leading-[1.8] mb-8 max-w-md">
              We create exceptional interiors that reflect your lifestyle — spaces that fuse elegance with functionality, transforming every room into a masterpiece.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex items-center gap-5">
              <a href="#contact" className="bg-[#1A1A1A] text-[#FAF7F2] px-8 py-4 font-body text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-400">
                Get a Consultation
              </a>
              <a href="#about" className="font-body text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Hero Image */}
          <motion.div className="lg:w-[50%] relative lg:h-[100dvh] h-[50vh] w-full" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3 }}>
            <div className="absolute inset-0 lg:right-[-4rem] overflow-hidden">
              <motion.img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600"
                alt="Luxury Interior" className="w-full h-full object-cover" style={{ y: yHero }} fetchPriority="high" decoding="async"
                onMouseEnter={() => handleCursorHover("")} onMouseLeave={handleCursorLeave} />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#FAF7F2]/40 hidden lg:block" />
            </div>
            {/* Floating 3D Object / Badge */}
            <motion.div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 bg-[#1A1A1A] text-[#FAF7F2] p-5 md:p-6 shadow-2xl z-10"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
              <p className="font-body text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] mb-1">Since 2010</p>
              <p className="font-display text-2xl md:text-3xl">15<sup className="text-[#D4AF37] text-sm">+</sup></p>
              <p className="font-body text-[9px] uppercase tracking-widest text-white/50">Years of Excellence</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div className="bg-[#1A1A1A] relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { num: "15+", label: "Years Experience" }, { num: "100+", label: "Projects Completed" },
              { num: "4.9", label: "Client Rating" }, { num: "50+", label: "Design Awards" }
            ].map((stat, i) => (
              <div key={i} className="text-center md:px-8">
                <p className="font-display text-3xl md:text-4xl text-[#FAF7F2] mb-1">{stat.num}</p>
                <p className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* ═══════════════ ABOUT SECTION ═══════════════ */}
      <section id="about" className="py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div className="lg:col-span-5" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}>
              <span className="block font-body text-[10px] uppercase tracking-[0.4em] text-[#8B7355] mb-4">About Us</span>
              <h2 className="font-display text-4xl md:text-6xl text-[#1A1A1A] leading-[1.1] mb-6">
                World shaped by <br /><span className="italic text-[#8B7355]">experience</span>
              </h2>
              <p className="font-body text-sm md:text-[15px] text-[#1A1A1A]/60 leading-[1.9] mb-6">
                Space matters more than ever. At Noha, we fuse interior design with strategic thinking — creating environments that don't just look good, but work smart. Our philosophy is rooted in sensory depth and aesthetic mastery.
              </p>
              {/* Small Project Image */}
              <div className="flex items-center gap-4">
                <img src={Work1} alt="Our Project" className="w-16 h-16 md:w-20 md:h-20 object-cover" loading="lazy" decoding="async" />
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">Our Project</p>
                  <p className="font-display text-lg text-[#1A1A1A]">Latest Work</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="lg:col-span-7" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="grid grid-cols-2 gap-8 items-end">
                <div className="space-y-8">
                  <div className="text-center p-8 border border-[#1A1A1A]/10">
                    <p className="font-display text-6xl md:text-7xl text-[#1A1A1A] leading-none">15<sup className="text-[#D4AF37] text-xl align-super">+</sup></p>
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/40 mt-3">Years Experience</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800"
                    className="w-full aspect-[3/4] object-cover" alt="Interior" loading="lazy" decoding="async"
                    onMouseEnter={() => handleCursorHover("")} onMouseLeave={handleCursorLeave} />
                </div>
                <div className="space-y-8">
                  <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
                    className="w-full aspect-[4/5] object-cover" alt="Interior Detail" loading="lazy" decoding="async"
                    onMouseEnter={() => handleCursorHover("")} onMouseLeave={handleCursorLeave} />
                  <div className="text-center p-8 border border-[#1A1A1A]/10">
                    <p className="font-display text-6xl md:text-7xl text-[#1A1A1A] leading-none">100<sup className="text-[#D4AF37] text-xl align-super">+</sup></p>
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/40 mt-3">Total Projects</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-width Interior Image Banner */}
          <motion.div className="mt-16 md:mt-24 relative overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
              className="w-full h-[40vh] md:h-[60vh] object-cover" alt="Interior Panorama" loading="lazy" decoding="async"
              onMouseEnter={() => handleCursorHover("")} onMouseLeave={handleCursorLeave} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>


      {/* ═══════════════ DETAILED SERVICES ACCORDION ═══════════════ */}
      <section className="py-20 md:py-28 bg-[#111111] text-[#FAF7F2] relative overflow-hidden border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <span className="text-[#D4AF37] font-body text-[10px] uppercase tracking-[0.4em]">Holistic Approach</span>
            <h2 className="font-display text-4xl md:text-6xl mt-3">Our Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-2">
              {services.map((service, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <div onClick={() => setActiveService(activeService === index ? null : index)}
                    className={`p-4 border border-white/10 cursor-pointer transition-all duration-500 hover:bg-white/5 ${activeService === index ? 'bg-white/5 border-[#D4AF37]/50' : ''}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-6">
                        <span className={`font-display text-xl w-8 transition-colors duration-300 ${activeService === index ? 'text-[#D4AF37]' : 'text-white/30'}`}>{service.id}</span>
                        <div>
                          <h3 className="font-display text-xl md:text-3xl group-hover:italic transition-all duration-300">{service.title}</h3>
                          <p className="font-body text-[10px] uppercase tracking-widest text-white/50 mt-1">{service.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight className={`transition-all duration-500 transform ${activeService === index ? 'rotate-90 lg:rotate-0 text-[#D4AF37]' : 'opacity-0 lg:group-hover:opacity-50'}`} />
                    </div>
                  </div>
                  {/* Mobile Accordion */}
                  <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${activeService === index ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#1A1A1A] p-4 border border-white/5">
                      <div className="mb-4 text-[#D4AF37]">{service.icon}</div>
                      <p className="font-body text-sm text-gray-400 leading-loose mb-4">{service.desc}</p>
                      <div className="space-y-2 mb-4">
                        {service.features.map((f, fi) => (
                          <div key={fi} className="flex items-center gap-4 border-b border-white/10 pb-3">
                            <Check size={14} className="text-[#D4AF37]" />
                            <span className="font-body text-xs uppercase tracking-widest text-white/80">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Service Detail */}
            <div className="hidden lg:block lg:col-span-7">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="relative min-h-[400px] bg-[#1A1A1A] p-10 border border-white/5 flex flex-col justify-center lg:sticky lg:top-32">
                <div className="absolute top-0 right-0 p-8 text-[#D4AF37] opacity-20">{services[activeService !== null ? activeService : 0].icon}</div>
                <div key={`content-${activeService}`}>
                  <h3 className="font-script text-5xl md:text-7xl text-[#D4AF37] mb-4 animate-[fadeIn_0.5s_ease-out_forwards]">{services[activeService !== null ? activeService : 0].title}</h3>
                  <p className="font-body text-base text-gray-300 leading-relaxed mb-6 max-w-xl animate-[fadeIn_0.5s_ease-out_0.1s_forwards]">{services[activeService !== null ? activeService : 0].desc}</p>
                  <div className="space-y-3">
                    {services[activeService !== null ? activeService : 0].features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 border-b border-white/10 pb-3 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: `${0.15 * i}s` }}>
                        <Check size={18} className="text-[#D4AF37]" />
                        <span className="font-body text-sm uppercase tracking-widest text-white/80">{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className="mt-8 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] border-b border-[#D4AF37] pb-2 hover:text-[#D4AF37] transition-colors">
                    Inquire About {services[activeService !== null ? activeService : 0].title} <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PORTFOLIO ═══════════════ */}
      <section id="projects" className="py-20 md:py-28 px-6 bg-[#FAF7F2] border-t border-[#1A1A1A]/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
            <div>
              <span className="block font-body text-[10px] uppercase tracking-[0.4em] text-[#8B7355] mb-3">Portfolio</span>
              <h2 className="font-display text-5xl md:text-8xl text-[#1A1A1A]">Selected<br />Works</h2>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="font-body text-xs uppercase tracking-widest text-[#1A1A1A]/40">Residential & Commercial</p>
              <p className="font-script text-2xl md:text-3xl italic text-[#8B7355] mt-1">Portfolio 2024–2025</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 md:gap-y-14">
            {galleryItems.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }} className={`group md:cursor-none ${index % 3 === 0 ? 'md:col-span-2' : ''}`}
                onMouseEnter={() => handleCursorHover("")} onMouseLeave={handleCursorLeave}>
                <div className={`relative overflow-hidden mb-4 ${index % 3 === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#8B7355]/0 group-hover:bg-[#8B7355]/10 transition-colors duration-700" />
                </div>
                <div className="flex justify-between items-start border-t border-[#1A1A1A]/15 pt-4">
                  <div>
                    <h3 className="font-display text-xl md:text-3xl text-[#1A1A1A] group-hover:italic transition-all">{item.title}</h3>
                    <p className="font-body text-[10px] uppercase tracking-widest mt-1 text-[#1A1A1A]/40">{item.specs}</p>
                  </div>
                  <ArrowUpRight size={20} className="text-[#1A1A1A]/20 group-hover:text-[#D4AF37] transition-colors mt-1" />
                </div>
              </motion.div>
            ))}

            {/* Your Next Project Card */}
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.5 }} className="group md:cursor-none h-full"
              onMouseEnter={() => handleCursorHover("Start")} onMouseLeave={handleCursorLeave}>
              <a href="#contact" className="block relative w-full h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-[#FAF7F2] border border-[#1A1A1A]/10 hover:border-[#D4AF37] transition-colors duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-[#D4AF37]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="relative z-10 flex flex-col items-center">
                  <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-3">Become our next success</p>
                  <h3 className="font-display text-4xl md:text-5xl text-[#1A1A1A] mb-6">Your Next<br /><span className="italic text-[#8B7355]">Project</span></h3>
                  <div className="w-12 h-12 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#FAF7F2] text-[#1A1A1A] transition-all duration-500">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT & BOOKING ═══════════════ */}
      <section id="contact" className="py-20 md:py-28 px-6 md:px-12 bg-[#0A0A0A] relative border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}>
            <span className="block font-body text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-4">Get in Touch</span>
            <h2 className="font-display text-5xl md:text-7xl leading-none mb-6 text-[#FAF7F2]">Start a <br />Project</h2>
            <p className="font-body text-sm md:text-[15px] leading-[1.8] text-white/50 mb-8 max-w-md">
              Whether you want to refresh a single room or redesign your entire home, our team is ready to bring your vision to life.
            </p>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] p-3 rounded-full"><MapPin size={20} /></div>
                <div>
                  <h4 className="font-display text-lg text-[#FAF7F2]">Our Studio</h4>
                  <p className="font-body text-xs text-white/40 mt-1">Noha Interiors,<br />Karunagapally, Kerala, India</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] p-3 rounded-full"><Phone size={20} /></div>
                <div>
                  <h4 className="font-display text-lg text-[#FAF7F2]">Get in Touch</h4>
                  <p className="font-body text-xs text-white/40 mt-1">hello@nohainteriors.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#1A1A1A] p-6 md:p-8 shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            <div className="mb-6 flex justify-between items-end">
              <h3 className="font-display text-2xl md:text-3xl text-[#FAF7F2]">Consultation</h3>
              <span className="font-body text-[10px] uppercase tracking-widest text-[#D4AF37]">Step {bookingStep} of 2</span>
            </div>
            {bookingStep === 1 ? (
              <div className="space-y-5 animate-[fadeIn_0.5s_ease-out]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-white/80">First Name</label>
                    <input type="text" className="w-full bg-white/5 border-b border-white/20 p-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors font-body text-sm text-[#FAF7F2] placeholder-white/30" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-white/80">Last Name</label>
                    <input type="text" className="w-full bg-white/5 border-b border-white/20 p-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors font-body text-sm text-[#FAF7F2] placeholder-white/30" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-white/80">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border-b border-white/20 p-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors font-body text-sm text-[#FAF7F2] placeholder-white/30" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-white/80">I am Interested In</label>
                  <div className="flex gap-3 mt-2">
                    {['Residential', 'Commercial', 'Consultation'].map(opt => (
                      <button key={opt} onClick={() => setFormData({ ...formData, interest: opt })}
                        className={`flex-1 py-3 text-[10px] uppercase tracking-wider border transition-all ${formData.interest === opt ? 'bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]' : 'border-white/20 text-white/70 hover:border-[#D4AF37]'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setBookingStep(2)} className="w-full bg-[#D4AF37] text-[#0A0A0A] py-4 mt-2 font-body text-xs uppercase tracking-[0.2em] hover:bg-[#b89528] transition-colors flex justify-center items-center gap-2 font-semibold">
                  Select Time Slot <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="animate-[fadeIn_0.5s_ease-out]">
                <p className="font-body text-xs text-white/50 mb-6">Please select a preferred time for a 30-minute discovery call.</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {timeSlots.map(slot => (
                    <button key={slot} onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-4 border text-xs font-body transition-all flex justify-between items-center ${selectedSlot === slot ? 'bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]' : 'border-white/20 hover:border-[#D4AF37] text-white/70'}`}>
                      {slot}{selectedSlot === slot && <Check size={12} />}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setBookingStep(1)} className="flex-1 py-4 border border-white/20 font-body text-xs uppercase tracking-[0.2em] text-white/70 hover:bg-white/5 transition-colors">Back</button>
                  <button className="flex-[2] bg-[#D4AF37] text-[#0A0A0A] py-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-[#b89528] transition-colors font-semibold" onClick={() => alert("Request sent! We will contact you shortly.")}>Confirm Request</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-[#0A0A0A] text-[#FAF7F2] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
            <div className="md:col-span-4">
              <img src={HeroImage} alt="Noha Interiors" className="h-10 md:h-12 w-auto object-contain mb-4 invert" />
              <p className="font-body text-sm text-white/40 leading-relaxed max-w-xs">
                Luxury interior design studio crafting spaces that inspire. Every detail matters.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-body text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Navigate</h4>
              <ul className="space-y-3">
                {navLinks.map(l => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} className="font-body text-sm text-white/40 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-body text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Contact</h4>
              <p className="font-body text-sm text-white/40 leading-relaxed">Noha Interiors<br />Karunagapally, Kerala<br />India</p>
              <p className="font-body text-sm text-white/40 mt-3">hello@nohainteriors.com</p>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-body text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Follow Us</h4>
              <div className="flex flex-col gap-4">
                <a href="https://www.instagram.com/noha_interiors?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-white/80 hover:text-[#D4AF37] transition-colors p-3 border border-white/10 hover:border-[#D4AF37]/50 bg-white/5">
                  <Instagram size={24} />
                  <div>
                    <p className="font-body text-sm font-semibold tracking-wide">Instagram</p>
                    <p className="font-body text-[10px] text-white/40 group-hover:text-[#D4AF37]/60">@noha_interiors</p>
                  </div>
                </a>
                <div className="flex gap-4">
                  {[Linkedin, Facebook].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h2 className="font-display text-[15vw] md:text-[10vw] leading-none opacity-[0.06] select-none text-center">NOHA</h2>
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 font-body text-[10px] uppercase tracking-[0.2em] text-white/30">
              <p>© 2025 Noha Interiors. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                {['Privacy', 'Terms', 'Sitemap'].map(l => (
                  <a key={l} href="#" className="hover:text-[#D4AF37] transition-colors relative group">
                    {l}<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress */}
      <motion.div className="fixed bottom-0 left-0 h-[3px] bg-[#D4AF37] z-50 shadow-[0_0_10px_#D4AF37] origin-left" style={{ scaleX: scrollProgress }} />
    </div>
  );
};

export default App;