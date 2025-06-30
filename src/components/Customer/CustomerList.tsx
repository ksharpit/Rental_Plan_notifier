import React from 'react';
import { User, Calendar, Phone, Mail, Clock, IndianRupee } from 'lucide-react';
import { Customer, CustomerSubscription } from '../../types';
import { format, differenceInDays } from 'date-fns';

interface CustomerListProps {
  customers: Customer[];
  subscriptions: CustomerSubscription[];
  onCustomerSelect?: (customer: Customer) => void;
}

export function CustomerList({ customers, subscriptions, onCustomerSelect }: CustomerListProps) {
  const getCustomerSubscription = (customerId: string) => {
    return subscriptions.find(sub => sub.userId === customerId && sub.status === 'active');
  };

  const getSubscriptionStatus = (subscription: CustomerSubscription) => {
    const daysLeft = differenceInDays(subscription.endDate, new Date());
    
    if (daysLeft < 0) return { status: 'expired', color: 'error', text: 'Expired' };
    if (daysLeft <= 3) return { status: 'expiring', color: 'warning', text: `${daysLeft} days left` };
    return { status: 'active', color: 'success', text: `${daysLeft} days left` };
  };

  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
        <p className="text-gray-500">Add your first customer to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {customers.map((customer) => {
        const subscription = getCustomerSubscription(customer.id);
        const subscriptionStatus = subscription ? getSubscriptionStatus(subscription) : null;

        return (
          <div
            key={customer.id}
            onClick={() => onCustomerSelect?.(customer)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Mail size={14} className="mr-1" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Phone size={14} className="mr-1" />
                  <span>{customer.phone}</span>
                </div>
              </div>
              
              {subscription && subscriptionStatus && (
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  subscriptionStatus.color === 'success' ? 'bg-success-100 text-success-700' :
                  subscriptionStatus.color === 'warning' ? 'bg-warning-100 text-warning-700' :
                  'bg-error-100 text-error-700'
                }`}>
                  {subscriptionStatus.text}
                </div>
              )}
            </div>

            {subscription ? (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{subscription.planName}</span>
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <IndianRupee size={14} />
                    <span>{subscription.planPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-1" />
                  <span>
                    {format(subscription.startDate, 'MMM dd')} - {format(subscription.endDate, 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">No active subscription</p>
              </div>
            )}

            <div className="flex items-center text-xs text-gray-500 mt-3">
              <Clock size={12} className="mr-1" />
              <span>Added {format(customer.createdAt, 'MMM dd, yyyy')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}