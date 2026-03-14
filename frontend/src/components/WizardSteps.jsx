import React from "react";
import { Home, GraduationCap, Plane, TreePalm, TrendingUp } from "lucide-react";
import { cn } from "../lib/utils";

// --- STEP 1: GOAL SELECTION ---
export const Step1Goal = ({ state, updateState }) => {
  const goals = [
    { id: "home", title: "Buy a Home", icon: Home, desc: "Estimate investments required to reach your goal." },
    { id: "education", title: "Education", icon: GraduationCap, desc: "Plan for your future educational expenses." },
    { id: "travel", title: "Travel", icon: Plane, desc: "Explore how to fund your next big adventure." },
    { id: "retirement", title: "Retirement", icon: TreePalm, desc: "Plan for a comfortable life after work." },
    { id: "wealth", title: "Build Wealth", icon: TrendingUp, desc: "Grow your portfolio over the long term." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#224c87] font-montserrat">Choose Financial Goal</h2>
        <p className="text-[#919090] text-sm font-verdana">Select one of the goals below to start your journey.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        {goals.map((g) => {
          const Icon = g.icon;
          const isSelected = state.goalType === g.id;
          return (
            <button
              key={g.id}
              onClick={() => updateState({ goalType: g.id })}
              className={cn(
                "group flex items-center p-6 rounded-xl border-2 transition-all duration-200 text-left",
                isSelected ? "border-[#224c87] bg-blue-50/50" : "border-gray-100 bg-white hover:border-gray-200"
              )}
            >
              <div className={cn("p-3 rounded-full mr-4", isSelected ? "bg-[#224c87] text-white" : "bg-gray-50 text-[#919090]")}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#224c87] font-montserrat">{g.title}</h3>
                <p className="text-xs text-[#919090] font-verdana">{g.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- STEP 2: BASIC INFO ---
export const Step2BasicInfo = ({ state, updateState }) => {
  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#224c87] font-montserrat">Basic Information</h2>
      </div>
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 font-verdana">Current Age</label>
          <input
            type="number"
            value={state.currentAge}
            onChange={(e) => updateState({ currentAge: Number(e.target.value) })}
            className="w-full p-3 border-b-2 border-gray-200 focus:border-[#224c87] outline-none font-verdana"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 font-verdana">Goal/Retirement Age</label>
          <input
            type="number"
            value={state.targetAge}
            onChange={(e) => updateState({ targetAge: Number(e.target.value) })}
            className="w-full p-3 border-b-2 border-gray-200 focus:border-[#224c87] outline-none font-verdana"
          />
        </div>
      </div>
    </div>
  );
};

// --- STEP 3: LIFESTYLE ---
export const Step3Lifestyle = ({ state, updateState }) => {
  const lifestyles = [
    { id: 'simple', title: 'Simple', desc: 'Basic needs and minimal discretionary spending.' },
    { id: 'comfortable', title: 'Comfortable', desc: 'Balanced lifestyle with regular leisure.' },
    { id: 'luxury', title: 'Luxury', desc: 'Premium services and high-end experiences.' }
  ];
  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#224c87] font-montserrat">Lifestyle Preference</h2>
      </div>
      <div className="max-w-md mx-auto space-y-4">
        {lifestyles.map((l) => (
          <label key={l.id} className={cn("flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all", state.lifestyle === l.id ? "border-[#224c87] bg-blue-50" : "border-gray-100")}>
            <input type="radio" className="mt-1.5 h-4 w-4 accent-[#224c87]" checked={state.lifestyle === l.id} onChange={() => updateState({ lifestyle: l.id })} />
            <div className="ml-4">
              <span className="block font-bold text-[#224c87] font-montserrat">{l.title}</span>
              <span className="text-xs text-[#919090] font-verdana">{l.desc}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

// --- STEP 4: INCOME GROWTH ---
export const Step4IncomeGrowth = ({ state, updateState }) => {
  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#224c87] font-montserrat">Income Growth</h2>
      </div>
      <div className="max-w-md mx-auto p-6 border-2 rounded-2xl border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#224c87] font-montserrat">Annual Step-Up SIP</h3>
            <p className="text-xs text-[#919090] font-verdana">Increase investment as income grows</p>
          </div>
          <button 
            onClick={() => updateState({ topUpEnabled: !state.topUpEnabled })}
            className={cn("w-12 h-6 rounded-full transition-colors relative", state.topUpEnabled ? "bg-[#224c87]" : "bg-gray-300")}
          >
            <div className={cn("absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform", state.topUpEnabled ? "translate-x-6" : "translate-x-0")} />
          </button>
        </div>
        {state.topUpEnabled && (
          <div className="mt-6 space-y-4 pt-6 border-t border-gray-50">
            <label className="block text-sm font-bold text-[#224c87] font-verdana">Annual Increase: {state.topUpPercent}%</label>
            <input type="range" min="0" max="20" value={state.topUpPercent} onChange={(e) => updateState({ topUpPercent: Number(e.target.value) })} className="w-full accent-[#224c87]" />
          </div>
        )}
      </div>
    </div>
  );
};
export const Step5Assumptions = ({ state, updateState }) => {
  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#224c87] font-montserrat">Investment Assumptions</h2>
        <p className="text-[#919090] text-sm font-verdana">Fine-tune the variables used for your projection.</p>
      </div>

      <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-2xl space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#224c87] mb-1">Inflation Rate (%)</label>
            <input 
              type="number" 
              value={state.inflation} 
              onChange={(e) => updateState({ inflation: Number(e.target.value) })}
              className="w-full p-2 border-b border-gray-300 focus:border-[#224c87] outline-none bg-transparent font-verdana"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-[#224c87] mb-1">Pre-Retirement Return (%)</label>
            <input 
              type="number" 
              value={state.preRetReturn} 
              onChange={(e) => updateState({ preRetReturn: Number(e.target.value) })}
              className="w-full p-2 border-b border-gray-300 focus:border-[#224c87] outline-none bg-transparent font-verdana"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#224c87] mb-1">Post-Retirement Return (%)</label>
            <input 
              type="number" 
              value={state.postRetReturn} 
              onChange={(e) => updateState({ postRetReturn: Number(e.target.value) })}
              className="w-full p-2 border-b border-gray-300 focus:border-[#224c87] outline-none bg-transparent font-verdana"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
           <p className="text-[10px] text-[#919090] leading-tight italic">
             Adjusting these rates will significantly impact the required monthly investment.
           </p>
        </div>
      </div>
    </div>
  );
};