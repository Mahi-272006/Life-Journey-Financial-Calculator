"use client";
import React, { useState } from 'react';
import { useCalculator } from '../hooks/use-calculator';
import { ResultsView } from '../components/ResultsView';
import { 
  Step1Goal, 
  Step2BasicInfo, 
  Step3Lifestyle, 
  Step4IncomeGrowth, 
  Step5Assumptions 
} from '../components/WizardSteps';

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const { state, updateState, results } = useCalculator();

  const handleSave = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state,
        futureGoalCost: results.futureGoalCost,
        requiredSip: results.requiredMonthlySIP,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Journey saved successfully!");
    } else {
      alert(data.error || "Failed to save journey");
    }

  } catch (error) {
    console.error("Backend connection error:", error);
    alert("⚠️ Cannot connect to backend server");
  }
};

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-verdana">
      {/* Header */}
      <header className="bg-white border-b p-6 text-center">
        <h1 className="text-3xl font-bold text-[#224c87] font-montserrat">Life Journey Financial Calculator</h1>
        <p className="text-[#919090] mt-2 font-medium">Explore how consistent investing may support your future.</p>
      </header>

      <div className="flex-grow p-4 md:p-8 flex items-center">
        <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#224c87]">
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-2 mb-8 rounded-full overflow-hidden">
            <div 
              className="bg-[#224c87] h-full transition-all duration-500" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>

          {/* Wizard Steps Logic */}
          <div className="min-h-[450px]">
            {step === 1 && <Step1Goal state={state} updateState={updateState} />}
            {step === 2 && <Step2BasicInfo state={state} updateState={updateState} />}
            {step === 3 && <Step3Lifestyle state={state} updateState={updateState} />}
            {step === 4 && <Step4IncomeGrowth state={state} updateState={updateState} />}
            {step === 5 && <Step5Assumptions state={state} updateState={updateState} />}
            {step === 6 && <ResultsView results={results} state={state} />}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-between border-t pt-6">
            {step > 1 && step < 6 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 rounded-xl border-2 font-bold text-[#919090] hover:bg-gray-50 transition-all"
              >
                Back
              </button>
            )}

            <div className="flex gap-4 ml-auto">
              {step < 5 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-10 py-3 rounded-xl bg-[#224c87] text-white font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
                >
                  Continue
                </button>
              ) : step === 5 ? (
                <button
                  onClick={() => setStep(6)}
                  className="px-10 py-3 rounded-xl bg-[#224c87] text-white font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
                >
                  View Results
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 rounded-xl bg-[#224c87] text-white font-bold shadow-lg hover:opacity-90 transition-all"
                  >
                    Save Results
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 rounded-xl bg-[#da3832] text-white font-bold shadow-lg hover:opacity-90 transition-all"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 p-8 border-t">
        <div className="max-w-2xl mx-auto text-[10px] text-[#919090] text-center leading-relaxed">
          This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns.
        </div>
      </footer>
      
    </main>
  );
}
