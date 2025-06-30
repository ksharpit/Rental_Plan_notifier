import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, Users, UserPlus } from 'lucide-react';
import { Customer, CustomerSubscription, Plan } from '../types';
import { format, differenceInDays } from 'date-fns';

interface HomePageProps {
  customers: Customer[];
  subscriptions: CustomerSubscription[];
  plans: Plan[];
}

export function HomePage({ customers, subscriptions, plans }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<'expiring' | 'new'>('expiring');

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

  // Get newly onboarded customers (last 30 days)
  const getNewCustomers = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return customers
      .filter(customer => customer.createdAt >= thirtyDaysAgo)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map(customer => {
        const subscription = subscriptions.find(sub => sub.userId === customer.id && sub.status === 'active');
        const plan = subscription ? plans.find(p => p.id === subscription.planId) : null;
        return { customer, subscription, plan };
      });
  };

  const expiringCustomers = getExpiringCustomers();
  const newCustomers = getNewCustomers();

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-error-600">{expiringCustomers.length}</div>
          <div className="text-sm text-gray-600">Plans Expiring Soon</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-success-600">{newCustomers.length}</div>
          <div className="text-sm text-gray-600">New Customers (30d)</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <div className="flex">
          <button
            onClick={() => setActiveTab('expiring')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'expiring'
                ? 'bg-error-50 text-error-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertTriangle size={16} />
            <span>Expiring Plans</span>
            {expiringCustomers.length > 0 && (
              <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full">
                {expiringCustomers.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'new'
                ? 'bg-success-50 text-success-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserPlus size={16} />
            <span>New Customers</span>
            {newCustomers.length > 0 && (
              <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-full">
                {newCustomers.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'expiring' ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Plans Expiring Soon</h3>
          
          {expiringCustomers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-success-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">All Good!</h4>
              <p className="text-gray-500">No plans are expiring in the next 7 days</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expiringCustomers.map(({ customer, subscription, plan, daysLeft }) => (
                <div key={customer!.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{customer!.name}</h4>
                      <p className="text-sm text-gray-600">{customer!.phone}</p>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-700">{plan!.name}</span>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
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
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Recently Onboarded</h3>
          
          {newCustomers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus size={24} className="text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No New Customers</h4>
              <p className="text-gray-500">No customers have been onboarded in the last 30 days</p>
            </div>
          ) : (
            <div className="space-y-3">
              {newCustomers.map(({ customer, subscription, plan }) => (
                <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{customer.name}</h4>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Clock size={14} className="mr-1" />
                        <span>Joined: {format(customer.createdAt, 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {subscription && plan ? (
                        <div>
                          <div className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-xs font-medium">
                            {plan.name}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Until {format(subscription.endDate, 'MMM dd')}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                          No Active Plan
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}