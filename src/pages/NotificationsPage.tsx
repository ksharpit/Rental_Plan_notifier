import React from 'react';
import { Bell, AlertTriangle, Calendar, Phone, IndianRupee } from 'lucide-react';
import { Customer, CustomerSubscription } from '../types';
import { format, differenceInDays } from 'date-fns';

interface NotificationsPageProps {
  customers: Customer[];
  subscriptions: CustomerSubscription[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationsPage({ customers, subscriptions, onMarkAsRead, onClearAll }: NotificationsPageProps) {
  // Get customers with expiring plans
  const getExpiringCustomers = () => {
    const now = new Date();
    return subscriptions
      .filter(sub => sub.status === 'active')
      .map(sub => {
        const customer = customers.find(c => c.id === sub.userId);
        const daysLeft = differenceInDays(sub.endDate, now);
        return {
          customer,
          subscription: sub,
          daysLeft,
          isExpiring: daysLeft <= 7 // Show customers expiring within 7 days
        };
      })
      .filter(item => item.customer && item.isExpiring)
      .sort((a, b) => a.daysLeft - b.daysLeft);
  };

  const expiringCustomers = getExpiringCustomers();

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft < 0) return 'border-error-200 bg-error-50';
    if (daysLeft <= 1) return 'border-error-200 bg-error-50';
    if (daysLeft <= 3) return 'border-warning-200 bg-warning-50';
    return 'border-warning-200 bg-warning-50';
  };

  const getStatusText = (daysLeft: number) => {
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Expires Today';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };

  const getUrgencyIcon = (daysLeft: number) => {
    if (daysLeft <= 1) {
      return <AlertTriangle className="text-error-600" size={20} />;
    }
    return <AlertTriangle className="text-warning-600" size={20} />;
  };

  return (
    <div className="space-y-6">
      {expiringCustomers.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts</h3>
          <p className="text-gray-500">All customer plans are active with no upcoming expirations.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Plan Expiry Alerts</h2>
              <p className="text-gray-600">Customers with plans expiring soon</p>
            </div>
            
            {expiringCustomers.length > 0 && (
              <div className="bg-error-100 text-error-700 px-3 py-1 rounded-full text-sm font-medium">
                {expiringCustomers.length} Alert{expiringCustomers.length > 1 ? 's' : ''}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {expiringCustomers.map(({ customer, subscription, daysLeft }) => (
              <div
                key={customer!.id}
                className={`rounded-xl border-2 p-4 ${getStatusColor(daysLeft)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getUrgencyIcon(daysLeft)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {customer!.name}
                        </h4>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Phone size={14} className="mr-1" />
                          <span>{customer!.phone}</span>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        daysLeft < 0 ? 'bg-error-100 text-error-700' :
                        daysLeft <= 1 ? 'bg-error-100 text-error-700' :
                        'bg-warning-100 text-warning-700'
                      }`}>
                        {getStatusText(daysLeft)}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{subscription.planName}</span>
                        <div className="flex items-center text-sm font-medium text-gray-700">
                          <IndianRupee size={14} />
                          <span>{subscription.planPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          Expires: {format(subscription.endDate, 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 text-sm">
                      {daysLeft < 0 ? (
                        <p className="text-error-700 font-medium">
                          ⚠️ Plan has expired! Contact customer for renewal.
                        </p>
                      ) : daysLeft === 0 ? (
                        <p className="text-error-700 font-medium">
                          🚨 Plan expires today! Urgent renewal required.
                        </p>
                      ) : daysLeft <= 1 ? (
                        <p className="text-error-700 font-medium">
                          ⏰ Plan expires in {daysLeft} day! Contact customer immediately.
                        </p>
                      ) : (
                        <p className="text-warning-700 font-medium">
                          📞 Contact customer for plan renewal in {daysLeft} days.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary-50 rounded-xl p-4 border border-primary-200">
            <h4 className="font-semibold text-primary-900 mb-2">Renewal Reminders</h4>
            <ul className="text-sm text-primary-800 space-y-1">
              <li>• Contact customers 7 days before expiry</li>
              <li>• Send urgent reminders 1-3 days before expiry</li>
              <li>• Follow up immediately on expiry day</li>
              <li>• Offer renewal incentives for expired plans</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}