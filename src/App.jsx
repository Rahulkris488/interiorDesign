import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, X, MapPin, Star, Key, Ruler, 
  Armchair, Building, Calendar, Clock, Check, 
  ArrowRight, Mail, Phone, Instagram, Linkedin, Facebook 
} from 'lucide-react';

/**
 * ARCHITECTURA - Ultra Luxury Real Estate Experience
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
  
  // Form State
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Buying'
  });

  // --- REFS ---
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });

  // --- ANIMATION LOOPS & LISTENERS ---

  // 1. Scroll Progress & Parallax
  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setScrollProgress(totalScroll / windowHeight);

        // Simple Parallax for hero images
        // We reduce parallax intensity on mobile for smoother performance
        const isMobile = window.innerWidth < 768;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
          const speed = isMobile ? 0.2 : (el.getAttribute('data-speed') || 0.5);
          if (el) {
             el.style.transform = `translateY(${totalScroll * speed}px)`;
          }
        });

        // Reveal on Scroll
        const reveals = document.querySelectorAll('.reveal-on-scroll');
        reveals.forEach(el => {
          const elementTop = el.getBoundingClientRect().top;
          const elementVisible = 100; // Trigger slightly earlier on mobile
          if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('active');
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
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
      title: "Acquisition",
      subtitle: "Buying & Investing",
      desc: "Access to off-market listings and exclusive estates before they reach the public domain. We navigate the complexities of luxury acquisition with discretion.",
      features: ["Market Analysis", "Private Viewings", "Negotiation Strategy"],
      icon: <Key size={28} />
    },
    {
      id: "02",
      title: "Architectural",
      subtitle: "Design & Planning",
      desc: "Our in-house architects visualize potential. From renovations to ground-up builds, we bridge the gap between real estate and artistry.",
      features: ["3D Visualization", "Permit Management", "Sustainable Design"],
      icon: <Ruler size={28} />
    },
    {
      id: "03",
      title: "Interiors",
      subtitle: "Staging & Styling",
      desc: "Curating atmospheres that sell. Our interior design team transforms spaces into emotional experiences that resonate with high-net-worth buyers.",
      features: ["Luxury Staging", "Art Curation", "Feng Shui Consultation"],
      icon: <Armchair size={28} />
    },
    {
      id: "04",
      title: "Development",
      subtitle: "Project Management",
      desc: "For investors looking to build legacy. We oversee large-scale residential developments from land acquisition to final sale.",
      features: ["ROI Projection", "Contractor Management", "Brand Identity"],
      icon: <Building size={28} />
    }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "The Glass House",
      location: "Beverly Hills, CA",
      price: "$14,500,000",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      specs: "5 Bed | 7 Bath | 6,500 sqft"
    },
    {
      id: 2,
      title: "Nordic Retreat",
      location: "Oslo, Norway",
      price: "$8,200,000",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
      specs: "4 Bed | 4 Bath | 4,200 sqft"
    },
    {
      id: 3,
      title: "Azure Villa",
      location: "Nice, France",
      price: "$22,000,000",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      specs: "8 Bed | 10 Bath | 12,000 sqft"
    },
    {
      id: 4,
      title: "Urban Penthouse",
      location: "New York, NY",
      price: "$18,500,000",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
      specs: "3 Bed | 3.5 Bath | 3,800 sqft"
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
    <div className="bg-[#FDFBF7] min-h-screen font-sans selection:bg-[#1A1A1A] selection:text-[#D4AF37] cursor-auto md:cursor-none overflow-x-hidden">
      
      {/* --- GLOBAL STYLES & FONTS --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Monsieur+La+Doulaise&family=Montserrat:wght@200;300;400;500;600&display=swap');
          
          .font-display { font-family: 'Italiana', serif; }
          .font-script { font-family: 'Monsieur La Doulaise', cursive; }
          .font-body { font-family: 'Montserrat', sans-serif; }
          
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #FDFBF7; }
          ::-webkit-scrollbar-thumb { background: #D4AF37; }

          .reveal-up {
            animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
            transform: translateY(60px);
          }

          .reveal-on-scroll {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s ease-out;
          }
          .reveal-on-scroll.active {
            opacity: 1;
            transform: translateY(0);
          }
          
          @keyframes slideUp {
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* --- CUSTOM CURSOR (Hidden on Touch Devices) --- */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block will-change-transform mix-blend-difference"
      >
        <div 
          className={`
            relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-[#FDFBF7] transition-all duration-300 ease-out
            ${activeCursor ? 'w-32 h-32 bg-[#FDFBF7] text-[#1A1A1A] scale-100' : 'w-5 h-5 bg-transparent scale-100'}
          `}
        >
          <span className={`text-xs font-bold uppercase tracking-widest transition-opacity duration-200 ${activeCursor ? 'opacity-100' : 'opacity-0'}`}>
            {cursorText}
          </span>
        </div>
      </div>

      {/* --- NOISE OVERLAY --- */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-40 mix-blend-multiply"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-[#FDFBF7]">
        <div className="flex flex-col group cursor-pointer" onMouseEnter={() => handleCursorHover("Home")} onMouseLeave={handleCursorLeave}>
          <span className="font-display text-2xl tracking-[0.2em]">
            ARCHITECTURA
          </span>
          <span className="text-[9px] md:text-[8px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-body opacity-80 mt-1 text-[#D4AF37]">
            Estates & Design
          </span>
        </div>

        <div className="flex items-center gap-8">
           <button className="hidden md:block font-body text-[10px] uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">
             Properties
           </button>
           <button className="hidden md:block font-body text-[10px] uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">
             Journal
           </button>
           
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
      <div className={`fixed inset-0 bg-[#0f0f0f] z-[60] transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col items-center justify-center relative text-[#FDFBF7] px-6">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-6 md:right-8 text-[#FDFBF7] hover:rotate-90 transition-transform duration-500"
          >
            <X size={32} strokeWidth={1} />
          </button>
          <ul className="text-center space-y-4 md:space-y-2">
            {['Residence', 'Philosophy', 'Services', 'Gallery', 'Contact'].map((item) => (
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
      <header id="residence" className="relative h-[100dvh] flex flex-col justify-center items-center px-6 overflow-hidden">
        
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 parallax" data-speed="0.5">
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2500" 
            alt="Luxury Architecture" 
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 via-transparent to-transparent"></div>
        </div>

        <div className="z-10 text-center relative mt-20 w-full max-w-[90vw]">
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12 reveal-up" style={{animationDelay: '0.1s'}}>
            <span className="h-[1px] w-8 md:w-12 bg-[#FDFBF7]"></span>
            <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#FDFBF7]">
              Since 1985
            </p>
            <span className="h-[1px] w-8 md:w-12 bg-[#FDFBF7]"></span>
          </div>
          
          <h1 className="font-display text-[15vw] md:text-[10rem] leading-[0.8] text-[#FDFBF7] reveal-up mix-blend-overlay" style={{animationDelay: '0.2s'}}>
            ETHEREAL
          </h1>
          
          <div className="relative">
            <h2 className="font-script text-[12vw] md:text-9xl text-[#D4AF37] reveal-up -mt-2 md:-mt-12 relative z-20" style={{animationDelay: '0.4s'}}>
              Living Spaces
            </h2>
          </div>

          <p className="font-body text-[11px] md:text-sm text-[#FDFBF7]/80 max-w-[80vw] md:max-w-md mx-auto mt-6 md:mt-8 tracking-widest leading-relaxed reveal-up" style={{animationDelay: '0.6s'}}>
            Curating the world's most exceptional properties for the most discerning individuals.
          </p>

          <div className="mt-12 md:mt-16 reveal-up" style={{animationDelay: '0.8s'}}>
             <a href="#gallery" 
                className="inline-block border border-[#FDFBF7]/30 px-6 py-3 md:px-8 md:py-3 rounded-full text-[#FDFBF7] font-body text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-[#FDFBF7] hover:text-[#1A1A1A] transition-all duration-300">
               Explore Collection
             </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 hidden md:flex flex-col items-end text-[#FDFBF7]/60 z-10">
           <span className="font-display text-4xl">01</span>
           <span className="text-[9px] uppercase tracking-widest mt-1">Introduction</span>
        </div>
      </header>

      {/* =========================================
          PAGE 2: ABOUT US (PHILOSOPHY)
      ========================================= */}
      <section id="philosophy" className="py-20 md:py-32 px-6 md:px-24 bg-[#FDFBF7] relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            
            {/* Left Text */}
            <div className="lg:col-span-5 reveal-on-scroll">
              <span className="block text-[#D4AF37] font-body text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6">
                Our Philosophy
              </span>
              <h2 className="font-display text-4xl md:text-7xl text-[#1A1A1A] leading-[1.1] mb-6 md:mb-8">
                We don't just sell homes. <br/>
                <span className="italic opacity-60">We curate lifestyles.</span>
              </h2>
              <div className="space-y-4 md:space-y-6 text-[#1A1A1A]/70 font-body text-[13px] md:text-sm leading-loose text-justify">
                <p>
                  At Architectura, we believe that a home is more than a structure; it is the physical manifestation of your aspirations. Founded on the principles of integrity, discretion, and aesthetic mastery, we bridge the gap between architectural brilliance and real estate investment.
                </p>
                <p>
                  Our team consists not just of agents, but of architects, designers, and market analysts who understand the nuance of luxury. We see the potential in every line, the value in every view, and the story in every space.
                </p>
              </div>
              
              <div className="mt-8 md:mt-12 flex items-center gap-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Founder" 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full grayscale"
                />
                <div>
                  <p className="font-display text-base md:text-lg text-[#1A1A1A]">Jonathan Sterling</p>
                  <p className="font-body text-[8px] md:text-[9px] uppercase tracking-widest text-[#1A1A1A]/50">Founder & Principal Architect</p>
                </div>
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="lg:col-span-7 relative reveal-on-scroll">
               <div className="grid grid-cols-2 gap-3 md:gap-4">
                 <div className="space-y-3 md:space-y-4 mt-8 md:mt-12">
                   <img 
                     src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" 
                     className="w-full aspect-[3/4] object-cover hover:grayscale transition-all duration-700 rounded-sm" 
                     alt="Interior Detail"
                     onMouseEnter={() => handleCursorHover("Detail")} onMouseLeave={handleCursorLeave}
                   />
                   <div className="bg-[#1A1A1A] p-4 md:p-6 text-[#FDFBF7] text-center rounded-sm">
                      <h4 className="font-display text-xl md:text-2xl">250+</h4>
                      <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-60">Exclusive Listings</p>
                   </div>
                 </div>
                 <div className="space-y-3 md:space-y-4">
                   <div className="bg-[#D4AF37] p-4 md:p-6 text-[#1A1A1A] text-center rounded-sm">
                      <h4 className="font-display text-xl md:text-2xl">25 Years</h4>
                      <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-60">Of Excellence</p>
                   </div>
                   <img 
                     src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800" 
                     className="w-full aspect-[3/4] object-cover hover:grayscale transition-all duration-700 rounded-sm" 
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
      <section id="services" className="py-20 md:py-32 bg-[#111111] text-[#FDFBF7] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.05]"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16 md:mb-24 reveal-on-scroll">
            <span className="text-[#D4AF37] font-body text-[10px] uppercase tracking-[0.3em]">
              Holistic Approach
            </span>
            <h2 className="font-display text-4xl md:text-7xl mt-4">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Service Selection List (Left Column) + Mobile Content */}
            <div className="lg:col-span-5 space-y-4 reveal-on-scroll">
              {services.map((service, index) => (
                <div key={index} className="group">
                  {/* Header Button */}
                  <div 
                    onClick={() => setActiveService(index)}
                    className={`p-6 md:p-8 border border-white/10 cursor-pointer transition-all duration-500 hover:bg-white/5 relative overflow-hidden
                      ${activeService === index ? 'bg-white/5 border-[#D4AF37]/50' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className={`font-display text-lg md:text-xl w-6 md:w-8 transition-colors duration-300 ${activeService === index ? 'text-[#D4AF37]' : 'text-white/30'}`}>
                          {service.id}
                        </span>
                        <div>
                          <h3 className="font-display text-xl md:text-2xl group-hover:italic transition-all duration-300">{service.title}</h3>
                          <p className="font-body text-[9px] md:text-[10px] uppercase tracking-widest text-white/50">{service.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight className={`transition-all duration-500 transform ${activeService === index ? 'rotate-90 lg:rotate-0 translate-x-0 opacity-100 text-[#D4AF37]' : '-translate-x-2 md:-translate-x-4 opacity-0 lg:group-hover:opacity-50'}`} />
                    </div>
                  </div>

                  {/* MOBILE/TABLET ACCORDION CONTENT (Hidden on Desktop) */}
                  <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${activeService === index ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#1A1A1A] p-8 border border-white/5">
                        <div className="mb-6 text-[#D4AF37]">
                            {service.icon}
                        </div>
                        <p className="font-body text-sm text-gray-400 leading-loose mb-6">
                            {service.desc}
                        </p>
                        <div className="space-y-4 mb-8">
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
                </div>
              ))}
            </div>

            {/* Service Detail Card (Right Column - Desktop Sticky) */}
            <div className="hidden lg:block lg:col-span-7 relative sticky-container">
               <div className="relative h-full min-h-[500px] bg-[#1A1A1A] p-8 md:p-16 border border-white/5 reveal-on-scroll flex flex-col justify-center lg:sticky lg:top-32 transition-all duration-700">
                  <div className="absolute top-0 right-0 p-8 md:p-12 text-[#D4AF37] opacity-20">
                    {services[activeService].icon}
                  </div>
                  
                  <div key={`content-${activeService}`} className="animate-[fadeIn_0.6s_ease-out]">
                    <h3 className="font-script text-6xl md:text-8xl text-[#D4AF37] mb-8 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                      {services[activeService].title}
                    </h3>
                    
                    <p className="font-body text-sm md:text-base text-gray-400 leading-loose mb-12 max-w-xl opacity-0 animate-[fadeIn_0.5s_ease-out_0.1s_forwards]">
                      {services[activeService].desc}
                    </p>

                    <div className="space-y-6">
                      {services[activeService].features.map((feature, i) => (
                        <div key={`feat-${i}`} className="flex items-center gap-6 border-b border-white/10 pb-6 opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]" style={{animationDelay: `${0.1 * i}s`}}>
                          <Check size={18} className="text-[#D4AF37]" />
                          <span className="font-body text-xs md:text-sm uppercase tracking-widest text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className="mt-16 self-start font-body text-xs uppercase tracking-[0.2em] border-b border-[#D4AF37] pb-2 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                      Inquire About {services[activeService].title} <ArrowRight size={14} />
                    </button>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          PAGE 4: GALLERY (THE PORTFOLIO)
      ========================================= */}
      <section id="gallery" className="py-20 md:py-32 px-6 bg-[#FDFBF7]">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12 md:mb-16 border-b border-[#1A1A1A]/10 pb-6 reveal-on-scroll">
            <div>
              <h2 className="font-display text-5xl md:text-8xl text-[#1A1A1A]">Curated<br/>Spaces</h2>
            </div>
            <div className="hidden md:block">
              <p className="font-body text-xs uppercase tracking-widest text-right mb-2">Available for Acquisition</p>
              <p className="font-script text-2xl text-[#D4AF37] text-right">Spring Collection 2025</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
            {galleryItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`group md:cursor-none ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
                onMouseEnter={() => handleCursorHover("View Home")} 
                onMouseLeave={handleCursorLeave}
              >
                <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 bg-[#FDFBF7] px-4 py-2 flex items-center gap-2">
                    <MapPin size={12} />
                    <span className="font-body text-[10px] uppercase tracking-wider">{item.location}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start border-t border-[#1A1A1A] pt-4 transition-all duration-300 group-hover:border-[#D4AF37]">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl group-hover:italic transition-all">{item.title}</h3>
                    <p className="font-body text-[10px] uppercase tracking-widest mt-2 opacity-60">{item.specs}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg md:text-xl">{item.price}</p>
                    {/* Always visible on mobile, hover only on desktop */}
                    <button className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity font-body text-[9px] uppercase tracking-[0.2em] mt-2 border-b border-black">
                      Schedule Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-24 text-center">
            <button className="px-12 py-4 border border-[#1A1A1A] rounded-full font-body text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-[#FDFBF7] transition-all duration-300">
              View All 42 Listings
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
          PAGE 5: CONTACT & BOOKING
      ========================================= */}
      <section id="contact" className="py-20 md:py-32 px-6 md:px-12 bg-[#EBE9E4] relative">
         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
           
           {/* Info Side */}
           <div className="reveal-on-scroll">
              <h2 className="font-display text-5xl md:text-8xl leading-none mb-8 md:mb-12">
                Begin the <br/> Conversation
              </h2>
              <p className="font-body text-[13px] md:text-sm leading-loose text-[#1A1A1A]/70 mb-8 md:mb-12 max-w-md">
                Whether you are looking to acquire a new sanctuary or list a property of distinction, our team is ready to provide a seamless experience.
              </p>

              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-4 items-start">
                   <div className="bg-[#1A1A1A] text-[#FDFBF7] p-3 rounded-full">
                     <MapPin size={20} />
                   </div>
                   <div>
                     <h4 className="font-display text-lg md:text-xl">Headquarters</h4>
                     <p className="font-body text-xs text-[#1A1A1A]/60 mt-1">1001 Fifth Avenue,<br/>New York, NY 10028</p>
                   </div>
                </div>
                
                <div className="flex gap-4 items-start">
                   <div className="bg-[#1A1A1A] text-[#FDFBF7] p-3 rounded-full">
                     <Phone size={20} />
                   </div>
                   <div>
                     <h4 className="font-display text-lg md:text-xl">Private Line</h4>
                     <p className="font-body text-xs text-[#1A1A1A]/60 mt-1">+1 (212) 555-0198</p>
                   </div>
                </div>
              </div>
           </div>

           {/* Booking Form */}
           <div className="bg-[#FDFBF7] p-6 md:p-12 shadow-2xl reveal-on-scroll relative overflow-hidden">
             {/* Decorative line */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>

             <div className="mb-8 flex justify-between items-end">
                <h3 className="font-display text-2xl md:text-3xl">Consultation</h3>
                <span className="font-body text-[9px] md:text-[10px] uppercase tracking-widest text-[#D4AF37]">
                  Step {bookingStep} of 2
                </span>
             </div>

             {bookingStep === 1 ? (
               <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-widest font-bold">First Name</label>
                       <input type="text" className="w-full bg-[#EBE9E4]/30 border-b border-[#1A1A1A]/20 p-2 focus:outline-none focus:border-[#D4AF37] transition-colors font-body text-sm" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-widest font-bold">Last Name</label>
                       <input type="text" className="w-full bg-[#EBE9E4]/30 border-b border-[#1A1A1A]/20 p-2 focus:outline-none focus:border-[#D4AF37] transition-colors font-body text-sm" placeholder="Doe" />
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">Email Address</label>
                    <input type="email" className="w-full bg-[#EBE9E4]/30 border-b border-[#1A1A1A]/20 p-2 focus:outline-none focus:border-[#D4AF37] transition-colors font-body text-sm" placeholder="john@example.com" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">I am Interested In</label>
                    <div className="flex gap-2 md:gap-4 mt-2">
                      {['Buying', 'Selling', 'Design'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => setFormData({...formData, interest: opt})}
                          className={`flex-1 py-3 text-[10px] md:text-xs uppercase tracking-wider border transition-all
                            ${formData.interest === opt ? 'bg-[#1A1A1A] text-[#FDFBF7] border-[#1A1A1A]' : 'border-[#1A1A1A]/20 hover:border-[#1A1A1A]'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                 </div>

                 <button 
                   onClick={() => setBookingStep(2)}
                   className="w-full bg-[#D4AF37] text-white py-4 mt-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-[#b89528] transition-colors flex justify-center items-center gap-2"
                 >
                   Select Time Slot <ArrowRight size={14} />
                 </button>
               </div>
             ) : (
               <div className="animate-[fadeIn_0.5s_ease-out]">
                 <p className="font-body text-xs text-gray-500 mb-6">Please select a preferred time for a 30-minute discovery call.</p>
                 
                 <div className="grid grid-cols-2 gap-3 mb-8">
                   {timeSlots.map(slot => (
                     <button
                       key={slot}
                       onClick={() => setSelectedSlot(slot)}
                       className={`py-3 px-2 md:px-4 border text-[10px] md:text-xs font-body transition-all flex justify-between items-center
                         ${selectedSlot === slot 
                            ? 'bg-[#1A1A1A] text-[#FDFBF7] border-[#1A1A1A]' 
                            : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A] text-[#1A1A1A]'}`}
                     >
                       {slot}
                       {selectedSlot === slot && <Check size={12} />}
                     </button>
                   ))}
                 </div>
                 
                 <div className="flex gap-4">
                   <button 
                     onClick={() => setBookingStep(1)}
                     className="flex-1 py-4 border border-[#1A1A1A]/20 font-body text-xs uppercase tracking-[0.2em] hover:bg-[#EBE9E4] transition-colors"
                   >
                     Back
                   </button>
                   <button 
                     className="flex-[2] bg-[#1A1A1A] text-white py-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors"
                     onClick={() => alert("Request sent! We will contact you shortly.")}
                   >
                     Confirm Request
                   </button>
                 </div>
               </div>
             )}
           </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1A1A1A] text-[#FDFBF7] pt-16 md:pt-24 pb-8 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 text-center">
           <h2 className="font-display text-[15vw] md:text-[12vw] leading-none opacity-20 select-none">ARCHITECTURA</h2>
           
           <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12 pt-8 border-t border-white/10 font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40">
             <p className="mb-4 md:mb-0">&copy; 2025 Architectura Real Estate</p>
             <div className="flex gap-6 md:gap-8">
               <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy</a>
               <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms</a>
               <a href="#" className="hover:text-[#D4AF37] transition-colors">Sitemap</a>
             </div>
           </div>
        </div>
      </footer>

      {/* --- SCROLL PROGRESS LINE --- */}
      <div 
        className="fixed bottom-0 left-0 h-[4px] bg-[#D4AF37] z-50 transition-all duration-100 ease-out shadow-[0_0_10px_#D4AF37]"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
};

export default App;