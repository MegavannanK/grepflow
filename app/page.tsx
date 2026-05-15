"use client";
import Link from 'next/link';
import React, { useState, useEffect, useRef, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Globe, 
  Play, 
  ArrowRight, 
  ArrowUpRight,
  ChevronDown,
  Plus, 
  X,
  CheckCircle2,
  ArrowLeft,
  Box,
  Hexagon,
  MessageSquare,
  Code2,
  Scale,
  BrainCircuit,
  Rocket,
  Network,
  HeartPulse,
  ShieldCheck,
  Layout,
  Smartphone,
  RefreshCw,
  Terminal,
  Layers,
  Lock,
  Cloud
} from "lucide-react";

// --- Framer Motion Variants ---

const heroWindowVariants: Variants = {
  initial: { 
    width: "85%", 
    height: "75vh",
    marginTop: "12vh",
    borderRadius: "16px",
    backgroundColor: "#0a0a0a",
    boxShadow: "0px 30px 60px rgba(0,0,0,0.5)"
  },
  animate: { 
    width: "100%", 
    height: "100vh",
    marginTop: "0vh",
    borderRadius: "0px",
    backgroundColor: "#0a0a0a",
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } 
  }
};

const whiteTopBarVariants: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }
};

const navVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5, ease: "easeOut" } }
};

const maskTextVariants: Variants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const typewriterContainer: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { staggerChildren: 0.015, delayChildren: 0.8 } }
};

const typewriterChar: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// Masked word-by-word stagger animation for the Vision Quote
const quoteContainer: Variants = {
  hidden: { opacity: 1 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.025, 
      delayChildren: 0.1 
    } 
  }
};

const maskedWordVariants: Variants = {
  hidden: { y: "120%" },
  visible: { 
    y: "0%", 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

// --- CUSTOM HOOKS & COMPONENTS ---

interface SpatialRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}

const SpatialReveal = ({ children, delay = 0, className = "", direction = "up" }: SpatialRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0,0,0) scale(1) rotateX(0deg)';
    if (direction === 'up') return 'translate3d(0, 40px, -20px) scale(0.95) rotateX(-5deg)';
    if (direction === 'left') return 'translate3d(-40px, 0, -20px) scale(0.95) rotateY(-5deg)';
    return 'translate3d(40px, 0, -20px) scale(0.95) rotateY(5deg)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const subtitleText = "Grepflow merges human intuition with limitless artificial intelligence.";

  const capabilities = [
    { name: "AI Integration", icon: <BrainCircuit strokeWidth={1.5} />, desc: "Intelligent Workflows" },
    { name: "AI Productivity", icon: <Box strokeWidth={1.5} />, desc: "Enterprise Tools" },
    { name: "Healthcare IT", icon: <HeartPulse strokeWidth={1.5} />, desc: "Compliant Systems" },
    { name: "Cybersecurity", icon: <ShieldCheck strokeWidth={1.5} />, desc: "Zero-Trust Infra" },
    { name: "DevOps & AIOps", icon: <Network strokeWidth={1.5} />, desc: "Automated CI/CD" },
    { name: "QA & Testing", icon: <CheckCircle2 strokeWidth={1.5} />, desc: "AI-Augmented QA" },
    { name: "Growth & SEO", icon: <Globe strokeWidth={1.5} />, desc: "Data-Driven Scale" },
    { name: "App Engineering", icon: <Smartphone strokeWidth={1.5} />, desc: "Native & Web Apps" },
    { name: "UX/UI Design", icon: <Layout strokeWidth={1.5} />, desc: "Human Interfaces" },
  ];

  // Divide capabilities for the two marquee rows
  const row1Items = capabilities.slice(0, 5);
  const row2Items = capabilities.slice(5, 9);

  // Duplicate arrays to create a seamless infinite loop
  const marqueeRow1 = Array(8).fill(row1Items).flat();
  const marqueeRow2 = Array(10).fill(row2Items).flat();

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#1b221e] min-h-screen w-full overflow-x-hidden font-sans selection:bg-[#00d261] selection:text-black text-[#09090b] flex flex-col items-center">
      
      {/* --- GLOBAL STYLES & FONTS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
        
        .font-display { font-family: 'Syne', sans-serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        
        .text-holo {
          background: linear-gradient(135deg, #FFF 0%, #E0E0E5 50%, #8A2BE2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-glass {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          color: #FFF;
          border-radius: 100px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-glass::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .btn-glass:hover::before {
          transform: translateX(100%);
        }
        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 229, 255, 0.5);
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
        }

        .spatial-grid {
          background-size: 100px 100px;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }

        @keyframes laser-scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-laser {
          animation: laser-scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* Continuous Marquee Animations */
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        /* Pause both rows when hovering over the container */
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}} />

      {/* --- AMBIENT BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 spatial-grid transform perspective-1000 rotateX(60deg) scale(2) -translate-y-1/4 opacity-30" />
        <div 
          className="absolute w-[800px] h-[800px] rounded-full pointer-events-none transition-transform duration-75 ease-out opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(138,43,226,0.3) 0%, rgba(0,229,255,0.1) 40%, transparent 70%)',
            transform: `translate(${mousePosition.x - 400}px, ${mousePosition.y - 400}px)`,
          }}
        />
      </div>

      {/* --- FOLD 1: EXPANDING HERO --- */}
      <div className="w-full h-screen flex items-start justify-center relative">
        <motion.section 
          variants={heroWindowVariants}
          initial="initial"
          animate="animate"
          className="relative overflow-hidden flex flex-col items-center z-10 text-white"
        >
          {/* Preloader White Top Bar */}
          <motion.div 
            variants={whiteTopBarVariants}
            className="absolute top-0 left-0 right-0 h-12 bg-white flex items-center justify-between px-6 z-50 rounded-t-[16px] pointer-events-none"
          >
            <div className="flex items-center gap-8">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M16 4L28 24H4L16 4Z" fill="#00d261"/></svg>
              <div className="w-12 h-1.5 bg-gray-100 rounded-full"></div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
               <div className="w-16 h-4 bg-gray-100 rounded-full"></div>
            </div>
          </motion.div>

          {/* Ambient Glow */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1.5 }}
            className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00d261]/15 blur-[100px] rounded-full pointer-events-none"
          ></motion.div>

          {/* Actual Navbar */}
          <motion.nav variants={navVariants} className="w-full absolute top-0 left-0 right-0 z-40">
            <div className="max-w-[1400px] mx-auto px-6 h-[80px] flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-12">
                <a href="/" className="flex items-center font-bold text-xl tracking-wide gap-2">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 4L28 24H4L16 4Z" fill="#00d261"/></svg>
                  GREPFLOW
                </a>
                <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-gray-300">
                  <a href="#firm" className="hover:text-white transition-colors">Our Firm</a>
                  <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
                  <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
                  <a href="#lab" className="hover:text-white transition-colors">The Lab</a>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[13px] font-medium">
                <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-gray-300 hover:text-white">
                  <Globe className="w-4 h-4" />
                </button>
                <a href="#contact" className="hidden sm:block text-gray-300 hover:text-white transition-colors">Contact Us</a>
                <Link href="/start-project">
  <button className="bg-white text-black px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
    Start a Project
  </button>
