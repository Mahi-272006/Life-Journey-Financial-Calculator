import { useState, useMemo } from "react";

const initialState = {
  goalType: "wealth",
  currentAge: 30,
  targetAge: 60,
  targetAmount: 50000, 
  monthlyCapacity: 10000,
  expectedReturn: 12,
  lifestyle: "comfortable",
  topUpEnabled: false,
  topUpPercent: 10,
  inflation: 6,
  preRetReturn: 12,
  postRetReturn: 8,
  retDuration: 20,
};

export function useCalculator() {
  const [state, setState] = useState(initialState);

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const results = useMemo(() => {
    const {
      currentAge, targetAge, targetAmount, 
      topUpEnabled, topUpPercent, inflation, preRetReturn 
    } = state;

    const yearsToGoal = Math.max(1, targetAge - currentAge);
    const monthsToGoal = yearsToGoal * 12;
    const preRetMonthlyRate = (preRetReturn / 100) / 12;

    // Calculate Future Goal Cost adjusted for inflation
    const futureGoalCost = targetAmount * Math.pow(1 + inflation / 100, yearsToGoal);

    // Binary Search to find exact Required SIP with top-ups
    let requiredMonthlySIP = 0;
    let low = 0;
    let high = futureGoalCost; 
    
    for (let i = 0; i < 50; i++) {
      const mid = (low + high) / 2;
      let testValue = 0;
      let testSip = mid;
      
      for (let y = 0; y < yearsToGoal; y++) {
        for (let m = 0; m < 12; m++) {
          testValue = (testValue + testSip) * (1 + preRetMonthlyRate);
        }
        if (topUpEnabled) testSip *= (1 + topUpPercent / 100);
      }
      
      if (testValue < futureGoalCost) low = mid;
      else high = mid;
      requiredMonthlySIP = mid;
    }

    return { futureGoalCost, requiredMonthlySIP };
  }, [state]);

  return { state, updateState, results };
}