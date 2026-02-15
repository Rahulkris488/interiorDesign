import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight, X, MapPin, Star, Key, Ruler,
  Armchair, Building, Calendar, Clock, Check,
  ArrowRight, Mail, Phone, Instagram, Linkedin, Facebook
} from 'lucide-react';
import NohaLogo from './assets/Noha_logo.jpeg';
import HeroImage from './assets/image.png';
import Work1 from './assets/work1.jpeg';
import Work2 from './assets/work2.jpeg';
import Work3 from './assets/work3.jpeg';
import Work4 from './assets/work4.jpeg';
import Work5 from './assets/work5.jpeg';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

/**
 * NOHA INTERIORS - Luxury Interior Design
 * --------------------------------------------------
 * Design Philosophy: Minimalist Luxury, Editorial Typography, Fluid Motion.
 * Font Stack: Italiana (Headings), Monsieur La Doulaise (Script), Montserrat (Body).
 */

const App = () => {
  // --- STATE MANAGEMENT ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCursor, setActiveCursor] = useState(false);
  const [cursorText, setCursorText] = useState("View");
  const [activeService, setActiveService] = useState(0);
  const [activeProcess, setActiveProcess] = useState(null);
  // Form State
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Residential'
  });

  // --- REFS ---
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });

  // --- ANIMATION LOOPS & LISTENERS ---

  // 1. Scroll Progress & Parallax
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(totalScroll / windowHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Custom Physics Cursor (Desktop Only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    let rafId = null;
    const animateCursor = () => {
      const xDiff = mouse.current.x - cursor.current.x;
      const yDiff = mouse.current.y - cursor.current.y;

      cursor.current.x += xDiff * 0.12;
      cursor.current.y += yDiff * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animateCursor);
    };

    // Initialize center
    cursor.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // --- DATA MOCKUPS ---

  const services = [
    {
      id: "01",
      title: "Spatial Planning",
      subtitle: "Flow & Function",
      desc: "Optimizing the rhythm of your home. We analyze movement, light, and utility to create layouts that feel intuitive and expansive.",
      features: ["Floorplan Optimization", "Light Analysis", "Flow Dynamics"],
      icon: <Ruler size={28} />
    },
    {
      id: "02",
      title: "Interior Architecture",
      subtitle: "Structure & Detail",
      desc: "Redefining the bones of a space. From bespoke joinery to structural modifications, we craft the permanent elements that define character.",
      features: ["Custom Millwork", "Material Selection", "Structural Refinement"],
      icon: <Building size={28} />
    },
    {
      id: "03",
      title: "Bespoke Styling",
      subtitle: "Furniture & Decor",
      desc: "The art of selection. We source rare vintage pieces and commission custom furniture to create a layered, collected narrative.",
      features: ["Textile curation", "Vintage Sourcing", "Custom Furniture"],
      icon: <Armchair size={28} />
    },
    {
      id: "04",
      title: "Art Curation",
      subtitle: "Finishing Touches",
      desc: "Soulful additions that provoke thought. We work with galleries and artists to find pieces that resonate with your personal aesthetic.",
      features: ["Gallery Partnerships", "Installation Styling", "Lighting Design"],
      icon: <Star size={28} />
    }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Modular Kitchen Elegance",
      image: Work1,
      specs: "L-Shaped Layout | Hexagonal Backsplash"
    },
    {
      id: 2,
      title: "The Panoramic Kitchen",
      image: Work2,
      specs: "U-Shaped Design | Ambient Ceiling Lighting"
    },
    {
      id: 3,
      title: "Contemporary Culinary Corner",
      image: Work3,
      specs: "Fluted Glass Cabinets | Built-In Appliances"
    },
    {
      id: 4,
      title: "Tropical Retreat Bedroom",
      image: Work4,
      specs: "Rattan Wardrobe | Botanical Accent Wall"
    },
    {
      id: 5,
      title: "Serene Minimal Bedroom",
      image: Work5,
      specs: "Cane Headboard | Pendant Lighting"
    }
  ];

  const timeSlots = [
    "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
  ];

  // --- HANDLERS ---

  const handleCursorHover = (text = "View") => {
    setCursorText(text);
    setActiveCursor(true);
  };

  const handleCursorLeave = () => {
    setActiveCursor(false);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen font-sans selection:bg-[#D4AF37] selection:text-[#0A0A0A] cursor-auto md:cursor-none overflow-x-hidden">

      {/* --- GLOBAL STYLES & FONTS --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Monsieur+La+Doulaise&family=Montserrat:wght@200;300;400;500;600&display=swap');
          
          .font-display { font-family: 'Italiana', serif; }
          .font-script { font-family: 'Monsieur La Doulaise', cursive; }
          .font-body { font-family: 'Montserrat', sans-serif; }
          
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #0A0A0A; }
          ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 3px; }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* --- CUSTOM CURSOR (Hidden on Touch Devices) --- */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block will-change-transform"
      >
        <div
          className={`
            relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 ease-out
            ${activeCursor ? 'w-20 h-20 bg-white/90 text-[#0A0A0A] scale-100' : 'w-3 h-3 bg-white scale-100'}
          `}
        >
          <span className={`text-[9px] font-bold uppercase tracking-widest transition-opacity duration-200 ${activeCursor ? 'opacity-100' : 'opacity-0'}`}>
            {cursorText}
          </span>
        </div>
      </div>

      {/* --- NOISE OVERLAY --- */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-40 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-[#FDFBF7]">
        <div className="flex flex-col group cursor-pointer" onMouseEnter={() => handleCursorHover("Home")} onMouseLeave={handleCursorLeave}>
          <img src={HeroImage} alt="Noha Interiors" className="h-10 md:h-14 w-auto object-contain" />
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group flex flex-col items-end gap-1.5 p-2"
            onMouseEnter={() => handleCursorHover("Menu")} onMouseLeave={handleCursorLeave}
          >
            <div className={`w-6 md:w-8 h-[1px] bg-[#FDFBF7] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-4 md:w-5 h-[1px] bg-[#FDFBF7] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'group-hover:w-8'}`}></div>
            <div className={`w-6 md:w-8 h-[1px] bg-[#FDFBF7] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* --- FULL SCREEN MENU --- */}
      <div className={`fixed inset-0 bg-[#0A0A0A] z-[60] transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col items-center justify-center relative text-[#FDFBF7] px-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-6 md:right-8 text-[#FDFBF7] hover:rotate-90 transition-transform duration-500"
          >
            <X size={32} strokeWidth={1} />
          </button>
          <ul className="text-center space-y-4 md:space-y-2">
            {['Residence', 'Philosophy', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <li key={item} className="overflow-hidden group">
                <a href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-4xl md:text-8xl font-display text-[#FDFBF7]/30 hover:text-[#FDFBF7] hover:italic transition-all duration-500 transform group-hover:translate-x-4">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-12 flex gap-8">
            <Instagram className="opacity-50 hover:opacity-100 transition-opacity" size={20} />
            <Linkedin className="opacity-50 hover:opacity-100 transition-opacity" size={20} />
            <Facebook className="opacity-50 hover:opacity-100 transition-opacity" size={20} />
          </div>
        </div>
      </div>

      {/* =========================================
          PAGE 1: HERO SECTION
      ========================================= */}
      <header id="residence" className="relative h-[100dvh] flex items-center px-6 md:px-16 lg:px-24 overflow-hidden">

        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: yHero }}
        >
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2500"
            alt="Luxury Architecture"
            loading="eager"
            decoding="async"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-transparent"></div>
        </motion.div>

        <div className="z-10 relative w-full max-w-[1400px] mx-auto pt-24 md:pt-0">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-[1px] w-8 bg-[#D4AF37]"></span>
            <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#D4AF37]">
              Interior Design Studio
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[18vw] md:text-[10rem] lg:text-[12rem] leading-[0.85] text-[#FDFBF7] mb-2"
          >
            NOHA
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-script text-[12vw] md:text-8xl lg:text-9xl text-[#D4AF37] -mt-2 md:-mt-8 mb-6 md:mb-8"
          >
            Interiors
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="max-w-lg"
          >
            <p className="font-body text-sm md:text-base text-[#FDFBF7]/70 leading-relaxed tracking-wide mb-8">
              Where every corner tells a story of elegance. We craft interiors that are not just seen, but felt — spaces that breathe luxury into the rhythm of your everyday life.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#contact"
                className="bg-[#D4AF37] text-[#0A0A0A] px-8 py-3.5 font-body text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#b89528] transition-colors"
              >
                Start a Project
              </a>
              <a
                href="#portfolio"
                className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#FDFBF7]/60 hover:text-[#D4AF37] transition-colors border-b border-[#FDFBF7]/20 hover:border-[#D4AF37] pb-1"
              >
                View Portfolio
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-[5]"></div>
      </header>

      {/* =========================================
          PAGE 2: ABOUT US (PHILOSOPHY)
      ========================================= */}
      <section id="philosophy" className="py-8 md:py-10 px-6 md:px-24 bg-[#0A0A0A] relative z-10 overflow-hidden border-b border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">

            {/* Left Text */}
            <div className="lg:col-span-5 pr-0 lg:pr-12">
              <span className="block text-[#D4AF37] font-body text-xs uppercase tracking-[0.3em] mb-2">
                Our Philosophy
              </span>
              <h2 className="font-display text-4xl md:text-7xl text-[#FDFBF7] leading-[1.1] mb-3 md:mb-4">
                We don't just design spaces. <br />
                <span className="italic opacity-60 font-script text-5xl md:text-8xl block mt-2">We curate lifestyles.</span>
              </h2>
              <div className="space-y-3 text-[#FDFBF7]/70 font-body text-sm md:text-base leading-relaxed text-justify relative">
                <div className="absolute top-0 left-0 w-[1px] h-full bg-white/10 -ml-6 hidden md:block"></div>
                <p>
                  At Noha Interiors, we believe that a home is more than a structure; it is the physical manifestation of your inner world. Founded on the principles of sensory depth and aesthetic mastery, we bridge the gap between architectural form and human emotion.
                </p>
                <p>
                  Our team consists of interior architects, textile specialists, and art curators who understand the nuance of luxury. We see the potential in every shadow, the value in every texture, and the story in every curated corner.
                </p>
              </div>

              <div className="mt-4 md:mt-6 flex items-center gap-4">
                <div className="bg-[#D4AF37] text-[#0A0A0A] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
                  <Building size={20} />
                </div>
                <div>
                  <p className="font-display text-base md:text-lg text-[#FDFBF7]">Noha Interiors</p>
                  <p className="font-body text-[8px] md:text-[9px] uppercase tracking-widest text-[#FDFBF7]/50">Karunagapally, Kerala</p>
                </div>
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 gap-3 md:gap-3">
                <div className="space-y-2 mt-4 md:mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
                    className="w-full aspect-[3/4] object-cover hover:brightness-75 transition-all duration-700 rounded-sm"
                    alt="Interior Detail"
                    onMouseEnter={() => handleCursorHover("Detail")} onMouseLeave={handleCursorLeave}
                  />
                  <div className="bg-[#1A1A1A] p-3 md:p-4 text-[#FDFBF7] text-center rounded-sm border border-white/5">
                    <h4 className="font-display text-xl md:text-2xl">100+</h4>
                    <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-60">Projects Completed</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-3 md:p-4 text-[#D4AF37] text-center rounded-sm">
                    <h4 className="font-display text-xl md:text-2xl">15 Years</h4>
                    <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-60">Of Excellence</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800"
                    className="w-full aspect-[3/4] object-cover hover:brightness-75 transition-all duration-700 rounded-sm"
                    alt="Exterior"
                    onMouseEnter={() => handleCursorHover("Estate")} onMouseLeave={handleCursorLeave}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PAGE 3: SERVICES (ACCORDION ON MOBILE, SPLIT ON DESKTOP)
      ========================================= */}
      <section id="services" className="py-8 md:py-10 bg-[#111111] text-[#FDFBF7] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 md:mb-8"
          >
            <span className="text-[#D4AF37] font-body text-xs uppercase tracking-[0.3em]">
              Holistic Approach
            </span>
            <h2 className="font-display text-4xl md:text-6xl mt-2">
              Our Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

            {/* Service Selection List (Left Column) + Mobile Content */}
            <div className="lg:col-span-5 space-y-2">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  {/* Header Button */}
                  <div
                    onClick={() => setActiveService(activeService === index ? null : index)}
                    className={`p-3 md:p-4 border border-white/10 cursor-pointer transition-all duration-500 hover:bg-white/5 relative overflow-hidden
                      ${activeService === index ? 'bg-white/5 border-[#D4AF37]/50' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className={`font-display text-lg md:text-xl w-6 md:w-8 transition-colors duration-300 ${activeService === index ? 'text-[#D4AF37]' : 'text-white/30'}`}>
                          {service.id}
                        </span>
                        <div>
                          <h3 className="font-display text-xl md:text-3xl group-hover:italic transition-all duration-300">{service.title}</h3>
                          <p className="font-body text-[10px] md:text-xs uppercase tracking-widest text-white/50 mt-1">{service.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight className={`transition-all duration-500 transform ${activeService === index ? 'rotate-90 lg:rotate-0 translate-x-0 opacity-100 text-[#D4AF37]' : '-translate-x-2 md:-translate-x-4 opacity-0 lg:group-hover:opacity-50'}`} />
                    </div>
                  </div>

                  {/* MOBILE/TABLET ACCORDION CONTENT (Hidden on Desktop) */}
                  <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${activeService === index ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#1A1A1A] p-4 border border-white/5">
                      <div className="mb-4 text-[#D4AF37]">
                        {service.icon}
                      </div>
                      <p className="font-body text-sm text-gray-400 leading-loose mb-4">
                        {service.desc}
                      </p>
                      <div className="space-y-2 mb-4">
                        {service.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-4 border-b border-white/10 pb-3">
                            <Check size={14} className="text-[#D4AF37]" />
                            <span className="font-body text-xs uppercase tracking-widest text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button className="font-body text-[10px] uppercase tracking-[0.2em] border-b border-[#D4AF37] pb-1 text-[#D4AF37]">
                        Inquire Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Service Detail Card (Right Column - Desktop Sticky) */}
            <div className="hidden lg:block lg:col-span-7 relative sticky-container">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-full min-h-[350px] bg-[#1A1A1A] p-6 md:p-10 border border-white/5 flex flex-col justify-center lg:sticky lg:top-32 transition-all duration-700"
              >
                <div className="absolute top-0 right-0 p-6 md:p-8 text-[#D4AF37] opacity-20">
                  {services[activeService !== null ? activeService : 0].icon}
                </div>

                <div key={`content-${activeService}`}>
                  <h3 className="font-script text-5xl md:text-7xl text-[#D4AF37] mb-4 animate-[fadeIn_0.5s_ease-out_forwards]">
                    {services[activeService !== null ? activeService : 0].title}
                  </h3>

                  <p className="font-body text-base md:text-lg text-gray-300 leading-relaxed mb-6 max-w-xl animate-[fadeIn_0.5s_ease-out_0.1s_forwards]">
                    {services[activeService !== null ? activeService : 0].desc}
                  </p>

                  <div className="space-y-3">
                    {services[activeService !== null ? activeService : 0].features.map((feature, i) => (
                      <div key={`feat-${i}`} className="flex items-center gap-3 border-b border-white/10 pb-3 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: `${0.15 * i}s` }}>
                        <Check size={18} className="text-[#D4AF37]" />
                        <span className="font-body text-xs md:text-sm uppercase tracking-widest text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 self-start font-body text-xs uppercase tracking-[0.2em] border-b border-[#D4AF37] pb-2 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    Inquire About {services[activeService !== null ? activeService : 0].title} <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <section id="process" className="py-8 md:py-10 px-6 md:px-24 bg-[#141414] border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
            >
              <span className="block text-[#D4AF37] font-body text-xs uppercase tracking-[0.3em] mb-2">
                The Methodology
              </span>
              <h2 className="font-display text-4xl md:text-6xl text-[#FDFBF7] leading-[1.1] mb-4">
                Orchestrating <br /> <span className="italic opacity-60 font-script text-6xl md:text-7xl block mt-2">The Senses.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 font-body text-sm md:text-base leading-relaxed text-[#FDFBF7]/70 text-justify relative"
            >
              <div className="absolute top-0 -left-8 w-[1px] h-full bg-white/10 hidden lg:block"></div>
              <p>
                True luxury is not just about what you see, but how you feel. Our design process is a meticulous orchestration of light, texture, and volume — layering materials with intention to create spaces that engage every sense.
              </p>
            </motion.div>
          </div>

          <div className="mt-6 md:mt-8 space-y-2">
            {[
              { title: "Concept", text: "We define the narrative direction, selecting a palette of materials and emotions that will guide the project." },
              { title: "Development", text: "Technical precision meets artistic vision. We produce detailed architectural drawings and 3D renderings." },
              { title: "Execution", text: "Rigorous project management ensures that the vision is realized without compromise, on time and on budget." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="border border-white/10"
              >
                <button
                  onClick={() => setActiveProcess(activeProcess === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg text-[#D4AF37]/60">0{i + 1}</span>
                    <h4 className="font-display text-lg text-[#FDFBF7]">{step.title}</h4>
                  </div>
                  <span className={`text-[#FDFBF7]/40 text-xl transition-transform duration-300 ${activeProcess === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${activeProcess === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="font-body text-sm leading-relaxed text-[#FDFBF7]/60 px-4 pb-4 pl-14">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          PAGE 4: GALLERY (THE PORTFOLIO)
      ========================================= */}
      <section id="portfolio" className="py-8 md:py-10 px-6 bg-[#0A0A0A] border-t border-white/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-end mb-6 md:mb-8 border-b border-white/10 pb-3"
          >
            <div>
              <h2 className="font-display text-5xl md:text-8xl text-[#FDFBF7]">Selected<br />Works</h2>
            </div>
            <div className="hidden md:block">
              <p className="font-body text-xs uppercase tracking-widest text-right mb-2 text-[#FDFBF7]/60">Residential & Commercial</p>
              <p className="font-script text-3xl text-[#D4AF37] text-right">Portfolio 2024-2025</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6 md:gap-y-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group md:cursor-none"
                onMouseEnter={() => handleCursorHover("View Home")}
                onMouseLeave={handleCursorLeave}
              >
                <div className="relative overflow-hidden mb-3 aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
                  />
                </div>

                <div className="border-t border-white/20 pt-3 transition-all duration-300 group-hover:border-[#D4AF37]">
                  <h3 className="font-display text-xl md:text-3xl text-[#FDFBF7] group-hover:italic transition-all">{item.title}</h3>
                  <p className="font-body text-xs uppercase tracking-widest mt-1 text-[#FDFBF7]/50">{item.specs}</p>
                </div>
              </motion.div>
            ))}

            {/* 6th Card: CTA to balance the 3x2 grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="group"
            >
              <a href="#contact" className="block">
                <div className="relative overflow-hidden mb-3 aspect-[4/3] bg-[#1A1A1A] border border-white/10 flex flex-col items-center justify-center text-[#FDFBF7] group-hover:bg-[#D4AF37] transition-colors duration-700">
                  <span className="font-script text-3xl md:text-5xl text-[#D4AF37] group-hover:text-[#0A0A0A] transition-colors duration-700 mb-3">Your Space</span>
                  <span className="font-display text-xl md:text-3xl group-hover:text-[#0A0A0A] transition-colors duration-700">COULD BE NEXT</span>
                  <span className="font-body text-[10px] uppercase tracking-[0.3em] mt-4 opacity-60 group-hover:opacity-100 group-hover:text-[#0A0A0A] transition-all duration-700">Start a Project →</span>
                </div>
                <div className="border-t border-white/20 pt-3 transition-all duration-300 group-hover:border-[#D4AF37]">
                  <h3 className="font-display text-xl md:text-3xl text-[#FDFBF7] group-hover:italic transition-all">Let's Collaborate</h3>
                  <p className="font-body text-xs uppercase tracking-widest mt-1 text-[#FDFBF7]/50">Book a Consultation</p>
                </div>
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* =========================================
          PAGE 5: CONTACT & BOOKING
      ========================================= */}
      <section id="contact" className="py-8 md:py-10 px-6 md:px-12 bg-[#141414] relative border-t border-white/5">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-5xl md:text-7xl leading-none mb-4 md:mb-6 text-[#FDFBF7]">
              Start a <br /> Project
            </h2>
            <p className="font-body text-sm md:text-base leading-relaxed text-[#FDFBF7]/70 mb-4 md:mb-6 max-w-md">
              Whether you are looking to refresh a single room or redesign your entire home, our team is ready to bring your vision to life.
            </p>

            <div className="space-y-3 md:space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] p-3 rounded-full">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-display text-lg md:text-xl text-[#FDFBF7]">Our Studio</h4>
                  <p className="font-body text-xs text-[#FDFBF7]/50 mt-1">Noha Interiors,<br />Karunagapally, Kerala, India</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] p-3 rounded-full">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-display text-lg md:text-xl text-[#FDFBF7]">Get in Touch</h4>
                  <p className="font-body text-xs text-[#FDFBF7]/50 mt-1">hello@nohainteriors.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#1A1A1A] p-5 md:p-8 shadow-2xl relative overflow-hidden border border-white/10"
          >
            {/* Decorative line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>

            <div className="mb-4 flex justify-between items-end">
              <h3 className="font-display text-2xl md:text-3xl text-[#FDFBF7]">Consultation</h3>
              <span className="font-body text-[9px] md:text-[10px] uppercase tracking-widest text-[#D4AF37]">
                Step {bookingStep} of 2
              </span>
            </div>

            {bookingStep === 1 ? (
              <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-[#FDFBF7]/80">First Name</label>
                    <input type="text" className="w-full bg-white/5 border-b border-white/20 p-2 focus:outline-none focus:border-[#D4AF37] transition-colors font-body text-sm text-[#FDFBF7] placeholder-white/30" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-[#FDFBF7]/80">Last Name</label>
                    <input type="text" className="w-full bg-white/5 border-b border-white/20 p-2 focus:outline-none focus:border-[#D4AF37] transition-colors font-body text-sm text-[#FDFBF7] placeholder-white/30" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-[#FDFBF7]/80">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border-b border-white/20 p-2 focus:outline-none focus:border-[#D4AF37] transition-colors font-body text-sm text-[#FDFBF7] placeholder-white/30" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-[#FDFBF7]/80">I am Interested In</label>
                  <div className="flex gap-2 md:gap-4 mt-2">
                    {['Residential', 'Commercial', 'Consultation'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFormData({ ...formData, interest: opt })}
                        className={`flex-1 py-3 text-[10px] md:text-xs uppercase tracking-wider border transition-all
                            ${formData.interest === opt ? 'bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]' : 'border-white/20 text-[#FDFBF7]/70 hover:border-[#D4AF37]'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setBookingStep(2)}
                  className="w-full bg-[#D4AF37] text-[#0A0A0A] py-4 mt-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-[#b89528] transition-colors flex justify-center items-center gap-2 font-semibold"
                >
                  Select Time Slot <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="animate-[fadeIn_0.5s_ease-out]">
                <p className="font-body text-xs text-[#FDFBF7]/50 mb-6">Please select a preferred time for a 30-minute discovery call.</p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-2 md:px-4 border text-[10px] md:text-xs font-body transition-all flex justify-between items-center
                         ${selectedSlot === slot
                          ? 'bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]'
                          : 'border-white/20 hover:border-[#D4AF37] text-[#FDFBF7]/70'}`}
                    >
                      {slot}
                      {selectedSlot === slot && <Check size={12} />}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="flex-1 py-4 border border-white/20 font-body text-xs uppercase tracking-[0.2em] text-[#FDFBF7]/70 hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    className="flex-[2] bg-[#D4AF37] text-[#0A0A0A] py-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-[#b89528] transition-colors font-semibold"
                    onClick={() => alert("Request sent! We will contact you shortly.")}
                  >
                    Confirm Request
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0A0A0A] text-[#FDFBF7] pt-6 md:pt-8 pb-4 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-[15vw] md:text-[12vw] leading-none opacity-20 select-none">NOHA</h2>

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-6 pt-4 border-t border-white/10 font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40">
            <p className="mb-4 md:mb-0">&copy; 2025 Noha Interiors</p>
            <div className="flex gap-6 md:gap-8">
              <a href="#" className="hover:text-[#D4AF37] transition-colors relative group">
                Privacy
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors relative group">
                Terms
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors relative group">
                Sitemap
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- SCROLL PROGRESS LINE --- */}
      <motion.div
        className="fixed bottom-0 left-0 h-[4px] bg-[#D4AF37] z-50 shadow-[0_0_10px_#D4AF37] origin-left"
        style={{ scaleX: scrollProgress }}
      />
    </div>
  );
};

export default App;