</Link>
              </div>
            </div>
          </motion.nav>

          {/* Hero Content (Centered Perfectly) */}
          <div className="flex-1 w-full flex flex-col items-center justify-between px-6 relative z-10 pt-20">
            
            {/* Typography & Buttons Centered Block */}
            <div className="flex-1 flex flex-col items-center justify-center w-full pb-8">
              <div className="flex flex-col items-center mb-6">
                <div className="overflow-hidden pb-1">
                  <motion.h1 variants={maskTextVariants} initial="initial" animate="animate" transition={{ delay: 0.4 }} className="text-[64px] md:text-[88px] leading-[1.05] font-bold tracking-tight text-white text-center">
                    Architect.
                  </motion.h1>
                </div>
                <div className="overflow-hidden pb-2">
                  <motion.h1 variants={maskTextVariants} initial="initial" animate="animate" transition={{ delay: 0.55 }} className="text-[64px] md:text-[88px] leading-[1.05] font-bold tracking-tight text-[#00d261] text-center">
                    The Future.
                  </motion.h1>
                </div>
              </div>

              <motion.h2 variants={typewriterContainer} initial="initial" animate="animate" className="text-lg text-gray-400 font-medium mb-10 h-6 text-center max-w-2xl">
                {subtitleText.split("").map((char, index) => (
                  <motion.span key={index} variants={typewriterChar}>{char}</motion.span>
                ))}
              </motion.h2>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#00d261] text-black px-8 py-3.5 rounded-full font-bold hover:bg-[#00e86b] transition-colors shadow-[0_0_20px_rgba(0,210,97,0.2)]">Explore Capabilities</button>
                <button className="border border-white/20 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" fill="currentColor" /> Discovery Call
                </button>
              </motion.div>
            </div>

            {/* Hero Cards at the bottom of the section */}
            <div className="w-full max-w-[1000px] flex justify-center items-end gap-5 h-[320px] relative translate-y-16">
              {/* Left Card */}
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] h-[260px]"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full bg-[#121212] rounded-t-[24px] border border-white/10 relative overflow-hidden"
                >
                  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600" alt="Tech" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-[#00d261]/10 mix-blend-overlay"></div>
                  <div className="absolute top-5 left-5 w-10 h-10 bg-[#00d261] rounded-[14px] flex items-center justify-center text-black font-bold text-xl"><Network className="w-5 h-5"/></div>
                </motion.div>
              </motion.div>

              {/* Center Card (enters first) */}
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.7, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-[400px] h-[320px] relative z-10"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="w-full h-full bg-[#121212] rounded-t-[24px] border-t border-l border-r border-white/10 p-6 flex flex-col relative shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex justify-between items-center text-[11px] text-gray-500 font-mono mb-5 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00d261]"></span> Internal R&D</div>
                    <div className="text-gray-500">Status: <span className="text-[#00d261]">Active</span></div>
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-bold text-white tracking-tight">Experiment Alpha</h3>
                    <span className="bg-[#00d261]/10 text-[#00d261] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#00d261]/20">Cloud Orchestrator</span>
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Live Telemetry</div>
                  <div className="space-y-2 flex-1 overflow-hidden relative">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-gray-200 text-xs font-semibold mb-1 flex items-center gap-2">Predictive Load Balancing</div>
                      <div className="text-gray-500 text-[10px] leading-relaxed line-clamp-2">Machine learning models dynamically scaled microservices 45ms before traffic spike detection.</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-gray-200 text-xs font-semibold mb-1 flex items-center gap-2">Zero-Trust Node Connected</div>
                      <div className="text-gray-500 text-[10px] leading-relaxed line-clamp-2">Encrypted routing established across multi-region deployment.</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none"></div>
                </motion.div>
              </motion.div>

              {/* Right Card */}
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] h-[260px]"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="w-full h-full bg-[#121212] rounded-t-[24px] border border-white/10 relative overflow-hidden"
                >
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" alt="Code" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-[#00d261]/10 mix-blend-overlay"></div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* --- REST OF PAGE --- */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} className="w-full bg-white rounded-t-[32px] md:rounded-t-[48px] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] -mt-10">
        
        {/* FOLD 2: Our Firm (Line-by-Line Color Highlight) */}
        {(() => {
          const FIRM_LINES = [
            "Beyond Code. We Build Cognitive Ecosystems.",
            "A new paradigm in technology consulting.",
            "We don't just write code;",
            "we engineer leverage.",
          ];

          const FirmSection = () => {
            const sectionRef = useRef<HTMLDivElement>(null);
            const [activeIndex, setActiveIndex] = useState(-1);
            const hasFired = useRef(false);

            useEffect(() => {
              const el = sectionRef.current;
              if (!el) return;
              const observer = new IntersectionObserver(
                ([entry]) => {
                  if (entry.isIntersecting && !hasFired.current) {
                    hasFired.current = true;
                    FIRM_LINES.forEach((_, i) => {
                      setTimeout(() => setActiveIndex(i), 500 + i * 600);
                    });
                    observer.disconnect();
                  }
                },
                { threshold: 0.2 }
              );
              observer.observe(el);
              return () => observer.disconnect();
            }, []);

            return (
              <section ref={sectionRef} id="firm" className="pt-32 pb-24 px-6 max-w-[1000px] mx-auto text-center">
                <h2 className="text-[32px] md:text-[40px] font-medium leading-[1.3] tracking-tight">
                  {FIRM_LINES.map((line, i) => (
                    <React.Fragment key={i}>
                      {i === 1 && (
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-[#00d261]/10 rounded-full border border-[#00d261]/20 align-middle mx-1">
                          <svg width="14" height="14" viewBox="0 0 32 32" fill="none"><path d="M16 4L28 24H4L16 4Z" fill="#00d261"/></svg>
                        </span>
                      )}
                      <span
                        style={{
                          color: i <= activeIndex ? '#111111' : '#999999',
                          transition: 'color 0.45s ease-out',
                          display: i === 0 ? 'block' : 'inline',
                          marginBottom: i === 0 ? '8px' : undefined,
                        }}
                      >
                        {line}
                      </span>
                      {i > 0 && i < FIRM_LINES.length - 1 && ' '}
                    </React.Fragment>
                  ))}
                </h2>
              </section>
            );
          };
          return <FirmSection />;
        })()}

        {/* FOLD 3: Methodology (The Grepflow Protocol) */}
        <section id="methodology" className="py-24 px-6 max-w-[1200px] mx-auto border-t border-gray-100">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-[44px] leading-tight font-bold tracking-tight text-black">The Grepflow<br/>Protocol.</h2>
            </motion.div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-gray-500 text-[15px] leading-relaxed max-w-md">
              <span className="text-black font-medium">Precision Engineering.</span><br/>Accelerated Delivery. Our 4-step methodology ensures bulletproof systems.
            </motion.p>
          </div>

          {/* Two Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Interactive Step Switcher */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Step Buttons */}
              <div className="p-5 pb-0 flex flex-wrap gap-2">
                {[ { id: "01", title: "Discovery" }, { id: "02", title: "AI Dev" }, { id: "03", title: "Security" }, { id: "04", title: "Evolution" } ].map((step, idx) => (
                  <button key={step.id} onClick={() => setActiveStep(idx)} className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 font-semibold text-xs border ${activeStep === idx ? 'bg-[#09090b] text-white border-transparent shadow-lg' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>
                    {step.id}. {step.title}
                    {activeStep === idx ? <ArrowRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 text-gray-400" />}
                  </button>
                ))}
              </div>

              {/* Step Content */}
              <div className="h-[360px] md:h-[400px] relative">
                <AnimatePresence mode="wait">
                  {activeStep === 0 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0 p-8 flex flex-col sm:flex-row gap-6">
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-[28px] md:text-[32px] font-bold leading-tight mb-3 text-black tracking-tight">Discovery &<br/>Architecture</h3>
                        <p className="text-gray-500 text-sm">We map your landscape to<br/>architect a resilient foundation.</p>
                      </div>
                      <div className="flex-1 bg-[#f4fbf7] rounded-2xl border border-[#00d261]/20 p-6 flex flex-col justify-center items-center min-h-[200px]">
                         <div className="w-24 h-24 border border-[#00d261] rounded-full flex items-center justify-center relative">
                            <div className="w-16 h-16 border border-[#00d261]/50 rounded-full flex items-center justify-center">
                               <Network className="w-6 h-6 text-[#00d261]"/>
                            </div>
                            <div className="w-3 h-3 bg-[#00d261] rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2"></div>
                         </div>
                      </div>
                    </motion.div>
                  )}
                  {activeStep === 1 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0 bg-[#09090b] text-white p-8 flex flex-col items-center justify-center text-center relative">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#09090b] to-[#09090b]"></div>
                      <div className="relative z-10 w-full">
                        <div className="flex justify-between items-start mb-10">
                           <p className="text-gray-400 text-xs text-left max-w-[160px]">Utilizing state-of-the-art AI workflows, our engineering cycles are dramatically faster.</p>
                           <div className="w-8 h-8 bg-[#1a1c1a] border border-white/10 rounded-full flex items-center justify-center"><Code2 className="w-4 h-4 text-[#00d261]"/></div>
                        </div>
                        <div className="relative h-20 w-full flex justify-center items-center mb-8">
                           <div className="absolute top-1/2 left-0 w-full h-px bg-white/10"></div>
                           <div className="bg-[#1a1c1a] border border-white/10 text-white text-[10px] px-4 py-2 rounded-full absolute z-10">AI-Assisted Coding</div>
                           <div className="w-2.5 h-2.5 bg-[#00d261] rounded-full absolute top-2 left-[20%] shadow-[0_0_10px_#00d261]"></div>
                           <div className="w-1.5 h-1.5 bg-gray-500 rounded-full absolute bottom-2 left-[30%]"></div>
                        </div>
                        <h3 className="text-[28px] md:text-[32px] font-bold leading-tight tracking-tight">AI-Augmented<br/>Development</h3>
                      </div>
                    </motion.div>
                  )}
                  {activeStep === 2 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0 bg-white p-8 flex flex-col sm:flex-row items-center gap-6">
                       <div className="flex-1 flex items-center justify-center">
                          <div className="w-[140px] h-[220px] bg-gray-50 rounded-2xl shadow-sm border border-gray-100 flex flex-col p-4 gap-3 relative overflow-hidden">
                             <div className="w-full bg-white rounded-xl p-3 border border-gray-100 relative z-10">
                               <div className="flex items-center gap-2 mb-2"><ShieldCheck className="w-4 h-4 text-[#00d261]"/><div className="w-12 h-2 bg-gray-200 rounded"></div></div>
                               <div className="text-[10px] text-gray-400">Pen-Testing: Pass</div>
                             </div>
                             <div className="w-full bg-white rounded-xl p-3 border border-gray-100 relative z-10">
                               <div className="flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4 text-[#00d261]"/><div className="w-16 h-2 bg-gray-200 rounded"></div></div>
                               <div className="text-[10px] text-gray-400">CI/CD: Deployed</div>
                             </div>
                             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#00d261]/10 rounded-full blur-xl"></div>
                          </div>
                       </div>
                       <div className="flex-1">
                          <div className="w-12 h-12 bg-[#09090b] rounded-full flex items-center justify-center mb-5">
                            <Lock className="w-5 h-5 text-white"/>
                          </div>
                          <h3 className="text-[28px] md:text-[32px] font-bold leading-tight mb-3 text-black tracking-tight">Zero-Trust<br/>Deployment</h3>
                          <p className="text-gray-500 text-[13px] leading-relaxed">Rigorous automated QA and continuous integration pipelines ensure production is bulletproof.</p>
                       </div>
                    </motion.div>
                  )}
                  {activeStep === 3 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0 bg-[#f4fbf7] p-8 flex flex-col justify-center items-center text-center">
                       <RefreshCw className="w-14 h-14 text-[#00d261] mb-5 animate-[spin_4s_linear_infinite]" />
                       <h3 className="text-[28px] md:text-[32px] font-bold leading-tight mb-3 text-black tracking-tight">Continuous<br/>Evolution</h3>
                       <p className="text-gray-600 text-sm max-w-[250px]">Modular systems designed to learn, adapt, and integrate new AI models dynamically.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Card 2: Scale With Confidence */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#09090b] rounded-3xl border border-white/10 overflow-hidden p-8 flex flex-col justify-between min-h-[460px] md:min-h-0">
              {/* Agent Avatars Grid */}
              <div className="flex-1 flex items-center justify-center py-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { emoji: "🤖", label: "Growth" },
                    { emoji: "🛡️", label: "Support" },
                    { emoji: "⚡", label: "Ops" },
                    { emoji: "📊", label: "Analytics" },
                    { emoji: "🧠", label: "Strategy" },
                    { emoji: "🔗", label: "Integrate" },
                  ].map((agent, i) => (
                    <div key={i} className="w-[72px] h-[72px] bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors">
                      <span className="text-xl">{agent.emoji}</span>
                      <span className="text-[9px] text-gray-500 font-medium">{agent.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Text */}
              <div>
                <h3 className="text-[28px] md:text-[32px] font-bold leading-tight mb-3 text-white tracking-tight">Scale With<br/>Confidence</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Autonomous agents handle growth, support, and ops — so you can focus on what matters most.</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* FOLD 4: Capabilities (Infinite Marquee with Hover Effects) */}
        <section id="capabilities" className="py-24 overflow-hidden bg-white">
          <div className="text-center mb-16 flex flex-col items-center px-6">
            <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center mb-6">
               <Layers className="w-5 h-5 text-[#09090b]" />
            </div>
            <h2 className="text-[40px] font-bold mb-3 tracking-tight text-black">Capabilities Engineered for Scale</h2>
            <p className="text-gray-500 text-sm font-medium">Comprehensive technological solutions designed to accelerate growth.</p>
          </div>
          
          <div className="w-full flex flex-col gap-6 marquee-container group overflow-hidden">
             {/* Row 1 (Scrolling Left) */}
             <div className="flex w-max animate-marquee-left">
               {marqueeRow1.map((cap, i) => (
                 <div key={`r1-${i}`} className="w-[240px] shrink-0 mr-4 p-6 bg-white border border-gray-100 shadow-sm rounded-[24px] flex flex-col items-center justify-center gap-4 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-2 duration-300 cursor-pointer">
                   <div className="w-12 h-12 bg-[#00d261]/10 rounded-2xl flex items-center justify-center text-[#00d261]">{cap.icon}</div>
                   <div className="text-center">
                     <span className="font-bold text-gray-900 text-[14px] block">{cap.name}</span>
                     <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-2 block">{cap.desc}</span>
                   </div>
                 </div>
               ))}
             </div>

             {/* Row 2 (Scrolling Right) */}
             <div className="flex w-max animate-marquee-right">
               {marqueeRow2.map((cap, i) => (
                 <div key={`r2-${i}`} className="w-[240px] shrink-0 mr-4 p-6 bg-white border border-gray-100 shadow-sm rounded-[24px] flex flex-col items-center justify-center gap-4 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-2 duration-300 cursor-pointer">
                   {/* Making half the icons dark for visual variety, like in the previous design */}
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${i % 3 === 0 ? 'bg-[#09090b] text-white' : 'bg-[#00d261]/10 text-[#00d261]'}`}>{cap.icon}</div>
                   <div className="text-center">
                     <span className="font-bold text-gray-900 text-[14px] block">{cap.name}</span>
                     <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-2 block">{cap.desc}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* FOLD 5: The Lab (Replacing Testimonials) */}
        <section id="lab" className="py-24 px-6 max-w-[1100px] mx-auto border-t border-gray-100">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-stretch gap-0 border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
             <div className="bg-white p-10 w-full md:w-[320px] flex flex-col justify-between border-r border-gray-100">
                <div>
                  <div className="font-bold text-2xl mb-12 text-gray-900 tracking-tight flex items-center gap-2"><Terminal className="w-6 h-6 text-[#00d261]"/> The Lab</div>
                  <h4 className="text-[40px] leading-tight font-bold mb-8 text-black">Internal<br/>R&D</h4>
                </div>
                <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-t border-gray-100 pt-6">
                  <div className="flex flex-col gap-1"><span>Current Focus</span><span className="text-black bg-[#00d261]/10 px-3 py-1.5 rounded w-max normal-case tracking-normal font-semibold">Zero-Latency Cloud</span></div>
                  <div className="flex flex-col gap-1 mt-4"><span>Active Models</span><span className="text-black bg-gray-50 px-3 py-1.5 rounded w-max normal-case tracking-normal font-semibold">LLMs & Edge AI</span></div>
                </div>
             </div>
             <div className="bg-[#fafafa] p-12 flex-1 flex flex-col justify-between relative">
                <div className="text-[#00d261] text-6xl font-serif leading-none mb-6">"</div>
                <p className="text-[32px] md:text-[36px] font-medium leading-[1.3] mb-12 text-black">
                  "Where Theory Becomes <span className="text-gray-400">Architecture.</span>"
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-gray-200 pt-8">
                  <div>
                    <h5 className="font-bold text-black text-[15px] mb-1">We believe in showing our work.</h5>
                    <p className="text-xs text-gray-500 mb-4 font-medium max-w-sm">The Lab is our internal sandbox. It’s where our engineers experiment with the absolute edge of applied AI and neural user interfaces.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"><ArrowRight className="w-4 h-4 text-white"/></button>
                  </div>
                </div>
             </div>
          </motion.div>
        </section>

        {/* FOLD 6: Comparison Section (Grepflow Advantage) */}
        <section className="py-24 px-6 max-w-[1100px] mx-auto border-t border-gray-100">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="border border-gray-200 text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">The Grepflow Advantage</span>
            <h2 className="text-[44px] font-bold mb-4 tracking-tight text-black">Why We're Different</h2>
            <p className="text-gray-500 text-sm font-medium"><span className="text-black">Technology engineered to empower, not replace.</span><br/>We build systems to adapt to next-gen AI models—<span className="text-black">today.</span></p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
             {/* The Grepflow Way */}
             <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full md:w-1/2 bg-white border border-gray-100 rounded-[32px] p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative z-10">
                <div>
                  <div className="mb-8 w-12 h-12 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4L28 24H4L16 4Z" fill="#00d261"/></svg>
                  </div>
                  <h3 className="text-[28px] font-bold mb-8 text-black tracking-tight">The Grepflow Approach</h3>
                  <div className="space-y-3 mb-12">
                    {["Future-Proof Architecture", "Human-in-the-Loop Integration", "Agile Velocity & CI/CD", "Uncompromising Zero-Trust Security"].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-[#f4fbf7]/50 p-4 rounded-[16px] border border-gray-50 shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-[#00d261]/20 flex items-center justify-center text-[#00d261]"><CheckCircle2 className="w-4 h-4"/></div>
                        <span className="font-semibold text-gray-900 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-[#09090b] text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors shadow-lg">Partner With Us</button>
             </motion.div>

             {/* The Old Way */}
             <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="w-full md:w-1/2 bg-gray-50 border border-gray-100 rounded-[32px] p-10 relative overflow-hidden flex flex-col">
                <div className="mb-8 w-12 h-12 flex items-center justify-center">
                   <div className="relative">
                      <CheckCircle2 className="w-8 h-8 text-gray-300"/>
                      <div className="absolute inset-0 flex items-center justify-center"><div className="w-10 h-0.5 bg-red-400 rotate-45"></div></div>
                   </div>
                </div>
                <h3 className="text-[28px] font-bold mb-8 text-gray-400 tracking-tight">Traditional Agencies</h3>
                <div className="bg-white border border-gray-200 rounded-[24px] p-8 mt-auto relative shadow-sm">
                  <div className="absolute -top-3 left-8 text-[10px] font-bold text-red-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-gray-200">Legacy Debt</div>
                  <div className="space-y-4 pt-2 text-sm">
                    {["Manual QA & Testing", "Siloed Development Teams", "Rigid Legacy Architectures", "Slow Deployment Cycles", "Lack of AI Leverage"].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <span className="font-medium text-gray-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* FOLD 7: Integrations Marquee (Sectors) */}
        {(() => {
          const SECTOR_LINES = [
            "Build the next unicorn with Grepflow.",
            "Engineered for the absolute edge of performance across all modern sectors.",
          ];

          const SectorSection = () => {
            const sectionRef = useRef<HTMLDivElement>(null);
            const [activeIndex, setActiveIndex] = useState(-1);
            const hasFired = useRef(false);

            useEffect(() => {
              const el = sectionRef.current;
              if (!el) return;
              const observer = new IntersectionObserver(
                ([entry]) => {
                  if (entry.isIntersecting && !hasFired.current) {
                    hasFired.current = true;
                    SECTOR_LINES.forEach((_, i) => {
                      setTimeout(() => setActiveIndex(i), 500 + i * 600);
                    });
                    observer.disconnect();
                  }
                },
                { threshold: 0.2 }
              );
              observer.observe(el);
              return () => observer.disconnect();
            }, []);

            return (
              <section ref={sectionRef} className="py-24 px-6 max-w-4xl mx-auto text-center border-t border-gray-100">
                <p className="text-[32px] md:text-[40px] font-medium leading-[1.3] tracking-tight mb-12">
                  {SECTOR_LINES.map((line, i) => (
                    <React.Fragment key={i}>
                      <span
                        style={{
                          color: i <= activeIndex ? '#111111' : '#999999',
                          transition: 'color 0.45s ease-out',
                          display: 'block',
                          marginBottom: i === 0 ? '4px' : undefined,
                        }}
                      >
                        {i === 1 ? (
                          <>
                            Engineered for the absolute edge of{' '}
                            <span className="inline-flex items-center justify-center w-[40px] h-[40px] bg-[#00d261] text-black rounded-full mx-2 align-middle shadow-[0_0_15px_rgba(0,210,97,0.4)]">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            </span>
                            {' '}performance across all modern sectors.
                          </>
                        ) : line}
                      </span>
                    </React.Fragment>
                  ))}
                </p>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-3">
                   <span className="px-5 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 font-bold text-sm flex items-center gap-3">
                     <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs"><Cloud className="w-3 h-3"/></div> Enterprise Cloud
                   </span>
                   <span className="px-5 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 font-bold text-sm flex items-center gap-3">
                     <div className="w-6 h-6 rounded-md bg-[#00d261] flex items-center justify-center text-black text-[10px]"><HeartPulse className="w-3 h-3"/></div> Healthcare IT
                   </span>
                   <span className="px-5 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 font-bold text-sm flex items-center gap-3">
                     <div className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-black"><Box className="w-3 h-3"/></div> SaaS Platforms
                   </span>
                   <span className="px-5 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 font-bold text-sm flex items-center gap-3">
                     <div className="w-6 h-6 rounded-md bg-[#00d261] flex items-center justify-center text-black text-xs"><BrainCircuit className="w-3 h-3"/></div> AI Startups
                   </span>
                </motion.div>
              </section>
            );
          };
          return <SectorSection />;
        })()}

      </motion.div>

      {/* --- FOLD 9 & 10: DARK THEME CTA & FOOTER --- */}
      <div className="w-full bg-[#09090b] text-white pt-20 relative z-30">
        
        <section className="py-24 px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00d261]/20 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
            <h2 className="text-[56px] md:text-[64px] font-bold mb-6 tracking-tight leading-[1.1]">Ready to scale into tomorrow?</h2>
            <p className="text-lg text-gray-400 mb-12 font-medium">Initiate your transformation with Grepflow today.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#00d261] text-black px-8 py-4 rounded-full font-bold hover:bg-[#00e86b] transition-colors shadow-[0_0_20px_rgba(0,210,97,0.3)]">Start a Project</button>
              <button className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                 <svg width="14" height="14" viewBox="0 0 32 32" fill="none"><path d="M16 4L28 24H4L16 4Z" fill="currentColor"/></svg>
                Book Discovery Call
              </button>
            </div>
          </div>
        </section>

        <section className="pb-32 pt-10 px-4 md:px-6">
          <div className="max-w-[1200px] mx-auto bg-white text-[#09090b] rounded-[40px] flex flex-col md:flex-row gap-16 p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="w-full md:w-1/3">
               <div className="text-[#00d261] font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-3">
                 <div className="w-6 h-6 bg-[#00d261]/10 rounded flex items-center justify-center text-sm border border-[#00d261]/20">?</div> FAQ
               </div>
               <h2 className="text-[44px] leading-tight font-bold mb-6 tracking-tight text-black">Frequently<br/>Asked<br/>Questions</h2>
               <p className="text-gray-500 mb-8 font-medium text-sm leading-relaxed">Tour our protocols, read our architecture dives, or kickstart your modernization journey with our engineering team.</p>
               <button className="text-black font-bold flex items-center gap-2 text-sm hover:text-[#00d261] transition-colors">Learn More <ArrowRight className="w-4 h-4"/></button>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              {[
                { q: "How long does an architecture audit take?", a: "Our initial discovery and architecture audit usually takes between 1 to 2 weeks depending on the complexity of your existing infrastructure." },
                { q: "Do you only work with AI integrations?", a: "No, while AI is a core pillar, we engineer robust full-stack solutions, cloud architectures, and legacy modernizations across the board." },
                { q: "What industries do you serve?", a: "We primarily work with Enterprise SaaS, Healthcare, and ambitious Product-led startups looking to scale." },
                { q: "How does pricing work?", a: "We offer project-based pricing for fixed-scope engineering, and retainer-based models for continuous AIOps and DevOps evolution." }
              ].map((faq, index) => (
                <div key={index} className={`border rounded-[24px] overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-gray-200 bg-white shadow-sm' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full p-6 text-left flex justify-between items-center">
                    <span className="font-bold text-[15px]">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaq === index ? 'bg-[#09090b] text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>
                       {openFaq === index ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 pt-0 text-gray-500 font-medium text-sm leading-relaxed">
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-20 pb-10 px-6 max-w-[1200px] mx-auto text-gray-400 text-[13px] font-medium">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
             <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-3 text-xl font-bold mb-10 text-white tracking-wide">
                 <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M16 4L28 24H4L16 4Z" fill="#00d261"/></svg>
                 GREPFLOW
               </div>
               <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#00d261] text-black px-6 py-2.5 rounded-full font-bold hover:bg-[#00e86b] transition-colors shadow-lg w-max">Start a Project</button>
               </div>
             </div>
             <div>
                <h4 className="font-bold text-white mb-6">Capabilities</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="hover:text-[#00d261] transition-colors">AI Integration</a></li>
                  <li><a href="#" className="hover:text-[#00d261] transition-colors">Cloud & AIOps</a></li>
                  <li><a href="#" className="hover:text-[#00d261] transition-colors">Legacy Modernisation</a></li>
                  <li><a href="#" className="hover:text-[#00d261] transition-colors">UX/UI Design</a></li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-white mb-6">Our Firm</h4>
                <ul className="space-y-4">
                  <li><a href="#firm" className="hover:text-[#00d261] transition-colors">About Us</a></li>
                  <li><a href="#methodology" className="hover:text-[#00d261] transition-colors">Methodology</a></li>
                  <li><a href="#lab" className="hover:text-[#00d261] transition-colors">The Lab</a></li>
                  <li><a href="#" className="hover:text-[#00d261] transition-colors">Privacy Policy</a></li>
                </ul>
             </div>
          </div>
          <p className="text-gray-500 mb-12 max-w-[1000px] leading-relaxed text-[11px]">
            Building the future of human-centric artificial intelligence. Grepflow is an elite technology consulting firm specializing in AI integration, enterprise cloud architecture, and modern application engineering.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
            <div className="flex items-center gap-8 mb-4 md:mb-0">
               <span>© {new Date().getFullYear()} Grepflow Technologies. All rights reserved.</span>
               <div className="flex gap-6">
                 <a href="#" className="hover:text-white transition-colors">Contact</a> 
                 <a href="#" className="hover:text-white transition-colors">Terms</a>
                 <a href="#" className="hover:text-white transition-colors">Privacy</a>
               </div>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-2 hover:text-white transition-colors ml-4">
                Back to top ↑
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}