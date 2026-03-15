import { useState, useMemo } from "react";

const initialState = {
  goalType: "wealth",
  currentAge: 25,
  targetAge: 60,
  targetAmount: 500000,
  monthlyCapacity: 10000,
  expectedReturn: 12,

  lifestyle: "comfortable",
  inflation: 6,

  topUpEnabled: false,
  topUpPercent: 10,

  preRetReturn: 12,
  postRetReturn: 8
};

export function useCalculator() {
  const [state, setState] = useState(initialState);

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const results = useMemo(() => {
    const years = state.targetAge - state.currentAge;
    const monthlyRate = state.expectedReturn / 100 / 12;

    const inflationAdjustedGoal =
      state.targetAmount * Math.pow(1 + state.inflation / 100, years);

    let sip = state.monthlyCapacity;
    let corpus = 0;

    const timeline = [];

    for (let y = 0; y < years; y++) {
      for (let m = 0; m < 12; m++) {
        corpus = (corpus + sip) * (1 + monthlyRate);
      }

      timeline.push({
        age: state.currentAge + y + 1,
        value: corpus,
      });

      if (state.topUpEnabled) {
        sip = sip * (1 + state.topUpPercent / 100);
      }
    }

    return {
      futureGoalCost: inflationAdjustedGoal,
      portfolioValue: corpus,
      requiredMonthlySIP: state.monthlyCapacity,
      timeline,
    };
  }, [state]);

  return { state, updateState, results };
}
