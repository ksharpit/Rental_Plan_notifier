import React from 'react';
import { PlanCard } from '../components/Plans/PlanCard';
import { Plan, Subscription } from '../types';

interface PlansPageProps {
  plans: Plan[];
  activeSubscription?: Subscription;
  onSelectPlan: (plan: Plan) => void;
}

export function PlansPage({ plans, activeSubscription, onSelectPlan }: PlansPageProps) {
  const weeklyPlans = plans.filter(plan => plan.type === 'weekly');
  const monthlyPlans = plans.filter(plan => plan.type === 'monthly');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Select the perfect plan for unlimited bike rides</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Plans</h3>
        <div className="grid gap-4">
          {weeklyPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isActive={activeSubscription?.planId === plan.id}
              onSelect={onSelectPlan}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Plans</h3>
        <div className="grid gap-4">
          {monthlyPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isActive={activeSubscription?.planId === plan.id}
              onSelect={onSelectPlan}
            />
          ))}
        </div>
      </div>

      <div className="bg-primary-50 rounded-xl p-4 border border-primary-200">
        <h4 className="font-semibold text-primary-900 mb-2">Why Choose Our Plans?</h4>
        <ul className="text-sm text-primary-800 space-y-1">
          <li>• Unlimited minutes and kilometers</li>
          <li>• No hidden fees or charges</li>
          <li>• Cancel anytime with no penalties</li>
          <li>• Access to premium electric bikes</li>
          <li>• Battery swap stations included</li>
          <li>• 24/7 customer support</li>
          <li>• Mobile app with real-time tracking</li>
        </ul>
      </div>
    </div>
  );
}