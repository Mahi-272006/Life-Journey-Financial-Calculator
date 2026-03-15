import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const ResultsView = ({ results, state }) => {
  if (!results || !state)
    return (
      <div className="p-8 text-center text-gray-400">
        Processing calculation...
      </div>
    );

  const years = state.targetAge - state.currentAge;
  const totalInvested = results.requiredMonthlySIP * 12 * years;

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#224c87] font-montserrat">
          Journey Summary
        </h2>
        <p className="text-[#919090] text-sm font-verdana">
          Visualizing your path to financial independence.
        </p>
      </div>

      {/* RESULT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="p-5 bg-[#224c87] text-white rounded-2xl shadow-lg">
          <p className="text-[10px] uppercase opacity-80 font-verdana">
            Required Monthly SIP
          </p>
          <h3 className="text-3xl font-bold font-montserrat mt-1">
            ₹{Math.round(results.requiredMonthlySIP).toLocaleString()}
          </h3>
          <p className="text-[10px] mt-2 opacity-70">
            Starts today at age {state.currentAge}
          </p>
        </div>

        <div className="p-5 bg-white border rounded-2xl shadow-sm">
          <p className="text-[10px] uppercase text-[#919090] font-verdana">
            Estimated Goal Cost (Future)
          </p>
          <h3 className="text-3xl font-bold text-[#224c87] font-montserrat mt-1">
            ₹{Math.round(results.futureGoalCost).toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#919090] mt-2 italic">
            Cost at age {state.targetAge} ({state.inflation}% inflation)
          </p>
        </div>

        <div className="p-5 bg-white border rounded-2xl shadow-sm">
          <p className="text-[10px] uppercase text-[#919090] font-verdana">
            Estimated Portfolio Value
          </p>
          <h3 className="text-3xl font-bold text-[#224c87] font-montserrat mt-1">
            ₹{Math.round(results.portfolioValue).toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#919090] mt-2">
            Estimated wealth at goal age
          </p>
        </div>

        <div className="p-5 bg-gray-50 border rounded-2xl">
          <p className="text-[10px] uppercase text-[#919090] font-verdana">
            Total Invested
          </p>
          <h3 className="text-3xl font-bold text-gray-700 font-montserrat mt-1">
            ₹{Math.round(totalInvested).toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#919090] mt-2">
            Principal invested over {years} years
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="p-6 bg-white rounded-3xl border shadow-sm">
        <h4 className="text-sm font-bold text-[#224c87] mb-6 text-center">
          Projected Investment Growth
        </h4>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={results.timeline}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#224c87" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#224c87" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#224c87"
                fill="url(#colorVal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TIP */}
      <div className="bg-blue-50 p-4 rounded-xl">
        <p className="text-xs text-[#224c87] text-center italic">
          The power of compounding becomes strongest in the final years.
        </p>
      </div>
    </div>
  );
};
