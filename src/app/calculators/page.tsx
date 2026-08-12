'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent } from 'lucide-react';

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<'roi' | 'emi' | 'yield'>('roi');

  // ROI State
  const [initialInvestment, setInitialInvestment] = useState<number>(10000000); // 1 Cr
  const [holdingYears, setHoldingYears] = useState<number>(5);
  const [appreciationRate, setAppreciationRate] = useState<number>(8.5); // %
  const [rentalYieldRate, setRentalYieldRate] = useState<number>(5.5); // %

  // EMI State
  const [loanAmount, setLoanAmount] = useState<number>(8000000); // 80 L
  const [interestRate, setInterestRate] = useState<number>(8.75); // %
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Yield State
  const [propertyPrice, setPropertyPrice] = useState<number>(12000000); // 1.2 Cr
  const [monthlyRent, setMonthlyRent] = useState<number>(65000);
  const [annualMaintenance, setAnnualMaintenance] = useState<number>(45000);

  // ROI Calculations
  const futureCapitalValue = initialInvestment * Math.pow(1 + appreciationRate / 100, holdingYears);
  const totalRentalIncome = initialInvestment * (rentalYieldRate / 100) * holdingYears;
  const totalRoiGain = (futureCapitalValue + totalRentalIncome) - initialInvestment;
  const totalRoiPercentage = (totalRoiGain / initialInvestment) * 100;

  // EMI Calculations
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const totalEmiPayment = emi * totalMonths;
  const totalInterest = totalEmiPayment - loanAmount;

  // Yield Calculations
  const grossAnnualRent = monthlyRent * 12;
  const grossYield = (grossAnnualRent / propertyPrice) * 100;
  const netAnnualRent = grossAnnualRent - annualMaintenance;
  const netYield = (netAnnualRent / propertyPrice) * 100;

  const formatCurrency = (val: number) => {
    if (isNaN(val)) return '₹0';
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title */}
      <div className="border-b border-[#E5E5E5] pb-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
          financial modeling tools
        </span>
        <h1 className="text-4xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
          investment research calculators
        </h1>
        <p className="text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
          Stress-test your underwriting assumptions. Model capital growth projections, monthly EMI debt obligations, and net rental yields.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-[#E5E5E5] space-x-6">
        <button
          onClick={() => setActiveTab('roi')}
          className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'roi' ? 'border-[#0A0A0A] text-[#0A0A0A]' : 'border-transparent text-[#6B6B6B] hover:text-[#0A0A0A]'
          }`}
        >
          ROI Projection
        </button>
        <button
          onClick={() => setActiveTab('emi')}
          className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'emi' ? 'border-[#0A0A0A] text-[#0A0A0A]' : 'border-transparent text-[#6B6B6B] hover:text-[#0A0A0A]'
          }`}
        >
          EMI & Debt Calculator
        </button>
        <button
          onClick={() => setActiveTab('yield')}
          className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'yield' ? 'border-[#0A0A0A] text-[#0A0A0A]' : 'border-transparent text-[#6B6B6B] hover:text-[#0A0A0A]'
          }`}
        >
          Rental Yield Estimator
        </button>
      </div>

      {/* Active Calculator Component */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Input Panel */}
        <div className="lg:col-span-7 bg-[#F9F9F9] border border-[#E5E5E5] p-8 space-y-6">
          {activeTab === 'roi' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase">roi & capital appreciation parameters</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Initial Capital Investment</span>
                  <span className="text-[#0A0A0A] font-data">{formatCurrency(initialInvestment)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={500000}
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Holding Horizon (Years)</span>
                  <span className="text-[#0A0A0A] font-data">{holdingYears} Years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={holdingYears}
                  onChange={(e) => setHoldingYears(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Expected Annual Appreciation (%)</span>
                  <span className="text-[#0A0A0A] font-data">{appreciationRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={25}
                  step={0.5}
                  value={appreciationRate}
                  onChange={(e) => setAppreciationRate(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Estimated Rental Yield (%)</span>
                  <span className="text-[#0A0A0A] font-data">{rentalYieldRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={0.25}
                  value={rentalYieldRate}
                  onChange={(e) => setRentalYieldRate(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>
            </div>
          )}

          {activeTab === 'emi' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase">mortgage emi parameters</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Loan Amount</span>
                  <span className="text-[#0A0A0A] font-data">{formatCurrency(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={50000000}
                  step={500000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Annual Interest Rate (%)</span>
                  <span className="text-[#0A0A0A] font-data">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={15}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Loan Tenure (Years)</span>
                  <span className="text-[#0A0A0A] font-data">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>
            </div>
          )}

          {activeTab === 'yield' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase">rental yield parameters</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Property Purchase Price</span>
                  <span className="text-[#0A0A0A] font-data">{formatCurrency(propertyPrice)}</span>
                </div>
                <input
                  type="range"
                  min={2000000}
                  max={100000000}
                  step={500000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Expected Monthly Rent</span>
                  <span className="text-[#0A0A0A] font-data">{formatCurrency(monthlyRent)} / mo</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B6B6B] uppercase font-mono">Annual Maintenance & Property Tax</span>
                  <span className="text-[#0A0A0A] font-data">{formatCurrency(annualMaintenance)} / yr</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200000}
                  step={5000}
                  value={annualMaintenance}
                  onChange={(e) => setAnnualMaintenance(Number(e.target.value))}
                  className="w-full accent-[#0A0A0A]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-5 bg-[#0A0A0A] text-white border border-[#0A0A0A] p-8 space-y-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A3A3A3] block">
            underwritten financial output
          </span>

          {activeTab === 'roi' && (
            <div className="space-y-6">
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#A3A3A3]">Total Projected Portfolio Value</span>
                <span className="text-3xl font-extrabold text-white font-data mt-1 block">
                  {formatCurrency(futureCapitalValue + totalRentalIncome)}
                </span>
              </div>

              <div className="pt-6 border-t border-[#262626] grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#A3A3A3]">Capital Growth</span>
                  <span className="text-base font-bold text-white font-data">{formatCurrency(futureCapitalValue - initialInvestment)}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#A3A3A3]">Cumulative Rent</span>
                  <span className="text-base font-bold text-white font-data">{formatCurrency(totalRentalIncome)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#262626]">
                <span className="block text-[10px] uppercase tracking-widest text-[#A3A3A3]">Total Net ROI</span>
                <span className="text-2xl font-bold text-[#1F5C3D] font-data">+{totalRoiPercentage.toFixed(1)}%</span>
              </div>
            </div>
          )}

          {activeTab === 'emi' && (
            <div className="space-y-6">
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#A3A3A3]">Monthly Debt Obligation (EMI)</span>
                <span className="text-3xl font-extrabold text-white font-data mt-1 block">
                  {formatCurrency(emi)} / mo
                </span>
              </div>

              <div className="pt-6 border-t border-[#262626] grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#A3A3A3]">Principal Amount</span>
                  <span className="text-base font-bold text-white font-data">{formatCurrency(loanAmount)}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#A3A3A3]">Total Interest Payable</span>
                  <span className="text-base font-bold text-white font-data">{formatCurrency(totalInterest)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#262626]">
                <span className="block text-[10px] uppercase tracking-widest text-[#A3A3A3]">Total Outflow over {tenureYears} Years</span>
                <span className="text-xl font-bold text-white font-data">{formatCurrency(totalEmiPayment)}</span>
              </div>
            </div>
          )}

          {activeTab === 'yield' && (
            <div className="space-y-6">
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#A3A3A3]">Net Annual Rental Yield</span>
                <span className="text-4xl font-extrabold text-[#1F5C3D] font-data mt-1 block">
                  {netYield.toFixed(2)}% p.a.
                </span>
              </div>

              <div className="pt-6 border-t border-[#262626] grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#A3A3A3]">Gross Annual Rent</span>
                  <span className="text-base font-bold text-white font-data">{formatCurrency(grossAnnualRent)}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#A3A3A3]">Gross Yield</span>
                  <span className="text-base font-bold text-white font-data">{grossYield.toFixed(2)}%</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#262626]">
                <span className="block text-[10px] uppercase tracking-widest text-[#A3A3A3]">Net Annual Cash Flow</span>
                <span className="text-xl font-bold text-white font-data">{formatCurrency(netAnnualRent)} / yr</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
