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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Plans</h2>
        <p className="text-gray-600 dark:text-gray-400">Affordable bike rental plans for everyone</p>
      </div>

      {/* Service Charge Notice */}
      <div className="bg-primary-50 dark:bg-primary-900 rounded-xl p-4 border border-primary-200 dark:border-primary-700">
        <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">One-time Setup Fee</h4>
        <p className="text-sm text-primary-800 dark:text-primary-200">
          ₹500 one-time service charge applies during customer onboarding for account setup and bike allocation.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Plans</h3>
        <div className="grid gap-4">
          {weeklyPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isActive={activeSubscription?.planId === plan.id}
              onSelect={onSelectPlan}
              showSelectButton={false}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Plans</h3>
        <div className="grid gap-4">
          {monthlyPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isActive={activeSubscription?.planId === plan.id}
              onSelect={onSelectPlan}
              showSelectButton={false}
            />
          ))}
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-primary-900 rounded-xl p-4 border border-primary-200 dark:border-primary-700">
        <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">Why Choose Our Plans?</h4>
        <ul className="text-sm text-primary-800 dark:text-primary-200 space-y-1">
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