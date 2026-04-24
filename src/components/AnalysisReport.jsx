import React from 'react';
import { Layout, MessageSquare, ListTree, Globe, Search, Target, FileText, ChevronRight } from 'lucide-react';

const AnalysisReport = ({ data }) => {
  const { analysis, scrapedData } = data;

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 max-w-[1400px] mx-auto">
      {/* High-Fidelity Intelligence Header */}
      <div className="bg-white border border-gray-100 p-12 md:p-20 shadow-sm relative overflow-hidden rounded-xl">
        <div className="absolute top-0 right-0 p-8 text-gray-50 opacity-20 hidden md:block">
           <Globe className="w-64 h-64" />
        </div>
        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
             Technical Audit Phase
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none text-gray-900">
            Semantic Intelligence <br/> Deep-Scan
          </h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Proprietary breakdown of the domain's semantic architecture and AEO readiness index. 
            Audited via Gemini 2.5 Strategic Core.
          </p>
        </div>
      </div>

      {/* Corporate AEO Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Answerability Index", icon: <Search />, content: analysis.aeoInsights.answerability },
          { label: "Schema & Structure", icon: <ListTree />, content: analysis.aeoInsights.structuredData },
          { label: "Intent Alignment", icon: <Target />, content: analysis.aeoInsights.intentAlignment }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-8 shadow-sm rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-50 text-gray-400 rounded-lg">{item.icon}</div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{item.label}</h4>
            </div>
            <p className="text-lg font-bold text-gray-700 leading-snug">
              {item.content || "Deep analysis pending..."}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Technical Inventory */}
        <div className="lg:col-span-3 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-4">Metadata Inventory</h3>
          <div className="bg-white border border-gray-100 p-8 md:p-12 shadow-sm rounded-xl space-y-10">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Document Title</span>
              <p className="text-2xl font-bold text-gray-800 tracking-tight leading-tight">{scrapedData.title}</p>
            </div>
            
            <div className="space-y-3 pt-8 border-t border-gray-50">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Description Meta</span>
              <p className="text-lg font-medium text-gray-500 leading-relaxed italic">
                {scrapedData.description || 'No description meta detected.'}
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-gray-50">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Heading Architecture</span>
              <div className="space-y-4">
                {scrapedData.headings.h1.map((h, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="px-2 py-1 bg-black text-white text-[9px] font-black h-fit rounded">H1</div>
                    <p className="font-bold text-gray-700">{h}</p>
                  </div>
                ))}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scrapedData.headings.h2.slice(0, 4).map((h, i) => (
                    <div key={i} className="p-4 border border-gray-100 rounded-lg flex gap-3 items-start">
                      <div className="px-2 py-1 bg-gray-200 text-gray-600 text-[9px] font-black rounded">H2</div>
                      <p className="text-sm font-semibold text-gray-600 line-clamp-2">{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-4">Strategic Roadmap</h3>
          <div className="space-y-4">
            {analysis.recommendations.map((rec, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:border-black transition-all group flex gap-6 items-start">
                <div className="text-4xl font-black text-gray-100 group-hover:text-black transition-colors leading-none">
                  {i + 1}
                </div>
                <div className="space-y-3">
                  <div className="w-8 h-1 bg-gray-100 group-hover:bg-black transition-all"></div>
                  <p 
                    className="text-lg font-bold text-gray-700 leading-tight"
                    dangerouslySetInnerHTML={{ 
                      __html: rec.replace(/\*\*(.*?)\*\*/g, '<span className="font-black text-black">$1</span>') 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
