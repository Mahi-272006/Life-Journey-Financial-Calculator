import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ResultsView = ({ results, state }) => {
  if (!results || !state) return <div className="p-8 text-center text-gray-400">Processing calculation...</div>;

  // Calculate Total Invested (Simplified for education)
  const years = state.targetAge - state.currentAge;
  const totalInvested = results.requiredMonthlySIP * 12 * years;

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#224c87] font-montserrat">Journey Summary</h2>
        <p className="text-[#919090] text-sm font-verdana">Visualizing your path to financial independence.</p>
      </div>

      {/* 4-Card Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Required SIP */}
        <div className="p-5 bg-[#224c87] text-white rounded-2xl shadow-lg border border-[#1a3a68]">
          <p className="text-[10px] uppercase tracking-wider opacity-80 font-verdana">Required Monthly SIP</p>
          <h3 className="text-3xl font-bold font-montserrat mt-1">
            ₹{Math.round(results.requiredMonthlySIP).toLocaleString()}
          </h3>
          <p className="text-[10px] mt-2 opacity-70">Starts today at age {state.currentAge}</p>
        </div>

        {/* Card 2: Estimated Goal Cost */}
        <div className="p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm">
          <p className="text-[10px] uppercase tracking-wider text-[#919090] font-verdana">Estimated Goal Cost (Future)</p>
          <h3 className="text-3xl font-bold text-[#224c87] font-montserrat mt-1">
            ₹{Math.round(results.futureGoalCost).toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#919090] mt-2 italic">Cost at age {state.targetAge} ({state.inflation}% inflation)</p>
        </div>

        {/* Card 3: Portfolio Value */}
        <div className="p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm">
          <p className="text-[10px] uppercase tracking-wider text-[#919090] font-verdana">Estimated Portfolio Value</p>
          <h3 className="text-3xl font-bold text-[#224c87] font-montserrat mt-1">
            ₹{Math.round(results.futureGoalCost).toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#919090] mt-2">Target corpus to be achieved</p>
        </div>

        {/* Card 4: Total Invested */}
        <div className="p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl">
          <p className="text-[10px] uppercase tracking-wider text-[#919090] font-verdana">Total Invested Amount</p>
          <h3 className="text-3xl font-bold text-gray-700 font-montserrat mt-1">
            ₹{Math.round(totalInvested).toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#919090] mt-2">Principal amount over {years} years</p>
        </div>
      </div>

      {/* The Growth Chart */}
      <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-[#224c87] mb-6 font-montserrat text-center">Projected Investment Growth</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { age: state.currentAge, val: 0 },
              { age: Math.floor(state.currentAge + (years * 0.4)), val: results.futureGoalCost * 0.15 },
              { age: Math.floor(state.currentAge + (years * 0.7)), val: results.futureGoalCost * 0.45 },
              { age: state.targetAge, val: results.futureGoalCost }
            ]}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#224c87" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#224c87" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="age" stroke="#919090" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Age', position: 'insideBottom', offset: -5, fontSize: 10 }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', fontFamily: 'Verdana' }}
                formatter={(value) => [`₹${Math.round(value).toLocaleString()}`, "Estimated Wealth"]}
              />
              <Area type="monotone" dataKey="val" stroke="#224c87" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Educational Tips */}
      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
        <p className="text-xs text-[#224c87] font-verdana text-center italic">
          "The power of compounding is most visible in the final years of your journey."
        </p>
      </div>
    </div>
  );
};