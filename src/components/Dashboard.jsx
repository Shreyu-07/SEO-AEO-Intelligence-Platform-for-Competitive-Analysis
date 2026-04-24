import React from 'react';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Radar, Doughnut, Line, PolarArea } from 'react-chartjs-2';
import { CheckCircle2, Target, Zap, TrendingUp, BarChart, ArrowUpRight } from 'lucide-react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

const Dashboard = ({ data }) => {
  const { analysis } = data;

  // Professional Chart Theme
  const chartDefaults = {
    radar: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderColor: '#000',
      borderWidth: 3,
      pointBackgroundColor: '#000',
      pointBorderColor: '#fff',
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    line: {
      borderColor: '#000',
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: '#000',
      backgroundColor: (context) => {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
        return gradient;
      }
    }
  };

  const radarData = {
    labels: ['SEO', 'AEO', 'SEMANTIC', 'HEALTH', 'INTENT'],
    datasets: [{
      label: 'Score',
      data: [analysis.seoScore, analysis.aeoScore, 85, 90, 78],
      ...chartDefaults.radar
    }]
  };

  const doughnutData = {
    labels: ['Informative', 'Transactional', 'Navigational'],
    datasets: [{
      data: [60, 25, 15],
      backgroundColor: ['#000', '#666', '#BBB'],
      hoverOffset: 10,
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const lineData = {
    labels: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'],
    datasets: [{
      label: 'Performance',
      data: [65, 80, 75, 90, 95],
      fill: true,
      ...chartDefaults.line,
      tension: 0.4
    }]
  };

  const polarData = {
    labels: ['Speed', 'Mobile', 'Security', 'Schema', 'Index'],
    datasets: [{
      data: [80, 95, 100, 70, 90],
      backgroundColor: ['#000', '#333', '#666', '#999', '#CCC'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: '#000',
        titleFont: { size: 14, weight: 'black' },
        bodyFont: { size: 12, weight: 'bold' },
        padding: 15,
        cornerRadius: 0,
        displayColors: false
      }
    }
  };

  const radialOptions = {
    ...baseOptions,
    scales: {
      r: {
        grid: { color: 'rgba(0,0,0,0.1)', lineWidth: 1 },
        angleLines: { color: 'rgba(0,0,0,0.1)' },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { 
          display: true, 
          stepSize: 20,
          backdropColor: 'transparent',
          color: '#888',
          font: { size: 9, weight: 'bold' }
        },
        pointLabels: {
          font: { size: 10, weight: 'black' },
          color: '#000',
          padding: 15
        }
      }
    }
  };

  const linearOptions = {
    ...baseOptions,
    scales: {
      x: { 
        display: true,
        grid: { display: false },
        ticks: { font: { size: 10, weight: 'bold' }, color: '#888' }
      },
      y: { 
        display: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { font: { size: 10, weight: 'bold' }, color: '#888' }
      }
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Executive Hero Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SEO SCORE - REFINED SIZE */}
        <div className="bw-card lg:col-span-1 !bg-black text-white flex flex-col items-center justify-center text-center overflow-hidden relative border-none py-12">
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4 block">SEO Health Index</span>
            <div className="text-8xl font-black tracking-tighter leading-none text-white">{analysis.seoScore}</div>
            <div className="flex items-center gap-2 mt-6 text-[9px] font-black uppercase tracking-widest text-white/60">
              <ArrowUpRight className="w-3 h-3" />
              Strategic Rating
            </div>
          </div>
          <div className="absolute right-[-20%] bottom-[-10%] text-white/5 rotate-12 pointer-events-none">
            <TrendingUp className="w-64 h-64" />
          </div>
        </div>

        {/* EXECUTIVE SUMMARY - REFINED SIZE & PROPER PADDING */}
        <div className="bw-card lg:col-span-2 flex flex-col justify-between border-2 border-black p-10 md:p-12">
          <div>
            <div className="flex justify-between items-start mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Audit Overview</span>
              <div className="px-4 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-widest">Executive Summary</div>
            </div>
            <p 
              className="text-xl md:text-2xl font-bold leading-relaxed text-black italic tracking-tight"
              dangerouslySetInnerHTML={{ 
                __html: analysis.competitorComparison.replace(/\*\*(.*?)\*\*/g, '<span className="font-black not-italic">$1</span>') 
              }}
            />
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex gap-16">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">AEO Index</span>
              <span className="text-4xl font-black italic tracking-tighter leading-none">{analysis.aeoScore}</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Integrity</span>
              <span className="text-4xl font-black italic tracking-tighter leading-none">94.8%</span>
            </div>
          </div>
        </div>

        {/* INTENT MATCH - REFINED SIZE */}
        <div className="bw-card lg:col-span-1 bg-white border border-gray-100 flex flex-col justify-center items-center text-center p-10">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
             <Target className="w-6 h-6" />
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 text-gray-400">User Intent</h4>
          <div className="text-4xl font-black uppercase italic tracking-tighter leading-none">High</div>
          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-4">Match Confidence</p>
        </div>
      </div>

      {/* Corporate Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="bw-card flex flex-col h-[420px] !p-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 mb-10 border-b-2 border-black pb-4">Growth Matrix</h4>
          <div className="flex-grow relative">
            <Radar key={`radar-${analysis.seoScore}`} data={radarData} options={radialOptions} />
          </div>
        </div>
        <div className="bw-card flex flex-col h-[420px] !p-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 mb-10 border-b-2 border-black pb-4">Performance Velocity</h4>
          <div className="flex-grow relative">
            <Line key={`line-${analysis.seoScore}`} data={lineData} options={linearOptions} />
          </div>
        </div>
        <div className="bw-card flex flex-col h-[420px] !p-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 mb-10 border-b-2 border-black pb-4">Segment Split</h4>
          <div className="flex-grow relative">
            <Doughnut key={`doughnut-${analysis.seoScore}`} data={doughnutData} options={baseOptions} />
          </div>
        </div>
        <div className="bw-card flex flex-col h-[420px] !p-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 mb-10 border-b-2 border-black pb-4">Core Health</h4>
          <div className="flex-grow relative">
            <PolarArea key={`polar-${analysis.seoScore}`} data={polarData} options={radialOptions} />
          </div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bw-card border-l-[16px] border-black">
          <h3 className="text-3xl font-black mb-12 flex items-center gap-5 uppercase italic tracking-tighter">
            <Zap className="w-8 h-8 fill-black" /> Competitive Advantages
          </h3>
          <div className="space-y-6">
            {analysis.strengths.map((s, i) => (
              <div key={i} className="flex items-center gap-6 p-8 bg-gray-50 border border-transparent hover:border-black transition-all">
                <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0" />
                <span className="text-base font-black uppercase tracking-tight italic">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bw-card border-l-[16px] border-black">
          <h3 className="text-3xl font-black mb-12 flex items-center gap-5 uppercase italic tracking-tighter">
            <BarChart className="w-8 h-8" /> Strategic Targets
          </h3>
          <div className="flex flex-wrap gap-5">
            {analysis.keywordOpportunities.map((k, i) => (
              <div key={i} className="px-8 py-5 border-2 border-black text-[13px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all cursor-default italic">
                {k}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
