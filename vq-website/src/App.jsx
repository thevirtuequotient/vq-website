import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, BookOpen, Users, Lightbulb, Mail, ChevronRight, Star, Check, Quote, Linkedin, Twitter, Lock, Clock, BarChart, Mic, Microscope, Briefcase, Award, Music } from 'lucide-react';

// --- CONFIGURATION & PLACEHOLDERS ---
// Note: In a real local environment, place your images in the 'public' folder.
const bookCoverImage = "/IMG_7733.jpg"; 
const authorImage = "https://placehold.co/400x500/e2e8f0/1a365d?text=Dr.+Rosa+Lee"; 

const amazonLink = "https://a.co/d/5KJK1bl";
const kindleLink = "https://a.co/d/cotjjfM";

// --- SHARED COMPONENTS ---

const Button = ({ children, onClick, variant = 'primary', className = '', href = null, type = "button" }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 rounded-md font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 tracking-wide";
  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800 border border-transparent",
    secondary: "bg-white text-blue-900 border-2 border-blue-900 hover:bg-blue-50",
    tertiary: "text-blue-700 hover:text-blue-900 underline decoration-transparent hover:decoration-blue-900 hover:translate-y-0 hover:shadow-none px-0 py-0", 
    accent: "bg-amber-400 text-slate-900 hover:bg-amber-500 border border-transparent"
  };

  if (className.includes('hero-button')) {
      const heroStyle = `${baseStyle} min-w-[180px] ${className.replace('hero-button', '')}`;
      
      if (className.includes('hero-primary')) {
           return <button onClick={onClick} type={type} className={`${heroStyle} bg-amber-600 text-white hover:bg-amber-700 border-none`}>{children}</button>;
      }
      if (className.includes('hero-secondary')) {
          return <button onClick={onClick} type={type} className={`${heroStyle} bg-white text-slate-900 border border-white hover:bg-slate-100`}>{children}</button>;
      }
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${baseStyle} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} type={type} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "py-20 md:py-28", bg = "white" }) => (
  <section className={`${className} ${bg === 'gray' ? 'bg-slate-50' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

const AnimatedWord = ({ text, delay, className = "" }) => (
    <span className={`animate-word delay-${delay} ${className}`}>{text}</span>
);

const TypingText = ({ text, startDelay = 1000 }) => {
  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="animate-letter"
          style={{ animationDelay: `${(startDelay + (index * 120)) / 1000}s` }} 
        >
          {char}
        </span>
      ))}
    </span>
  );
};

// --- SUB-COMPONENTS ---

const VQQuickTest = () => {
  const [step, setStep] = useState('start');
  const [answers, setAnswers] = useState({});
  const [userData, setUserData] = useState({ name: '', email: '', newsletter: true });

  const questions = [
    { id: 1, text: "I keep my promises, even when no one will know if I don’t." },
    { id: 2, text: "My private behavior matches my public claims." },
    { id: 3, text: "I can sense when someone’s “kindness” is actually self-interest." },
    { id: 4, text: "I notice when people use moral language to cover questionable motives." },
    { id: 5, text: "I have given up money, status, or comfort to protect my values." },
    { id: 6, text: "I have ended a relationship or opportunity over integrity concerns." },
    { id: 7, text: "Under stress, I still make the choice I believe is right." },
    { id: 8, text: "Temptations do not change my core decisions." },
    { id: 9, text: "I act to protect others from unfair harm, even if I get nothing in return." },
    { id: 10, text: "I will stand up to unfair rules or practices, even if it’s unpopular." },
    { id: 11, text: "I keep my standards in environments where most people compromise." },
    { id: 12, text: "I resist normalizing unethical behavior, no matter common." },
    { id: 13, text: "I admit my mistakes without being forced." },
    { id: 14, text: "I actively track my commitments and follow through." }
  ];

  const handleAnswer = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((a, b) => a + b, 0);
  };

  const getResultData = (score) => {
    if (score <= 25) return { label: "Very Low", desc: "Strong tendency to adjust values for convenience or self-gain. Moral stance is situational and heavily influenced by external pressures.", percentile: "<10th" };
    if (score <= 33) return { label: "Low", desc: "Some consistent values in safe settings, but readily compromised when under stress, temptation, or group pressure.", percentile: "10th–25th" };
    if (score <= 40) return { label: "Lower-Moderate", desc: "Generally aware of right and wrong but applies selectively. Will uphold values when stakes are low; risk of bending under higher cost.", percentile: "25th–40th" };
    if (score <= 47) return { label: "Moderate", desc: "Keeps values intact in most personal situations; occasional slip under significant social, financial, or emotional pressure.", percentile: "40th–60th" };
    if (score <= 53) return { label: "Upper-Moderate", desc: "Maintains moral alignment under moderate difficulty; occasional compromise possible only under extreme or complex conditions.", percentile: "60th–75th" };
    if (score <= 59) return { label: "High", desc: "Strong internalized moral compass; acts with integrity even when costly. Rare lapses, usually due to misjudgment rather than willful compromise.", percentile: "75th–90th" };
    if (score <= 64) return { label: "Very High", desc: "Nearly unwavering virtue expression across contexts; actively resists corrupt influence and prioritizes justice and alignment over personal gain.", percentile: "90th–97th" };
    if (score <= 67) return { label: "Exceptional", desc: "Moral stance remains intact in almost any condition, including hostile or corrupt environments. Often seen as a model of integrity by others.", percentile: "97th–99th" };
    return { label: "Ultra-Rare", desc: "Lives in full alignment with values regardless of cost; integrity is non-negotiable in all contexts. Acts as a moral anchor in any group.", percentile: "Top 0.1% or higher" };
  };

  const isTestComplete = Object.keys(answers).length === questions.length;

  if (step === 'start') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
           <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900">VQ Snapshot (Free)</h2>
        <p className="mb-8 text-lg text-slate-600 max-w-xl mx-auto">This 14-question rapid assessment takes about 3-5 minutes. Be honest—this is for self-awareness, not performance.</p>
        <Button onClick={() => setStep('test')} variant="primary" className="text-lg px-10">Start Quick Check</Button>
      </div>
    );
  }

  if (step === 'test') {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-10 sticky top-20 bg-slate-50 pt-4 pb-2 z-10">
          <div className="flex justify-between items-end mb-2">
             <span className="text-sm font-bold text-blue-900 uppercase tracking-wide">Progress</span>
             <span className="text-sm font-medium text-slate-500">{Object.keys(answers).length} / {questions.length}</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-900 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}></div>
          </div>
        </div>
        
        <div className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="font-medium text-xl text-slate-900 mb-6 leading-relaxed">{q.text}</p>
              <div className="flex justify-between gap-2 sm:gap-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(q.id, val)}
                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200 transform ${
                      answers[q.id] === val 
                        ? 'bg-blue-900 text-white scale-110 shadow-lg' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-400 mt-4 px-2 uppercase tracking-wider">
                <span>Disagree</span>
                <span>Agree</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            onClick={() => setStep('capture')} 
            disabled={!isTestComplete}
            className={`text-lg px-12 ${!isTestComplete ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
          >
            Calculate VQ
          </Button>
          {!isTestComplete && <p className="text-sm text-amber-600 mt-3 font-medium animate-pulse">Please answer all questions to proceed.</p>}
        </div>
      </div>
    );
  }

  if (step === 'capture') {
    return (
      <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-xl text-center border border-slate-100">
        <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
           <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-slate-900">Unlock Your Profile</h3>
        <p className="text-slate-600 mb-8">Enter your details to view your VQ Score and Percentile.</p>
        <form className="space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); setStep('results'); }}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wide">Name</label>
            <input 
              required 
              type="text" 
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wide">Email</label>
            <input 
              required 
              type="email" 
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              placeholder="jane@example.com"
            />
          </div>
          <div className="flex items-start gap-3 mt-6 p-4 bg-slate-50 rounded-lg">
            <input 
              type="checkbox" 
              id="newsletterOpt" 
              checked={userData.newsletter} 
              onChange={(e) => setUserData({...userData, newsletter: e.target.checked})}
              className="mt-1 w-5 h-5 text-blue-900 border-slate-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="newsletterOpt" className="text-sm text-slate-600 leading-tight cursor-pointer">
              Send me VQ insights and case studies (1–2x/month). Unsubscribe anytime.
            </label>
          </div>
          <Button type="submit" className="w-full mt-6 py-4 text-lg">Reveal Results</Button>
        </form>
      </div>
    );
  }

  if (step === 'results') {
    const score = calculateScore();
    const result = getResultData(score);

    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 text-white p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <h3 className="text-xl font-medium text-blue-200 mb-4 uppercase tracking-widest">Your VQ Snapshot</h3>
          <div className="flex justify-center items-baseline gap-2 mb-6">
              <span className="text-7xl font-bold text-amber-400 tracking-tight">{score}</span>
              <span className="text-3xl text-slate-500 font-light">/70</span>
          </div>
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-800 border border-blue-700 text-sm font-bold tracking-wide uppercase shadow-lg">
            {result.label}
          </div>
        </div>
        <div className="p-10 md:p-14">
          <div className="mb-10">
            <h4 className="text-2xl font-bold text-slate-900 mb-4">What this means</h4>
            <p className="text-lg text-slate-700 leading-relaxed">{result.desc}</p>
            <div className="mt-6 inline-block bg-slate-100 px-4 py-2 rounded-lg">
                <p className="text-sm font-bold text-slate-600">Estimated Percentile: <span className="text-blue-700 text-lg ml-1">{result.percentile}</span></p>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-8 rounded-r-lg mb-10">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Lightbulb className="w-6 h-6 text-amber-600"/> Optional Reflection</h4>
            <p className="text-slate-800 italic font-medium text-lg leading-relaxed">
              "Think of one time in the last year you acted against your own values. What was the pressure, and how would you handle it differently next time?"
            </p>
          </div>

          <div className="text-center border-t border-slate-100 pt-10">
            <h4 className="font-bold text-slate-900 mb-6 text-xl">Take the next step</h4>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button onClick={() => window.open(amazonLink, '_blank')} className="min-w-[200px]">Get the Book</Button>
              <Button variant="secondary" onClick={() => alert("Info on Beta version sent to your email!")} className="min-w-[200px]">Learn About Beta Test</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// --- PAGE COMPONENTS ---

const HomePage = ({ navigate }) => (
  <>
    {/* Hero Section */}
    <div className="relative bg-slate-900 text-white pt-32 pb-24 lg:pt-40 lg:pb-36 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight mb-10">
          <div className="block mb-4">
              <AnimatedWord text="IQ" delay="200" /> 
              <AnimatedWord text="measures" delay="400" /> 
              <AnimatedWord text="intelligence." delay="600" />
          </div>
          <div className="block mb-4">
              <AnimatedWord text="EQ" delay="1200" />
              <AnimatedWord text="measures" delay="1400" />
              <AnimatedWord text="emotion." delay="1600" />
          </div>
          <div className="block mt-8">
              {/* Grouped VQ and measures so they animate together */}
              <AnimatedWord text="VQ measures" delay="2200" className="mr-3" />
              {/* Emphasized "Who You Are" with Typewriter Effect */}
              <span className="ml-2 text-amber-400 italic border-b-4 border-transparent hover:border-amber-400 transition-all duration-500 pb-1 inline-block min-w-[280px] text-left">
                 <TypingText text="who you are." startDelay={3000} />
              </span>
          </div>
        </h1>
        
        <div className="animate-word delay-3500">
          <p className="mt-12 mb-12 max-w-3xl mx-auto text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
              Virtue Quotient (VQ) is the missing metric of character and conscience in a world obsessed with competence.
          </p>
        </div>

        {/* Symmetric Buttons Container - Clearly separated */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 opacity-0 animate-word delay-3800" style={{ animationFillMode: 'forwards' }}>
          <Button onClick={() => navigate('what-is-vq')} className="hero-button hero-primary shadow-2xl text-lg py-5 px-10">
            Discover VQ
          </Button>
          <Button onClick={() => navigate('book')} className="hero-button hero-secondary shadow-2xl text-lg py-5 px-10">
            Get the Book
          </Button>
        </div>
        
        {/* REMOVED NEWSLETTER LINK FROM HERE */}
        
      </div>
    </div>

    {/* What is VQ Teaser */}
    <Section>
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Missing Piece of Human Potential</h2>
        <p className="text-lg md:text-xl text-slate-600 mb-16 leading-relaxed">
          For decades, we've optimized for smarts (IQ) and social skills (EQ). Yet, highly intelligent and charismatic leaders still fail catastrophically. Why? Because they lack VQ—the structural capacity for integrity under pressure.
        </p>
        {/* Interactive Cards with Lift Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 group">
            {/* Darker theme for IQ as requested */}
            <div className="w-14 h-14 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl group-hover:bg-blue-800 transition-colors">IQ</div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Capabilities</h3>
            <p className="text-slate-500">What you can do.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 group">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl group-hover:bg-green-600 group-hover:text-white transition-colors">EQ</div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Relationships</h3>
            <p className="text-slate-500">How you relate.</p>
          </div>
          <div className="p-8 bg-amber-50 rounded-2xl shadow-xl border-2 border-amber-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-amber-200 w-16 h-16 rounded-bl-full opacity-20"></div>
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">VQ</div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Character</h3>
            <p className="text-slate-800 font-medium">Who you are.</p>
          </div>
        </div>
        <Button onClick={() => navigate('what-is-vq')} variant="tertiary" className="text-lg font-semibold">
          Learn the full framework <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </Section>

    {/* Book Teaser */}
    <Section bg="gray">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/3 flex justify-center perspective-1000">
          {/* Interactive Book Cover */}
          <div className="relative shadow-2xl rounded-sm overflow-hidden transform hover:scale-105 hover:rotate-1 hover:shadow-3xl transition-all duration-700 cursor-pointer bg-white p-2" onClick={() => navigate('book')}>
            <img src={bookCoverImage} alt="Virtue Quotient Book Cover" className="w-full max-w-xs h-auto object-cover" />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Virtue Quotient: The Missing Key Beyond IQ and EQ</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            In this groundbreaking book, Dr. Rosa Lee unveils the science of character. Discover why good people make bad decisions, and how to build the structural integrity needed to sustain success.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              "Why character is a measurable competency, not just a feeling.",
              "The 5 Clusters of VQ and how to assess yours.",
              "How to prevent 'VQ Erosion' in high-stakes environments."
            ].map((item, i) => (
              <li key={i} className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Button href={amazonLink} variant="primary">
              Buy on Amazon
            </Button>
            <Button href={kindleLink} variant="secondary">
              Get for Kindle
            </Button>
            <Button onClick={() => navigate('book')} variant="tertiary">
              Read a sample chapter
            </Button>
          </div>
        </div>
      </div>
    </Section>

    {/* Who is VQ For? */}
    <Section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900">Who needs VQ?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
             <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-slate-900">Individuals</h3>
          <p className="text-slate-600 mb-8 leading-relaxed">For self-mastery, life decisions, and building unshakeable self-trust.</p>
          <button onClick={() => navigate('individuals')} className="text-blue-600 font-bold flex items-center hover:underline uppercase tracking-wide text-sm">Learn more <ChevronRight className="w-4 h-4 ml-1"/></button>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
          <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-300">
             <Lightbulb className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-slate-900">Leaders</h3>
          <p className="text-slate-600 mb-8 leading-relaxed">For hiring the right people, building trust, and ensuring long-term organizational health.</p>
          <button onClick={() => navigate('leaders')} className="text-amber-600 font-bold flex items-center hover:underline uppercase tracking-wide text-sm">Learn more <ChevronRight className="w-4 h-4 ml-1"/></button>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
          <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-slate-800 transition-colors duration-300">
             <BookOpen className="w-8 h-8 text-slate-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-slate-900">Researchers</h3>
          <p className="text-slate-600 mb-8 leading-relaxed">A new lens for psychology, ethics, and decision sciences beyond the standard models.</p>
          <button onClick={() => navigate('research')} className="text-slate-600 font-bold flex items-center hover:underline uppercase tracking-wide text-sm">Learn more <ChevronRight className="w-4 h-4 ml-1"/></button>
        </div>
      </div>
    </Section>

    {/* About Teaser - Updated Labels & Clean Photo */}
    <Section bg="gray">
      <div className="flex flex-col md:flex-row items-center gap-16">
         <div className="w-full md:w-2/3 order-2 md:order-1">
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Founder & Author</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Dr. Rosa Lee</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Dr. Rosa Lee is a medical doctor, entrepreneur, and the founder of the Virtue Quotient framework. 
            After years of clinical practice and business leadership, she realized that our definitions of "success" were dangerously incomplete.
          </p>
          {/* Updated Labels to: Physician, Entrepreneur, Author */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-600 font-medium"><Microscope className="w-5 h-5 text-blue-500" /> Physician</div>
              <div className="flex items-center gap-2 text-slate-600 font-medium"><Briefcase className="w-5 h-5 text-blue-500" /> Entrepreneur</div>
              <div className="flex items-center gap-2 text-slate-600 font-medium"><BookOpen className="w-5 h-5 text-blue-500" /> Author</div>
            </div>
            <div className="mt-8">
              <Button onClick={() => navigate('about')} variant="tertiary">
                Read Full Bio <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/3 order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <img src={authorImage} alt="Dr. Rosa Lee" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonial Section */}
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900">What Leaders Are Saying</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial 
            quote="VQ is the missing piece of the leadership puzzle. It moves the conversation from 'what do you know' to 'who are you under pressure.'"
            author="A. Johnson"
            title="CEO, Global Tech Firm"
          />
          <Testimonial 
            quote="This framework should be mandatory reading for every executive team. It's a blueprint for building a culture of unshakeable integrity."
            author="Dr. S. Chen"
            title="Organizational Psychologist"
          />
          <Testimonial 
            quote="I thought I understood character, but VQ provides the measurable, actionable steps to cultivate it. Truly transformative."
            author="M. Rodriguez"
            title="Venture Capitalist"
          />
        </div>
      </Section>

      {/* VQ Quick Test CTA */}
      <Section bg="gray">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to Measure Your VQ?</h2>
          <p className="text-xl text-slate-600 mb-8">Take the free, 3-minute VQ Snapshot and get your estimated percentile.</p>
          <Button onClick={() => navigate('test')} className="hero-button hero-primary shadow-xl text-lg py-5 px-10">
            Start VQ Snapshot
          </Button>
        </div>
      </Section>
    </>
  );

const BookPage = ({ navigate }) => (
  <div className="py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative shadow-2xl rounded-sm overflow-hidden bg-white p-2">
            <img src={bookCoverImage} alt="Virtue Quotient Book Cover" className="w-full max-w-xs h-auto object-cover" />
          </div>
          <div className="mt-8 space-y-4">
            <Button href={amazonLink} variant="primary" className="w-full">Buy on Amazon</Button>
            <Button href={kindleLink} variant="secondary" className="w-full">Get for Kindle</Button>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Virtue Quotient (VQ)</h1>
          <h2 className="text-3xl font-medium text-amber-600 mb-8">The Missing Key Beyond IQ and EQ</h2>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            Dr. Rosa Lee's groundbreaking work introduces the Virtue Quotient (VQ), a measurable framework for understanding and cultivating the structural integrity of character. In a world where competence and charisma often overshadow conscience, VQ provides the essential metric for sustainable success and true human greatness.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <span className="font-medium text-slate-700">Hardcover & Kindle</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Star className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <span className="font-medium text-slate-700">5-Star Reviews</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600 flex-shrink-0" />
              <span className="font-medium text-slate-700">Used by Fortune 500</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Award className="w-6 h-6 text-red-600 flex-shrink-0" />
              <span className="font-medium text-slate-700">Award-Winning Research</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">What You Will Learn</h3>
          <ul className="space-y-3 text-lg text-slate-600 list-disc list-inside ml-4">
            <li>The 5 Clusters of VQ: Integrity, Courage, Humility, Justice, and Temperance.</li>
            <li>Actionable steps to measure and improve your VQ in daily life and leadership.</li>
            <li>How to inoculate yourself and your organization against "VQ Erosion."</li>
            <li>The difference between situational ethics and structural character.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const WhatIsVQPage = ({ navigate }) => (
  <div className="py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-4">What is the Virtue Quotient (VQ)?</h1>
      <p className="text-2xl text-slate-600 mb-12 max-w-4xl">
        VQ is the metric of **structural character**—the capacity to maintain integrity and act in alignment with one's values, especially under pressure.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Three Pillars of Human Potential</h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            For too long, the world has focused on a two-dimensional model of success: **IQ** (cognitive intelligence) and **EQ** (emotional intelligence). While essential, these pillars are insufficient. A person can be brilliant and charismatic, yet still lack the inner fortitude to make the right choice when it's the hardest choice. VQ completes the model.
          </p>
          <div className="space-y-6">
            <PillarCard icon={<Lightbulb className="w-6 h-6 text-blue-600" />} title="IQ (Intelligence Quotient)" description="Measures cognitive ability, problem-solving, and technical competence. The 'What you know' and 'What you can do'." color="blue" />
            <PillarCard icon={<Users className="w-6 h-6 text-green-600" />} title="EQ (Emotional Quotient)" description="Measures self-awareness, empathy, and social skills. The 'How you relate to others'." color="green" />
            <PillarCard icon={<Lock className="w-6 h-6 text-amber-600" />} title="VQ (Virtue Quotient)" description="Measures structural character, integrity under pressure, and moral alignment. The 'Who you are' when no one is watching." color="amber" />
          </div>
        </div>
        <div className="lg:col-span-1 bg-slate-50 p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><BarChart className="w-6 h-6 text-amber-600"/> VQ is Measurable</h3>
          <p className="text-slate-700 mb-6">
            VQ is not a vague concept. Dr. Lee's framework breaks character down into 5 measurable clusters, allowing individuals and organizations to assess and actively develop their moral strength.
          </p>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 flex-shrink-0" /> Integrity</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 flex-shrink-0" /> Courage</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 flex-shrink-0" /> Humility</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 flex-shrink-0" /> Justice</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 flex-shrink-0" /> Temperance</li>
          </ul>
          <div className="mt-8">
            <Button onClick={() => navigate('test')} variant="primary" className="w-full">Take the VQ Snapshot</Button>
          </div>
        </div>
      </div>

      <div className="bg-blue-900 text-white p-12 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-4">The VQ Problem: Why Good People Fail</h2>
        <p className="text-xl font-light mb-6">
          The core problem is **VQ Erosion**. In high-pressure, high-stakes environments, the structural integrity of character can wear down, leading to catastrophic ethical failures, even in people who started with good intentions.
        </p>
        <Button onClick={() => navigate('book')} variant="accent">Read the Solution in the Book <ArrowRight className="ml-2 w-5 h-5" /></Button>
      </div>
    </div>
  </div>
);

const Testimonial = ({ quote, author, title }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full">
    <Quote className="w-8 h-8 text-amber-400 mb-4 flex-shrink-0" />
    <p className="text-lg italic text-slate-700 mb-6 flex-grow leading-relaxed">"{quote}"</p>
    <div className="border-t border-slate-100 pt-4">
      <p className="font-bold text-slate-900">{author}</p>
      <p className="text-sm text-slate-500">{title}</p>
    </div>
  </div>
);

const PillarCard = ({ icon, title, description, color }) => (
  <div className={`flex items-start p-6 rounded-xl shadow-md border border-slate-100 bg-white hover:shadow-lg transition-shadow`}>
    <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-${color}-50 mr-4 flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-slate-700 pb-8 mb-8">
        <div>
          <h4 className="text-lg font-bold mb-4 text-amber-400">VQ</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">What is VQ?</a></li>
            <li><a href="#" className="hover:text-white transition-colors">The Book</a></li>
            <li><a href="#" className="hover:text-white transition-colors">VQ Snapshot</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Dr. Lee</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 text-amber-400">Resources</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Media Kit</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 text-amber-400">Connect</h4>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-lg font-bold mb-4 text-amber-400">Newsletter</h4>
          <p className="text-slate-400 mb-4">Get VQ insights delivered to your inbox.</p>
          <form className="flex">
            <input type="email" placeholder="Your email" className="p-3 rounded-l-md text-slate-900 w-full focus:outline-none" />
            <button type="submit" className="bg-amber-400 text-slate-900 p-3 rounded-r-md font-bold hover:bg-amber-500 transition-colors">Sign Up</button>
          </form>
        </div>
      </div>
      <div className="text-center text-sm text-slate-500 pt-4">
        &copy; {new Date().getFullYear()} Virtue Quotient. All rights reserved.
      </div>
    </div>
  </footer>
);

const Header = ({ navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: 'What is VQ?', path: 'what-is-vq' },
    { name: 'The Book', path: 'book' },
    { name: 'VQ Snapshot', path: 'test' },
    { name: 'About', path: 'about' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <button onClick={() => navigate('home')} className="text-2xl font-bold text-slate-900 tracking-tight">
              VQ<span className="text-amber-600">.</span>
            </button>
          </div>
          <nav className="hidden md:block">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="text-slate-600 hover:text-amber-600 font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
          <div className="hidden md:block">
            <Button onClick={() => navigate('test')} variant="accent" className="py-2 px-4 text-sm">
              Take the Snapshot
            </Button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setIsOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 px-3">
              <Button onClick={() => { navigate('test'); setIsOpen(false); }} variant="accent" className="w-full py-2">
                Take the Snapshot
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const AboutPage = ({ navigate }) => (
  <div className="py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start gap-16">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <img src={authorImage} alt="Dr. Rosa Lee" className="w-full h-full object-cover" />
          </div>
          <div className="mt-8 w-full max-w-sm space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Microscope className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <span className="font-medium text-slate-700">Physician (MD)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Briefcase className="w-6 h-6 text-green-600 flex-shrink-0" />
              <span className="font-medium text-slate-700">Entrepreneur</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <span className="font-medium text-slate-700">Author & Speaker</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Dr. Rosa Lee, MD</h1>
          <h2 className="text-2xl font-medium text-amber-600 mb-8">Founder of the Virtue Quotient Framework</h2>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Dr. Rosa Lee is a medical doctor by training, a successful entrepreneur, and a leading voice in the science of character and leadership. Her journey began in the high-stakes world of medicine, where she observed that the most brilliant and technically competent individuals were often the most vulnerable to ethical compromise under pressure. This led her to a decade of research into what truly sustains human greatness.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            She developed the Virtue Quotient (VQ) framework as a response to the incomplete models of IQ and EQ. VQ is her evidence-based system for measuring and cultivating the structural integrity of character—the capacity to make the right choice when it is the hardest choice.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed font-bold italic">
            "We have spent centuries perfecting the art of competence. It is time we dedicate ourselves to the science of conscience."
          </p>
          <h3 className="text-3xl font-bold text-slate-900 mt-10 mb-4">Key Areas of Focus</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FocusCard icon={<Microscope />} title="Character Science" description="Bridging ancient wisdom with modern neuroscience and psychology." />
            <FocusCard icon={<Briefcase />} title="Ethical Leadership" description="Training executives to build VQ-driven organizational cultures." />
            <FocusCard icon={<Mic />} title="Public Speaking" description="Keynotes on VQ, integrity, and sustainable success." />
            <FocusCard icon={<BookOpen />} title="Writing" description="Author of the groundbreaking book, Virtue Quotient." />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FocusCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-md border border-slate-100">
    <div className="text-blue-600 mb-3">{icon}</div>
    <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-600">{description}</p>
  </div>
);

const NotFoundPage = () => (
  <div className="py-40 text-center">
    <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
    <p className="text-2xl text-slate-600 mb-8">Page Not Found</p>
    <Button href="/" variant="primary">Go to Home</Button>
  </div>
);

// --- MAIN APP COMPONENT ---

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'book':
        return <BookPage navigate={navigate} />;
      case 'what-is-vq':
        return <WhatIsVQPage navigate={navigate} />;
      case 'test':
        return <VQQuickTest />;
      case 'about':
        return <AboutPage navigate={navigate} />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header navigate={navigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;