import React from 'react';
import { Calendar, Clock, AlertTriangle, IndianRupee } from 'lucide-react';
import { Subscription, Plan } from '../../types';
import { format, differenceInDays } from 'date-fns';

interface SubscriptionCardProps {
  subscription: Subscription;
  plan: Plan;
  onRenew: () => void;
}

export function SubscriptionCard({ subscription, plan, onRenew }: SubscriptionCardProps) {
  const daysLeft = differenceInDays(subscription.endDate, new Date());
  const isExpiringSoon = daysLeft <= 3;
  const isExpired = daysLeft < 0;

  return (
    <div className={`rounded-xl shadow-sm border p-4 mb-6 ${
      isExpired ? 'bg-error-50 border-error-200' : 
      isExpiringSoon ? 'bg-warning-50 border-warning-200' : 
      'bg-white border-gray-100'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <IndianRupee size={14} />
            <span>{plan.price.toLocaleString()}/{plan.type}</span>
          </div>
        </div>
        
        {(isExpiringSoon || isExpired) && (
          <div className={`p-2 rounded-full ${
            isExpired ? 'bg-error-100' : 'bg-warning-100'
          }`}>
            <AlertTriangle className={`${
              isExpired ? 'text-error-600' : 'text-warning-600'
            }`} size={16} />
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span>Expires: {format(subscription.endDate, 'MMM dd, yyyy')}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Clock size={16} className="mr-2" />
          <span className={`${
            isExpired ? 'text-error-600 font-medium' : 
            isExpiringSoon ? 'text-warning-600 font-medium' : 
            'text-gray-600'
          }`}>
            {isExpired ? 'Expired' : 
             daysLeft === 0 ? 'Expires today' :
             daysLeft === 1 ? '1 day left' : 
             `${daysLeft} days left`}
          </span>
        </div>
      </div>

      {(isExpiringSoon || isExpired) && (
        <button
          onClick={onRenew}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isExpired 
              ? 'bg-error-600 hover:bg-error-700 text-white'
              : 'bg-warning-600 hover:bg-warning-700 text-white'
          }`}
        >
          {isExpired ? 'Reactivate Plan' : 'Renew Now'}
        </button>
      )}
    </div>
  );
}