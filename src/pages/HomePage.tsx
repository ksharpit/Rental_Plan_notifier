import React from 'react';
import { Calendar, AlertTriangle, Users } from 'lucide-react';
import { Customer, CustomerSubscription, Plan } from '../types';
import { format, differenceInDays } from 'date-fns';

interface HomePageProps {
  customers: Customer[];
  subscriptions: CustomerSubscription[];
  plans: Plan[];
}

export function HomePage({ customers, subscriptions, plans }: HomePageProps) {
  // Get customers with expiring plans (sorted by expiry date)
  const getExpiringCustomers = () => {
    const now = new Date();
    return subscriptions
      .filter(sub => sub.status === 'active')
      .map(sub => {
        const customer = customers.find(c => c.id === sub.userId);
        const plan = plans.find(p => p.id === sub.planId);
        const daysLeft = differenceInDays(sub.endDate, now);
        return {
          customer,
          subscription: sub,
          plan,
          daysLeft,
          isExpiring: daysLeft <= 7 // Show customers expiring within 7 days
        };
      })
      .filter(item => item.customer && item.plan && item.isExpiring)
      .sort((a, b) => a.daysLeft - b.daysLeft);
  };

  const expiringCustomers = getExpiringCustomers();

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft < 0) return 'bg-error-100 text-error-700';
    if (daysLeft <= 1) return 'bg-error-100 text-error-700';
    if (daysLeft <= 3) return 'bg-warning-100 text-warning-700';
    return 'bg-warning-100 text-warning-700';
  };

  const getStatusText = (daysLeft: number) => {
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Expires Today';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-error-600">{expiringCustomers.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Plans Expiring Soon</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-success-600">{customers.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Customers</div>
        </div>
      </div>

      {/* Expiring Plans */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Plans Expiring Soon</h3>
        
        {expiringCustomers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
            <div className="w-16 h-16 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-success-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">All Good!</h4>
            <p className="text-gray-500 dark:text-gray-400">No plans are expiring in the next 7 days</p>
          </div>
        ) : (
          <div className="space-y-3">
            {expiringCustomers.map(({ customer, subscription, plan, daysLeft }) => (
              <div key={customer!.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{customer!.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{customer!.phone}</p>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{plan!.name}</span>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span>Expires: {format(subscription!.endDate, 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(daysLeft)}`}>
                      {getStatusText(daysLeft)}
                    </div>
                    {daysLeft <= 1 && (
                      <div className="mt-2">
                        <AlertTriangle size={16} className="text-error-500 mx-auto" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}