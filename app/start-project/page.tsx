"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle2, Sparkles, Loader2, Calendar } from "lucide-react";
import Link from "next/link";

export default function StartProject() {
  const [activeTab, setActiveTab] = useState<"form" | "calendar">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "AI Integration",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Send data to our Next.js API Route (or Web3Forms/Formspree)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setIsSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#09090b] min-h-screen w-full font-sans text-white selection:bg-[#00d261] selection:text-black flex flex-col relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00d261]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full px-6 md:px-12 py-8 relative z-10 flex justify-between items-center">
        <Link href="/" className="flex items-center font-bold text-xl tracking-wide gap-2 group">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:block text-gray-400 group-hover:text-white transition-colors">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2 text-xl font-bold tracking-wide">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M16 4L28 24H4L16 4Z" fill="#00d261"/></svg>
          GREPFLOW
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          
          {/* Left Column: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center sticky top-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d261]/10 border border-[#00d261]/20 text-xs font-bold tracking-widest uppercase text-[#00d261] mb-8 w-max">
              <Sparkles className="w-4 h-4" /> Let's Build
            </div>
            <h1 className="text-[48px] md:text-[64px] font-bold leading-[1.1] tracking-tight mb-6">
              Initiate your <br/>
              <span className="text-gray-500">transformation.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
              Whether you need to integrate autonomous AI agents, modernize a legacy system, or architect a zero-trust cloud—our engineering team is ready.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><CheckCircle2 className="w-5 h-5 text-[#00d261]" /></div>
                Guaranteed response within 24 hours
              </div>
              <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><CheckCircle2 className="w-5 h-5 text-[#00d261]" /></div>
                Direct line to our lead architects
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Glass Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-[#121212] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[600px] flex flex-col"
          >
            {/* The Sleek Toggle */}
            <div className="flex bg-[#1a1c1a] p-1.5 rounded-full mb-8 border border-white/5 shrink-0 relative z-20">
              <button
                onClick={() => setActiveTab("form")}
                className={`flex-1 py-3 text-sm font-bold rounded-full transition-all duration-300 ${activeTab === "form" ? "bg-[#00d261] text-black shadow-md" : "text-gray-400 hover:text-white"}`}
              >
                Send a Message
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`flex-1 py-3 text-sm font-bold rounded-full transition-all duration-300 ${activeTab === "calendar" ? "bg-[#00d261] text-black shadow-md" : "text-gray-400 hover:text-white"}`}
              >
                Book a Call
              </button>
            </div>

            {/* Dynamic Content Area */}
            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                
                {/* --- TAB 1: FORM --- */}
                {activeTab === "form" && (
                  <motion.div
                    key="form-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    {isSuccess ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-10">
                        <div className="w-20 h-20 bg-[#00d261]/10 rounded-full flex items-center justify-center mb-6 border border-[#00d261]/20">
                          <CheckCircle2 className="w-10 h-10 text-[#00d261]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Request Received</h3>
                        <p className="text-gray-400 mb-8">Our team is reviewing your project details. We will be in touch shortly.</p>
                        <button onClick={() => setIsSuccess(false)} className="text-[#00d261] hover:text-white transition-colors text-sm font-bold border-b border-[#00d261]/30 pb-1">
                          Submit another query
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-5 pb-4 h-full overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Name</label>
                            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d261] focus:bg-white/10 transition-all" placeholder="John Doe" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d261] focus:bg-white/10 transition-all" placeholder="john@company.com" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Company</label>
                            <input type="text" name="company" value={formData.company} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d261] focus:bg-white/10 transition-all" placeholder="Optional" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Project Type</label>
                            <select name="projectType" value={formData.projectType} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d261] focus:bg-white/10 transition-all appearance-none cursor-pointer">
                              <option value="AI Integration" className="bg-[#121212]">AI Integration</option>
                              <option value="Cloud & AIOps" className="bg-[#121212]">Cloud & AIOps</option>
                              <option value="App Engineering" className="bg-[#121212]">App Engineering</option>
                              <option value="Legacy Modernisation" className="bg-[#121212]">Legacy Modernisation</option>
                              <option value="Other" className="bg-[#121212]">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Project Details</label>
                          <textarea required name="message" value={formData.message} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d261] focus:bg-white/10 transition-all resize-none flex-1 min-h-[120px]" placeholder="Tell us about your goals, timeline, and current stack..." />
                        </div>

                        {error && <div className="text-red-400 text-sm font-medium">{error}</div>}

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="mt-2 bg-[#00d261] text-black w-full py-3.5 rounded-xl font-bold hover:bg-[#00e86b] transition-colors shadow-[0_0_20px_rgba(0,210,97,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                          ) : (
                            <>Send Message <Send className="w-4 h-4" /></>
                          )}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}

                {/* --- TAB 2: CALENDAR --- */}
                {activeTab === "calendar" && (
                  <motion.div
                    key="calendar-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="w-16 h-16 bg-[#00d261]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#00d261]/20">
                      <Calendar className="w-8 h-8 text-[#00d261]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Discovery Call</h3>
                    <p className="text-gray-400 text-sm mb-8 max-w-[280px]">
                      Skip the inbox. Choose a 30-minute slot to discuss your architecture directly with our lead engineers.
                    </p>
                    
                    {/* Placeholder for iframe. Replace this div with your actual Calendly embed code later */}
                    <div className="w-full max-w-[360px] h-[220px] bg-white/5 border border-white/10 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 p-6">
                      <code className="text-[10px] text-gray-500 font-mono text-center">
                        &lt;iframe src="your-calendly-url" /&gt;
                      </code>
                      <p className="text-xs text-gray-400 mt-2 font-medium">Embed Calendly/Cal.com here</p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Small custom CSS for the scrollbar inside the form so it stays clean */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}