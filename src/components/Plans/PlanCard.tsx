import React from 'react';
import { Check, Star } from 'lucide-react';
import { Plan } from '../../types';

interface PlanCardProps {
  plan: Plan;
  isActive?: boolean;
  onSelect: (plan: Plan) => void;
}

export function PlanCard({ plan, isActive = false, onSelect }: PlanCardProps) {
  return (
    <div className={`relative rounded-xl border-2 p-6 transition-all ${
      plan.popular 
        ? 'border-primary-500 bg-primary-50' 
        : isActive
        ? 'border-success-500 bg-success-50'
        : 'border-gray-200 bg-white hover:border-primary-300'
    }`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Star size={14} className="mr-1" />
            Most Popular
          </div>
        </div>
      )}

      {isActive && (
        <div className="absolute -top-3 right-4">
          <div className="bg-success-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Check size={14} className="mr-1" />
            Active
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="text-3xl font-bold text-gray-900">
          ${plan.price}
          <span className="text-lg font-normal text-gray-600">/{plan.type}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check size={16} className="text-success-600 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        disabled={isActive}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isActive
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : plan.popular
            ? 'bg-primary-600 hover:bg-primary-700 text-white'
            : 'bg-gray-900 hover:bg-gray-800 text-white'
        }`}
      >
        {isActive ? 'Current Plan' : 'Select Plan'}
      </button>
    </div>
  );
}