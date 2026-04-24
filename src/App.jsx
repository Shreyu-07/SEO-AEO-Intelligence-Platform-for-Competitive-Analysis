import React, { useState } from 'react';
import axios from 'axios';
import { 
  Search, Loader2, AlertCircle, ChevronRight, 
  Zap, Activity, Shield, 
  Globe, BarChart2, Cpu, BookOpen, Code, Building2, ArrowLeft,
  Target, Layers, Database, Lock
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import AnalysisReport from './components/AnalysisReport';

const App = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState('home');

  const goHome = () => {
    setData(null);
    setError(null);
    setLoading(false);
    setCurrentPage('home');
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError(null);
    setData(null);
    setCurrentPage('home'); 
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const response = await axios.post(`${apiBase}/api/analyze`, { url });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Strategic scan interrupted. Please verify the target URL.');
    } finally {
      setLoading(false);
    }
  };

  const PageHeader = ({ title, icon: Icon }) => (
    <div className="py-12 md:py-20 border-b border-black mb-12 md:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={goHome}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:translate-x-[-4px] transition-transform mb-8 md:mb-12"
      >
        <ArrowLeft size={14} /> Back to Terminal
      </button>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
        <div className="p-4 md:p-6 bg-black text-white"><Icon size={32} className="md:w-12 md:h-12" /></div>
        <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter italic">{title}</h1>
      </div>
    </div>
  );

  const DocumentationPage = () => (
    <div className="max-w-4xl mx-auto pb-40 px-6">
      <PageHeader title="Documentation" icon={BookOpen} />
      <div className="space-y-16 md:space-y-24 text-gray-800">
        <section className="space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">01. Neural Scraping Engine</h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            Our proprietary crawler utilizes a headless browser environment to capture a high-fidelity snapshot of the target DOM. 
            It executes JavaScript to ensure all dynamically rendered content is analyzed.
          </p>
        </section>
        <section className="space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">02. AEO Scoring</h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            Evaluation of structured data and answerability based on neural engine protocols.
          </p>
        </section>
      </div>
    </div>
  );

  const ApiIntelPage = () => (
    <div className="max-w-4xl mx-auto pb-40 px-6">
      <PageHeader title="API Intel" icon={Code} />
      <div className="space-y-12 md:space-y-16">
        <div className="p-8 md:p-12 border-4 border-black bg-white">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic mb-4">Gemini 2.5 Flash</h2>
          <p className="text-lg md:text-xl font-bold italic text-gray-700">
            Low-latency semantic analysis and strategic reasoning.
          </p>
        </div>
      </div>
    </div>
  );

  const CorporatePage = () => (
    <div className="max-w-4xl mx-auto pb-40 px-6">
      <PageHeader title="Corporate" icon={Building2} />
      <div className="space-y-12 md:space-y-16">
        <div className="border-l-[12px] border-black pl-8 md:pl-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">The Mission.</h2>
          <p className="text-lg md:text-xl font-bold text-gray-600 mt-4 italic">
            Dominate the upcoming age of AI-driven search.
          </p>
        </div>
        <div className="pt-12 border-t-2 border-black">
          <span className="text-gray-400 uppercase tracking-[0.4em] text-[10px] font-black block mb-2">Engineering Lead</span>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Shreyas Shridhar Kulkarni</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white font-sans antialiased flex flex-col overflow-x-hidden">
      
      {/* ── PERMANENT NAVIGATION ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-black">
        <div className="max-w-[1400px] mx-auto h-20 md:h-24 flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-4 cursor-pointer" onClick={goHome}>
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-lg">G</div>
            <div className="flex flex-col -space-y-1">
              <span className="font-black uppercase tracking-tighter text-base md:text-xl">Intelligence</span>
              <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 italic">Strategic Platform</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-gray-300">System Ready</span>
              <Activity size={20} className={loading ? 'animate-pulse text-black' : 'text-gray-200'} />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full flex flex-col">
        {currentPage === 'documentation' ? <DocumentationPage /> :
         currentPage === 'api' ? <ApiIntelPage /> :
         currentPage === 'corporate' ? <CorporatePage /> : (
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
            {/* ── LANDING PAGE (ROOT) ── */}
            {!data && !loading && !error && (
              <div className="animate-in fade-in duration-1000">
                {/* Hero */}
                <div className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20">
                  <div className="mb-8 border-2 border-black px-6 py-2 text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em]">
                    Strategic Core v2.5
                  </div>
                  
                  <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
                    Deep <br/> Analysis.
                  </h1>

                  <div className="w-full max-w-4xl space-y-12 px-2">
                    <p className="text-sm md:text-xl font-bold max-w-2xl mx-auto leading-tight text-gray-400 uppercase tracking-tighter italic px-4">
                      High-fidelity SEO & AEO intelligence for high-stakes digital assets.
                    </p>

                    <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row border-[3px] border-black bg-white">
                      <div className="flex-grow flex items-center p-5 md:p-8 gap-4 md:gap-8 bg-white border-b-[3px] md:border-b-0 md:border-r-[3px] border-black">
                        <Search size={20} className="text-black flex-shrink-0 md:w-8 md:h-8" />
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="Target URL..."
                          className="w-full text-lg md:text-3xl font-black focus:outline-none placeholder:text-gray-100"
                          required
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="bg-black text-white px-8 py-5 md:px-16 md:py-8 text-lg md:text-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                        disabled={loading}
                      >
                        Analyze <Zap size={18} className="fill-current md:w-6 md:h-6" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Capabilities Grid (Landing Content) */}
                <div className="py-24 border-t border-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  {[
                    { title: "Neural Scraping", desc: "Proprietary DOM traversal for JS-heavy environments.", icon: <Layers size={24}/> },
                    { title: "Strategic SWOT", desc: "AI-driven opportunity mapping for market dominance.", icon: <Target size={24}/> },
                    { title: "AEO Optimization", desc: "Hardened data for Neural Answer Engines.", icon: <Database size={24}/> },
                    { title: "Secure Protocol", desc: "Confidential audit architecture with zero data leakage.", icon: <Lock size={24}/> }
                  ].map((cap, i) => (
                    <div key={i} className="space-y-6">
                      <div className="w-12 h-12 bg-black text-white flex items-center justify-center">{cap.icon}</div>
                      <h3 className="text-xl font-black uppercase tracking-tight italic">{cap.title}</h3>
                      <p className="text-sm font-bold text-gray-400 uppercase leading-relaxed tracking-tighter italic">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── LOADING STATE ── */}
            {loading && (
              <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-12 py-20 text-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-black/5 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Executing Scan</h3>
                  <p className="text-[10px] md:text-xs font-black text-gray-300 uppercase tracking-[0.4em] max-w-xs break-all mx-auto">{url}</p>
                </div>
              </div>
            )}

            {/* ── ERROR STATE ── */}
            {error && (
              <div className="max-w-4xl mx-auto my-12 md:my-32 border-[4px] border-black p-10 md:p-32 text-center space-y-12 animate-in zoom-in-95 duration-500">
                <AlertCircle size={48} className="mx-auto md:w-16 md:h-16" />
                <div className="space-y-6">
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Scan Halted</h3>
                  <p className="text-lg md:text-2xl font-bold text-gray-400 italic px-4">"{error}"</p>
                </div>
                <button 
                  onClick={() => { setUrl(''); setError(null); }}
                  className="w-full md:w-auto px-12 py-4 md:px-20 md:py-6 border-[3px] border-black text-lg md:text-xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Reset Platform
                </button>
              </div>
            )}

            {/* ── RESULTS VIEW ── */}
            {data && (
              <div className="py-8 md:py-16 space-y-12 md:space-y-16 animate-in fade-in duration-1000">
                <div className="flex flex-col md:flex-row items-center justify-between border-b-[4px] border-black pb-8 md:pb-12 gap-8 md:gap-10">
                  <div className="flex w-full md:w-auto border-2 border-black bg-white">
                    <button 
                      onClick={() => setActiveTab('overview')}
                      className={`flex-1 md:flex-none px-6 md:px-12 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    >
                      Overview
                    </button>
                    <button 
                      onClick={() => setActiveTab('details')}
                      className={`flex-1 md:flex-none px-6 md:px-12 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border-l-2 border-black ${activeTab === 'details' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    >
                      Report
                    </button>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 bg-black text-white px-6 md:px-8 py-4 md:py-5 border-2 border-black w-full md:w-auto overflow-hidden">
                    <Activity size={18} className="text-white animate-pulse flex-shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[9px] font-black uppercase opacity-40">Protocol</span>
                      <span className="text-xs md:text-sm font-mono font-black tracking-tight truncate">{data.url}</span>
                    </div>
                  </div>
                </div>

                <div className="pb-24 md:pb-32">
                  {activeTab === 'overview' ? <Dashboard data={data} /> : <AnalysisReport data={data} />}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-black text-white py-20 md:py-32 px-6 md:px-12 border-t-[10px] md:border-t-[20px] border-white">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-20">
          <div className="space-y-8 md:space-y-10 text-left">
            <div className="flex items-center gap-4 md:gap-6 cursor-pointer" onClick={goHome}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white text-black flex items-center justify-center font-black text-2xl md:text-4xl">G</div>
              <div className="flex flex-col -space-y-1 md:-space-y-2">
                <span className="text-xl md:text-3xl font-black uppercase tracking-tighter">Intelligence</span>
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] text-gray-600 italic">Strategic Platform</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm md:text-base font-bold max-w-md leading-tight uppercase tracking-tighter italic">
              Proprietary Strategic Analysis Engine. Engineered for high-fidelity search intelligence.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end space-y-8 w-full md:w-auto">
            <div className="flex flex-wrap justify-start md:justify-end gap-6 md:gap-12 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-gray-600">
              <button onClick={() => setCurrentPage('documentation')} className="hover:text-white transition-colors uppercase">Documentation</button>
              <button onClick={() => setCurrentPage('api')} className="hover:text-white transition-colors uppercase">API Intel</button>
              <button onClick={() => setCurrentPage('corporate')} className="hover:text-white transition-colors uppercase">Corporate</button>
            </div>
            <div className="text-left md:text-right">
              <span className="text-gray-700 uppercase tracking-[0.5em] text-[10px] font-black mb-3 md:mb-4 block">Engineering Lead</span>
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">Shreyas Shridhar Kulkarni</p>
            </div>
            <div className="pt-8 md:pt-12 border-t border-gray-900 w-full text-left md:text-right">
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">
                © 2026 All Rights Reserved | Love to Code
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;