import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  ThemeToggle,
  AnimatedCounter,
  FlashCard,
  GradientButton,
  FloatingOrb,
  ParticleField,
  RevealWrapper,
} from "./ui";

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Stats Card Component ── */
function StatCard({ value, suffix = "", label, icon, delay = 0, gradient = "from-civic-blue to-civic-purple" }) {
  const [ref, vis] = useReveal();

  return (
    <div
      ref={ref}
      className={`group relative glass-strong rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500 cursor-default ${
        vis ? "animate-scale-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      <div className="relative">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-civic-blue/20 to-civic-purple/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          {icon}
        </div>

        <p className="text-4xl sm:text-5xl font-black">
          <AnimatedCounter end={value} suffix={suffix} className="text-gradient" />
        </p>

        <p className="text-sm text-text-secondary mt-2 uppercase tracking-wider font-medium">{label}</p>
      </div>
    </div>
  );
}

/* ── Feature Flash Card ── */
function FeatureCard({ icon, title, desc, color, delay, learnMore }) {
  const [ref, vis] = useReveal();

  const gradients = {
    blue: "from-civic-blue to-civic-blue-electric",
    amber: "from-civic-gold to-civic-gold-dark",
    emerald: "from-emerald-600 to-emerald-400",
    violet: "from-civic-purple to-civic-purple-light",
    rose: "from-civic-rose to-civic-rose-light",
    sky: "from-civic-blue-cyan to-civic-blue",
  };

  return (
    <div
      ref={ref}
      className={`flip-card h-full ${vis ? "animate-reveal" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flip-card-inner relative h-full">
        {/* Front */}
        <div className="flip-card-front h-full glass-strong rounded-2xl p-6 cursor-default group hover:border-white/20 transition-colors backface-hidden">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[color]} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-gradient transition-all">{title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-civic-blue-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Hover to learn more</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back h-full absolute inset-0 rounded-2xl bg-gradient-to-br from-civic-blue to-civic-purple p-6 flex flex-col justify-center items-center text-center backface-hidden rotate-y-180">
          <p className="text-white/90 text-sm leading-relaxed mb-4">{learnMore}</p>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step Card ── */
function StepCard({ number, title, desc, delay, gradient }) {
  const [ref, vis] = useReveal();

  return (
    <div
      ref={ref}
      className={`relative ${vis ? "animate-reveal" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="glass-strong rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
          {number}
        </div>
        <h4 className="text-xl font-bold text-text-primary mb-2">{title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ── Features Data ── */
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

/* ── Main Home Component ── */
export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [heroRef, heroVis] = useReveal();
  const [typedText, setTypedText] = useState("");
  const fullText = "Your personal, AI-powered election assistant.";

  // Typing effect
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

      {/* Gradient mesh background */}
      <div className={`fixed inset-0 ${isDark ? 'bg-mesh' : 'bg-mesh-light'} opacity-50 pointer-events-none z-0`} />

      {/* Abstract Civic Image Background */}
      <div 
        className={`fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 mix-blend-luminosity ${isDark ? 'opacity-[0.04]' : 'opacity-[0.08]'}`}
        style={{ backgroundImage: "url('/civic-bg.png')" }}
      />

      {/* Grid overlay with elegant radial fade */}
      <div className={`fixed inset-0 bg-grid pointer-events-none radial-fade z-0 ${isDark ? 'opacity-[0.06]' : 'opacity-[0.04]'}`} />

      {/* Vignette depth effect */}
      <div 
        className={`fixed inset-0 pointer-events-none z-0 mix-blend-multiply ${isDark ? 'opacity-60' : 'opacity-20'}`} 
        style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 120%)' }} 
      />

      {/* Cinematic noise texture */}
      <div className="fixed inset-0 pointer-events-none noise mix-blend-overlay z-0" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <RevealWrapper animation="slide-right" delay={100}>
            <div className="flex items-center gap-2.5 glass-strong rounded-full px-4 py-2.5 hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-civic-gold to-civic-gold-dark flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-text-primary font-bold text-sm tracking-tight">
                Vote<span className="text-civic-gold">Saathi</span>
              </span>
            </div>
          </RevealWrapper>

          {/* Theme Toggle */}
          <RevealWrapper animation="slide-left" delay={100}>
            <ThemeToggle />
          </RevealWrapper>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center px-4 pt-32 pb-16">
        <div className={`text-center w-full max-w-5xl mx-auto ${heroVis ? "animate-slide-up" : "opacity-0"}`}>
          {/* Badge */}
          <RevealWrapper delay={200}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8 hover:scale-105 transition-transform duration-300">
              <div className="w-2 h-2 rounded-full bg-civic-gold animate-pulse" />
              <span className="text-xs text-text-secondary font-medium tracking-wide uppercase">
                Open-source · Non-partisan · Free forever
              </span>
            </div>
          </RevealWrapper>

          {/* Main Heading */}
          <RevealWrapper delay={300}>
            <h1 className="text-display font-black tracking-tight mb-6">
              <span className="block text-text-primary">Know your</span>
              <span className="block text-gradient-rainbow glow-text">vote</span>
            </h1>
          </RevealWrapper>

          {/* Typed Subtitle */}
          <RevealWrapper delay={500}>
            <p className="text-xl sm:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8 h-8">
              <span className="text-gradient-blue">{typedText}</span>
              <span className="animate-blink text-civic-gold">|</span>
            </p>
          </RevealWrapper>

          {/* Description */}
          <RevealWrapper delay={600}>
            <p className="text-base sm:text-lg text-text-muted max-w-xl mx-auto leading-relaxed mb-10">
              Get instant answers about voter registration, polling locations, candidate platforms, and crucial deadlines.
            </p>
          </RevealWrapper>

          {/* CTA Buttons */}
          <RevealWrapper delay={700}>
            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton
                variant="gold"
                size="lg"
                onClick={handleOpenChat}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
              >
                Start a conversation
              </GradientButton>

              <button
                onClick={scrollToFeatures}
                className={`group px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'glass-strong text-text-primary hover:bg-white/15'
                    : 'glass text-text-primary hover:bg-white/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  See what I can do
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </button>
            </div>
          </RevealWrapper>

          {/* Floating 3D Badge */}
          <RevealWrapper delay={900}>
            <div className="mt-16 floating-slow">
              <div className="inline-flex glass-strong rounded-2xl p-5 gap-4 items-center hover:scale-105 transition-transform duration-300 cursor-default">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-civic-blue to-civic-purple flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-text-primary text-sm font-semibold">Try asking me</p>
                  <p className="text-text-secondary text-xs">&quot;How do I register to vote?&quot;</p>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
          <div className={`w-7 h-12 rounded-full border-2 flex justify-center pt-2 ${isDark ? 'border-white/20' : 'border-gray-400'}`}>
            <div className={`w-1.5 h-3 rounded-full animate-bounce ${isDark ? 'bg-white/40' : 'bg-gray-400'}`} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                Empowering <span className="text-gradient">civic engagement</span>
              </h2>
              <p className="text-text-secondary max-w-lg mx-auto">
                Comprehensive tools to make your voting journey seamless and informed.
              </p>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              value={45}
              suffix="+"
              label="Topics covered"
              delay={0}
              gradient="from-civic-blue to-civic-purple"
              icon={
                <svg className="w-7 h-7 text-civic-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <StatCard
              value={10}
              label="Quiz questions"
              delay={100}
              gradient="from-civic-gold to-civic-gold-light"
              icon={
                <svg className="w-7 h-7 text-civic-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              }
            />
            <StatCard
              value={100}
              suffix="%"
              label="Non-partisan"
              delay={200}
              gradient="from-emerald-500 to-emerald-400"
              icon={
                <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StatCard
              value={0}
              suffix="$"
              label="Always free"
              delay={300}
              gradient="from-civic-rose to-civic-rose-light"
              icon={
                <svg className="w-7 h-7 text-civic-rose-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-16 sm:py-24 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-civic-blue-light animate-pulse" />
                <span className="text-xs text-text-secondary uppercase tracking-wide">Features</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Everything you need,<br />
                <span className="text-gradient-rainbow">in one conversation.</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                No pages to navigate. Just ask. Our assistant covers all of these and more.
              </p>
            </div>
          </RevealWrapper>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-civic-gold animate-pulse" />
                <span className="text-xs text-text-secondary uppercase tracking-wide">How it works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Three steps to<br />
                <span className="text-gradient-blue">election-ready.</span>
              </h2>
            </div>
          </RevealWrapper>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-civic-blue/20 via-civic-purple/20 to-civic-gold/20 -translate-y-1/2 z-0" />

            <StepCard
              number="1"
              title="Open the assistant"
              desc="Click the chat bubble. Ask your first question in plain English."
              delay={0}
              gradient="from-civic-blue to-civic-blue-electric"
            />
            <StepCard
              number="2"
              title="Get instant answers"
              desc="Registration steps, deadline dates, voting methods — all sourced and verified."
              delay={150}
              gradient="from-civic-purple to-civic-purple-light"
            />
            <StepCard
              number="3"
              title="Take action"
              desc="Follow the steps. Check things off. Show up prepared and confident."
              delay={300}
              gradient="from-civic-gold to-civic-gold-light"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <RevealWrapper>
            <div className={`glass-strong rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden ${isDark ? 'glow-blue' : 'shadow-2xl'}`}>
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-civic-blue/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-civic-purple/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                  Ready to get started?
                </h2>
                <p className="text-text-secondary mb-8 max-w-md mx-auto text-lg">
                  Your voice matters. Click the chat bubble and ask your first question.
                </p>
                <GradientButton
                  variant="gold"
                  size="xl"
                  onClick={handleOpenChat}
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                >
                  Talk to VoteSaathi
                </GradientButton>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative border-t py-12 px-4 ${isDark ? 'border-border-color' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-civic-gold to-civic-gold-dark flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-text-primary font-bold text-sm">
                Vote<span className="text-civic-gold">Saathi</span>
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="https://vote.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-civic-blue-light transition-colors underline-animated"
              >
                Vote.gov
              </a>
              <a
                href="https://ballotpedia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-civic-blue-light transition-colors underline-animated"
              >
                Ballotpedia
              </a>
              <a
                href="https://www.factcheck.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-civic-blue-light transition-colors underline-animated"
              >
                FactCheck.org
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} VoteSaathi. Made with ❤️ for democracy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
