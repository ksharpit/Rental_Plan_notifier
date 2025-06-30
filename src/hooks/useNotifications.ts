import { useState, useEffect } from 'react';
import { CustomerSubscription } from '../types';
import { differenceInDays } from 'date-fns';

export function useNotifications(subscriptions: CustomerSubscription[]) {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const checkSubscriptionExpiry = () => {
      const now = new Date();
      let alertCount = 0;

      subscriptions.forEach(subscription => {
        if (subscription.status === 'active') {
          const daysUntilExpiry = differenceInDays(subscription.endDate, now);
          
          // Count alerts for plans expiring within 7 days
          if (daysUntilExpiry <= 7) {
            alertCount++;
          }
        }
      });

      // Set a simple notification count for the badge
      setNotifications(Array(alertCount).fill({}));
    };

    checkSubscriptionExpiry();
    const interval = setInterval(checkSubscriptionExpiry, 24 * 60 * 60 * 1000); // Check daily

    return () => clearInterval(interval);
  }, [subscriptions]);

  const markAsRead = (notificationId: string) => {
    // Simple implementation for marking as read
    console.log('Marked as read:', notificationId);
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount: notifications.length,
    markAsRead,
    clearAll
  };
}