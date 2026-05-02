import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { useReveal } from "../hooks/useReveal";
import {
  GradientButton,
  FloatingOrb,
  ParticleField,
  RevealWrapper,
} from "./ui";
import StatCard from "./home/StatCard";
import FeatureCard from "./home/FeatureCard";
import StepCard from "./home/StepCard";

const features = [
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Registration Guidance",
    desc: "Step-by-step eligibility checks, documents list, and deadline tracking. Never miss a registration window.",
    color: "blue",
    learnMore: "Get personalized guidance through every step of the voter registration process with automated deadline reminders.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Election Calendar",
    desc: "Every milestone from primary filings to result certification, auto-flagged by status.",
    color: "amber",
    learnMore: "Stay informed with a comprehensive election timeline featuring real-time updates and personalized reminders for important dates.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Candidate Analysis",
    desc: "Objective evaluation checklists, red flag detection, and funding transparency insights.",
    color: "emerald",
    learnMore: "Make informed decisions with comprehensive candidate profiles, voting records, and fact-checked policy positions.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Voting Methods",
    desc: "In-person, early, mail-in, absentee — pros, cons, and a quiz to find your best fit.",
    color: "violet",
    learnMore: "Discover the voting method that works best for your lifestyle with our interactive comparison tool and recommendation quiz.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Knowledge Quiz",
    desc: "10-question challenge with instant feedback. Earn badges: Novice, Informed Voter, or Democracy Champion.",
    color: "rose",
    learnMore: "Test your civic knowledge with our engaging quiz and earn achievement badges while learning essential voting information.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Personal Action Plan",
    desc: "Select your situation, get a tailored checklist saved to your device. Track progress as you go.",
    color: "sky",
    learnMore: "Get a customized voting action plan based on your specific situation, with progress tracking and smart reminders.",
  },
];

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [heroRef, heroVis] = useReveal();
  const [typedText, setTypedText] = useState("");
  const fullText = "Your personal, AI-powered election assistant.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleOpenChat = useCallback(() => {
    document.getElementById("chat-widget-toggle")?.click();
  }, []);

  const scrollToFeatures = useCallback(() => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={`min-h-screen transition-theme relative overflow-x-hidden ${isDark ? 'bg-bg-primary' : 'bg-bg-primary'}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParticleField count={isDark ? 30 : 15} opacity={{ min: 0.1, max: 0.4 }} />
        <FloatingOrb size="xl" color="blue" position="top-left" blur={150} opacity={0.12} />
        <FloatingOrb size="lg" color="purple" position="top-right" blur={120} opacity={0.1} />
        <FloatingOrb size="lg" color="gold" position="bottom-right" blur={100} opacity={0.08} />
        <FloatingOrb size="md" color="cyan" position="bottom-left" blur={100} opacity={0.08} />
        <FloatingOrb size="lg" color="rose" position="bottom-center" blur={120} opacity={0.05} />
      </div>

      <div className={`fixed inset-0 ${isDark ? 'bg-mesh' : 'bg-mesh-light'} opacity-50 pointer-events-none z-0`} />

      <div 
        className={`fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 mix-blend-luminosity ${isDark ? 'opacity-[0.04]' : 'opacity-[0.08]'}`}
        style={{ backgroundImage: "url('/civic-bg.png')" }}
      />

      <div className={`fixed inset-0 bg-grid pointer-events-none radial-fade z-0 ${isDark ? 'opacity-[0.06]' : 'opacity-[0.04]'}`} />

      <div 
        className={`fixed inset-0 pointer-events-none z-0 mix-blend-multiply ${isDark ? 'opacity-60' : 'opacity-20'}`} 
        style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 120%)' }} 
      />

      <div className="fixed inset-0 pointer-events-none noise mix-blend-overlay z-0" />


      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center px-4 pt-32 pb-16">
        <div className={`text-center w-full max-w-5xl mx-auto ${heroVis ? "animate-slide-up" : "opacity-0"}`}>
          <RevealWrapper delay={200}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8 hover:scale-105 transition-transform duration-300">
              <div className="w-2 h-2 rounded-full bg-civic-gold animate-pulse" />
              <span className="text-xs text-text-secondary font-medium tracking-wide uppercase">
                Open-source · Non-partisan · Free forever
              </span>
            </div>
          </RevealWrapper>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            <span className="text-text-primary block">Empowering Every</span>
            <span className="text-gradient drop-shadow-sm">Voice, Every Vote.</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12 font-medium min-h-[3rem]">
            {typedText}
            <span className="inline-block w-0.5 h-6 ml-1 bg-civic-gold animate-blink align-middle" />
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <GradientButton size="lg" onClick={handleOpenChat} className="group min-w-[200px]">
              <span className="flex items-center gap-2">
                Ask VoteSaathi
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
            </GradientButton>
            <button 
              onClick={scrollToFeatures}
              className="px-8 py-4 rounded-2xl glass hover:bg-white/10 text-text-primary font-bold transition-all duration-300 border border-white/5 hover:border-white/20 min-w-[200px]"
            >
              Explore Features
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <StatCard value={250} suffix="M+" label="Eligible Voters" icon="🗳️" delay={400} />
            <StatCard value={100} suffix="%" label="Free Guidance" icon="🤝" delay={500} gradient="from-civic-gold to-civic-rose" />
            <StatCard value={50} suffix="+" label="States Covered" icon="🇺🇸" delay={600} gradient="from-civic-blue-cyan to-civic-blue" />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity animate-bounce cursor-pointer" onClick={scrollToFeatures}>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Scroll</span>
          <svg className="w-5 h-5 text-civic-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <RevealWrapper>
              <h2 className="text-4xl sm:text-5xl font-black text-text-primary mb-6">Built for Informed Citizens</h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                Everything you need to navigate the democratic process, from registration to ballot research.
              </p>
            </RevealWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-32 px-4 glass-strong-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <RevealWrapper animation="slide-right">
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-8">Civic engagement made effortless.</h2>
                <p className="text-blue-100/70 text-lg mb-10 leading-relaxed">
                  We believe that technology should serve democracy. VoteSaathi provides non-partisan, 
                  accurate information to ensure your voice is heard loud and clear.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 glass-light p-4 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">Non-partisan and objective information</span>
                  </div>
                  <div className="flex items-center gap-4 glass-light p-4 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">Privacy-focused: no personal data stored</span>
                  </div>
                  <div className="flex items-center gap-4 glass-light p-4 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">Real-time AI assistance available 24/7</span>
                  </div>
                </div>
              </RevealWrapper>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StepCard number="01" title="Register" desc="Check eligibility and deadlines for your state." delay={100} gradient="from-blue-600 to-civic-blue" />
              <StepCard number="02" title="Research" desc="Evaluate candidates and ballot measures." delay={200} gradient="from-emerald-600 to-emerald-400" />
              <StepCard number="03" title="Prepare" desc="Choose your voting method and find your poll." delay={300} gradient="from-amber-600 to-civic-gold" />
              <StepCard number="04" title="Vote" desc="Make your mark on the democratic process." delay={400} gradient="from-civic-rose to-red-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-civic-gold flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-text-primary font-black text-xl tracking-tighter">
              Vote<span className="text-civic-gold">Saathi</span>
            </span>
          </div>

          <div className="flex gap-8 text-sm font-medium text-text-secondary">
            <a href="#" className="hover:text-civic-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-civic-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-civic-gold transition-colors">Open Source</a>
            <a href="#" className="hover:text-civic-gold transition-colors">Contact</a>
          </div>

          <p className="text-xs text-text-muted">
            © 2026 VoteSaathi. Non-partisan election education platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
