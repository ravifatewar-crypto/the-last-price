import React from 'react';
import { OpportunityCategory } from '@/types';

interface BadgeProps {
  category: OpportunityCategory | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CategoryBadge: React.FC<BadgeProps> = ({ category, size = 'md', className = '' }) => {
  const normCategory = String(category).toUpperCase();

  let label = 'New Investment Opportunity';
  let badgeStyle = 'bg-[#1F5C3D] text-white'; // Deep green

  if (normCategory === 'RE_INVESTMENT' || normCategory === 'RE-INVESTMENT') {
    label = 'Re-Investment';
    badgeStyle = 'bg-[#B08D3F] text-white'; // Muted Amber
  } else if (normCategory === 'MISSED' || normCategory === 'MISSED OPPORTUNITY') {
    label = 'Missed Opportunity';
    badgeStyle = 'bg-[#6B6B6B] text-white'; // Muted Grey
  }

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-medium tracking-wide uppercase',
    md: 'text-xs px-2.5 py-1 font-medium tracking-wide uppercase',
    lg: 'text-sm px-3.5 py-1.5 font-medium tracking-wide uppercase',
  };

  return (
    <span
      className={`inline-flex items-center rounded-none font-sans ${badgeStyle} ${sizeStyles[size]} ${className}`}
      style={{ letterSpacing: '0.05em' }}
    >
      {label}
    </span>
  );
};
